const markdownIt = require("markdown-it");
const markdownItSub = require("markdown-it-sub");
const markdownItSup = require("markdown-it-sup");
const markdownItMark = require("markdown-it-mark");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItTaskLists = require("markdown-it-task-lists");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const nunjucks = require("nunjucks");

const CMS_CONFIG_PATH = path.join(__dirname, "content", "admin", "config.yml");
const COLLECTOR_TEMPLATES_DIR = path.join(
  __dirname,
  "_includes",
  "collector-cards",
);

let cmsConfigCache = null;

function loadCmsConfig() {
  if (cmsConfigCache) return cmsConfigCache;
  if (!fs.existsSync(CMS_CONFIG_PATH)) {
    console.warn(
      `[Collector] CMS config.yml not found at ${CMS_CONFIG_PATH}. Collector data will be empty.`,
    );
    cmsConfigCache = null;
    return null;
  }
  cmsConfigCache = yaml.load(fs.readFileSync(CMS_CONFIG_PATH, "utf8"));
  return cmsConfigCache;
}

function getCmsCollections() {
  const config = loadCmsConfig();
  if (!config || !Array.isArray(config.collections)) return [];
  return config.collections.filter((c) => c && typeof c.name === "string");
}

function getCollectionByName(name) {
  return getCmsCollections().find((c) => c.name === name);
}

const nunjucksEnv = new nunjucks.Environment(
  new nunjucks.FileSystemLoader([
    COLLECTOR_TEMPLATES_DIR,
    path.join(__dirname, "_includes"),
  ]),
);

const mdBasic = markdownIt({ html: true });
nunjucksEnv.addFilter("markdownify", (str) => (str ? mdBasic.render(str) : ""));

function formatDateString(dateValue) {
  let date;
  const ddmmyyyy = typeof dateValue === "string" && dateValue.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (ddmmyyyy) {
    date = new Date(Number(ddmmyyyy[3]), Number(ddmmyyyy[2]) - 1, Number(ddmmyyyy[1]));
  } else {
    date = new Date(dateValue || 0);
  }
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function resolveFieldPath(obj, fieldPath) {
  if (!fieldPath) return undefined;
  return fieldPath.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) return acc[key];
    return undefined;
  }, obj);
}

function flattenValue(value) {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.map(flattenValue).join(" ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function buildSearchableText(itemData, searchFields) {
  const fields =
    Array.isArray(searchFields) && searchFields.length > 0
      ? searchFields
      : ["title", "description", "shortDescription", "tags"];

  const parts = fields
    .map((field) => flattenValue(resolveFieldPath(itemData, field)))
    .filter((part) => part && part.trim().length > 0);

  return parts.join(" ").toLowerCase();
}

function parseListParam(paramStr, key) {
  const listMatch = paramStr.match(
    new RegExp(`${key}\\s*:\\s*\\[([^\\]]*)\\]`, "i"),
  );

  if (!listMatch) return null;

  return listMatch[1]
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function parseFiltersParam(paramStr) {
  const match = paramStr.match(/filters\s*:\s*\[/i);
  if (!match) return null;

  const startIndex = paramStr.indexOf("[", match.index);
  if (startIndex === -1) return null;

  let depth = 0;
  let endIndex = -1;
  for (let i = startIndex; i < paramStr.length; i += 1) {
    const char = paramStr[i];
    if (char === "[") depth += 1;
    if (char === "]") {
      depth -= 1;
      if (depth === 0) {
        endIndex = i;
        break;
      }
    }
  }

  if (endIndex === -1) return null;

  const content = paramStr.slice(startIndex + 1, endIndex).trim();
  if (!content) return [];

  const parts = [];
  let current = "";
  let innerDepth = 0;
  for (let i = 0; i < content.length; i += 1) {
    const char = content[i];
    if (char === "[") innerDepth += 1;
    if (char === "]") innerDepth -= 1;

    if (char === "," && innerDepth === 0) {
      parts.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  if (current.trim()) parts.push(current.trim());

  const groups = parts
    .map((part) => {
      const groupMatch = part.match(/^(.+?)\s*->\s*\[([^\]]*)\]\s*$/);
      if (!groupMatch) return null;
      const label = groupMatch[1].trim();
      const fields = groupMatch[2]
        .split(",")
        .map((field) => field.trim())
        .filter((field) => field.length > 0);
      if (!label || fields.length === 0) return null;
      return { label, fields };
    })
    .filter(Boolean);

  return groups;
}

function parsePrefilterParam(paramStr) {
  const match = paramStr.match(/prefilter\s*:\s*\[/i);
  if (!match) return null;

  const startIndex = paramStr.indexOf("[", match.index);
  if (startIndex === -1) return null;

  const endIndex = paramStr.indexOf("]", startIndex);
  if (endIndex === -1) return null;

  const content = paramStr.slice(startIndex + 1, endIndex).trim();
  if (!content) return null;

  // Split by OR (case-insensitive, surrounded by whitespace) to get OR-groups.
  // AND binds tighter than OR — each OR-group is itself AND-ed conditions.
  const orParts = content.split(/\s+OR\s+/i);

  const orGroups = orParts
    .map((orPart) => {
      const andParts = orPart.trim().split(/\s+AND\s+/i);
      return andParts
        .map((part) => {
          part = part.trim();
          // Support field>=today and field<=today for date comparisons
          const dateOpMatch = part.match(/^([^>=<\s]+)\s*(>=|<=)\s*today\s*$/i);
          if (dateOpMatch) {
            return {
              field: dateOpMatch[1].trim(),
              operator: dateOpMatch[2] === ">=" ? "date_gte_today" : "date_lte_today",
            };
          }
          // Support field="value with spaces" and field=simplevalue
          const quotedMatch = part.match(/^([^=\s]+)\s*=\s*"([^"]*)"\s*$/);
          if (quotedMatch) {
            return { field: quotedMatch[1].trim(), value: quotedMatch[2] };
          }
          const simpleMatch = part.match(/^([^=\s]+)\s*=\s*(.+)\s*$/);
          if (simpleMatch) {
            return {
              field: simpleMatch[1].trim(),
              value: simpleMatch[2].trim(),
            };
          }
          return null;
        })
        .filter(Boolean);
    })
    .filter((group) => group.length > 0);

  return orGroups.length > 0 ? { orGroups } : null;
}

function renderCollectorCard(templateName, data) {
  const safeName = templateName || "default";
  const templateFile = `${safeName}.njk`;
  const templatePath = path.join(COLLECTOR_TEMPLATES_DIR, templateFile);

  const fileToRender = fs.existsSync(templatePath)
    ? templateFile
    : "default.njk";

  try {
    let html = nunjucksEnv.render(fileToRender, data);
    if (pathPrefix !== "/") {
      const prefixPath = pathPrefix.replace(/\/$/, "");
      html = html.replace(/src="(\/[^"]*?)"/g, (match, p) => {
        if (p.startsWith(prefixPath)) return match;
        return `src="${prefixPath}${p}"`;
      });
    }
    return html;
  } catch (error) {
    console.warn(
      `[Collector] Failed to render card template "${fileToRender}": ${error.message}`,
    );
    return "";
  }
}

function normalizeCollectionFolder(folder) {
  const contentDir = path.join(__dirname, "content");
  const fullFolderPath = path.isAbsolute(folder)
    ? folder
    : path.join(__dirname, folder);

  if (!fullFolderPath.startsWith(contentDir)) {
    console.warn(
      `[Collector] Collection folder is outside content/: ${folder}`,
    );
    return null;
  }

  const requestPath = path
    .relative(contentDir, fullFolderPath)
    .replace(/\\/g, "/");

  return {
    fullFolderPath,
    requestPath,
  };
}

function buildSubtypeIndex() {
  const subtypesDir = path.join(__dirname, "content/data/subtypes");
  const index = {};
  if (!fs.existsSync(subtypesDir)) return index;
  for (const file of fs.readdirSync(subtypesDir).filter((f) => f.endsWith(".md"))) {
    const content = fs.readFileSync(path.join(subtypesDir, file), "utf-8");
    const m = content.match(/^---\n([\s\S]*?)\n---/);
    if (!m) continue;
    const fm = yaml.load(m[1]) || {};
    if (fm.key && fm.name) index[fm.key] = fm.name;
  }
  return index;
}

function getItemsFromCollection(collection, templateOverride) {
  if (!collection || !collection.folder) return [];

  const normalized = normalizeCollectionFolder(collection.folder);
  if (!normalized) return [];

  const { fullFolderPath, requestPath } = normalized;

  if (!fs.existsSync(fullFolderPath)) {
    console.warn(
      `[Collector] Collection folder does not exist: ${collection.folder}`,
    );
    return [];
  }

  const items = [];
  const files = fs
    .readdirSync(fullFolderPath)
    .filter((file) => file.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const templateName =
    templateOverride ||
    (collection.collector && collection.collector.template) ||
    collection.name ||
    "default";
  const searchFields =
    collection.collector && Array.isArray(collection.collector.search_fields)
      ? collection.collector.search_fields
      : null;

  const subtypeIndex =
    collection.name === "datasets" ? buildSubtypeIndex() : null;

  files.forEach((file) => {
    const filePath = path.join(fullFolderPath, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const match = content.match(/^---\n([\s\S]*?)\n---/);

    if (match) {
      try {
        const frontmatter = yaml.load(match[1]) || {};
        const body = content.replace(/^---\n[\s\S]*?\n---\n?/, "").trim();
        const slug = file.replace(".md", "");
        const urlBase = requestPath ? `/${requestPath}` : "";
        const prefixPath = pathPrefix === "/" ? "" : pathPrefix.replace(/\/$/, "");
        const pageUrl = `${prefixPath}${urlBase}/${slug}/`;

        const title = frontmatter.title || "Untitled";
        const description =
          frontmatter["short-description"] || frontmatter.description || "";
        const tags = frontmatter.tags || [];
        const date = frontmatter.date || null;
        const formattedDate = date ? formatDateString(date) : "";

        const itemData = {
          ...frontmatter,
          title,
          description,
          shortDescription: description,
          tags,
          date,
          formattedDate,
          slug,
          pageUrl,
          collection: collection.name,
          body,
        };

        if (subtypeIndex && Array.isArray(frontmatter.subtypes)) {
          itemData.subtypes_display = frontmatter.subtypes.map(
            (id) => subtypeIndex[id] || id,
          );
        }

        const cardHtml = renderCollectorCard(templateName, itemData);
        const searchable = buildSearchableText(itemData, searchFields);

        items.push({
          title,
          description,
          tags,
          date,
          formattedDate,
          slug,
          pageUrl,
          searchable,
          cardHtml,
          data: itemData,
        });
      } catch (e) {
        console.warn(`Failed to parse ${file}:`, e.message);
      }
    }
  });

  return items.sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime();
    const dateB = new Date(b.date || 0).getTime();
    if (dateB !== dateA) return dateB - dateA;
    // Natural (numeric-aware) sort on slug as tiebreaker so subtype-2
    // comes before subtype-10 when dates are identical or absent.
    return a.slug.localeCompare(b.slug, undefined, { numeric: true });
  });
}

/**
 * Get items from a JSON file collection
 */
function getItemsFromJsonFile(
  jsonFilePath,
  collectionName,
  collectorConfig,
  templateOverride,
) {
  if (!fs.existsSync(jsonFilePath)) {
    console.warn(`[Collector] JSON file does not exist: ${jsonFilePath}`);
    return [];
  }

  try {
    const fileContent = fs.readFileSync(jsonFilePath, "utf-8");
    const jsonData = JSON.parse(fileContent);

    // Try to find the data array - could be at root or nested under collection name
    let dataArray = Array.isArray(jsonData)
      ? jsonData
      : jsonData[collectionName];
    if (!Array.isArray(dataArray)) {
      // If not found, try the first array property
      const firstArrayKey = Object.keys(jsonData).find((key) =>
        Array.isArray(jsonData[key]),
      );
      dataArray = firstArrayKey ? jsonData[firstArrayKey] : [];
    }

    if (!Array.isArray(dataArray) || dataArray.length === 0) return [];

    const templateName =
      templateOverride ||
      (collectorConfig && collectorConfig.template) ||
      collectionName ||
      "default";

    const searchFields =
      collectorConfig && Array.isArray(collectorConfig.search_fields)
        ? collectorConfig.search_fields
        : ["title", "description", "name"];

    const items = dataArray.map((item) => {
      const title = item.title || item.name || "Untitled";
      const date = item.date || null;
      const formattedDate = date ? formatDateString(date) : "";

      // Handle array fields (like authors) - keep as array for template, join for search
      const processedItem = { ...item };
      Object.keys(item).forEach((key) => {
        if (Array.isArray(item[key]) && typeof item[key][0] === "string") {
          // Keep arrays as-is in the item data for template use
          processedItem[key] = item[key];
        }
      });

      const itemData = {
        ...processedItem,
        title,
        date,
        formattedDate,
        collection: collectionName,
      };

      const cardHtml = renderCollectorCard(templateName, itemData);
      const searchable = buildSearchableText(itemData, searchFields);

      return {
        title,
        date,
        formattedDate,
        searchable,
        cardHtml,
        data: itemData,
      };
    });

    // Sort by date (newest first), then by title
    return items.sort((a, b) => {
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();
      if (dateB !== dateA) return dateB - dateA;
      return (a.title || "").localeCompare(b.title || "");
    });
  } catch (e) {
    console.warn(
      `[Collector] Failed to parse JSON file ${jsonFilePath}:`,
      e.message,
    );
    return [];
  }
}

/**
 * Get items from a YAML file collection
 */
function getItemsFromYamlFile(
  yamlFilePath,
  collectionName,
  collectorConfig,
  templateOverride,
) {
  if (!fs.existsSync(yamlFilePath)) {
    console.warn(`[Collector] YAML file does not exist: ${yamlFilePath}`);
    return [];
  }

  try {
    const fileContent = fs.readFileSync(yamlFilePath, "utf-8");
    const yamlData = yaml.load(fileContent);

    let dataArray = Array.isArray(yamlData) ? yamlData : yamlData[collectionName];
    if (!Array.isArray(dataArray)) {
      const firstArrayKey = Object.keys(yamlData || {}).find((key) =>
        Array.isArray(yamlData[key]),
      );
      dataArray = firstArrayKey ? yamlData[firstArrayKey] : [];
    }

    if (!Array.isArray(dataArray) || dataArray.length === 0) return [];

    const templateName =
      templateOverride ||
      (collectorConfig && collectorConfig.template) ||
      collectionName ||
      "default";

    const searchFields =
      collectorConfig && Array.isArray(collectorConfig.search_fields)
        ? collectorConfig.search_fields
        : ["title", "description", "name"];

    const items = dataArray.map((item) => {
      const title = item.title || item.name || "Untitled";
      const date = item.publication_date || item.date || null;
      const formattedDate = date ? formatDateString(date) : "";
      const itemData = { ...item, title, date, formattedDate, collection: collectionName };
      const cardHtml = renderCollectorCard(templateName, itemData);
      const searchable = buildSearchableText(itemData, searchFields);
      return { title, date, formattedDate, searchable, cardHtml, data: itemData };
    });

    return items.sort((a, b) => {
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();
      if (dateB !== dateA) return dateB - dateA;
      return (a.title || "").localeCompare(b.title || "");
    });
  } catch (e) {
    console.warn(
      `[Collector] Failed to parse YAML file ${yamlFilePath}:`,
      e.message,
    );
    return [];
  }
}

/**
 * Get items from a file-based collection (CMS config with files property)
 */
function getItemsFromFileCollection(collection, templateOverride) {
  if (!collection || !collection.files || !Array.isArray(collection.files)) {
    return [];
  }

  const fileEntry = collection.files[0];
  if (!fileEntry || !fileEntry.file) return [];

  const filePath = path.join(__dirname, fileEntry.file);

  if (filePath.endsWith(".yaml") || filePath.endsWith(".yml")) {
    return getItemsFromYamlFile(
      filePath,
      collection.name,
      collection.collector,
      templateOverride,
    );
  }

  if (!filePath.endsWith(".json")) {
    return [];
  }

  return getItemsFromJsonFile(
    filePath,
    collection.name,
    collection.collector,
    templateOverride,
  );
}

/**
 * Discover and load all JSON files from content/data directory
 */
function discoverJsonCollections() {
  const dataDir = path.join(__dirname, "content", "data");
  if (!fs.existsSync(dataDir)) return [];

  const jsonCollections = [];
  const files = fs.readdirSync(dataDir);

  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const filePath = path.join(dataDir, file);
      const collectionName = file.replace(/\.json$/, "");

      // Check if this collection is already defined in CMS config
      const cmsCollection = getCollectionByName(collectionName);
      if (!cmsCollection || !cmsCollection.files) {
        // Not defined in CMS or not a file collection, so auto-discover it
        jsonCollections.push({
          name: collectionName,
          filePath: filePath,
          collector: null, // No specific config, will use defaults
        });
      }
    }
  });

  return jsonCollections;
}

const pathPrefix = process.env.PATH_PREFIX || "/";

module.exports = function (eleventyConfig) {

  // ─── Markdown Setup with Custom Plugins ──────────────────────────────────
  const md = markdownIt({
    html: true,
    linkify: false,
    typographer: false,
  });
  md.use(markdownItSub);
  md.use(markdownItSup);
  md.use(markdownItMark);
  md.use(markdownItFootnote);
  md.use(markdownItAttrs);
  md.use(markdownItTaskLists);

  // HTML escape utility
  function escapeHtml(str) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return str.replace(/[&<>"']/g, (c) => map[c]);
  }

  // Plugin: Inline custom elements [btn], [tag], [header-box], [sbtn]
  md.use((mdInstance) => {
    mdInstance.inline.ruler.push("custom_inline", function (state, silent) {
      const pos = state.pos;
      if (state.src[pos] !== "[") return false;

      // [btn: Label -> url]
      const btnMatch = state.src
        .slice(pos)
        .match(/^\[btn:\s*([^\]]+?)\s*->\s*([^\]]+?)\]/);
      if (btnMatch) {
        if (!silent) {
          const token = state.push("btn_token", "", 0);
          token.meta = {
            label: btnMatch[1].trim(),
            url: btnMatch[2].trim(),
          };
        }
        state.pos += btnMatch[0].length;
        return true;
      }

      // [tag: Label]
      const tagMatch = state.src.slice(pos).match(/^\[tag:\s*([^\]]+?)\]/);
      if (tagMatch) {
        if (!silent) {
          const token = state.push("tag_token", "", 0);
          token.meta = { label: tagMatch[1].trim() };
        }
        state.pos += tagMatch[0].length;
        return true;
      }

      // [header-box: Label -> url]
      const navBoxMatch = state.src
        .slice(pos)
        .match(/^\[header-box:\s*([^\]]+?)\s*->\s*([^\]]+?)\]/);
      if (navBoxMatch) {
        if (!silent) {
          const token = state.push("nav_box_token", "", 0);
          token.meta = {
            label: navBoxMatch[1].trim(),
            url: navBoxMatch[2].trim(),
          };
        }
        state.pos += navBoxMatch[0].length;
        return true;
      }

      // [sbtn: Label -> [url1, url2, ...]]
      const selBtnMatch = state.src
        .slice(pos)
        .match(/^\[sbtn:\s*([^\]]+?)\s*->\s*\[([^\]]+?)\]\]/);
      if (selBtnMatch) {
        if (!silent) {
          const token = state.push("sbtn_token", "", 0);
          const urlsStr = selBtnMatch[2].trim();
          const urls = urlsStr
            .split(",")
            .map((u) => u.trim())
            .filter((u) => u.length > 0);
          token.meta = {
            label: selBtnMatch[1].trim(),
            urls: urls,
          };
        }
        state.pos += selBtnMatch[0].length;
        return true;
      }

      return false;
    });

    // Renderers
    mdInstance.renderer.rules.btn_token = (tokens, idx) => {
      const meta = tokens[idx].meta;
      return `<a href="${escapeHtml(meta.url)}" class="btn">${escapeHtml(meta.label)}</a>`;
    };

    mdInstance.renderer.rules.tag_token = (tokens, idx) => {
      const meta = tokens[idx].meta;
      return `<span class="tag">${escapeHtml(meta.label)}</span>`;
    };

    mdInstance.renderer.rules.nav_box_token = (tokens, idx) => {
      const meta = tokens[idx].meta;
      return `<a href="${escapeHtml(meta.url)}" class="header-box">${escapeHtml(meta.label)}</a>`;
    };

    mdInstance.renderer.rules.sbtn_token = (tokens, idx) => {
      const meta = tokens[idx].meta;
      const uniqueId = `sbtn-${Math.random().toString(36).substr(2, 9)}`;
      const menuItems = meta.urls
        .map(
          (url) =>
            `<a href="${escapeHtml(url)}" class="sbtn-menu-item">${escapeHtml(url)}</a>`,
        )
        .join("");
      const arrow = '<span class="sbtn-arrow">▷</span>';
      return `<div class="sbtn-container"><button class="sbtn" data-target="${uniqueId}">${escapeHtml(meta.label)}${arrow}</button><div class="sbtn-menu" id="${uniqueId}">${menuItems}</div></div>`;
    };
  });

  // Plugin: Block containers [hero:] / [:hero]
  md.use((mdInstance) => {
    const originalRender = mdInstance.render;

    mdInstance.render = function (src, env) {
      let result = src;

      // Protect fenced code blocks from component processing
      const codeBlocks = [];
      result = result.replace(/^(`{3,})[^\n]*\n[\s\S]*?\n\1[ \t]*$/gm, (match) => {
        const idx = codeBlocks.length;
        codeBlocks.push(match);
        return `\x00CODEBLOCK${idx}\x00`;
      });

      const blockTypes = [
        "item",
        "box",
        "card",
        "cards",
        "cols",
        "grid",
        "hero",
      ];

      for (const blockType of blockTypes) {
        // Pattern to match [type: CSS] or [type:] (with optional CSS)
        const pattern = new RegExp(
          `^\\[${blockType}:([^\\]]*)\\]$\\n([\\s\\S]*?)^\\[:${blockType}\\]$`,
          "gm",
        );

        if (blockType === "hero") {
          result = result.replace(pattern, (match, cssString, content) => {
            const styles = cssString.trim()
              ? ` style="${escapeHtml(cssString.trim())}"`
              : "";
            return `<div class="hero"${styles}><div class="hero-inner">\n\n${content}\n\n</div></div>`;
          });
        } else if (blockType === "grid") {
          result = result.replace(pattern, (match, paramString, content) => {
            let cssString = paramString.trim();
            let classes = "grid";

            // Parse cols: parameter
            const colsMatch = cssString.match(/cols:\s*(\d+)/);
            if (colsMatch) {
              const colCount = colsMatch[1];
              classes += ` grid-cols-${colCount}`;
              console.log(
                `[Grid Parser] Found cols:${colCount} - Applied class: ${classes}`,
              );
              // Remove cols: parameter from cssString so it doesn't appear in style attribute
              cssString = cssString.replace(/cols:\s*\d+\s*/g, "").trim();
            } else {
              console.log(
                `[Grid Parser] No cols parameter found in: "${paramString}"`,
              );
            }

            const styles = cssString ? ` style="${escapeHtml(cssString)}"` : "";
            return `<div class="${classes}"${styles}>\n\n${content}\n\n</div>`;
          });
        } else {
          result = result.replace(pattern, (match, cssString, content) => {
            const styles = cssString.trim()
              ? ` style="${escapeHtml(cssString.trim())}"`
              : "";
            return `<div class="${blockType}"${styles}>\n\n${content}\n\n</div>`;
          });
        }
      }

      // Restore protected code blocks
      if (codeBlocks.length > 0) {
        result = result.replace(/\x00CODEBLOCK(\d+)\x00/g, (_, idx) => codeBlocks[parseInt(idx)]);
      }

      return originalRender.call(mdInstance, result, env);
    };
  });

  // Plugin: Collector blocks
  md.use((mdInstance) => {
    const originalRender = mdInstance.render;

    mdInstance.render = function (src, env) {
      let result = src;

      // Protect fenced code blocks from collector processing
      const codeBlocks = [];
      result = result.replace(/^(`{3,})[^\n]*\n[\s\S]*?\n\1[ \t]*$/gm, (match) => {
        const idx = codeBlocks.length;
        codeBlocks.push(match);
        return `\x00CODEBLOCK${idx}\x00`;
      });

      // Resolve simple {{ varName }} references using page data (e.g. in headings).
      // Uses a plain regex rather than full Nunjucks so {#anchor} syntax in docs is unaffected.
      if (env && typeof env === "object") {
        result = result.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, path) => {
          const value = path
            .split(".")
            .reduce((obj, key) => (obj != null ? obj[key] : undefined), env);
          return value != null && typeof value !== "object"
            ? String(value)
            : match;
        });
      }

      const collectorPattern = /^\[collector\s*->\s*([^;\]]+)(.*?)\]$/gm;

      result = result.replace(collectorPattern, (match, name, params) => {
        const collectionName = name.trim();
        let paramStr = params || "";
        if (env && typeof env === "object") {
          try {
            paramStr = nunjucksEnv.renderString(paramStr, env);
          } catch (e) {
            // keep original paramStr if resolution fails
          }
        }

        const collection = getCollectionByName(collectionName);
        if (!collection) {
          console.warn(
            `[Collector] Unknown collection "${collectionName}" in collector block. Check content/admin/config.yml.`,
          );
        }

        let opts = {
          arrange: "rows",
          display_items: "all",
          search_fields: [],
          sort_fields: [],
          filters: [],
          prefilter: null,
          card_template: null,
          clickable: true,
        };

        const searchList = parseListParam(paramStr, "search");
        if (searchList) {
          opts.search_fields = searchList;
        }

        const sortList = parseListParam(paramStr, "sort");
        if (sortList) {
          opts.sort_fields = sortList;
        }

        const filtersGroups = parseFiltersParam(paramStr);
        if (filtersGroups) {
          opts.filters = filtersGroups;
        }

        const prefilter = parsePrefilterParam(paramStr);
        if (prefilter) {
          opts.prefilter = prefilter;
        }

        const cardTemplateMatch = paramStr.match(
          /card-template:\s*([^\s;\]]+)/i,
        );
        if (cardTemplateMatch) {
          // Strip .njk extension so the key matches what addGlobalData stores.
          opts.card_template = cardTemplateMatch[1]
            .trim()
            .replace(/\.njk$/i, "");
        }

        const clickableMatch = paramStr.match(/clickable:\s*(true|false)/i);
        if (clickableMatch) {
          opts.clickable = clickableMatch[1].toLowerCase() === "true";
        }

        const arrangeMatch = paramStr.match(/arrange:\s*(cols|grid|rows)/i);
        if (arrangeMatch) opts.arrange = arrangeMatch[1].toLowerCase();

        const displayMatch = paramStr.match(/display_items:\s*(all|\d+)/i);
        if (displayMatch) opts.display_items = displayMatch[1];

        return `<div class="collector" data-collection="${escapeHtml(collectionName)}" data-path="${escapeHtml(collectionName)}" data-opts='${JSON.stringify(opts)}'></div>`;
      });

      // Restore protected code blocks
      if (codeBlocks.length > 0) {
        result = result.replace(/\x00CODEBLOCK(\d+)\x00/g, (_, idx) => codeBlocks[parseInt(idx)]);
      }

      return originalRender.call(mdInstance, result, env);
    };
  });

  eleventyConfig.setLibrary("md", md);

  // ─── Filters ────────────────────────────────────────────────────────────

  eleventyConfig.addFilter("subtypeNames", (ids) => {
    if (!ids) return [];
    const idx = buildSubtypeIndex();
    return (Array.isArray(ids) ? ids : [ids]).map((id) => idx[id] || id);
  });

  eleventyConfig.addFilter("depth", (filePath) => {
    const count = (filePath.match(/\//g) || []).length;
    return count > 0 ? count : 0;
  });

  // ─── Post-process filter to handle styled spans
  eleventyConfig.addFilter("processSpans", (content) => {
    if (!content) return content;

    if (pathPrefix !== "/") {
      const prefixPath = pathPrefix.replace(/\/$/, "");
      content = content.replace(/href="(\/[^"]*?)"/g, (match, path) => {
        if (path.startsWith(prefixPath)) return match;
        return `href="${prefixPath}${path}"`;
      });
    }

    const spanPattern = /\[s:([^\]]*?)\]([\s\S]*?)\[:s\]/g;

    return content.replace(spanPattern, (match, cssString, innerContent) => {
      const finalCss =
        cssString.trim() || "background-color: var(--dark-highlight)";
      const cleanContent = innerContent
        .replace(/^<p>/, "")
        .replace(/<\/p>$/, "")
        .trim();
      return `<span style="${escapeHtml(finalCss)}">${cleanContent}</span>`;
    });
  });

  // ─── Collections ────────────────────────────────────────────────────────
  // Lab Protocols Collection
  eleventyConfig.addCollection("labProtocols", (collectionApi) => {
    const protocolsDir = path.join(__dirname, "content", "data", "lab_protocols");
    const protocols = [];

    if (fs.existsSync(protocolsDir)) {
      const files = fs
        .readdirSync(protocolsDir)
        .filter((file) => file.endsWith(".md"));

      files.forEach((file) => {
        const filePath = path.join(protocolsDir, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const match = content.match(/^---\n([\s\S]*?)\n---/);

        if (match) {
          try {
            const frontmatter = yaml.load(match[1]);
            const body = content.replace(/^---\n[\s\S]*?\n---\n/, "").trim();
            const slug = file.replace(".md", "");

            protocols.push({
              title: frontmatter.title || "Untitled",
              description: frontmatter.description || "",
              tags: frontmatter.tags || [],
              date: frontmatter.date || new Date().toISOString(),
              shortDescription:
                frontmatter["short-description"] ||
                frontmatter.description ||
                "",
              slug: slug,
              content: body,
              url: `/lab-protocols/${slug}/`,
            });
          } catch (e) {
            console.warn(`Failed to parse protocol ${file}:`, e.message);
          }
        }
      });
    }

    return protocols.sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  // Header Collection
  eleventyConfig.addCollection("header", (collectionApi) => {
    const header = require("./content/data/header.json");
    const allPages = collectionApi.getFilteredByGlob("content/**/*.md");
    const pageFiles = allPages.map((p) => p.filePathStem);

    const processNavItem = (item) => {
      // If item has a file property, it's a direct link
      if (item.file) {
        const fileExists = pageFiles.some((f) =>
          f.includes(item.file.replace("content/", "").replace(".md", "")),
        );
        if (!fileExists) return null;

        const urlPath = item.file.replace("content/", "").replace(".md", "").replace(/\/index$/, "");
        const url = urlPath === "" || urlPath === "index" ? "/" : "/" + urlPath + "/";
        return {
          label: item.label,
          file: item.file,
          url: url,
          type: "link",
        };
      }
      // If item has items property, it's a dropdown
      else if (item.items && Array.isArray(item.items)) {
        const processedItems = item.items
          .map((subItem) => {
            const fileExists = pageFiles.some((f) =>
              f.includes(
                subItem.file.replace("content/", "").replace(".md", ""),
              ),
            );
            if (!fileExists) return null;

            const urlPath = subItem.file
              .replace("content/", "")
              .replace(".md", "")
              .replace(/\/index$/, "");
            const url = urlPath === "" || urlPath === "index" ? "/" : "/" + urlPath + "/";
            return {
              label: subItem.label,
              file: subItem.file,
              url: url,
            };
          })
          .filter((item) => item !== null);

        if (processedItems.length === 0) return null;

        return {
          label: item.label,
          items: processedItems,
          type: "dropdown",
        };
      }
      return null;
    };

    return {
      items: header.items
        .map((item) => processNavItem(item))
        .filter((item) => item !== null),
    };
  });
  // Branding Collection
  eleventyConfig.addCollection("branding", () => {
    const branding = require("./content/data/branding.json");
    const siteTitle = branding.site_title || "BlastoDB";
    const siteLogo = branding.site_logo || "/images/blastie.webp";
    return branding;
  });

  // Footer Collection
  eleventyConfig.addCollection("footer", () => {
    const footer = require("./content/data/footer.json");
    return footer;
  });

  // Documentation Collections
  eleventyConfig.addCollection("docs_header", () =>
    require("./content/documentation/data/docs_header.json")
  );
  eleventyConfig.addCollection("docs_footer", () =>
    require("./content/documentation/data/docs_footer.json")
  );

  // Publications Collection
  eleventyConfig.addCollection("publications", () => {
    const publications = require("./content/data/publications.json");
    return publications.publications.map((pub) => ({
      data: {
        ...pub,
        authors: pub.authors.join(" & "),
        formattedDate: new Date(pub.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        }),
      },
    }));
  });

  // ─── Global Data ────────────────────────────────────────────────────────

  eleventyConfig.addGlobalData("collectorData", () => {
    const allCollections = getCmsCollections();
    const folderCollections = allCollections.filter((c) => c.folder);
    const fileCollections = allCollections.filter((c) => c.files);
    const autoJsonCollections = discoverJsonCollections();
    const data = {};

    // Discover all card templates so per-shortcode overrides can be served.
    const availableTemplates = fs.existsSync(COLLECTOR_TEMPLATES_DIR)
      ? fs
          .readdirSync(COLLECTOR_TEMPLATES_DIR)
          .filter((f) => f.endsWith(".njk"))
          .map((f) => f.replace(/\.njk$/i, ""))
      : [];

    // Process folder-based collections
    folderCollections.forEach((collection) => {
      // Default render (uses the collection's own configured template).
      data[collection.name] = getItemsFromCollection(collection);

      // Pre-render one variant per available template so that
      // card-template: overrides in shortcodes work without extra I/O.
      availableTemplates.forEach((templateName) => {
        data[`${collection.name}::${templateName}`] = getItemsFromCollection(
          collection,
          templateName,
        );
      });
    });

    // Process file-based collections (defined in CMS config)
    fileCollections.forEach((collection) => {
      // Default render
      data[collection.name] = getItemsFromFileCollection(collection);

      // Pre-render one variant per available template
      availableTemplates.forEach((templateName) => {
        data[`${collection.name}::${templateName}`] =
          getItemsFromFileCollection(collection, templateName);
      });
    });

    // Process auto-discovered JSON collections
    autoJsonCollections.forEach((jsonCollection) => {
      // Default render
      data[jsonCollection.name] = getItemsFromJsonFile(
        jsonCollection.filePath,
        jsonCollection.name,
        jsonCollection.collector,
        null,
      );

      // Pre-render one variant per available template
      availableTemplates.forEach((templateName) => {
        data[`${jsonCollection.name}::${templateName}`] = getItemsFromJsonFile(
          jsonCollection.filePath,
          jsonCollection.name,
          jsonCollection.collector,
          templateName,
        );
      });
    });

    return data;
  });

  // ─── Pass-through Copy ──────────────────────────────────────────────────
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("content/admin"); //for the SveltiaCMS

  // ─── Config ─────────────────────────────────────────────────────────────
  return {
    dir: {
      input: "content",
      output: "output",
      includes: "../_includes",
    },
    pathPrefix: pathPrefix,
    templateFormats: ["md"],
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
};

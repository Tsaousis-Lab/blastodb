const markdownIt = require("markdown-it");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

function getItemsFromPath(requestPath) {
  const baseDir = path.join(__dirname, "content");
  const fullPath = path.join(baseDir, requestPath);

  if (!fullPath.startsWith(baseDir)) {
    return [];
  }

  if (!fs.existsSync(fullPath)) {
    console.warn(`[Collector] Path does not exist: ${requestPath}`);
    return [];
  }

  const items = [];
  const files = fs
    .readdirSync(fullPath)
    .filter((file) => file.endsWith(".md"))
    .sort();

  files.forEach((file) => {
    const filePath = path.join(fullPath, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const match = content.match(/^---\n([\s\S]*?)\n---/);

    if (match) {
      try {
        const frontmatter = yaml.load(match[1]);
        const slug = file.replace(".md", "");
        const url = `/${requestPath}/${slug}/`;

        items.push({
          title: frontmatter.title || "Untitled",
          description:
            frontmatter["short-description"] || frontmatter.description || "",
          tags: frontmatter.tags || [],
          date: frontmatter.date || new Date().toISOString(),
          slug: slug,
          url: url,
        });
      } catch (e) {
        console.warn(`Failed to parse ${file}:`, e.message);
      }
    }
  });

  return items.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getCollectorPaths() {
  const contentDir = path.join(__dirname, "content");
  const entries = fs.readdirSync(contentDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name);
}

module.exports = function (eleventyConfig) {
  const pathPrefix = process.env.PATH_PREFIX || "/";

  // ─── Markdown Setup with Custom Plugins ──────────────────────────────────
  const md = markdownIt({
    html: true,
    linkify: false,
    typographer: false,
  });

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

  // Plugin: Inline custom elements [btn], [tag], [nav-box], [sbtn]
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

      // [nav-box: Label -> url]
      const navBoxMatch = state.src
        .slice(pos)
        .match(/^\[nav-box:\s*([^\]]+?)\s*->\s*([^\]]+?)\]/);
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
      return `<a href="${escapeHtml(meta.url)}" class="nav-box">${escapeHtml(meta.label)}</a>`;
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
        } else {
          result = result.replace(pattern, (match, cssString, content) => {
            const styles = cssString.trim()
              ? ` style="${escapeHtml(cssString.trim())}"`
              : "";
            return `<div class="${blockType}"${styles}>\n\n${content}\n\n</div>`;
          });
        }
      }

      return originalRender.call(mdInstance, result, env);
    };
  });

  // Plugin: Collector blocks
  md.use((mdInstance) => {
    const originalRender = mdInstance.render;

    mdInstance.render = function (src, env) {
      let result = src;

      const collectorPattern = /^\[collector\s*->\s*([^;\]]+)(.*?)\]$/gm;

      result = result.replace(collectorPattern, (match, path, params) => {
        const collectorPath = path.trim();
        const paramStr = params || "";

        let opts = {
          tags: true,
          date: true,
          search: true,
          arrange: "rows",
          display_items: "all",
          sort: true,
        };

        const tagMatch = paramStr.match(/tags:\s*(true|false)/i);
        if (tagMatch) opts.tags = tagMatch[1].toLowerCase() === "true";

        const dateMatch = paramStr.match(/date:\s*(true|false)/i);
        if (dateMatch) opts.date = dateMatch[1].toLowerCase() === "true";

        const searchMatch = paramStr.match(/search:\s*(true|false)/i);
        if (searchMatch) opts.search = searchMatch[1].toLowerCase() === "true";

        const arrangeMatch = paramStr.match(/arrange:\s*(cols|grid|rows)/i);
        if (arrangeMatch) opts.arrange = arrangeMatch[1].toLowerCase();

        const displayMatch = paramStr.match(/display_items:\s*(all|\d+)/i);
        if (displayMatch) opts.display_items = displayMatch[1];

        const sortMatch = paramStr.match(/sort:\s*(true|false)/i);
        if (sortMatch) opts.sort = sortMatch[1].toLowerCase() === "true";

        return `<div class="collector" data-path="${escapeHtml(collectorPath)}" data-opts='${JSON.stringify(opts)}'></div>`;
      });

      return originalRender.call(mdInstance, result, env);
    };
  });

  eleventyConfig.setLibrary("md", md);

  // ─── Filters ────────────────────────────────────────────────────────────
  eleventyConfig.addFilter("depth", (filePath) => {
    const count = (filePath.match(/\//g) || []).length;
    return count > 0 ? count : 0;
  });

  // ─── Post-process filter to handle styled spans
  eleventyConfig.addFilter("processSpans", (content) => {
    if (!content) return content;

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
    const protocolsDir = path.join(__dirname, "content", "lab-protocols");
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

  // Navigation Collection
  eleventyConfig.addCollection("nav", (collectionApi) => {
    const nav = require("./nav.json");
    const siteTitle = nav.site_title || "BlastoDB";
    const allPages = collectionApi.getFilteredByGlob("content/**/*.md");
    const pageFiles = allPages.map((p) => p.filePathStem);

    return {
      items: nav.nav
        .filter((item) => {
          const fileExists = pageFiles.some((f) =>
            f.includes(item.file.replace("content/", "").replace(".md", "")),
          );
          return fileExists;
        })
        .map((item) => {
          const urlPath = item.file.replace("content/", "").replace(".md", "");
          const url = urlPath === "index" ? "/" : `/${urlPath}/`;
          return {
            label: item.label,
            file: item.file,
            url: url,
          };
        }),
      siteTitle: siteTitle,
    };
  });

  // ─── Global Data ────────────────────────────────────────────────────────
  eleventyConfig.addGlobalData("labProtocols", () => {
    const protocolsDir = path.join(__dirname, "content", "lab-protocols");
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

  eleventyConfig.addGlobalData("collectorData", () => {
    const collectorPaths = getCollectorPaths();
    const data = {};
    collectorPaths.forEach((collectorPath) => {
      data[collectorPath] = getItemsFromPath(collectorPath);
    });
    return data;
  });

  // ─── Pass-through Copy ──────────────────────────────────────────────────
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("images");

  // ─── Config ─────────────────────────────────────────────────────────────
  return {
    dir: {
      input: "content",
      output: "output",
      includes: "../_includes",
    },
    pathPrefix: pathPrefix,
    templateFormats: ["md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

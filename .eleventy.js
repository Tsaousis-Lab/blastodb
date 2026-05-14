const markdownIt = require("markdown-it");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
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

  // Plugin: Inline custom elements [btn], [tag], [nav-box]
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
  });

  // Plugin: Block containers [start:X]...[end:X]
  md.use((mdInstance) => {
    const originalRender = mdInstance.render;

    mdInstance.render = function (src, env) {
      let result = src;

      const validTypes = [
        "hero",
        "card",
        "box",
        "cards",
        "grid",
        "cols",
        "item",
      ];

      const heroPattern = /^\[start:hero\]$\n([\s\S]*?)^\[end:hero\]$/gm;
      result = result.replace(
        heroPattern,
        (match, content) =>
          `<div class="hero"><div class="hero-inner">\n\n${content}\n\n</div></div>`,
      );

      const otherTypes = ["card", "box", "cards", "grid", "cols", "item"];

      for (const blockType of otherTypes) {
        const pattern = new RegExp(
          `^\\[start:${blockType}\\]$\\n([\\s\\S]*?)^\\[end:${blockType}\\]$`,
          "gm",
        );
        result = result.replace(
          pattern,
          (match, content) =>
            `<div class="${blockType}">\n\n${content}\n\n</div>`,
        );
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
          arrange: "cols",
          display_items: "all",
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

  // ─── Pass-through Copy ──────────────────────────────────────────────────
  eleventyConfig.addPassthroughCopy("assets");

  // ─── Config ─────────────────────────────────────────────────────────────
  return {
    dir: {
      input: "content",
      output: "output",
      includes: "../_includes",
    },
    templateFormats: ["md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

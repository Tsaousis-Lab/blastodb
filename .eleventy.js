const markdownIt = require("markdown-it");
const { parseBlocks } = require("./lib/parser");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  // ─── Library Setup ──────────────────────────────────────────────────────
  const md = markdownIt({
    html: true,
    linkify: false,
    typographer: false,
  });

  // Override markdown rendering to use our custom parser
  eleventyConfig.setLibrary("md", {
    render: function (content) {
      // Parse the content using our custom block parser
      const result = parseBlocks(content);
      return result.html;
    },
  });

  // ─── Filters ────────────────────────────────────────────────────────────
  // Calculate depth for relative paths
  eleventyConfig.addFilter("depth", (path) => {
    const count = (path.match(/\//g) || []).length;
    return count > 0 ? count : 0;
  });

  // ─── Collections ────────────────────────────────────────────────────────
  // Lab Protocols Collection - reads from content/lab-protocols
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

  eleventyConfig.addCollection("nav", (collectionApi) => {
    const nav = require("./nav.json");
    const siteTitle = nav.site_title || "BlastoDB";

    // Only include pages that actually exist
    const allPages = collectionApi.getFilteredByGlob("content/**/*.md");
    const pageFiles = allPages.map((p) => p.filePathStem);

    return {
      items: nav.nav
        .filter((item) => {
          // Check if the file exists
          const fileExists = pageFiles.some((f) =>
            f.includes(item.file.replace("content/", "").replace(".md", "")),
          );
          return fileExists;
        })
        .map((item) => {
          // Convert file path to URL (11ty pretty URLs use directories)
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
  // Make lab protocols available as global data
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

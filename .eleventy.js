const markdownIt = require("markdown-it");
const { parseBlocks } = require("./lib/parser");

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

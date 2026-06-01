/**
 * BlastoDB CMS Preview Renderer
 * ─────────────────────────────
 * Drop into content/admin/cms-preview.js and load after the CMS script:
 *
 *   <script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
 *   <script src="cms-preview.js"></script>
 */

// ─── Styles ───────────────────────────────────────────────────────────────────
// Injected as a <style> tag directly into each preview component,
// which is the only reliable way to style content inside the CMS iframe.

const PREVIEW_STYLES = `
  * { box-sizing: border-box; }

  body, .preview-root {
    font-family: sans-serif;
    color: #1a1a2e;
    line-height: 1.6;
    padding: 1.5rem;
    max-width: 900px;
    margin: 0 auto;
  }

  /* ── hero ── */
  .preview-hero {
    background: #0d5a53;
    color: white;
    border-radius: 8px;
    padding: 2.5rem 2rem;
    margin: 1rem 0;
  }
  .preview-hero * { color: white; }
  .preview-hero-inner {
    max-width: 700px;
    margin: 0 auto;
  }

  /* ── box ── */
  .preview-box {
    border: 1px solid #d0d8e4;
    border-radius: 6px;
    padding: 1rem 1.25rem;
    margin: 0.75rem 0;
    background: #fafafa;
  }

  /* ── cols ── */
  .preview-cols {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin: 0.75rem 0;
    align-items: flex-start;
  }
  .preview-cols > .preview-box {
    flex: 1;
    min-width: 0;
  }

  /* ── grid ── */
  .preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 0.75rem;
    margin: 0.75rem 0;
  }

  /* ── cards / card ── */
  .preview-cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 0.75rem 0;
  }
  .preview-card {
    border: 1px solid #ccd;
    border-radius: 8px;
    padding: 1rem;
    flex: 1;
    min-width: 180px;
    background: white;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  }

  /* ── item ── */
  .preview-item {
    padding: 0.4rem 0;
  }

  /* ── inline elements ── */
  .preview-btn {
    display: inline-block;
    background: #0d5a53;
    color: white !important;
    padding: 0.4em 1em;
    border-radius: 4px;
    text-decoration: none;
    font-size: 0.9em;
    margin: 0.2em 0.2em 0.2em 0;
    border: none;
    cursor: pointer;
  }
  .preview-nav-box {
    display: inline-block;
    border: 2px solid #0d5a53;
    color: #0d5a53 !important;
    padding: 0.5em 1em;
    border-radius: 4px;
    text-decoration: none;
    font-size: 0.9em;
    margin: 0.2em;
  }
  .preview-tag {
    display: inline-block;
    background: #e8f4f2;
    color: #0d5a53;
    padding: 0.15em 0.6em;
    border-radius: 999px;
    font-size: 0.8em;
    margin: 0.1em;
  }
  .preview-collector {
    border: 2px dashed #aac;
    border-radius: 6px;
    padding: 0.75rem 1rem;
    color: #556;
    background: #f5f5fa;
    font-size: 0.9em;
    margin: 0.75rem 0;
  }

  /* ── standard markdown ── */
  h1, h2, h3 { color: #0d5a53; margin-top: 1.25em; margin-bottom: 0.4em; }
  hr { border: none; border-top: 1px solid #dde; margin: 1.5rem 0; }
  a { color: #0d5a53; }
  p { margin: 0.6em 0; }
  strong { font-weight: 600; }
`;

// ─── Markdown Parser ──────────────────────────────────────────────────────────

function parseBlastoMarkdown(src) {
  if (!src) return "";
  let result = src;

  // Block containers — 4 passes to resolve nesting inside-out
  const blockTypes = ["hero", "cards", "cols", "box", "card", "grid", "item"];
  for (let pass = 0; pass < 4; pass++) {
    for (const type of blockTypes) {
      const pattern = new RegExp(
        `^\\[${type}:([^\\]]*)\\]$\n([\\s\\S]*?)^\\[:${type}\\]$`,
        "gm",
      );
      result = result.replace(pattern, (_, css, content) => {
        const style = css.trim() ? ` style="${css.trim()}"` : "";
        if (type === "hero") {
          return `<div class="preview-hero"${style}><div class="preview-hero-inner">${parseBlastoMarkdown(content)}</div></div>`;
        }
        return `<div class="preview-${type}"${style}>${parseBlastoMarkdown(content)}</div>`;
      });
    }
  }

  // Styled spans: [s: css]text[:s]
  result = result.replace(
    /\[s:([^\]]*?)\]([\s\S]*?)\[:s\]/g,
    (_, css, inner) => {
      const finalCss =
        css.trim() || "background-color:#0d5a53;color:white;padding:0 3px";
      return `<span style="${finalCss}">${inner.trim()}</span>`;
    },
  );

  // [btn: Label -> url]
  result = result.replace(
    /\[btn:\s*([^\]]+?)\s*->\s*([^\]]+?)\]/g,
    (_, label, url) => `<a href="${url}" class="preview-btn">${label}</a>`,
  );

  // [nav-box: Label -> url]
  result = result.replace(
    /\[nav-box:\s*([^\]]+?)\s*->\s*([^\]]+?)\]/g,
    (_, label, url) => `<a href="${url}" class="preview-nav-box">${label}</a>`,
  );

  // [tag: Label]
  result = result.replace(
    /\[tag:\s*([^\]]+?)\]/g,
    (_, label) => `<span class="preview-tag">${label}</span>`,
  );

  // [collector -> path] — placeholder only, needs filesystem
  result = result.replace(
    /\[collector\s*->\s*([^;\]]+)(.*?)\]/g,
    (_, p) =>
      `<div class="preview-collector">📂 Collector: <strong>${p.trim()}</strong> — renders on the live site</div>`,
  );

  // Standard markdown
  result = result.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  result = result.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  result = result.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  result = result.replace(/\*(.+?)\*/g, "<em>$1</em>");
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  result = result.replace(/^---$/gm, "<hr>");
  result = result
    .split(/\n{2,}/)
    .map((block) => {
      block = block.trim();
      if (!block || block.startsWith("<")) return block;
      return `<p>${block.replace(/\n/g, " ")}</p>`;
    })
    .join("\n");

  return result;
}

// ─── Preview Components ───────────────────────────────────────────────────────

const { createElement: h, useEffect, useRef } = React;

// Wraps any preview in a root div with styles injected inline,
// so they are guaranteed to apply inside the CMS iframe.
function PreviewShell({ children }) {
  return h(
    "div",
    { className: "preview-root" },
    h("style", { dangerouslySetInnerHTML: { __html: PREVIEW_STYLES } }),
    children,
  );
}

// Body field — parses custom BlastoDB markdown and sets innerHTML
function BodyPreview({ body }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.innerHTML = parseBlastoMarkdown(body || "");
  }, [body]);
  return h("div", { ref });
}

// Dataset preview
function DatasetPreview({ entry }) {
  const data = entry.get("data");

  const title = data.get("title") || "Untitled";
  const dataTypes = data.get("data_types");
  const subtypes = data.get("subtypes");
  const strains = data.get("strains");
  const sourceUrl = data.get("source_url");
  const scriptUrl = data.get("script_url");
  const pubRef = data.get("publication_ref");
  const date = data.get("date");
  const country = data.get("country");
  const body = data.get("body");

  const tagList = (items) => {
    if (!items) return null;
    const arr = typeof items.toJS === "function" ? items.toJS() : items;
    if (!arr || !arr.length) return null;
    return h(
      "span",
      null,
      arr.map((t, i) => h("span", { key: i, className: "preview-tag" }, t)),
    );
  };

  const field = (label, value) =>
    value
      ? h(
          "div",
          { style: { marginBottom: "0.4rem" } },
          h("strong", null, label + ": "),
          value,
        )
      : null;

  return h(
    PreviewShell,
    null,
    h("h1", null, title),
    field("Data Types", tagList(dataTypes)),
    field("Subtypes", tagList(subtypes)),
    field("Strains", tagList(strains)),
    field("Country", country),
    field("Date", date),
    field("Source", sourceUrl && h("a", { href: sourceUrl }, sourceUrl)),
    field("Script", scriptUrl && h("a", { href: scriptUrl }, scriptUrl)),
    field("Reference", pubRef && h("code", null, pubRef)),
    body && h("div", null, h("hr", null), h(BodyPreview, { body })),
  );
}

// Bibliography preview
function BibliographyPreview({ entry }) {
  const data = entry.get("data");

  const title = data.get("title") || "Untitled";
  const authors = data.get("authors");
  const date = data.get("date");
  const journal = data.get("journal");
  const doi = data.get("doi");
  const url = data.get("url");
  const refId = data.get("ref_id");

  const authorList = authors
    ? (typeof authors.toJS === "function" ? authors.toJS() : authors).join(", ")
    : "";

  return h(
    PreviewShell,
    null,
    h("h2", null, title),
    authorList && h("p", { style: { color: "#556" } }, authorList),
    h(
      "p",
      null,
      journal && h("em", null, journal),
      date && h("span", null, ` (${date})`),
    ),
    doi && h("p", null, h("strong", null, "DOI: "), h("code", null, doi)),
    url && h("p", null, h("a", { href: url }, "View Publication →")),
    refId &&
      h(
        "p",
        { style: { fontSize: "0.8em", color: "#999" } },
        `Citation key: ${refId}`,
      ),
  );
}

// ─── Register ─────────────────────────────────────────────────────────────────

CMS.registerPreviewTemplate("datasets", ({ entry }) =>
  h(DatasetPreview, { entry }),
);

CMS.registerPreviewTemplate("bibliography", ({ entry }) =>
  h(BibliographyPreview, { entry }),
);

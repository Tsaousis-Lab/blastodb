/**
 * Custom Markdown Parser for BlastoDB
 *
 * Supports custom syntax on top of standard Markdown:
 *   [btn: Label -> url]          — Primary button link
 *   [tag: Label]                 — Highlighted tag pill
 *   [nav-box: Label -> url]      — Navigation box link
 *   [start:hero] / [end:hero]    — Full-width hero section
 *   [start:card] / [end:card]    — Card with background and border
 *   [start:box] / [end:box]      — Plain box without styling
 *   [start:cols] / [end:cols]    — Two-column layout
 *   [start:grid] / [end:grid]    — Grid layout
 */

/**
 * Inline Markdown → HTML
 * Processes markdown syntax inline (within paragraphs, etc.)
 */
function inlineMarkdown(text) {
  return (
    text
      // Custom: [btn: Label -> url]
      .replace(
        /\[btn:\s*([^\]]+?)\s*->\s*([^\]]+?)\]/g,
        (_, label, url) => `<a href="${url}" class="btn">${label}</a>`,
      )

      // Custom: [tag: Label]
      .replace(
        /\[tag:\s*([^\]]+?)\]/g,
        (_, label) => `<span class="tag">${label}</span>`,
      )

      // Custom: [nav-box: Label -> url]
      .replace(
        /\[nav-box:\s*([^\]]+?)\s*->\s*([^\]]+?)\]/g,
        (_, label, url) => `<a href="${url}" class="nav-box">${label}</a>`,
      )

      // Standard: **bold**
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")

      // Standard: *italic*  (but not **)
      .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")

      // Standard: `code`
      .replace(/`([^`]+)`/g, "<code>$1</code>")

      // Standard: [text](url)
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        (_, text, url) => `<a href="${url}">${text}</a>`,
      )
  );
}

/**
 * Block-level Markdown → HTML
 * Processes containers like hero, card, box, cols, grid
 */
function parseBlocks(body, opts = {}) {
  const lines = body.split("\n");
  let html = "";
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trimEnd();

    // ── Container blocks ───────────────────────────────────────────────────
    // Check for new block syntax [start:blockType] / [end:blockType]
    const blockMatch = line.match(/^\[(start|end):(\w+)\]$/);
    if (blockMatch) {
      const [, blockAction, blockType] = blockMatch;

      if (blockType === "hero") {
        if (blockAction === "start") {
          i++;
          let heroContent = "";
          while (i < lines.length) {
            const heroEndMatch = lines[i].match(/^\[(start|end):(\w+)\]$/);
            if (
              heroEndMatch &&
              heroEndMatch[2] === "hero" &&
              heroEndMatch[1] === "end"
            ) {
              i++; // consume closing [end:hero]
              break;
            }
            heroContent += lines[i] + "\n";
            i++;
          }
          html += `<section class="hero"><div class="hero-inner">${parseBlocks(heroContent).html}</div></section>`;
          continue;
        }
      }

      if (blockType === "card") {
        if (blockAction === "start") {
          i++;
          let cardContent = "";
          while (i < lines.length) {
            const cardEndMatch = lines[i].match(/^\[(start|end):(\w+)\]$/);
            if (
              cardEndMatch &&
              cardEndMatch[2] === "card" &&
              cardEndMatch[1] === "end"
            ) {
              i++; // consume closing [end:card]
              break;
            }
            cardContent += lines[i] + "\n";
            i++;
          }
          html += `<div class="card">${parseBlocks(cardContent).html}</div>`;
          continue;
        }
      }

      if (blockType === "box") {
        if (blockAction === "start") {
          i++;
          let boxContent = "";
          while (i < lines.length) {
            const boxEndMatch = lines[i].match(/^\[(start|end):(\w+)\]$/);
            if (
              boxEndMatch &&
              boxEndMatch[2] === "box" &&
              boxEndMatch[1] === "end"
            ) {
              i++; // consume closing [end:box]
              break;
            }
            boxContent += lines[i] + "\n";
            i++;
          }
          html += `<div class="box">${parseBlocks(boxContent).html}</div>`;
          continue;
        }
      }

      if (blockType === "cards") {
        if (blockAction === "start") {
          i++;
          let cardsHtml = "";
          // Collect all [start:card] and [start:box] blocks
          while (i < lines.length) {
            const nextBlockMatch = lines[i].match(/^\[(start|end):(\w+)\]$/);
            if (
              nextBlockMatch &&
              nextBlockMatch[2] === "cards" &&
              nextBlockMatch[1] === "end"
            ) {
              i++; // consume closing [end:cards]
              break;
            }
            if (
              nextBlockMatch &&
              (nextBlockMatch[2] === "card" || nextBlockMatch[2] === "box") &&
              nextBlockMatch[1] === "start"
            ) {
              const itemType = nextBlockMatch[2];
              i++;
              let itemContent = "";
              while (i < lines.length) {
                const itemEndMatch = lines[i].match(/^\[(start|end):(\w+)\]$/);
                if (
                  itemEndMatch &&
                  itemEndMatch[2] === itemType &&
                  itemEndMatch[1] === "end"
                ) {
                  i++; // consume closing [end:type]
                  break;
                }
                itemContent += lines[i] + "\n";
                i++;
              }
              cardsHtml += `<div class="${itemType}">${parseBlocks(itemContent).html}</div>`;
            } else {
              i++;
            }
          }
          html += `<div class="cards">${cardsHtml}</div>`;
          continue;
        }
      }

      if (blockType === "grid") {
        if (blockAction === "start") {
          i++;
          let gridContent = "";
          while (i < lines.length) {
            const nextBlockMatch = lines[i].match(/^\[(start|end):(\w+)\]$/);
            if (
              nextBlockMatch &&
              nextBlockMatch[2] === "grid" &&
              nextBlockMatch[1] === "end"
            ) {
              i++; // consume closing [end:grid]
              break;
            }
            // Grid can contain card, box, btn, tag, nav-box elements or other content
            gridContent += lines[i] + "\n";
            i++;
          }
          html += `<div class="grid">${parseBlocks(gridContent).html}</div>`;
          continue;
        }
      }

      if (blockType === "cols") {
        if (blockAction === "start") {
          i++;
          let colsHtml = "";
          // Collect all [start:card] and [start:box] blocks
          while (i < lines.length) {
            const nextBlockMatch = lines[i].match(/^\[(start|end):(\w+)\]$/);
            if (
              nextBlockMatch &&
              nextBlockMatch[2] === "cols" &&
              nextBlockMatch[1] === "end"
            ) {
              i++; // consume closing [end:cols]
              break;
            }
            if (
              nextBlockMatch &&
              (nextBlockMatch[2] === "card" || nextBlockMatch[2] === "box") &&
              nextBlockMatch[1] === "start"
            ) {
              const itemType = nextBlockMatch[2];
              i++;
              let itemContent = "";
              while (i < lines.length) {
                const itemEndMatch = lines[i].match(/^\[(start|end):(\w+)\]$/);
                if (
                  itemEndMatch &&
                  itemEndMatch[2] === itemType &&
                  itemEndMatch[1] === "end"
                ) {
                  i++; // consume closing [end:type]
                  break;
                }
                itemContent += lines[i] + "\n";
                i++;
              }
              colsHtml += `<div class="${itemType}">${parseBlocks(itemContent).html}</div>`;
            } else {
              i++;
            }
          }
          html += `<div class="cols">${colsHtml}</div>`;
          continue;
        }
      }

      if (blockType === "columns") {
        if (blockAction === "start") {
          i++;
          let colsHtml = "";
          while (i < lines.length) {
            const nextBlockMatch = lines[i].match(/^\[(start|end):(\w+)\]$/);
            if (
              nextBlockMatch &&
              nextBlockMatch[2] === "columns" &&
              nextBlockMatch[1] === "end"
            ) {
              i++; // consume closing [end:columns]
              break;
            }
            if (
              nextBlockMatch &&
              nextBlockMatch[2] === "column" &&
              nextBlockMatch[1] === "start"
            ) {
              i++;
              let colContent = "";
              while (i < lines.length) {
                const colEndMatch = lines[i].match(/^\[(start|end):(\w+)\]$/);
                if (
                  colEndMatch &&
                  colEndMatch[2] === "column" &&
                  colEndMatch[1] === "end"
                ) {
                  i++; // consume closing [end:column]
                  break;
                }
                colContent += lines[i] + "\n";
                i++;
              }
              colsHtml += `<div class="column">${parseBlocks(colContent).html}</div>`;
            } else {
              i++;
            }
          }
          html += `<div class="columns">${colsHtml}</div>`;
          continue;
        }
      }
      continue;
    }

    // ── Headings ───────────────────────────────────────────────────────────
    const hMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (hMatch) {
      const level = hMatch[1].length;
      html += `<h${level}>${inlineMarkdown(hMatch[2])}</h${level}>\n`;
      i++;
      continue;
    }

    // ── HR ────────────────────────────────────────────────────────────────
    if (/^---+$/.test(line.trim())) {
      html += `<hr>\n`;
      i++;
      continue;
    }

    // ── Images ────────────────────────────────────────────────────────────
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      html += `<img src="${imgMatch[2]}" alt="${imgMatch[1]}">\n`;
      i++;
      continue;
    }

    // ── Unordered lists ───────────────────────────────────────────────────
    if (/^\s*[\*\-]\s/.test(line)) {
      html += "<ul>\n";
      while (i < lines.length && /^\s*[\*\-]\s/.test(lines[i])) {
        const item = lines[i].replace(/^\s*[\*\-]\s/, "");
        html += `  <li>${inlineMarkdown(item)}</li>\n`;
        i++;
      }
      html += "</ul>\n";
      continue;
    }

    // ── Blank line ────────────────────────────────────────────────────
    if (line.trim() === "") {
      i++;
      continue;
    }

    // ── Paragraph — collect consecutive non-special lines ─────────────────
    let para = "";
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !/^\[(start|end):(\w+)\]$/.test(lines[i].trim()) &&
      !/^---+$/.test(lines[i].trim()) &&
      !/^\s*[\*\-]\s/.test(lines[i]) &&
      !/^!\[/.test(lines[i].trim())
    ) {
      para += (para ? " " : "") + lines[i].trim();
      i++;
    }
    if (para) {
      html += `<p>${inlineMarkdown(para)}</p>\n`;
    }
  }

  return { html };
}

module.exports = { inlineMarkdown, parseBlocks };

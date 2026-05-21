# BlastoDB — 11ty Static Site Generator

A **Markdown-only** website builder for BlastoDB using **Eleventy (11ty)**. This allows microbiologists to maintain and update the website by editing Markdown files, without needing to write HTML.

## ✨ What Changed

- ✅ **Migrated from custom `build.js` to 11ty** — a professional, battle-tested static site generator
- ✅ **All content in Markdown** — microbiologists can edit `.md` files; no HTML required
- ✅ **Same design & functionality** — all custom elements (buttons, tags, cards, hero sections, etc.) are supported
- ✅ **Easier deployment** — works with GitHub Actions, Netlify, or any hosting platform
- ✅ **Better maintainability** — leverages a larger ecosystem instead of custom code

## 📁 Project Structure

```
blastodb/
├── content/                    ← Your pages (one .md file per page)
│   ├── index.md
│   ├── about.md
│   ├── subtypes.md
│   └── ...
├── _includes/
│   └── layouts/
│       └── base.njk            ← Main HTML template (don't edit usually)
├── assets/
│   ├── style.css               ← Website styling
│   └── main.js                 ← Mobile navigation script
├── lib/
│   └── parser.js               ← Custom markdown parser (do not edit)
├── .eleventy.js                ← 11ty configuration (do not edit usually)
├── nav.json                    ← Navigation menu configuration
└── output/                     ← Generated website (do not edit)
    ├── index.html
    ├── about.html
    └── ...
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run serve
```

This starts a local server at `http://localhost:8080` with automatic reload when you change files.

### 3. Build for Deployment

```bash
npm run build
```

This generates the final website in the `output/` folder. Upload this folder to your web server.

## ✏️ How to Add or Edit Pages

### Add a New Page

1. **Create a new `.md` file** in the `content/` folder, e.g., `content/methods.md`

2. **Add frontmatter** at the top of the file:
   ```markdown
   ---
   layout: layouts/base.njk
   title: BlastoDB — Methods
   description: Our methods for studying Blastocystis.
   ---
   ```

3. **Add your content** below the frontmatter using Markdown and custom elements (see below)

4. **Update navigation** in `nav.json`:
   ```json
   { "label": "Methods", "file": "content/methods.md" }
   ```

5. **Run `npm run serve`** — the page will appear automatically!

### Edit Existing Pages

Simply edit the corresponding `.md` file in `content/`. The changes will appear immediately in the dev server.

## 📝 Markdown & Custom Elements

### Standard Markdown

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

`inline code`

[Link text](https://example.com)

![Alt text](image.jpg)

- List item
- Another item

---  ← Horizontal line
```

### Custom Elements

#### Buttons (Primary CTA)
```markdown
[btn: Click Me -> page.html]
```

#### Tags (Highlighted Pills)
```markdown
[tag: ST1]  [tag: Human]  [tag: Animal]
```

#### Navigation Boxes (Grid Links)
```markdown
[start:grid]
[nav-box: Subtypes -> subtypes.html]
[nav-box: Protocols -> protocols.html]
[end:grid]
```

#### Cards (Side-by-side Content with Background)
```markdown
[start:card]
[tag: Category]

### Card Title

Card content here.

[Read more →](https://example.com)
[end:card]

[start:card]
### Another Card

More content.
[end:card]
```

#### Hero Section (Full-Width Banner)
```markdown
[start:hero]
# Welcome

Full-width hero content.

[btn: Get Started -> page.html]
[end:hero]
```

#### Plain Boxes (No Background)
```markdown
[start:box]
### Box Title

Box content.
[end:box]
```

#### Two-Column Layout
```markdown
[start:cols]
[start:box]
Left side content.
[end:box]

[start:box]
Right side content.
[end:box]
[end:cols]
```

## 🎨 Styling

All styles are in `assets/style.css`. You can customize:
- Colors (defined as CSS variables in `:root`)
- Fonts (Crimson Pro for headings, system fonts for UI)
- Spacing and sizing
- Responsive breakpoints

**CSS Variables** (edit in `assets/style.css`):
```css
:root {
  --accent: #2d6a4f;           /* Primary color (green) */
  --accent-dark: #1b4332;      /* Darker shade */
  --bg: #ffffff;               /* Background */
  --text: #1a1a18;             /* Text color */
  /* ... and more */
}
```

## 🔧 Navigation Configuration

Edit `nav.json` to control which pages appear in the header:

```json
{
  "site_title": "BlastoDB",
  "nav": [
    { "label": "Home", "file": "content/index.md" },
    { "label": "About", "file": "content/about.md" },
    { "label": "Subtypes", "file": "content/subtypes.md" }
  ]
}
```

The page labeled "Home" should correspond to `index.md`.

## 📦 Deployment

### GitHub Pages

1. Push your repo to GitHub
2. Create a GitHub Action (`.github/workflows/build.yml`):

```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./output
```

3. Enable GitHub Pages in your repo settings to use the `gh-pages` branch

### Netlify

1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `output`
4. Deploy!

### Other Hosting

Upload the entire `output/` folder to your web server.

## ❓ FAQ

**Q: Do I need to understand Node.js or JavaScript?**
A: No! You only need to edit Markdown files in `content/`. The rest is handled automatically.

**Q: Can I change the design?**
A: Yes! Edit `assets/style.css` to customize colors, fonts, and layout.

**Q: Can I add custom HTML?**
A: Not directly (to keep it simple). But you can add custom Markdown parsing if needed — ask a developer.

**Q: How do I add images?**
A: Use standard Markdown syntax:
```markdown
![Alt text](path/to/image.jpg)
```
Put images in the `content/` folder or use external URLs.

**Q: What if something breaks?**
A: Run `npm install` again, then `npm run serve`. If that doesn't work, check that all `.md` files have proper frontmatter with `layout: layouts/base.njk`.

## 📚 Further Reading

- **Eleventy Docs**: https://www.11ty.dev/
- **Markdown Guide**: https://www.markdownguide.org/
- **Nunjucks (Template Language)**: https://mozilla.github.io/nunjucks/

## 🤝 Contributing

To add new pages or update content, simply edit Markdown files. No coding knowledge needed!

---

**Built with ❤️ for microbiologists, by developers.**

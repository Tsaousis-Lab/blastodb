# Quick Reference Guide for BlastoDB Content Editors

BlastoDB is written in markdown. The files creating the website are stored in the **content** folder. Each file in the folder creates one web-page.

## Markdown and File Structure

### Header
Each file needs to start with a so-called YAML-header. This header contains information about the webpage:
```markdown
---
layout: layouts/base.njk
title: BlastoDB
description: A short description for search engines.
---

- *layout* defines the look of the page. For normal webpages, this is always `layout: layouts/base.njk`.
- *title* is the title of the webpage, displayed in the tab of your browser.
- *description* is a short description of the webpage, relevant for search engines.

### Markdown Syntax
Normal text can be written 
#### Headings
```markdown
# Heading 1
## Heading 2
### Heading 3
```

#### Bold & Italic
```markdown
**Bold text** and *italic text*
```

#### Lists
```markdown
- Item 1
- Item 2
- Item 3
```

### Custom Markdown Elements
On top of that, we have defined additional elements needed to style the website, and interact with it.

#### Styling Components


---
TODO: from here.
# Page Heading

Your content here...
```

---

## 🚀 Quick Commands

```bash
# Start editing (with live preview at localhost:8080)
npm run serve

# Build for deployment
npm run build

# Just watch for changes (no server)
npm run watch
```

---

## ✍️ Common Elements

### Buttons
```markdown
[btn: Click Here -> page.html]
```

### Tags
```markdown
[tag: Important] [tag: Research] [tag: Protocol]
```

### Links
```markdown
[Click here](https://example.com)
```

### Images
```markdown
![Image alt text](image.jpg)
```



---

## 🎨 Layout Elements

### Card (with background)
```markdown
[start:card]
[tag: Category]

### Card Title

Card content here.

[Read more →](url)
[end:card]
```

### Hero Section (full-width banner)
```markdown
[start:hero]

# Big Title

Content in hero

[btn: Action -> page.html]

[end:hero]
```

### Two Columns Side by Side
```markdown
[start:cols]

[start:box]
Left column content
[end:box]

[start:box]
Right column content
[end:box]

[end:cols]
```

### Grid of Navigation Boxes
```markdown
[start:grid]
[nav-box: Label 1 -> page1.html]
[nav-box: Label 2 -> page2.html]
[nav-box: Label 3 -> page3.html]
[end:grid]
```

---

## 📋 Adding a New Page

1. Create file: `content/mypage.md`
2. Add frontmatter (see top of this guide)
3. Add content
4. Edit `nav.json` to add menu item:
   ```json
   { "label": "My Page", "file": "content/mypage.md" }
   ```
5. Done! Visit `http://localhost:8080/mypage.html`

---

## 🔧 Editing Navigation

Edit `nav.json` to change the header menu:

```json
{
  "site_title": "BlastoDB",
  "nav": [
    { "label": "Home", "file": "content/index.md" },
    { "label": "About", "file": "content/about.md" },
    { "label": "Subtypes", "file": "content/subtypes.md" },
    { "label": "Lab Protocols", "file": "content/protocols.md" }
  ]
}
```

---

## 🎨 Customizing Colors

Edit `assets/style.css` and find the `:root` section:

```css
:root {
  --accent: #2d6a4f;           /* Main green color */
  --accent-dark: #1b4332;      /* Darker green */
  --text: #1a1a18;             /* Text color */
  --bg: #ffffff;               /* Background */
  /* ... more colors ... */
}
```

---

## ❓ Common Questions

**Q: How do I add more pages?**
A: Create a `.md` file in `content/`, then add it to `nav.json`

**Q: Can I use HTML?**
A: No (by design). Use Markdown and custom elements instead.

**Q: How do I add images?**
A: Use `![alt text](image.jpg)` or use external URLs

**Q: Why isn't my page showing in the menu?**
A: Make sure it's listed in `nav.json`

**Q: How do I fix a broken page?**
A: Check the frontmatter — it needs all 3 lines (layout, title, description)

---

## 📚 Learn More

For detailed documentation, see:
- `README.md` — Project overview
- `README_11ty.md` — Complete guide
- `MIGRATION.md` — Technical migration details

---

**Happy writing! 📝**

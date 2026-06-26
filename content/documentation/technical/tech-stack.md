---
layout: layouts/documentation.njk
title: Tech Stack
description: The tools BlastoDB is built with.
---

[hero: text-align:center]

<h-hero>Tech Stack</h-hero>

BlastoDB is a static site. That means, content is built to plain HTML at deploy time and served from GitHub
Pages. No content can dynamically be loaded to BlastoDB.

[:hero]



# Build & Content

BlastoDB is written in markdown, build with the static site generator eleventy. Content editing is handles by the Sveltia CMS.

| Tool | Version | Role |
|---|---|---|
| [Eleventy](https://www.11ty.dev/) | ^2.0 | Static site generator; config in `.eleventy.js`. |
| Nunjucks | (via Eleventy) | Template engine for layouts and cards in `_includes/`. |
| markdown-it | ^13 | Markdown → HTML; also hosts the custom `[hero]`/`[grid]`/`[collector]` shortcodes. |
| js-yaml | ^4 | Parses `content/admin/config.yml` and YAML data files. |
| [Sveltia CMS](https://github.com/sveltia/sveltia-cms) | ^0.162 | Git-backed admin UI at `/admin/` (see [Sveltia CMS](/documentation/technical/sveltia-cms/)). |

# markdown-it Plugins

| Plugin | Adds |
|---|---|
| markdown-it-attrs | `{.class}` / attribute syntax |
| markdown-it-footnote | Footnotes |
| markdown-it-mark | `==highlight==` |
| markdown-it-sub / markdown-it-sup | Subscript / superscript |
| markdown-it-task-lists | Checkbox lists |
| markdown-it-emoji | `:emoji:` |

# Hosting

GitHub Actions builds the site and deploys it to **GitHub Pages**; the live site is
[www.blastodb.com](https://www.blastodb.com). See [Deployment](/documentation/technical/deployment/).

→ [Project Structure](/documentation/technical/project-structure/) &nbsp;|&nbsp; [Sveltia CMS &amp; the Collector](/documentation/technical/sveltia-cms/)


---

[box: text-align:center]

[btn: <- Back to Technical Docs -> /documentation/technical/]

[:box]

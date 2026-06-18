---
layout: layouts/documentation.njk
title: Markdown Cheat Sheet
description: Cheat sheet for markdown syntax used across BlastoDB.
---

[hero: text-align:center]

<h-hero>Markdown Cheat Sheet</h-hero>

Here you find a list of the syntax and commands used for BlastoDB.<br>This includes basic markdown syntax as well as the custom elements added.

[:hero]

# Basic Markdown Syntax

Here is a short cheet-sheet for the markdown syntax that works with the parser of BlastoDB. It is based on the one cheat-sheet found on [markdownguide.org](https://www.markdownguide.org/cheat-sheet/), but amendet by some specific BlastoDB Features.


<table>
  <thead>
    <tr><th>Element</th><th>Syntax</th></tr>
  </thead>
  <tbody>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#headings">Heading</a></td><td><code># H1</code><br><code>## H2</code><br><code>### ...</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#text-formatting">Bold</a></td><td><code>**bold text**</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#text-formatting">Italic</a></td><td><code>*italic text*</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#text-formatting">Highlight</a></td><td><code>==highlighted text==</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#text-formatting">Strikethrough</a></td><td><code>~~The world is flat~~</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#text-formatting">Subscript</a></td><td><code>H~2~O</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#text-formatting">Superscript</a></td><td><code>X^2^</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#blockquote">Blockquote</a></td><td><code>&gt; quoted text</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#ordered-lists">Ordered List</a></td><td><code>1. Item one</code><br><code>2. Item two</code><br><code>3. ...</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#unordered-lists">Unordered List</a></td><td><code>- Item one</code><br><code>- Item two</code><br><code>- ...</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#task-lists">Task List</a></td><td><code>- [ ] unchecked item</code><br><code>- [x] checked item</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#inline-code">Code (inline)</a></td><td><code>`code`</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#code-blocks">Code Block</a></td><td><code>```language</code><br><code>code</code><br><code>```</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#horizontal-rules">Horizontal Rule</a></td><td><code>---</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#links">Link</a></td><td><code>&#91;title&#93;(https://example.com)</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#images">Image</a></td><td><code>!&#91;alt text&#93;(image.jpg)</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#tables">Table</a></td><td><code>| Heading | Heading |</code><br><code>|---|---|</code><br><code>| Row 1 | Row 1 |</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#footnotes">Footnote</a></td><td><code>Text&#91;^1&#93;.</code><br><code>&#91;^1&#93;: This is the footnote</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#linking_to_a_headline">Heading ID</a></td><td><code>### My Heading &#123;#custom-id&#125;</code></td></tr>
  </tbody>
</table>

The BlastoDB markdown-parser also supports HTML syntax. Here are a few more useful things you can do with that.
<table>
  <thead>
    <tr><th>Element</th><th>Syntax</th></tr>
  </thead>
  <tbody>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#line-breaks">Linebreak</a></td><td><code>&lt;br&gt;</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#links-new-tab">Link that opens a new Tab</a></td><td><code>&lt;a href="https://example-link.co.uk" target="_blank"&gt;title&lt;/a&gt;</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#text-formatting">Underline</a></td><td><code>&lt;ins&gt;underlined text&lt;/ins&gt;</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#headings">Hero Headline</a></td><td><code>&lt;h-hero&gt;Title&lt;/h-hero&gt;</code></td></tr>
    <tr><td><a href="/documentation/markdown/markdown_syntax/#indentations">Indentations</a></td><td><code>&amp;nbsp;</code></td></tr>
  </tbody>
</table>






# Custom Elements

Here you find a list of all the custom elements added to layout content on the website, as well as make it interactive.
Read the articles about each element for more information.

<table>
  <thead>
    <tr><th>Element</th><th>Syntax</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>Tag</td>
      <td><code>&#91;tag:tag_name&#93;</code></td>
      <td>Visual element to display tags.</td>
    </tr>
    <tr>
      <td>Button</td>
      <td><code>&#91;btn:displayed_text -> page.html&#93;</code></td>
      <td>Needs a displayed text and a link to another page.</td>
    </tr>
    <tr>
      <td>Box</td>
      <td><code>&#91;start:box&#93;</code><br>Content<br><code>&#91;end:box&#93;</code></td>
      <td>Groups content inside. Can be used for styling.</td>
    </tr>
    <tr>
      <td>Card</td>
      <td><code>&#91;start:card&#93;</code><br>Content<br><code>&#91;end:card&#93;</code></td>
      <td>Displays the content inside in a colored box.</td>
    </tr>
    <tr>
      <td>Hero</td>
      <td><code>&#91;start:hero&#93;</code><br>Content<br><code>&#91;end:hero&#93;</code></td>
      <td>A full-width box. Displays content like a Card.</td>
    </tr>
    <tr>
      <td>Cols</td>
      <td><code>&#91;start:cols&#93;</code><br>Content<br><code>&#91;end:cols&#93;</code></td>
      <td>Arranges content in columns. Resizes automatically for mobile.</td>
    </tr>
    <tr>
      <td>Grid</td>
      <td><code>&#91;start:grid&#93;</code><br>Content<br><code>&#91;end:grid&#93;</code></td>
      <td>Arranges content in a grid. Resizes automatically for mobile.</td>
    </tr>
    <tr>
      <td>Collector</td>
      <td><code>&#91;collector -> collection-name; tags:true; search:true; arrange:cols&#93;</code></td>
      <td>Reads all files in a collection and dynamically displays them as cards.</td>
    </tr>
  </tbody>
</table>

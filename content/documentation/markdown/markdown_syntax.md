---
layout: layouts/documentation.njk
title: BlastoDB — Markdown Cheat Sheet
description: Introduction to markdown to edit the content on BlastoDB.
---


[hero: text-align:center]

<h-hero>Markdown Syntax</h-hero>

[:hero]


[cols:]
[box:]
# Overview

Here you find an overview of the most useful elements of the markdown syntax for BlastoDB, including examples.

If you only want to quickly check the syntax check out the [markdown cheat-sheet](https://www.markdownguide.org/cheat-sheet/).

We also extendet the markdown syntax by costom components, you can learn more about that [here](/documentation/markdown/custom_components/).

[:box]

[box:]
- [Headings](#headings)
- [Text Formatting](#text-formatting)
- [Lists](#lists)
  - [Unordered Lists](#unordered-lists)
  - [Ordered Lists](#ordered-lists)
  - [Task Lists](#task-lists)
- [Horizontal Rules](#horizontal-rules)
- [Links](#links)
  - [Links to External Websites](#links-to-external-websites)
  - [Links to BlastoDB](#links-to-blastodb)
  - [Links that open a new Tab](#links-new-tab)
  - [Linking to a Headline](#linking-to-a-headline)
- [Paragraphs](#paragraphs)
- [Line Breaks](#line-breaks)
- [Indentations](#indentations)
- [Blockquote](#blockquote)
- [Tables](#tables)
- [Code](#code)
  - [Inline Code](#inline-code)
  - [Code Blocks](#code-blocks)
- [Footnotes](#footnotes)
- [Example of a Markdown Text](#example)
[:box]
[:cols]

---

# Heading {#headings}

You can create headlines with `#`:
```markdown
# This is an H1 Headline
## This is an H2 Headline
### This is an H3 Headline
#### This is an H4 Headline
##### ...
```

We also defined a heading that is ridiculusly large, to be used with the hero at the begining of a page:
```markdown
<h-hero>This is a Hero Headline</hero>
```

View how they will be rendered in [the style guide](/documentation/styleguide/typography/#headings).

# Text Formatting {#text-formatting}
You can easily format text, for example to be **bold** or *italic*.

Here are the formating options:
- *italic*: `*This text is italic*, this text is not` -> *This text is italic*, this text is not
- **bold**: `**This text is bold**, this text is not` -> **This text is bold**, this text is not
- ~~strike through~~:`~~The world is flat.~~ We know that the world is round` -> ~~The world is flat.~~ We know that the world is round.
- ==highlighted==: `==This text is highlighted==, this is not` -> ==This text is highlighted==, this is not
Note that there must not be a space between the * and the next word, otherwise it will not pe rendered properly.

You can also put text in~subscript~ or in^superscript^:
- subscript: `H~2~O` -> H~2~O
- superscript: `X^2^` -> X^2^

You can also combine the formatting:
- `***italic and bold^with superscript^***`-> ***italic and bold^with superscript^***
- `~~**bold and crossed out**~~`-> ~~**bold and crossed out**~~
- `==*italic~with subscript~ and highlighted*==`-> ==*italic~with subscript~ and highlighted*==
- Or any other combination

There is no command for <ins>underlining</ins> text, as underlined text is usually associated with links. If you want to underline text anyway, you can do that with this HTML code:
- `<ins>this text is underlined</ins>`-> <ins>this text is underlined</ins>
- `underlining be ~~<ins>crossed out</ins>~~^`-> underlining be ~~<ins>crossed out</ins>~~
- `underlining be <ins>*italic*</ins>^`-> *underlining be <ins>*italic*</ins>*
However, combining it with subscript and superscript is a little fineky and should be avioded (it also does not render so well):
- `underlining be used in <ins>^superscript^</ins>, but it looks weird`-> underlining be used in <ins>^superscript^</ins>, but it looks weird
- `underlining be used in <ins>~subscript~</ins>, but it looks weird`-> underlining be used in <ins>~subscript~</ins>, but it does not render well

# Lists {#lists}

## Unordered Lists {#unordered-lists}
You can create unordered lists with a `-` or a `*`:
```markdown
- first item
- second item
- third item
- ...
```
- first item
- second item
- third item
...

Or you can use a `*`:
```markdown
* first item
* second item
* third item
* ...
```
* first item
* second item
* third item
* ...

## Ordered Lists {#ordered-lists}
You can create ordered lists with `1. `, `2. `, and so on:
```markdown
1. first item
2. second item
3. third item
4. ...
```
1. first item
2. second item
3. third item
4. ...


## Task Lists {#task-lists}
You can also create a task list with `- [ ] :
```markdown
- [ ] This is an unchecked item
- [x] This is a checked item
- [ ] ...
```
- [ ] This is an unchecked item
- [x] This is a checked item
- [ ] ...
Users on BlastoDB can not interact with the list. If an item is checked or unchecked can only be read by the text.


# Horizontal Rules {#horizontal-rules}

You can create horizontal rules to separate content with `---`. Make shure that you leave one line of space between the last paragraph and the horizontal rule. Also, there must be no other characters in the same line as the horizontal rule.
```markdown
Here is some content.

---
Here is other content that I wand to be separated.
```
Here is some content.

---
Here is other content that I wand to be separated.

# Links {#links}

## Links to External Websites {#links-to-external-websites}
You can create a [link](https://www.blastodb.com), for example to the website uf the University of Kent:
```markdown
You can find the website of the university of kent [here](https://www.kent.ac.uk/).
```
You can find the website of the university of kent [here](https://www.kent.ac.uk/).

## Links to BlastoDB {#links-to-blastodb}
If you want to link to a webpage within BlastoDB, then it is recommendet that you do not use the full web address, but the relative address of the page. Essentially, yoh leave out the `https://www.blastodb.com`, and directly past the link of the sub-page. If you want to link to the Subtypes page, you would write: ~~https://www.blastodb.com~~/subtypes/
```markdown
You can find info about the subtypes of Blastocystis [here](/subtypes/).
```
You can find info about the subtypes of Blastocystis [here](/subtypes/).

If you want to link to the homepage, you can do that with `[BlastoDB](/)` -> [BlastoDB](/).

## Links that open a new Tab {#links-new-tab}
If you want to create a link that opens a new tab in the browser, you need to use HTML code:
```HTML
This <a href="https://www.kent.ac.uk/" target="_blank">link</a> opens a new Tab.
```
This <a href="https://www.kent.ac.uk/" target="_blank">link</a> opens a new Tab.

Similarly, you can link internaly to websites of BlastoDB with:
```HTML
This opens the <a href="/subtypes/" target="_blank">subtypes</a> in a new Tab.
```
This opens the <a href="/subtypes/" target="_blank">subtypes</a> in a new Tab.

## Linking to a Headline {#linking-to-a-headline}
Instead of linking to a webpage, you can also link to a headline. For this, you need to add an ID to the headline like this:

```markdown
# Links {#links}
```

Now, you can link to the headline of a page by adding the ID to the link:
- `[Explanation of Links](/documentation/markdown/markdown_syntax/#links)` -> [Explanation of Links](/documentation/markdown/markdown_syntax/#links)
- `<a href="/documentation/markdown/markdown_syntax/#links" target="_blank">Works also with this</a>` -> <a href="/documentation/markdown/markdown_syntax/#links" target="_blank">Works also with this</a>

# Images {#images}
You can render images like this: `![description text if image can't be loaded](image.png)`
As an input, you can use:
- A link to an image (for example an image of Tasos): `![Tasos](https://media.www.kent.ac.uk/se/2569/tsaousis_400x400_inline.webp)`
- Or [upload an image with the CMS](TODO:link). These are always saved in `/assets/uploads/`, so you can link to them with `![Tasos](/assets/uploads//tsaousis_400x400_inline.webp)`

![Tasos](https://media.www.kent.ac.uk/se/2569/tsaousis_400x400_inline.webp)

Please make shure you have the rights to the image you want to display on the website!
# Paragraphs {#paragraphs}

Add a blank line to create a paragraph between two lines of text:
```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

# Line Breaks {#line-breaks}
You can also add `<br>` to break the line. You can add multiple in a row to create multiple blank lines:
```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br><br><br>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br><br><br>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

# Indentations {#indentations}
You can add a space with `&nbsp;`. Adding multiple together creates indentations:
```markdown
This text is not indented.

&nbsp;&nbsp;&nbsp;This text is indented.
```
This text is not indented.

&nbsp;&nbsp;&nbsp;This text is indented.

# Blockquote {#blockquote}

You can create a blockquote using:
```markdown
This is a normal text
> This is a quote.<br>With a second line, normal linebreaks do not work here!
```
> This is a quote<br>With a second line, normal linebreaks do not work here!

# Tables {#tables}

You can add tables in markdown. However, they are a bit tricky to write in free-form text. We recomend using a [markdown table generator](https://www.tablesgenerator.com/markdown_tables).
```markdown
| Heading | Heading |
|---|---|
| Row 1 | Row 1 |
```
| Heading | Heading |
|---|---|
| Row 1 | Row 1 |

# Code {#code}

## Inline Code {#inline-code}

If you enclose a word or a phrase in backticks (`), then they will be rendered as code:

```markdown
This phrase contains a `code statement`.
```
This phrase contains a `code statement`.

## Code Blocks {#code-blocks}

For multi-line code, wrap the block in triple backticks. You can add a language label after the opening backticks:

````markdown
```markdown
| Heading | Heading |
|---|---|
| Row 1 | Row 1 |
```
````

```markdown
| Heading | Heading |
|---|---|
| Row 1 | Row 1 |
```

The language label (`python`, `markdown`, `HTML`, etc.) does nothing here and can be left out.


# Footnotes {#footnotes}
You can add footnotes. These will automatically be rendered at the bottom of the page, no matter where you put the description in the file.
```markdown
This is a text[^1].
This is some more Text[^2].

[^1]: First Footnote.
[^2]: Second Footnote.
```
This is a text[^1].
This is some more Text[^2].

[^1]: First Footnote.
[^2]: Second Footnote.




# Example of a Markdown Text {#example}

```markdown
### Small Markdown Example:

With this *markdown* text I wand to quickly **highlight** some of the features of the language.
You can create **bold** or *italic* text, [links to websites](https://www.blastodb.com) and much more:
1. Numbered Lists
2. Unnumbered Lists (with a "-" instead of the number)
3. Headlines (starting with "#")
4. And even images!

```
### Small Markdown Example:

With this *markdown* text I wand to quickly **highlight** some of the features of the language.
You can create **bold** or *italic* text, [links to websites](https://www.blastodb.com) and much more:
1. Numbered Lists
2. Unnumbered Lists (with a "-" instead of the number)
3. Headlines (starting with "#")
4. And even images

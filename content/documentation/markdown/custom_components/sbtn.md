---
layout: layouts/documentation.njk
title: BlastoDB — Selector Button
description: A dropdown button that reveals a list of links when clicked.
---

[hero: text-align:center]

<h-hero>Selector Button</h-hero>

An interactive dropdown button that reveals a list of links when clicked.

[:hero]

[btn: ← Custom Components -> /documentation/markdown/custom_components/]

## What it does

The Selector Button shows a single button that opens a dropdown menu with multiple links. Use it when you want to offer several related navigation options in one compact element — for example different file formats, protocol variants, or related pages.

## Syntax

```markdown
[sbtn: Button Label -> [/url-1/, /url-2/, /url-3/]]
```

Provide a comma-separated list of URLs inside square brackets after ` -> `. URLs can be internal paths or full external URLs.

## Example

```markdown
[sbtn: Browse Data -> [/datasets/, /subtypes/, /lab-protocols/]]
```

[sbtn: Browse Data -> [/datasets/, /subtypes/, /lab-protocols/]]

The arrow rotates when the menu opens. Clicking anywhere outside the button closes it.

## Links

The same URL types as `[btn:]` are supported. See the [Button](/documentation/markdown/custom_components/btn/) page for details.

---
[box: text-align:center]
[btn: ← Back to Custom Components -> /documentation/markdown/custom_components/]
[:box]

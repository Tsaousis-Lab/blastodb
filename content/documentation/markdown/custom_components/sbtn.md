---
layout: layouts/documentation.njk
title: BlastoDB — Selector Button
description: A dropdown button that reveals a list of links when clicked.
---

[hero: text-align:center]

<h-hero>Selector Button</h-hero>

An interactive dropdown button that reveals a list of links when clicked.

- Use `[sbtn:]` only when all destinations share the same logical action (e.g. different file formats of the same dataset) — the label should make sense for all options at once
- For a single destination, use `[btn:]` instead
- Not sure whether to use a selector button, a normal button, or a link? See the [styleguide on links and buttons](/documentation/styleguide/components/#links--buttons)



[:hero]

[btn: ← Custom Components -> /documentation/markdown/custom_components/]

# What it does

The Selector Button shows a single button that opens a dropdown menu with multiple links. Use it when you want to offer several related navigation options in one compact element — for example different file formats, protocol variants, or related pages.

# Syntax

```markdown
[sbtn: Button Label -> [/url-1/, /url-2/, /url-3/]]
```

Provide a comma-separated list of URLs inside square brackets after ` -> `. URLs can be internal paths or full external URLs.

# Example

```markdown
[sbtn: Browse Data -> [/datasets/, /subtypes/, /lab-protocols/]]
```

[sbtn: Browse Data -> [/datasets/, /subtypes/, /lab-protocols/]]

The arrow rotates when the menu opens. Clicking anywhere outside the button closes it.

# Links

The same URL types as `[btn:]` are supported. See the [Button](/documentation/markdown/custom_components/btn/) page for details.

Selector buttons are designed to only be used with internal links (see the [styleguide](/documentation/styleguide/components/#links--buttons)). Also, consider that all links in the selector button should share the same logical action (e.G. linking to web-pages, or linking to different subtypes).

---
[box: text-align:center]
[btn: ← Back to Custom Components -> /documentation/markdown/custom_components/]
[:box]

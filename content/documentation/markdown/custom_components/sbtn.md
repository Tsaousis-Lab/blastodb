---
layout: layouts/documentation.njk
title: Selector Button
description: A dropdown button that reveals a list of links when clicked.
---

[hero: text-align:center]

<h-hero>Selector Button</h-hero>

The Selector Button a dropdown menu with multiple links. Use it when you want to link to multiple destination with the same locical action (e.G. different fule formats of the same dataset). Should be used for internal links (see the [styleguide on links and buttons](/documentation/styleguide/components/#links--buttons)).



[:hero]


# Syntax

```markdown
[sbtn: Button Label -> [Title 1 -> /url-1/, Title 2 -> /url-2/, Title 3 -> /url-3/]]
```

For a full explanation of how **urls/links** work see the [markdown syntax guide](/documentation/markdown/markdown_syntax/#links).

Provide a comma-separated list of `Title -> url` pairs inside square brackets after ` -> `, using the same `Label -> url` pattern as `[btn:]`. Each option **must** have its own title — a bare URL with no title is not valid and will be skipped at build time. URLs can be internal paths or full external URLs.

# Example

```markdown
[sbtn: Browse Data -> [Datasets -> /datasets/, Subtypes -> /subtypes/, Lab Protocols -> /lab-protocols/]]
```

[sbtn: Browse Data -> [Datasets -> /datasets/, Subtypes -> /subtypes/, Lab Protocols -> /lab-protocols/]]

The arrow rotates when the menu opens. Clicking anywhere outside the button closes it.

# Links

The same URL types as `[btn:]` are supported. See the [Button](/documentation/markdown/custom_components/btn/) page for details.

Selector buttons are designed to only be used with internal links (see the [styleguide](/documentation/styleguide/components/#links--buttons)). Also, consider that all links in the selector button should share the same logical action (e.G. linking to web-pages, or linking to different subtypes).

---
[box: text-align:center]
[btn: ← Back to Custom Components -> /documentation/markdown/custom_components/]
[:box]

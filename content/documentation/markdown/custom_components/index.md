---
layout: layouts/documentation.njk
title: Custom Components
description: Overview of the custom markdown components available in BlastoDB.
---

[hero: text-align:center]

<h-hero>Custom Markdown Components</h-hero>

BlastoDB extends the standard markdown syntax with custom components for layout, interaction, and content loading. Here you find an overview of all available components.

[:hero]

## Layout Components

[grid: cols:3]

[card:]
### Hero
A full-width banner for page introductions. Use it once per page at the top with an `<h-hero>` title.

[btn: Hero docs -> /documentation/markdown/custom_components/hero/]
[:card]

[card:]
### Box
A minimal flex container. The primary building block inside columns and grids.

[btn: Box docs -> /documentation/markdown/custom_components/box/]
[:card]

[card:]
### Card
A styled container with background and shadow. Use inside a grid for navigation or feature cards.

[btn: Card docs -> /documentation/markdown/custom_components/card/]
[:card]

[card:]
### Columns
A two-column equal-width layout that collapses to one column on mobile.

[btn: Columns docs -> /documentation/markdown/custom_components/cols/]
[:card]

[card:]
### Grid
A responsive multi-column grid. Supports fixed column counts with `cols:2`–`cols:5`.

[btn: Grid docs -> /documentation/markdown/custom_components/grid/]
[:card]

[:grid]

---

## Interaction & Display Components

[grid: cols:3]

[card:]
### Button
A styled link button for calls to action and navigation.

[btn: Button docs -> /documentation/markdown/custom_components/btn/]
[:card]

[card:]
### Selector Button
A dropdown button that reveals a list of links when clicked.

[btn: Selector Button docs -> /documentation/markdown/custom_components/sbtn/]
[:card]

[card:]
### Tag
An inline metadata pill for subtypes, data types, and other short labels.

[btn: Tag docs -> /documentation/markdown/custom_components/tag/]
[:card]

[:grid]

---

## Content Loading

[grid: cols:3]

[card:]
### Collector
Renders all entries from a CMS collection as filterable, searchable cards. Supports search, sort, filters, prefilters, and custom card templates.

[btn: Collector docs -> /documentation/markdown/custom_components/collector/]
[:card]

[:grid]

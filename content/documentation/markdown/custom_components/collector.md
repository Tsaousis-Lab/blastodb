---
layout: layouts/documentation.njk
title: Collector Component
description: Filterable, searchable card list drawn from a Sveltia CMS collection.
---

[hero: text-align:center]

<h-hero>Collector</h-hero>

Renders all entries from a CMS collection as interactive cards with built-in search, filters, and sorting.

[:hero]

[btn: ← Custom Components -> /documentation/markdown/custom_components/]

## What it does

The Collector reads a collection defined in `content/admin/config.yml` and displays its entries as cards at build time. On the client side, JavaScript handles search, filtering, and sorting without a page reload. Cards are rendered using Nunjucks templates in `_includes/collector-cards/`.

## Basic syntax

```markdown
[collector -> collection-name]
```

This renders all entries in `collection-name` using the default card template, with no search, sort, or filters.

## Full syntax

```markdown
[collector -> collection-name; search:[field1,field2]; sort:[fieldA,fieldB]; filters:[Label->[field]]; prefilter:[field=value]; card-template:template.njk; arrange:cols; display_items:12; clickable:false]
```

## Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `search` | field list | none | Fields included in the search index. Omit to disable search. |
| `sort` | field list | none | Fields shown in the sort dropdown. Omit to disable sorting. |
| `filters` | filter groups | none | One or more filter buttons. See below. |
| `prefilter` | expression | none | Statically narrow the item set. Users cannot undo this. See below. |
| `card-template` | filename | auto | Override the Nunjucks template. File must be in `_includes/collector-cards/`. |
| `arrange` | `rows` / `cols` / `grid` | `rows` | Card layout mode. |
| `display_items` | number or `all` | `all` | Limit the number of cards shown. |
| `clickable` | `true` / `false` | `true` | If `false`, cards show no hover effects and are not clickable. |

## Filters syntax

```markdown
filters:[Label->[field1,field2], OtherLabel->[field3]]
```

Each label becomes a separate filter button. A label can target one or more fields. Selecting a value in one filter narrows the options shown in the others.

**Example — two separate filter buttons:**
```markdown
filters:[Subtypes->[sub_types],Countries->[country]]
```

**Example — one combined filter button:**
```markdown
filters:[Filters->[sub_types,country]]
```

## Prefilter syntax

A prefilter hides items permanently — users cannot override it with the interactive controls.

**Single condition:**
```markdown
prefilter:[country=Germany]
```

**AND — all conditions must match:**
```markdown
prefilter:[country=Germany AND sub_types=ST1]
```

**OR — any condition may match:**
```markdown
prefilter:[country=Germany OR country=USA]
```

**Mixed AND/OR** — AND binds tighter than OR:
```markdown
prefilter:[country=Germany AND sub_types=ST1 OR country=USA AND sub_types=ST1]
```
This means `(country=Germany AND sub_types=ST1) OR (country=USA AND sub_types=ST1)`.

**Values with spaces — wrap in double quotes:**
```markdown
prefilter:[country="United States"]
```

Matching is **case-insensitive**. For array fields (e.g. `sub_types`), a condition matches if **any** element equals the value. Field names support dot notation for nested frontmatter (e.g. `contacts.country`).

## Real-world examples

### All publications with search and sort
```markdown
[collector -> bibliography; search:[authors,date,journal,title]; sort:[date,title]; filters:[Journal->[journal]]]
```

### Datasets with full controls
```markdown
[collector -> datasets; search:[title,data_types,sub_types,country,publication_ref]; sort:[date,title]; filters:[Data Types->[data_types],Subtypes->[sub_types],Countries->[country]]]
```

### Only ST1 datasets
```markdown
[collector -> datasets; search:[title,data_types,country]; sort:[date,title]; prefilter:[sub_types=ST1]]
```

### Lab protocols as rows
```markdown
[collector -> lab-protocols; search:[title,description,shortDescription,tags]; sort:[date,title]; filters:[Tags->[tags]]; arrange:rows; display_items:all]
```

### Minimal — no controls
```markdown
[collector -> news; arrange:cols]
```

### Non-clickable cards
```markdown
[collector -> bibliography; search:[authors,title]; sort:[date]; clickable:false]
```

## Card templates

Cards are rendered with Nunjucks templates in `_includes/collector-cards/`. The template is resolved in this order:

1. `card-template:` parameter in the shortcode
2. `collector.template` in `content/admin/config.yml` for the collection
3. A file named `{collection-name}.njk` in `_includes/collector-cards/`
4. `default.njk` — fallback

The `.njk` extension in `card-template:` is optional.



---
[box: text-align:center]
[btn: ← Back to Custom Components -> /documentation/markdown/custom_components/]
[:box]

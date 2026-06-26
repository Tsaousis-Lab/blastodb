---
layout: layouts/documentation.njk
title: Sveltia CMS & the Collector
description: How the CMS stores content and how that content reaches the collector listings.
---

[hero: text-align:center]

<h-hero>Sveltia CMS &amp; the Collector</h-hero>

[Sveltia CMS](https://github.com/sveltia/sveltia-cms) is a git-backed admin UI.

[:hero]

# Sveltia

Sveltia is a CMS for static websites hosted on GitHub. It has no database, data is stored in plain files (.md, .yaml, .json) directly on GitHub.
When saving content, it is stored in the *staging* branch, from which the build of the website is triggered once a day [see deployment](/documentation/technical/deployment/) saving an entry commits the (updated) file to the repository.

# Defining Collections

A collection is declared in `content/admin/config.yml`. That single block is both:

- the **editor form** Sveltia renders, and
- the schema the build reads to produce listing pages and cards.

Sveltia writes entries into `content/data/<collection>/` — one `.md` per item for folder collections
(datasets, blog, biobank, …), or a `.json`/`.yaml` file for file collections (publications,
research labs, …).

# Example: Datastructure of *Datasets*

The `datasets` collection in `config.yml` defines the fields (title, link to source, related
publications, datatypes, subtypes, …). Saving the form writes a file like
`content/data/datasets/<slug>.md`:

```yaml
---
layout: layouts/dataset-page.njk
key: b3d49f04-67d8-468c-93f5-817fe75c11e6 
title: Blastocystis hominis 18S rRNA gene
link_to_source: https://www.ncbi.nlm.nih.gov/nuccore/AB070989
publication_date: '2023'
datatypes: [18s]
subtypes: [subtype-1]
related_publications: [arisue2003]
---

Free-text description in markdown.
```

The frontmatter keys are the field `name`s from `config.yml`. `key` is a hidden UUID so other
collections can link to this entry without breaking when it is renamed. The file builds to its own
page at `/data/datasets/<slug>/` via `layouts/dataset-page.njk`.

See the editor walkthrough in [Editor Guide: Datasets](/documentation/editors_guide/datasets/).

# Collector Component and Sveltia

The `[collector -> …]` shortcode (e.g. on `/datasets/`) and the CMS read the same `config.yml`,
so a collection only has to be defined once. At build time (`.eleventy.js`):

1. `getCmsCollections()` reads `config.yml`.
2. `getItemsFromCollection()` reads each entry file, parses frontmatter, and pre-renders a card with
   `renderCollectorCard()` using the matching template in `_includes/collector-cards/`.
3. `addGlobalData("collectorData")` pre-renders every item into a global object.
4. The `[collector -> name; …]` markdown shortcode emits `<div class="collector" …>`, which
   `assets/main.js` fills client-side with the pre-rendered cards, plus search/filter/sort.

So: **define in `config.yml` → Sveltia writes a file → the build renders cards → the collector lists
them.** Adding a new collection means adding a `config.yml` block, a card template in
`_includes/collector-cards/`, and a page with a `[collector]` shortcode.

The page-level `[collector -> …]` options (search, filters, sort, layout, card-template override,
prefilter) are documented in the [Collector Component reference](/documentation/markdown/custom_components/collector/).

## What the collector reads from `config.yml`

A collection can carry a `collector:` block. The build reads exactly two keys from it:

```yaml
collector:
  template: biobank-card.njk        # card template in _includes/collector-cards/, used to pre-render each entry
  search_fields: [title, tags, country, body]   # frontmatter fields the collector's search box matches
```

- `template` — the default card template for this collection's entries.
- `search_fields` — the fields searched by the collector's search box.

Everything else (filtering, sorting, layout, clickable, prefilter) is **not** in `config.yml`; it is
set per page in the `[collector -> …]` shortcode.

→ [Collector shortcode reference](/documentation/markdown/custom_components/collector/) &nbsp;|&nbsp; [Project Structure](/documentation/technical/project-structure/)

# Editing config.yml

`config.yml` holds a top-level `collections:` list. Each collection has a `name`, a `label`, either a
`folder:` (one file per entry) or `files:` (a single JSON/YAML file), `create: true` to allow new
entries, a `fields:` list (the editor form), and an optional `collector:` block. For the full set of
collection options and field `widget` types, see the
[Sveltia CMS documentation](https://github.com/sveltia/sveltia-cms#readme).

## Example collection

The `lab_protocols` collection from `content/admin/config.yml` — a small folder collection:

```yaml
- name: lab_protocols                 # collection id (used in [collector -> lab_protocols])
  label: Lab Protocols                # shown in the CMS sidebar
  folder: content/data/lab_protocols  # one .md file per entry
  create: true                        # editors may add new entries
  slug: "{{slug}}"
  collector:                          # optional — sits at the collection level, beside fields:
    template: lab_protocols.njk       #   card template in _includes/collector-cards/
    search_fields: [title, body]      #   fields the search box matches
  fields:
    - { name: layout, widget: hidden, default: layouts/lab-protocol.njk }
    - { label: Key, name: key, widget: hidden, default: "{{uuid}}" }  # stable UUID
    - { label: Title, name: title, widget: string }
    - label: Related Publications     # relation: stores another collection's key
      name: related_publications
      widget: relation
      collection: publications
      value_field: "publications.*.key"
      display_fields: ["publications.*.title"]
      multiple: true
    - { label: Protocol, name: body, widget: markdown }
```

The `collector:` block is optional and lives at the collection level (here, between `slug:` and
`fields:`). Omit it to fall back to the default card template.

## Add a new collection

1. Add a collection block to `config.yml` — `name`, `folder: content/data/<name>`, `create: true`, a
   `fields:` list, and a `collector: { template, search_fields }`.
2. Add a card template `_includes/collector-cards/<name>-card.njk`.
3. Add a page with a `[collector -> <name>; …]` shortcode to list the entries.

## Add a field to an existing collection

Append an entry to that collection's `fields:` list (`label`, `name`, `widget`, …). This is safe:
existing entries simply don't have the new key until they are next edited and saved.

[card: class:danger]

**Be careful when adding or removing a field from an existing collection!** This could break the data integrity. Please only do this if you know what you are doing.

[:card]

---

[box: text-align:center]

[btn: <- Back to Technical Docs -> /documentation/technical/]

[:box]

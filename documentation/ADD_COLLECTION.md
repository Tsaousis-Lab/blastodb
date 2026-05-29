# Adding a New Collection (Sveltia + Collector)

This guide shows how to add a new collection that:
- shows up in the CMS,
- renders as **full pages** (Eleventy layouts), and
- can be listed via the **collector** component with custom card templates.

---

## 1) Add the collection to `content/admin/config.yml`

Example:
```yaml
- name: research-labs
  label: Research Labs
  label_singular: Lab
  folder: content/research-labs
  create: true
  slug: "{{slug}}"
  extension: md
  format: frontmatter
  fields:
    - { name: layout, label: Layout, widget: hidden, default: layouts/lab.njk }
    - { name: title, label: Lab Name, widget: string }
    - { name: description, label: Short Description, widget: text }
    - name: contacts
      label: Contact Persons
      widget: list
      fields:
        - { name: name, label: Name, widget: string }
        - { name: email, label: Email, widget: string }
        - { name: image, label: Image, widget: image, required: false }
    - { name: address, label: University / Address, widget: string }
    - { name: country, label: Country, widget: string }
    - { name: image, label: Image, widget: image, required: false }
    - { name: body, label: Body, widget: markdown, required: false }
```

**Notes:**
- `name` is the key you’ll use in `[collector -> NAME]`.
- `folder` is where the markdown files live.
- The `layout` field ensures each entry renders as its own page.

---

## 2) Create the content folder

Create the folder that matches the config:
```
content/research-labs/
```

Add entries (Sveltia will do this for you), e.g.:
```yaml
---
layout: layouts/lab.njk
title: "Blastocystis Lab Aachen"
description: "Lorem ipsum dolor sit amet..."
contacts:
  - name: "Dr. Example"
    email: "example@uni.edu"
address: "University of Example, City"
country: "Germany"
image: "/images/uploads/lab.jpg"
---

Full lab description here.
```

---

## 3) Create a card template (optional but recommended)

Cards use Nunjucks templates in:
```
_includes/collector-cards/
```

Create a file with the same name as the collection:
```
_includes/collector-cards/research-labs.njk
```

Example:
```njk
<div class="collector-card">
  <h3><a href="{{ pageUrl }}">{{ title }}</a></h3>
  {% if description %}<p>{{ description }}</p>{% endif %}
  {% if contacts and contacts.length %}
    <p><strong>Contact:</strong> {{ contacts[0].name }}</p>
  {% endif %}
  {% if country %}
    <p><strong>Country:</strong> {{ country }}</p>
  {% endif %}
</div>
```

If no template exists, the collector falls back to `default.njk`.

---

## 4) Use the collector on a page

```markdown
[collector -> research-labs; search:[title,description,contacts.name,country]; sort:[title]; filter:[country]]
```

---

## How collections are read

- The collector reads `content/admin/config.yml` at build time.
- It uses each collection’s `folder` to find `.md` entries.
- Each entry’s frontmatter is exposed to card templates and filters.
- Each entry still renders as its own **full page**, using its `layout`.

---

## Styling the cards

Cards use the existing collector styles in:
```
assets/style.css
```

You can add custom styles for your new card template, e.g.:
```css
.collector-card .lab-meta {
  font-size: 0.85rem;
  color: var(--text-muted);
}
```

---

## Quick checklist

- [ ] Add collection in `content/admin/config.yml`
- [ ] Create the folder in `content/`
- [ ] Ensure entries have a `layout` for full pages
- [ ] (Optional) Add `_includes/collector-cards/<collection>.njk`
- [ ] Use `[collector -> collection-name; ...]` on a page

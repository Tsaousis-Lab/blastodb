# Collector Component

The **collector** component renders cards from a CMS collection (defined in Sveltia CMS). It reads all entries in the collection folder and displays them with search, filters, and sorting.

## How it works (high level)
- Collections are defined in `content/admin/config.yml`.
- The collector uses the **collection name** from that config.
- Cards are rendered via Nunjucks templates in `_includes/collector-cards/`.

---

## Basic Syntax
```markdown
[collector -> collection-name; search:[field1,field2]; sort:[fieldA,fieldB]; filter:[fieldX,fieldY]; arrange:cols|grid|rows; display_items:all|NUMBER; clickable:true|false]
```

### Required
- `collection-name` → Must match the `name:` in `content/admin/config.yml`.

### Optional Parameters
| Parameter | Type | Default | Description |
|---|---|---|---|
| `search` | list | none | Fields included in the search index. If omitted, search is disabled. |
| `sort` | list | none | Fields shown in the sort menu. If omitted, sorting is disabled. |
| `filter` | list | none | Fields used to build filter checkboxes. If omitted, filters are disabled. |
| `arrange` | string | `rows` | Layout: `cols`, `grid`, or `rows`. |
| `display_items` | number or `all` | `all` | Limit how many items render. |
| `clickable` | boolean | `true` | If `false`, cards are not clickable and do not show hover effects. |

### Field Notes
- Field names must match frontmatter keys in the collection entries.
- Nested fields are supported with dot notation (e.g. `contacts.name`).
- Sorting treats fields containing `date` as dates automatically.

---

## Examples

### Publications (Bibliography)
```markdown
[collector -> bibliography; search:[authors,date,journal,title]; sort:[date,title]; filter:[journal]]
```

### Datasets
```markdown
[collector -> datasets; search:[title,data_types,sub_types,country,publication_ref]; sort:[date,title]; filter:[data_types,sub_types,country]]
```

### Lab Protocols (with tags filter)
```markdown
[collector -> lab-protocols; search:[title,description,shortDescription,tags]; sort:[date,title]; filter:[tags]; arrange:rows; display_items:all]
```

### Minimal (no search/sort/filter)
```markdown
[collector -> news; arrange:cols]
```

### Non-clickable cards
```markdown
[collector -> bibliography; search:[authors,title]; sort:[date]; filter:[journal]; clickable:false]
```

---

## Card Templates
Cards are rendered with Nunjucks templates in:
```
_includes/collector-cards/
```

### Template resolution order
1. `collection.collector.template` (if you add it to config.yml later)
2. `{collection-name}.njk`
3. `default.njk`

### Example card template
```njk
<div class="collector-card">
  <h3><a href="{{ pageUrl }}">{{ title }}</a></h3>
  {% if shortDescription %}<p>{{ shortDescription }}</p>{% endif %}
  {% if tags and tags.length %}
    <div class="collector-item-tags">
      {% for tag in tags %}<span class="tag">{{ tag }}</span>{% endfor %}
    </div>
  {% endif %}
</div>
```

---

## Styling
Collector styles live in:
```
assets/style.css
```
Look for the **Collector Component** section (`.collector`, `.collector-item`, `.collector-item-meta`, etc.).

## Collector Component Documentation

The **Collector** component is a powerful, dynamic component for displaying collections of items (like lab protocols, subtypes, or other categorized content) with built-in search and filtering capabilities.

## Features

- 🔍 **Full-text search** - Search by title and description
- 🏷️ **Tag-based filtering** - Filter items by multiple tags
- 📅 **Date display** - Show creation or last-updated dates
- 🎨 **Flexible layouts** - Display items in columns or grid
- 🎛️ **Customizable controls** - Enable/disable search, tags, and dates
- 📱 **Responsive design** - Works beautifully on all screen sizes
- ⚡ **Fast filtering** - Real-time search and filter updates

## Basic Syntax

```
[collector -> path; tags:bool; date:bool; search:bool; arrange:cols|grid; display_items:int|all]
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `path` | string | required | The data path (e.g., `lab-protocols`, `subtypes`) |
| `tags` | boolean | `true` | Show/hide tag filter checkboxes |
| `date` | boolean | `true` | Show/hide date information |
| `search` | boolean | `true` | Show/hide search input |
| `arrange` | string | `cols` | Layout style: `cols` (2-column), `grid` (responsive grid), or `rows` (list view) |
| `display_items` | int or "all" | `all` | Number of items to display, or `all` for all items |

## Examples

### Example 1: Lab Protocols (Full Featured)

```markdown
[collector -> lab-protocols; tags:true; date:true; search:true; arrange:cols; display_items:all]
```

This creates a collector with:
- Two-column layout
- Search functionality
- Tag filters
- Date display
- All items shown

### Example 2: Minimal Display

```markdown
[collector -> lab-protocols; tags:false; date:false; search:false; arrange:grid; display_items:5]
```

This creates a collector with:
- Responsive grid layout
- No search or filters
- Only first 5 items displayed
- No dates or tags visible

### Example 3: Grid with Search Only

```markdown
[collector -> lab-protocols; search:true; arrange:grid]
```

(Uses defaults: tags=true, date=true)

### Example 4: Rows/List Layout

```markdown
[collector -> lab-protocols; arrange:rows]
```

Shows items in a horizontal row layout (good for wider displays).

## Data Structure

Items in a collection must have the following structure (defined in JavaScript):

```javascript
{
  title: "Item Title",                    // Required: searchable
  description: "Brief description",       // Optional: searchable
  tags: ["tag1", "tag2"],                // Optional: filterable
  date: "2024-01-15"                     // Optional: formatted for display
}
```

## CSS Classes Reference

The component uses the following CSS classes for styling:

```
.collector                    — Main container
.collector-controls           — Search and filter controls
.collector-search             — Search input container
.collector-search input       — Search input field
.collector-tags               — Tag filter container
.collector-tags label         — Individual tag label
.collector-items              — Items container
.collector-items.arrange-cols — Two-column layout
.collector-items.arrange-grid — Grid layout
.collector-items.arrange-rows — Rows/list layout
.collector-item               — Individual item card
.collector-item h3            — Item title
.collector-item-description   — Item description text
.collector-item-meta          — Metadata container (date + tags)
.collector-item-date          — Date display
.collector-item-tags          — Tags display
.collector-empty              — Empty state message
```

## JavaScript API

### `initializeCollector(container, path, opts)`

Initializes a collector component with given options.

**Parameters:**
- `container` (HTMLElement) - The collector div element
- `path` (string) - Data path identifier
- `opts` (object) - Configuration options

### `getCollectorItems(path)`

Retrieves items for a given path. Currently returns hardcoded demo data.

**Returns:** Array of item objects

### `filterItems(container, items, opts)`

Applies search and tag filters to items in real-time.

### `formatDate(dateString)`

Formats an ISO date string for display (e.g., "Jan 15, 2024").

## Adding New Collections

To add a new collection:

1. **Add items to the JavaScript data** in `assets/main.js`:

```javascript
const itemsByPath = {
  "your-collection": [
    {
      title: "Item 1",
      description: "Description here",
      tags: ["tag1", "tag2"],
      date: "2024-01-15"
    },
    // ... more items
  ]
};
```

2. **Create a page** that uses the collector:

```markdown
---
layout: layouts/base.njk
title: Your Collection
---

[start:hero]
# Your Collection Title

Description of your collection here.
[end:hero]

[collector -> your-collection; tags:true; date:true; search:true]
```

3. **Customize parameters** as needed for your use case.

## Styling Customization

The collector uses CSS variables from the design system:

```css
--accent: #2d6a4f              /* Primary color */
--tag-bg: #eaf4ee              /* Tag background */
--tag-text: #2d6a4f            /* Tag text color */
--border: #e2e0da              /* Border color */
--radius: 8px                  /* Border radius */
```

You can override these in `assets/style.css` to customize the collector's appearance.

## Browser Compatibility

The collector uses modern JavaScript features:
- ES6 template literals
- `querySelectorAll` and event delegation
- `Array.from()` and array methods

Supports all modern browsers (Chrome, Firefox, Safari, Edge).

## Performance Notes

- Search and filtering happen client-side in real-time
- No external dependencies required
- Optimized for collections up to ~100 items
- For larger collections, consider server-side pagination

## Future Enhancement Ideas

- File system integration to auto-read from directories
- Sorting options (date, alphabetical, custom)
- Pagination for large collections
- Export functionality
- Advanced filter combinations
- Category grouping
- Item detail modal view

# Collector Component

The *collector* is a complex component displaying collections of data.

This is done by reading all files in a directory, and 




## Basic Syntax and Parameters

A collector component can be created with this command:
```markdown
[collector -> path; tags:bool; date:bool; search:bool; arrange:cols|grid; display_items:int|all; sort:bool]
```

It has several parameters:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `path` | string | required | The data path (e.g., `lab-protocols`, `subtypes`) |
| `tags` | boolean | `true` | Show/hide tag filter checkboxes |
| `date` | boolean | `true` | Show/hide date information |
| `search` | boolean | `true` | Show/hide search input |
| `arrange` | string | `cols` | Layout style: `cols` (2-column), `grid` (responsive grid), or `rows` (list view) |
| `display_items` | int or "all" | `all` | Number of items to display, or `all` for all items |
| `sort` | boolean | `false` | Enable/disable sorting functionality |

At minimum, the collector needs the "path" in which the data to be read is stored. The other parameters are there style and adjust the component:

- *tags* (optional) -> If enabled, the tags of each item are shown, and a filter for tags appears before the content. By default, tags are enabled.
- *date* (optional) -> If enabled, a date is read from the frontmatter.
- *search* (optional) -> Enables the search bar. By default it is true.
- *arrange* (optional) -> Determines if the content is displayed in columns(*cols*), rows (*rows*), or in a grid (*grid*)
- *display_items* (optional) -> Limits the number of items displayed
- *sort* (optional) -> Enables sorting functionality. When enabled, users can sort by Title (alphabetically) or Date (newest to oldest). By default it is true.

### Sort Behavior

When `sort:true` is enabled, a "Sort" button appears in the controls:

- **None**: Items are displayed in their original order (default)
- **Title**: Items are sorted alphabetically by title
  - Click again to reverse the order (Z → A)
  - Visual indicator (↑ ↓) shows current direction
- **Date**: Items are sorted by date
  - First click: Newest items first
  - Click again: Oldest items first
  - Visual indicator (↑ ↓) shows current direction

## Examples

EXAMPLES:

  [collector -> lab-protocols]
  → Shows all items, 2-column layout, with search, tags, and dates

  [collector -> lab-protocols; arrange:grid]
  → Same, but in responsive grid layout

  [collector -> lab-protocols; search:false; tags:false; date:false]
  → Just shows items, no controls or metadata

  [collector -> lab-protocols; display_items:5]
  → Shows only first 5 items

  [collector -> lab-protocols; arrange:grid; display_items:10]
  → Grid layout, limited to 10 items

  [collector -> lab-protocols; sort:true]
  → Shows all items with sort functionality enabled

  [collector -> lab-protocols; sort:true; tags:false]
  → Items with sorting, but without tag filters




## Adding Your Own Collections

1. **Add data to `assets/main.js`** in the `itemsByPath` object:
```javascript
"my-collection": [
  {
    title: "First Item",
    description: "Description",
    tags: ["tag1"],
    date: "2024-01-01"
  }
]
```

2. **Create a page** using the collector:
```markdown
[collector -> my-collection; tags:true; date:true; search:true]
```

3. **That's it!** The component handles the rest.

## Live Example

Check out the **Lab Protocols** page to see the collector in action:
- Visit `/lab-protocols/` to see the live example
- Try the search functionality
- Click tags to filter items
- Try different combinations

## Styling

All component styling uses the existing design system colors:
- Primary color: `--accent` (#2d6a4f)
- Backgrounds: `--tag-bg` (#eaf4ee)
- Borders: `--border` (#e2e0da)

You can customize appearance by editing `assets/style.css`.

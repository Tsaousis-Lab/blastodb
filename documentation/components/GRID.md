# Grid Component

The Grid component creates a responsive multi-column grid layout. It automatically adjusts the number of columns based on screen size, making it perfect for creating responsive card layouts.

## Syntax

```
[grid: cols:N CSS_STYLES]
...content here...
[:grid]
```

- **Opening tag**: `[grid: cols:N CSS_STYLES]` - optional `cols:N` parameter specifies column count, followed by optional additional CSS styles
- **Content**: Usually contains [box:] or [card:] elements
- **Closing tag**: `[:grid]`

## Parameters

- `cols:N` - (Optional) Specifies a fixed number of columns (e.g., `cols:3` for 3 columns). Valid values: 2, 3, 4, 5+. On mobile devices (< 720px), the grid always displays as a single column regardless of the `cols` setting.

## Default Styling (Auto-responsive)

Without the `cols:` parameter, the grid creates columns that automatically wrap based on available space:

```
[grid:]
[box:] Item 1 [:box]
[box:] Item 2 [:box]
[box:] Item 3 [:box]
[:grid]
```

The default minimum column width is 280px, so it will show:
- 1 column on small screens
- 2 columns on medium screens
- 3+ columns on large screens (auto-fitting based on space)

## Fixed Column Counts

Use the `cols:` parameter to set a fixed number of columns:

```
[grid: cols:3]
[box:] Item 1 [:box]
[box:] Item 2 [:box]
[box:] Item 3 [:box]
[box:] Item 4 [:box]
[box:] Item 5 [:box]
[box:] Item 6 [:box]
[:grid]
```

This will display exactly 3 columns on desktop screens, and automatically collapse to a single column on mobile.

## Common Use Cases

### Grid of Cards

```
[grid:]
[card:]
### Card 1
Card content here
[:card]
[card:]
### Card 2
Card content here
[:card]
[card:]
### Card 3
Card content here
[:card]
[:grid]
```

### Navigation Grid

```
[grid: cols:4]
[nav-box: Home -> /]
[nav-box: About -> /about]
[nav-box: Subtypes -> /subtypes]
[nav-box: Lab Protocols -> /protocols]
[:grid]
```

### Grid with Custom Spacing

```
[grid: cols:3 gap: 2rem]
[box:] Item 1 [:box]
[box:] Item 2 [:box]
[box:] Item 3 [:box]
[:grid]
```

### Feature Grid (Centered)

```
[grid: cols:3 text-align: center]
[box:]
### 🔬 Research
Description of research features
[:box]
[box:]
### 📚 Database
Description of database features
[:box]
[box:]
### 🧬 Genomes
Description of genome features
[:box]
[:grid]
```

## CSS Style Options

You can combine the `cols:` parameter with standard CSS properties:

- **Column count**: `cols:3` - fixed number of columns (2-5+)
- **Gap**: `gap: 1.5rem` - space between items
- **Text Alignment**: `text-align: center` - center content in each cell
- **Padding**: `padding: 2rem` - internal padding
- **Other CSS**: Any valid CSS properties can be added after `cols:`

## Structure

The grid component renders as:
```html
<div class="grid grid-cols-3" style="additional-css-here">
  ...content...
</div>
```

When `cols:` is specified, a class like `grid-cols-3` is added to enable the fixed column layout.

## Responsive Behavior

### With `cols:` parameter
- **Desktop (> 720px)**: Fixed number of columns as specified
- **Mobile (≤ 720px)**: Always 1 column

### Without `cols:` parameter (default)
- **Desktop (> 1000px)**: 3+ columns (auto-fitting with 280px minimum)
- **Tablet (600-1000px)**: 2 columns
- **Mobile (< 600px)**: 1 column

## Tips

1. Use `cols:3` or `cols:4` for consistent, predictable layouts
2. The default auto-responsive grid (without `cols:`) works great when content size varies
3. Grids work best with cards or boxes of similar heights
4. Use [box:] or [card:] elements inside grids for consistent sizing
5. Combine `cols:` with `text-align: center` for centered grid content
6. Mobile devices always show 1 column for better readability, regardless of the `cols` setting
7. The gap between items defaults to 0.75rem - override with custom CSS if needed

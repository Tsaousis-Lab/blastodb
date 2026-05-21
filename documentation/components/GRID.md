# Grid Component

The Grid component creates a responsive multi-column grid layout. It automatically adjusts the number of columns based on screen size, making it perfect for creating responsive card layouts.

## Syntax

```
[grid: CSS_STYLES]
...content here...
[:grid]
```

- **Opening tag**: `[grid: CSS_STYLES]` - optional CSS styles
- **Content**: Usually contains [box:] or [card:] elements
- **Closing tag**: `[:grid]`

## Default Styling

The default grid creates columns that automatically wrap based on available space:

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
- 3+ columns on large screens

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
[grid:]
[nav-box: Home -> /]
[nav-box: About -> /about]
[nav-box: Subtypes -> /subtypes]
[nav-box: Lab Protocols -> /protocols]
[:grid]
```

### Grid with Custom Spacing

```
[grid: gap: 2rem]
[box:] Item 1 [:box]
[box:] Item 2 [:box]
[box:] Item 3 [:box]
[:grid]
```

### Feature Grid

```
[grid: text-align: center]
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

Common CSS properties for grids:

- **Gap**: `gap: 1.5rem` - space between items
- **Text Alignment**: `text-align: center` - center content in each cell
- **Padding**: `padding: 2rem` - internal padding
- **Column Configuration**: `grid-template-columns: repeat(4, 1fr)` - custom column count

## Structure

The grid component renders as:
```html
<div class="grid" style="CSS_STYLES">
  ...content...
</div>
```

## Responsive Behavior

The grid automatically responds to screen size:

| Screen Size | Columns |
|-------------|---------|
| Mobile < 600px | 1 column |
| Tablet 600-1000px | 2 columns |
| Desktop > 1000px | 3+ columns |

## Tips

1. Grids work best with cards or boxes of similar content
2. Use [box:] or [card:] elements inside grids for consistent sizing
3. The default gap between items is already set - override with CSS if needed
4. Grids are responsive by default - content will flow naturally on all devices
5. Combine with text-align: center for centered content in each cell
6. You can use custom grid-template-columns for fixed column counts

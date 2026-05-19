# Box Component

The Box component is a simple container that groups content together. It's often used as a building block within other layout components like [cols:] and [grid:]. Boxes support optional inline CSS styling.

## Syntax

```
[box: CSS_STYLES]
...content here...
[:box]
```

- **Opening tag**: `[box: CSS_STYLES]` - optional CSS styles (leave blank for default styling)
- **Content**: Any markdown content
- **Closing tag**: `[:box]`

## Default Styling

Boxes have minimal default styling - they're just containers:

```
[box:]
Box content here
[:box]
```

## Custom Styling

You can add inline CSS styles to boxes to customize their appearance:

```
[box: background-color: var(--accent-pale); padding: 1.5rem]
## Highlighted Box
Box with custom background and padding
[:box]
```

### Common CSS Properties

- **Background**: `background-color: #f0f0f0`
- **Padding**: `padding: 1.5rem` for internal spacing
- **Border**: `border: 1px solid #ccc`
- **Margin**: `margin: 1rem` for external spacing
- **Color**: `color: white` for text color
- **Text Alignment**: `text-align: center`
- **Rounded Corners**: `border-radius: 8px`
- **Shadow**: `box-shadow: 0 2px 4px rgba(0,0,0,0.1)`

### Using CSS Variables

Your project has several CSS variables available that match your theme:

```
[box: background-color: var(--accent-pale); color: var(--text); padding: 1.5rem]
Styled with theme variables
[:box]
```

Available variables:
- `--bg` - Main background color
- `--text` - Main text color
- `--text-muted` - Muted text color
- `--accent` - Primary accent color
- `--accent-dark` - Dark accent color
- `--accent-pale` - Light accent color
- `--dark-highlight` - Dark highlight background
- `--tag-bg` - Tag background
- `--tag-text` - Tag text color

## Common Use Cases

### Boxes in a Two-Column Layout

```
[cols:]
[box:]
### Left Column
Content for the left side
[:box]
[box:]
### Right Column
Content for the right side
[:box]
[:cols]
```

### Box with Custom Background

```
[box: background-color: var(--accent-pale); padding: 1.5rem; border-radius: 8px]
## Highlighted Content
This box has a custom background color, padding, and rounded corners.
[:box]
```

### Boxes in a Grid

```
[grid:]
[box:]
#### Feature 1
Description here
[:box]
[box:]
#### Feature 2
Description here
[:box]
[box:]
#### Feature 3
Description here
[:box]
[:grid]
```

### Centered Box with Border

```
[box: text-align: center; border: 2px solid var(--accent); padding: 2rem; border-radius: 10px]
## Important Information
Centered content with a decorative border
[:box]
```

### Box with Shadow and Hover Effect

```
[box: background-color: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1)]
Content that stands out with a subtle shadow
[:box]
```

## Structure

The box component renders as:
```html
<div class="box" style="CSS_STYLES">
  ...content...
</div>
```

## Common Patterns

### Two-Column Layout
```
[cols:]
[box:] Left content [:box]
[box:] Right content [:box]
[:cols]
```

### Three-Column Layout with [grid:]
```
[grid:]
[box:] Column 1 [:box]
[box:] Column 2 [:box]
[box:] Column 3 [:box]
[:grid]
```

### Centered Box
```
[box: text-align: center]
Centered content
[:box]
```

### Card-like Box
```
[box: background-color: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.08)]
#### Card Title
Card description or content
[:box]
```

## Tips

1. Boxes are minimal containers - use them as building blocks
2. Combine with [cols:] for side-by-side layouts
3. Combine with [grid:] for multi-column layouts
4. You can nest boxes inside each other for complex layouts
5. Use CSS variables for consistent theming across your site
6. Multiple CSS properties should be separated by semicolons
7. Remember to escape semicolons properly in your CSS strings
8. Test your styling in the browser to ensure it looks correct

# Columns Component

The Columns component creates a two-column side-by-side layout. It's useful for pairing content, creating split layouts, or organizing related information. Columns support optional inline CSS styling.

## Syntax

```
[cols: CSS_STYLES]
...content here...
[:cols]
```

- **Opening tag**: `[cols: CSS_STYLES]` - optional CSS styles (leave blank for default styling)
- **Content**: Usually contains [box:] elements for each column
- **Closing tag**: `[:cols]`

## Default Styling

The default two-column layout divides available space equally:

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

On small screens (mobile), the columns automatically stack vertically for readability.

## Custom Styling

You can add inline CSS styles to customize the columns layout:

```
[cols: gap: 2rem; align-items: center]
[box:]
Left column content
[:box]
[box:]
Right column content
[:box]
[:cols]
```

### Common CSS Properties

- **Gap**: `gap: 2rem` - space between columns
- **Alignment**: `align-items: center` - vertical alignment of columns
- **Text Alignment**: `text-align: center`
- **Padding**: `padding: 1.5rem`

## Common Use Cases

### Text and Image Side by Side

```
[cols:]
[box:]
## Description
Text content describing a feature or product.
[:box]
[box:]
![Image](image.png)
[:box]
[:cols]
```

### Feature Comparison

```
[cols:]
[box:]
### Feature Set A
- Benefit 1
- Benefit 2
- Benefit 3
[:box]
[box:]
### Feature Set B
- Advantage 1
- Advantage 2
- Advantage 3
[:box]
[:cols]
```

### Call-to-Action Layout

```
[cols:]
[box:]
## Get Started
Description of the product or service
[:box]
[box:]
[btn: Sign Up Now -> /signup]
[:box]
[:cols]
```

### Columns with Centered Alignment

```
[cols: align-items: center; gap: 2rem]
[box:]
### Left Content
Text aligned with right content
[:box]
[box:]
### Right Content
Vertically centered
[:box]
[:cols]
```

### Three-Item Layout (Nested)

```
[cols:]
[box:]
### Item 1
Content
[:box]
[cols:]
[box:]
### Item 2
Content
[:box]
[box:]
### Item 3
Content
[:box]
[:cols]
[:cols]
```

## Structure

The columns component renders as:
```html
<div class="cols" style="CSS_STYLES">
  ...content...
</div>
```

## Responsive Behavior

The columns layout automatically adapts:

| Screen Size | Layout |
|-------------|--------|
| Mobile < 720px | Stacks vertically (1 column) |
| Tablet/Desktop > 720px | Side by side (2 columns) |

## Tips

1. Always wrap each column with [box:] for consistent spacing
2. Use [box:] for better visual organization of column content
3. Columns are responsive by default - content flows naturally on mobile
4. The default gap between columns is already set - adjust with CSS if needed
5. You can nest [cols:] inside other layout components for complex layouts
6. Combine with [hero:] at the top for full-width layouts
7. Works great for creating intro sections with image + text combinations
8. Use `align-items: center` to vertically center column content
9. Multiple CSS properties should be separated by semicolons

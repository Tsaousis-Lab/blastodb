# Columns Component

The Columns component creates a two-column side-by-side layout. It's useful for pairing content, creating split layouts, or organizing related information.

## Syntax

```
[cols: CSS_STYLES]
...content here...
[:cols]
```

- **Opening tag**: `[cols: CSS_STYLES]` - optional CSS styles
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

## CSS Style Options

Common CSS properties for columns:

- **Gap**: `gap: 2rem` - space between columns
- **Alignment**: `align-items: center` - vertical alignment
- **Text Alignment**: `text-align: center`
- **Padding**: `padding: 1.5rem`

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

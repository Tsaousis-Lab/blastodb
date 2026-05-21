# Box Component

The Box component is a simple container that groups content together. It's often used as a building block within other layout components like [cols:] and [grid:].

## Syntax

```
[box: CSS_STYLES]
...content here...
[:box]
```

- **Opening tag**: `[box: CSS_STYLES]` - optional CSS styles
- **Content**: Any markdown content
- **Closing tag**: `[:box]`

## Default Styling

Boxes have minimal default styling - they're just containers:

```
[box:]
Box content here
[:box]
```

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

### Box with Background Color

```
[box: background-color: var(--accent-pale); padding: 1.5rem]
## Highlighted Box
Box with custom background and padding
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

## CSS Style Options

Common CSS properties for boxes:

- **Background**: `background-color: #f0f0f0`
- **Padding**: `padding: 1.5rem` for internal spacing
- **Border**: `border: 1px solid #ccc`
- **Margin**: `margin: 1rem` for external spacing
- **Color**: `color: white` for text color
- **Text Alignment**: `text-align: center`

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

## Tips

1. Boxes are minimal containers - use them as building blocks
2. Combine with [cols:] for side-by-side layouts
3. Combine with [grid:] for multi-column layouts
4. You can nest boxes inside each other for complex layouts
5. Boxes work well with cards for organized content grouping

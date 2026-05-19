# Card Component

The Card component creates a contained box with a subtle background and border. Cards are useful for organizing content into distinct, visually separated sections.

## Syntax

```
[card: CSS_STYLES]
...content here...
[:card]
```

- **Opening tag**: `[card: CSS_STYLES]` - optional CSS styles
- **Content**: Any markdown content
- **Closing tag**: `[:card]`

## Default Styling

Without any CSS styles, the card uses a light gray background with a border:

```
[card:]
This is a card with default styling
[:card]
```

## Common Use Cases

### Simple Card

```
[card:]
## Card Title
This is a card with some content inside it.
[:card]
```

### Card with Custom Background

```
[card: background-color: var(--accent-pale)]
## Highlighted Card
This card has a custom background color
[:card]
```

### Card with Border Styling

```
[card: border-left: 4px solid var(--accent)]
## Important Information
This card has a left border accent
[:card]
```

### Card with Custom Padding

```
[card: padding: 2rem]
## Spacious Card
Extra padding inside for breathing room
[:card]
```

## CSS Style Options

Common CSS properties for cards:

- **Background**: `background-color: #f5f5f5`
- **Border**: `border: 2px solid var(--accent)` or `border-left: 4px solid blue`
- **Padding**: `padding: 1.5rem` to control internal spacing
- **Shadow**: `box-shadow: 0 2px 8px rgba(0,0,0,0.1)`
- **Border Radius**: `border-radius: 12px` for rounder corners
- **Color**: `color: white` for text color when background is dark

## Structure

The card component renders as:
```html
<div class="card" style="CSS_STYLES">
  ...content...
</div>
```

## Tips

1. Cards look great in grids - combine with [grid:] for card layouts
2. Use cards to group related information
3. Add visual interest with subtle border colors
4. Avoid too much padding - defaults are already reasonable
5. Cards work well for listing items, testimonials, or feature highlights

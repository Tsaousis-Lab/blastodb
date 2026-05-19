# Card Component

The Card component creates a contained box with a subtle background and border. Cards are useful for organizing content into distinct, visually separated sections. Cards support optional inline CSS styling.

## Syntax

```
[card: CSS_STYLES]
...content here...
[:card]
```

- **Opening tag**: `[card: CSS_STYLES]` - optional CSS styles (leave blank for default styling)
- **Content**: Any markdown content
- **Closing tag**: `[:card]`

## Default Styling

Without any CSS styles, the card uses a light gray background with a border:

```
[card:]
This is a card with default styling
[:card]
```

## Custom Styling

You can add inline CSS styles to customize the card's appearance:

```
[card: background-color: var(--accent-pale); padding: 1.5rem; border-radius: 8px]
## Highlighted Card
This card has custom styling
[:card]
```

### Common CSS Properties

- **Background**: `background-color: #f5f5f5` or `background-color: var(--accent-pale)`
- **Border**: `border: 2px solid var(--accent)` or `border-left: 4px solid var(--accent-dark)`
- **Padding**: `padding: 1.5rem` to control internal spacing
- **Shadow**: `box-shadow: 0 2px 8px rgba(0,0,0,0.1)`
- **Border Radius**: `border-radius: 12px` for rounder corners
- **Color**: `color: white` for text color when background is dark
- **Text Alignment**: `text-align: center`

### Using CSS Variables

Your project has several CSS variables available:

```
[card: background-color: var(--accent-pale); color: var(--text); padding: 1.5rem; border-radius: 8px]
## Card with Theme Variables
Styled with your site's theme colors
[:card]
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

### Card with Left Border Accent

```
[card: border-left: 4px solid var(--accent); padding: 1.5rem]
## Important Information
This card has a left border accent
[:card]
```

### Card with Custom Padding and Rounded Corners

```
[card: padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1)]
## Spacious Card
Extra padding inside for breathing room with shadow
[:card]
```

### Card in a Grid

```
[grid:]
[card:]
#### Feature 1
Description here
[:card]
[card:]
#### Feature 2
Description here
[:card]
[card:]
#### Feature 3
Description here
[:card]
[:grid]
```

### Dark Card with White Text

```
[card: background-color: #2c3e50; color: white; padding: 1.5rem; border-radius: 8px]
## Dark Card
White text on dark background
[:card]
```

### Card with Centered Content

```
[card: text-align: center; padding: 2rem; background-color: var(--accent-pale)]
## Centered Card Title
Centered content inside the card
[:card]
```

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
3. Add visual interest with subtle border colors and shadows
4. Use CSS variables for consistent theming
5. Cards work well for listing items, testimonials, or feature highlights
6. Multiple CSS properties should be separated by semicolons
7. Remember to test your styling for readability and accessibility

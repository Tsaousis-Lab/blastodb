# Layout Components

This directory contains documentation for all available layout components in BlastoDB. Layout components help you organize and structure your content on the page.

## Available Components

### Text Styling
- **[SPAN.md](SPAN.md)** - Inline text styling with CSS (color, font, etc.)

### Layout Containers
- **[HERO.md](HERO.md)** - Full-width banner section for introducing pages or sections
- **[COLS.md](COLS.md)** - Two-column side-by-side layout for splitting content
- **[GRID.md](GRID.md)** - Responsive multi-column grid for card layouts
- **[BOX.md](BOX.md)** - Simple container for grouping content
- **[CARD.md](CARD.md)** - Styled box with background and border for highlighting content

## Common Layout Patterns

### Simple Page with Hero
```
[hero:]
# Page Title
[:hero]

Main content here
```

### Two-Column Section
```
[cols:]
[box:]
Left content
[:box]
[box:]
Right content
[:box]
[:cols]
```

### Grid of Cards
```
[grid:]
[card:]
### Card 1
Content
[:card]
[card:]
### Card 2
Content
[:card]
[:grid]
```

### Complex Layout
```
[hero:]
[cols:]
[box:]
Title and intro
[:box]
[:cols]
[:hero]

Main content...

[grid:]
[card:] Feature 1 [:card]
[card:] Feature 2 [:card]
[card:] Feature 3 [:card]
[:grid]
```

## General Syntax

All layout components follow the same pattern:

```
[COMPONENT: CSS_STYLES]
...content...
[:COMPONENT]
```

- `COMPONENT` - The type of container (hero, cols, grid, box, card)
- `CSS_STYLES` - Optional inline CSS to customize the component
- Content can include markdown, other layout components, and inline elements

## Quick Reference

| Component | Use Case | Responsive |
|-----------|----------|------------|
| [span](SPAN.md) | Inline text styling | N/A |
| [hero](HERO.md) | Page headers, section intros | Full-width |
| [cols](COLS.md) | Side-by-side layouts | Stacks on mobile |
| [grid](GRID.md) | Card grids, product layouts | Auto-columns |
| [box](BOX.md) | Content containers | Flexible |
| [card](CARD.md) | Highlighted content boxes | Flexible |

## CSS Styling

All components (except span) support custom CSS styling:

```
[component: background-color: red; padding: 2rem]
Content here
[:component]
```

Common CSS properties:
- `background-color` - Background color
- `color` - Text color
- `padding` - Internal spacing
- `margin` - External spacing
- `border` - Borders and outlines
- `gap` - Space between items (for grid/cols)
- `text-align` - Text alignment

See individual component docs for specific examples.

## Nesting

You can nest components inside each other:

```
[hero:]
[cols:]
[box:]
Column 1
[:box]
[box:]
Column 2
[:box]
[:cols]
[:hero]
```

This creates a full-width hero section with two-column content inside.

## CSS Variables

Use the project's built-in CSS variables for consistent styling:

```
[card: background-color: var(--accent-pale); color: var(--accent-dark)]
Content with theme colors
[:card]
```

Available variables:
- `--accent` - Primary accent color
- `--accent-dark` - Dark accent color
- `--accent-pale` - Light accent color
- `--text` - Main text color
- `--text-muted` - Muted text color
- `--dark-highlight` - Dark highlight background (default for spans)
- `--tag-bg` - Tag background
- `--tag-text` - Tag text color

See individual component documentation for detailed examples and usage patterns.

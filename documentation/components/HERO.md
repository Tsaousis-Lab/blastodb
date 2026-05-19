# Hero Component

The Hero component creates a full-width banner section that stands out from the rest of the page. It's perfect for introducing pages or sections with important content. Heroes support optional inline CSS styling.

## Syntax

```
[hero: CSS_STYLES]
...content here...
[:hero]
```

- **Opening tag**: `[hero: CSS_STYLES]` - optional CSS styles (leave blank for default styling)
- **Content**: Any markdown content (headings, paragraphs, images, etc.)
- **Closing tag**: `[:hero]`

## Default Styling

Without any CSS styles, the hero section uses the default page background:

```
[hero:]
# Welcome to BlastoDB
This is the hero section
[:hero]
```

## Custom Styling

You can add inline CSS styles to customize the hero section's appearance:

```
[hero: background-color: var(--accent-pale); padding: 3rem]
# Welcome
Custom colored hero section
[:hero]
```

### Common CSS Properties

- **Background**: `background-color: #f0f0f0` or `background-color: var(--accent-pale)`
- **Text Color**: `color: white` or `color: var(--text)`
- **Padding**: `padding: 3rem 1.5rem` to control inner spacing
- **Border**: `border-bottom: 2px solid var(--accent)`
- **Text Alignment**: `text-align: center` to center content
- **Background Image**: `background-image: url(...)`
- **Gradient Background**: `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

### Using CSS Variables

Your project has several CSS variables available:

```
[hero: background-color: var(--accent-pale); color: var(--text); padding: 3rem 1.5rem]
# Hero with Theme Variables
This hero uses your site's theme colors
[:hero]
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

### Page Title Banner

```
[hero:]
# My Page Title
A brief description of the page
[:hero]
```

### Hero with Custom Background Color

```
[hero: background-color: var(--accent-pale)]
# Welcome
Custom colored hero section
[:hero]
```

### Hero with Dark Background and White Text

```
[hero: background-color: #2c3e50; color: white; padding: 3rem 1.5rem]
# Dark Hero Section
Light text on dark background
[:hero]
```

### Hero with Centered Content

```
[hero: text-align: center; padding: 4rem 1.5rem]
# Centered Hero
Everything in this hero is centered
[:hero]
```

### Hero with Nested Two-Column Layout

You can nest other layout components inside the hero:

```
[hero:]
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
[:hero]
```

### Hero with Border and Gradient

```
[hero: background: linear-gradient(135deg, var(--accent-pale) 0%, var(--accent) 100%); padding: 3rem 1.5rem; border-bottom: 3px solid var(--accent-dark)]
# Gradient Hero
A visually striking hero with a gradient background
[:hero]
```

### Hero with Padding and Shadow

```
[hero: background-color: white; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-left: 4px solid var(--accent)]
# Hero with Accent Border
Left border accent with subtle shadow
[:hero]
```

## Structure

The hero component renders as:
```html
<div class="hero" style="CSS_STYLES">
  <div class="hero-inner">
    ...content...
  </div>
</div>
```

The inner `hero-inner` div provides automatic max-width and horizontal centering for the content.

## Tips

1. Heroes work best with limited content - use them for introductions and section headings
2. You can include any markdown inside a hero, including images and buttons
3. Combine with [cols:] to create multi-column hero layouts
4. Heroes are full-width and stand out visually, so use them sparingly
5. When using custom colors, ensure text has good contrast for readability
6. Use CSS variables for consistent theming with the rest of your site
7. Multiple CSS properties should be separated by semicolons
8. Test your styling in the browser to ensure it looks correct on all screen sizes

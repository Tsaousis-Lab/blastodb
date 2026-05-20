# Hero Component

The Hero component creates a full-width banner section that stands out from the rest of the page. It's perfect for introducing pages or sections with important content.

## Syntax

```
[hero: CSS_STYLES]
...content here...
[:hero]
```

- **Opening tag**: `[hero: CSS_STYLES]` - optional CSS styles
- **Content**: Any markdown content (headings, paragraphs, images, etc.)
- **Closing tag**: `[:hero]`

## Default Styling

Without any CSS styles, the hero section uses a light background:

```
[hero:]
# Welcome to BlastoDB
This is the hero section
[:hero]
```

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

### Hero with Custom Text Color

```
[hero: background-color: #2c3e50; color: white]
# Dark Hero Section
Light text on dark background
[:hero]
```

### Hero with Nested Layout

You can nest other layout components inside the hero:

```
[hero:]
[cols:]
[box:]
Left column content
[:box]
[box:]
Right column content
[:box]
[:cols]
[:hero]
```

## CSS Style Options

You can apply any CSS properties to the hero section. Common options include:

- **Background**: `background-color: #f0f0f0` or `background-color: var(--accent-pale)`
- **Text Color**: `color: white` or `color: var(--text)`
- **Padding**: `padding: 3rem 1.5rem` to control inner spacing
- **Border**: `border-bottom: 2px solid var(--accent)`
- **Text Alignment**: `text-align: center` to center content

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

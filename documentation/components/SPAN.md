# Styled Span Component

The Styled Span component allows you to apply inline CSS styling to text content within your markdown. It works similarly to an HTML `<span>` element but uses a custom syntax that fits seamlessly with your content writing.

## Syntax

```
[s: CSS_STYLES] content here [:s]
```

- **Opening tag**: `[s: CSS_STYLES]` - where `CSS_STYLES` are inline CSS properties
- **Content**: Any text, including markdown formatting (bold, italic, links, etc.)
- **Closing tag**: `[:s]`

## Default Styling

If you don't provide any CSS styles, the component applies the default dark highlight background color:

```
[s:] this text will have a dark highlight [:s]
```

This renders with `background-color: var(--dark-highlight)`.

## Common Text Style Options

Here are the most commonly used CSS properties for styling text:

### Color & Background
- `color: red` - Text color (use hex, rgb, or color names)
- `color: var(--accent)` - Text color using CSS variables
- `background-color: yellow` - Background color
- `background-color: var(--accent-pale)` - Background using CSS variables

### Font Properties
- `font-weight: bold` - Make text bold (or use `600`, `700`, `800`)
- `font-weight: 300` - Make text lighter
- `font-style: italic` - Make text italic
- `font-size: 1.2em` - Increase font size
- `font-size: 0.9em` - Decrease font size
- `font-family: Arial` - Change font family

### Spacing & Layout
- `padding: 0.2em 0.4em` - Add internal spacing
- `letter-spacing: 0.05em` - Space between letters
- `line-height: 1.5` - Space between lines

### Other Effects
- `text-decoration: underline` - Underline text
- `text-decoration: line-through` - Strikethrough text
- `border-bottom: 2px solid blue` - Add a bottom border
- `border-radius: 3px` - Round corners (when combined with padding/background)

## Examples

### Basic Color Styling

```
This is normal text, and [s: color: red] this text is red [:s], back to normal.
```

### Font Changes

```
[s: font-family: Arial; font-size: 1.2em] This text is larger and uses Arial font [:s]
```

### Multiple CSS Properties

```
[s: color: white; background-color: #333; padding: 0.2em 0.4em; border-radius: 3px] styled content [:s]
```

### With Markdown Formatting

```
[s: color: blue; font-weight: bold] This is **bold** and blue, with a [link](/page/) inside [:s]
```

### Using CSS Variables

Your project has several CSS variables available:

```
[s: color: var(--accent); background-color: var(--accent-pale)] Text styled with theme variables [:s]
```

Available variables:
- `--bg` - Main background color
- `--text` - Main text color
- `--text-muted` - Muted text color
- `--accent` - Primary accent color
- `--accent-dark` - Dark accent color
- `--accent-pale` - Light accent color
- `--dark-highlight` - Dark highlight background (default)
- `--tag-bg` - Tag background
- `--tag-text` - Tag text color

## Common Use Cases

### Highlighting Important Terms

```
The [s: background-color: var(--accent-pale); padding: 0.1em 0.3em] BlastoDB [:s] project aims to...
```

### Colored Text Callouts

```
[s: color: #d32f2f; font-weight: 600] Warning: [:s] This step is critical and cannot be undone.
```

### Custom Callout Box

```
[s: background-color: #f0f4f8; border-left: 3px solid var(--accent); padding: 0.5em 0.75em; display: inline-block] Note: This is an important point to remember. [:s]
```

### Footnotes or Small Text

```
[s: font-size: 0.85em; color: var(--text-muted); font-style: italic] *- Last updated on 2024-01-15* [:s]
```

### Bold and Italic

```
[s: font-weight: 700; font-style: italic] This is both bold and italic [:s]
```

## Nesting and Limitations

- Do not nest multiple span components inside each other
- The component should not span across multiple paragraphs
- For block-level styling (full-width backgrounds, etc.), use the block containers (`[start:box]...[end:box]`) instead

## Tips

1. **CSS Property Format**: Use standard CSS property names and values. Multiple properties should be separated by semicolons.
2. **CSS Variables**: Always use `var(--variable-name)` format for project variables, not just `--variable-name`.
3. **Escaping**: If your content contains square brackets or colons, they might be interpreted as part of the syntax. Use regular text when possible.
4. **Performance**: Avoid extremely complex CSS within span tags; keep styling simple and focused.
5. **Accessibility**: Remember that color alone should not be used to convey information. Use text weight, size, or other visual cues in combination with color.

# Selection Button (sbtn)

The Selection Button is an interactive dropdown button component that displays a list of links in a popup menu. When clicked, it shows all available options, and users can click on any option to navigate. It features a small open arrow indicator that rotates when the menu is open.

## Use Cases

- **Multiple related links**: When you want to provide several related navigation options in a compact button
- **Version selection**: Choose between different versions of content
- **Format selection**: Offer multiple file formats or download options
- **Navigation shortcuts**: Quick access to multiple related pages

## Syntax

```markdown
[sbtn: Button Label -> [url1, url2, url3, ...]]
```

### Parameters

- **Button Label**: The text displayed on the button
- **URLs**: A comma-separated list of links within square brackets `[...]`
- URLs can be:
  - Internal links: `page.html`, `../another/page.html`, `/category/item/`
  - External links: `https://www.example.com`

## Examples

### Multiple Internal Links

```markdown
[sbtn: View Protocols -> [protocol-one.html, protocol-two.html, protocol-three.html]]
```

### Mixed Internal and External Links

```markdown
[sbtn: Select Items -> [first_link.html, second_link.html, https://www.example.com]]
```

### Links with Full Paths

```markdown
[sbtn: Resources -> [/resources/guide/, /resources/faq/, https://external-resource.org/docs]]
```

## Styling and Behavior

### Visual States

- **Default**: The button uses the accent-dark color with a subtle shadow. An open arrow (▽) is displayed next to the label, pointing down.
- **Hover**: The background changes to accent color and the button lifts up (translateY effect)
- **Active**: The button returns to its normal position
- **Open Menu**: The menu appears below the button with all options displayed, and the arrow rotates to point up (△)

### Arrow Rotation

The arrow indicator provides visual feedback about the menu state:
- **Closed State**: Open arrow pointing down (▽)
- **Open State**: Arrow rotates to point up (△), smoothly over 0.3 seconds
- **Animation**: Smooth rotation using CSS transform
- **Style**: Hollow/open arrow symbol (not filled)

### Menu Behavior

- **Click to Toggle**: Clicking the button toggles the menu open/closed
- **Click Outside to Close**: Clicking anywhere outside the button/menu closes the menu
- The arrow rotates smoothly to indicate the menu state
- Menu items are displayed as a vertical list
- Each menu item is a clickable link with a hover effect
- Menu scrolls if there are many items (max-height: 400px)

## Styling Customization

The component uses CSS custom properties (CSS variables) defined in your `style.css`. All styling automatically inherits your theme colors. You can customize it by modifying these variables in your `:root` CSS:

| Variable | Default | Used For |
|----------|---------|----------|
| `--accent-dark` | `#0d5a53` | Main button background |
| `--accent` | `#1b8a7f` | Button hover background |
| `--surface` | `#ffffff` | Menu background |
| `--text` | `#1a1a18` | Menu item text color |
| `--border` | `#e2e0da` | Menu borders and dividers |
| `--accent-pale` | `#c8ebe5` | Menu item hover background |
| `--font-ui` | `system-ui, -apple-system, sans-serif` | Font family |
| `--radius` | `8px` | Border radius |
| `--shadow` | `0 1px 4px rgba(0, 0, 0, 0.08)` | Menu box shadow |

## Technical Details

### HTML Output

The component generates the following HTML structure:

```html
<div class="sbtn-container">
  <button class="sbtn" data-target="sbtn-UNIQUE_ID">
    Button Label
    <span class="sbtn-arrow">▷</span>
  </button>
  <div class="sbtn-menu" id="sbtn-UNIQUE_ID">
    <a href="url1" class="sbtn-menu-item">url1</a>
    <a href="url2" class="sbtn-menu-item">url2</a>
    <a href="url3" class="sbtn-menu-item">url3</a>
  </div>
</div>
```

When the menu is open, the button gets the `.open` class which rotates the arrow.

### CSS Classes

- `.sbtn-container`: Wrapper container (position: relative)
- `.sbtn`: The button element (uses flexbox for layout)
- `.sbtn.open`: Applied when the menu is open (rotates the arrow)
- `.sbtn-arrow`: The arrow indicator span (rotates with the menu state)
- `.sbtn-menu`: The dropdown menu container
- `.sbtn-menu-item`: Individual menu link items

### CSS Properties

The button uses `display: flex` with `align-items: center` and `gap: 0.5rem` to properly space the label and arrow. The arrow element has:
- `transition: transform 0.3s ease` - Smooth rotation animation
- `transform-origin: center` - Arrow rotates from its center
- Default: `transform: rotate(90deg)` - Arrow points down
- On `.sbtn.open .sbtn-arrow`: `transform: rotate(270deg)` - Arrow rotates to point up when menu is open

### JavaScript

The component uses a simple JavaScript module (`sbtn.js`) that:
- Initializes button click handlers on DOM load
- Toggles menu visibility and adds/removes the `.open` class on button click
- Closes menus and removes `.open` class when clicking outside
- Supports multiple selection buttons on the same page

## Comparison with Regular Button

| Aspect | Regular Button `[btn]` | Selection Button `[sbtn]` |
|--------|------------------------|--------------------------|
| Purpose | Single navigation link | Multiple related links |
| Syntax | `[btn: Label -> url]` | `[sbtn: Label -> [url1, url2]]` |
| Interaction | Direct navigation | Click to reveal menu |
| URLs | Single URL only | Multiple URLs |
| Indicator | None | Open arrow that rotates with menu state |
| Use Case | Simple, direct links | Related options/choices |

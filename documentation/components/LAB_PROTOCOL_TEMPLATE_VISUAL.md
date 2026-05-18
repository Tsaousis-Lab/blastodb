# Lab Protocol Template - Visual Guide

## Template Structure

The `lab-protocol.njk` template extends your site with a dedicated layout for protocol pages:

```
┌─────────────────────────────────────┐
│         HEADER (Navigation)         │
├─────────────────────────────────────┤
│                                     │
│     PROTOCOL CONTENT                │
│     (Title, sections, etc.)         │
│                                     │
├─────────────────────────────────────┤
│   ─────────────────────────────     │ ← Border separator
│   ← Back to Lab Protocols           │ ← Secondary button
├─────────────────────────────────────┤
│        FOOTER (Copyright)           │
└─────────────────────────────────────┘
```

## Button Styling

### Default State
```
┌──────────────────────────────┐
│ ← Back to Lab Protocols      │
└──────────────────────────────┘
  Light green background
  Dark green text
```

### Hover State
```
┌──────────────────────────────┐
│ ← Back to Lab Protocols      │ ↑ (lifts up)
└──────────────────────────────┘
  Dark green background
  White text
  Enhanced shadow
```

## Color Values

| Element | Color | Hex |
|---------|-------|-----|
| Button Background (default) | Pale Accent | #d8f3dc |
| Button Text (default) | Accent Dark | #2d6a4f |
| Button Border | Accent | #2d6a4f |
| Button Background (hover) | Accent | #2d6a4f |
| Button Text (hover) | Surface | #ffffff |
| Separator Line | Border | #e2e0da |

## How It Works

1. **Individual protocols** use the `lab-protocol.njk` layout in their front matter
2. **The layout injects** the protocol footer with the back button
3. **Button links to** `/lab-protocols/` (the protocol listing page)
4. **Styling is consistent** with your existing design system
5. **Works on all devices** - responsive design built-in

## Quick Start for New Protocols

To create a new lab protocol that includes the back button:

1. Create a new file: `content/lab-protocols/your-protocol.md`

2. Add the front matter:
```yaml
---
layout: layouts/lab-protocol.njk
title: Your Protocol Title
description: Full description
tags: [tag1, tag2]
date: 2024-01-01
short-description: Brief version
---
```

3. Write your protocol content in markdown

4. Run `npm run build` - the back button is automatically included!

## Design Consistency

The template maintains consistency with your existing design:
- ✅ Uses your green accent colors
- ✅ Follows your typography (Crimson Pro + system fonts)
- ✅ Matches button styling patterns
- ✅ Includes smooth transitions
- ✅ Responsive on mobile devices

## Notes

- The template inherits **all header/nav functionality** from base.njk
- The **protocol footer** is always before the site footer
- The **back button** is automatically added to every protocol
- You can **customize the button text** by editing `lab-protocol.njk`
- You can **adjust styling** by editing the CSS classes in `style.css`

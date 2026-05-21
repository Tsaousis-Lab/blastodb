# Collector Component - Quick Start Guide

## What You Just Got

I've created a powerful **Collector Component** for your BlastoDB project. This component lets you display dynamic collections of items (like lab protocols, subtypes, etc.) with built-in search and filtering.

## What's Been Added

### 1. **Parser Enhancement** (`lib/parser.js`)
- Added parsing for `[collector]` syntax
- Added support for `[start:item]...[end:item]` blocks with metadata
- Parser now recognizes and processes the collector block syntax

### 2. **Styling** (`assets/style.css`)
- Comprehensive styling for all collector components
- Responsive design (works beautifully on mobile)
- Tag filter buttons with hover effects
- Search input with focus states
- Card-based item layout with hover effects
- Both column and grid arrangement options

### 3. **JavaScript Functionality** (`assets/main.js`)
- Real-time search across titles and descriptions
- Multi-tag filtering
- Date formatting
- Dynamic item rendering
- Responsive to layout changes

### 4. **Example Collection** (`content/lab-protocols.md`)
- Ready-to-use example page with 6 sample lab protocols
- Demonstrates all collector features
- Includes hero section and documentation

### 5. **Documentation** (`COLLECTOR_COMPONENT.md`)
- Complete reference guide
- Usage examples
- CSS classes reference
- JavaScript API documentation

## How to Use

### Basic Syntax
```markdown
[collector -> path; tags:bool; date:bool; search:bool; arrange:cols|grid; display_items:int|all]
```

### Example: Lab Protocols
```markdown
[collector -> lab-protocols; tags:true; date:true; search:true; arrange:cols; display_items:all]
```

## Parameters Explained

| Parameter | Options | Default | What It Does |
|-----------|---------|---------|--------------|
| `path` | any string | — | Data collection to display |
| `tags` | true/false | true | Show tag filters |
| `date` | true/false | true | Show dates |
| `search` | true/false | true | Show search box |
| `arrange` | cols / grid / rows | cols | 2-column, grid, or list layout |
| `display_items` | number or "all" | all | How many items to show |

## Features

✅ **Search** - Full-text search across titles and descriptions  
✅ **Tag Filtering** - Click tags to filter items  
✅ **Responsive** - Works on desktop, tablet, and mobile  
✅ **Fast** - Real-time filtering with no page reload  
✅ **Customizable** - Show/hide any feature you want  
✅ **Flexible Layouts** - Choose between columns or grid  
✅ **Date Display** - Format dates automatically  

## Sample Data Structure

The component expects items like this:
```javascript
{
  title: "Item Title",
  description: "Brief description",
  tags: ["tag1", "tag2"],
  date: "2024-01-15"
}
```



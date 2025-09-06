# Mico CSS Framework

Welcome to Mico - a utility-first CSS framework for building beautiful, responsive, and customizable websites with ease!

Mico is a lightweight and versatile CSS framework designed to make building responsive and beautiful web interfaces a breeze. With Mico's utility classes, you can quickly create modern and stylish websites without the bloat of larger frameworks.

## Features

- **Utility-First Approach**: Build custom designs without leaving your HTML using composable utility classes.
- **Responsive Design**: Mico ensures that your website looks great on any device, from desktops to smartphones.
- **Easy to Use**: With intuitive utility classes, Mico makes it simple to create stunning layouts.
- **Customizable**: Tailor Mico to fit your unique style with customizable variables and utility classes.
- **Lightweight**: Mico is designed to be lightweight, ensuring fast loading times for your website.
- **Flexible**: Whether you're building a blog, portfolio, or e-commerce site, Mico adapts to your needs.
- **Accessible**: Built with accessibility in mind, following WCAG 2.1 AA standards.
- **Dark Mode Support**: Seamlessly switch between light and dark modes.
- **Theming System**: Create custom themes with ease.

## Getting Started

### Via CDN

Add the following link tag to your HTML file:

```html
<!-- Latest version (recommended) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mico-css@latest/dist/css/mico.min.css">

<!-- Specific version (for production) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mico-css@1.0.0/dist/css/mico.min.css">
```

### Via NPM

```bash
npm install mico-css
```

Then import in your project:

```css
@import 'mico-css/dist/css/mico.min.css';
```

Or in JavaScript:

```javascript
import 'mico-css/dist/css/mico.min.css';
```

For JavaScript functionality (theme switching, etc.):

```html
<script src="https://cdn.jsdelivr.net/gh/michaelkatiba/mico@latest/dist/js/mico.min.js"></script>
```

### Local Installation

1. Clone the repository:

```bash
git clone https://github.com/michaelkatiba/mico.git
```

2. Install dependencies:

```bash
npm install
```

3. Build the CSS:

```bash
npm run build:css
```

4. Link the CSS in your HTML:

```html
<link rel="stylesheet" href="path/to/dist/css/mico.min.css">
```

### WordPress (Oxygen Builder Integration)
_More integration coming soon_

Add this code snippet using your preferred code snippet plugin:

```php
function enqueue_mico_framework() {
    if (defined('SHOW_CT_BUILDER') && !defined('OXYGEN_IFRAME')) {
        return;
    }

    wp_enqueue_style(
        'mico-framework',
        'https://cdn.jsdelivr.net/gh/michaelkatiba/mico@latest/dist/css/mico.min.css',
        array(),
        '1.0.0'
    );

    wp_enqueue_script(
        'mico-framework-js',
        'https://cdn.jsdelivr.net/gh/michaelkatiba/mico@latest/dist/js/mico.min.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'enqueue_mico_framework', 999);
```

### Usage with Astro

Import Mico in your Astro project:

```astro
---
// In your Astro layout or component
import '../path/to/dist/css/mico.min.css';
---
```

## Customization

### Using CSS Variables

Mico uses CSS variables for easy customization. Override them in your own CSS:

```css
:root {
  --mico-color-primary: #3498db;
  --mico-color-secondary: #2ecc71;
  --mico-color-accent: #e74c3c;
}
```

### Using the Theme System

Mico includes a powerful theming system. Add the theme CSS and JavaScript:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/michaelkatiba/mico@latest/dist/css/themes/theme.min.css">
<script src="https://cdn.jsdelivr.net/gh/michaelkatiba/mico@latest/dist/js/mico.theme.min.js"></script>
```

Then use the theme attributes:

```html
<!-- Theme toggle button -->
<button data-theme-toggle>Toggle Dark Mode</button>

<!-- Theme selector dropdown -->
<select data-theme-select>
  <option value="system">System Preference</option>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="ocean">Ocean</option>
  <option value="forest">Forest</option>
  <option value="sunset">Sunset</option>
</select>
```

### Creating a Custom Build

You can create a custom build with only the utilities you need:

1. Edit the `mico.config.js` file to include only the utilities you need.
2. Run the custom build script:

```bash
npm run build:custom
```

3. Use the custom build in your HTML:

```html
<link rel="stylesheet" href="path/to/dist/css/mico.custom.min.css">
```

## Utility Classes

Mico provides a comprehensive set of utility classes for building custom interfaces. Here are a few examples:

### Example: Button

```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-sm">Small Button</button>
<button class="btn btn-lg">Large Button</button>
<button class="btn btn-outline">Outline Button</button>
```

### Example: Card-like Element Using Utilities

```html
<div class="d-flex flex-column border rounded overflow-hidden">
  <div class="p-3 bg-light border-bottom">Card Header</div>
  <div class="p-4 flex-grow-1">
    <h3 class="mb-3">Card Title</h3>
    <p class="mb-0">This is a card with some content.</p>
  </div>
  <div class="p-3 bg-light border-top">
    <button class="btn btn-sm btn-primary">Read More</button>
  </div>
</div>
```

## Browser Support

Mico supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Usage Notes

- Production-ready for most projects
- Optimized for performance and accessibility
- Actively being developed with frequent updates

## Feedback

Your feedback and bug reports are valuable to us as we work towards improving Mico. Feel free to open issues on GitHub.

## 📁 Project Structure

```
mico/
├── src/                          # Source files (development)
│   ├── css/                      # CSS source files
│   │   ├── core/                 # Core framework files
│   │   │   ├── variables.css     # CSS custom properties
│   │   │   └── reset.css         # CSS reset/normalize
│   │   ├── utilities/            # Utility classes
│   │   │   ├── spacing.css       # Margin, padding utilities
│   │   │   ├── typography.css    # Font, text utilities
│   │   │   ├── colors.css        # Background, text colors
│   │   │   ├── borders.css       # Border, radius utilities
│   │   │   ├── layout.css        # Display, grid, flex utilities
│   │   │   └── states.css        # Hover, focus, active states
│   │   └── mico.css              # Main entry point
│   ├── js/                       # JavaScript source files
│   └── jit/                      # Just-in-time compilation
├── dist/                         # Built files (production)
│   ├── css/
│   │   ├── mico.css              # Full framework (unminified)
│   │   ├── mico.min.css          # Full framework (minified)
│   │   ├── variables.css         # Variables only
│   │   └── variables.min.css     # Variables only (minified)
│   └── js/
│       ├── mico.js               # Framework JS (unminified)
│       └── mico.min.js           # Framework JS (minified)
├── docs/                         # Documentation
│   └── guidelines/               # Development guidelines
├── build/                        # Build scripts
├── tests/                        # Test files
└── sandbox/                      # Development playground
```

## 🎨 Framework Philosophy

**Mico CSS** follows a **utility-first approach** with **semantic naming conventions**:

### **Double-Dash Convention**
Mico uses a unique **BEM-inspired naming convention** that provides semantic clarity:

- **Property + Value = Double-dash**: `.w--100`, `.m--4`, `.bg--primary`
- **Direct CSS Values = Single-dash**: `.flex`, `.inline-block`, `.space-between`

This creates **self-documenting** utility classes that are easy to understand and maintain.

### **Modern CSS Standards**
- **OKLCH Color System**: Perceptually uniform colors
- **Logical Properties**: `margin-inline`, `margin-block` for internationalization
- **CSS Custom Properties**: Dynamic theming and customization
- **Rem-Based Scaling**: Consistent typography and spacing

## 🚀 Version History

- **v0.2.5**: Previous release with single-dash convention
- **v1.0.0**: (Upcoming) Major release with double-dash convention and modern CSS standards

---

For more information and documentation, visit our [GitHub repository](https://github.com/MichaelKatiba/mico).
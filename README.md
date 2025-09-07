# Mico CSS Framework

A modern, utility-first CSS framework for building beautiful, responsive websites with ease.

Mico is a lightweight and versatile CSS framework designed to make building responsive and beautiful web interfaces a breeze. With Mico's utility classes, you can quickly create modern and stylish websites without the bloat of larger frameworks.

## Features

- **Utility-First Approach**: Build custom designs without leaving your HTML using composable utility classes
- **Responsive Design**: Looks great on any device, from desktops to smartphones
- **Easy to Use**: Intuitive utility classes make it simple to create stunning layouts
- **Customizable**: Tailor Mico to fit your unique style with CSS variables
- **Lightweight**: Designed for fast loading times
- **Flexible**: Adapts to any project - blogs, portfolios, e-commerce sites, and more
- **Accessible**: Built following WCAG 2.1 AA standards
- **Modern CSS**: Uses OKLCH colors, logical properties, and rem-based scaling

## Quick Start

### Via CDN (Recommended)

Add this single line to your HTML `<head>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@micoframework/micocss@latest/dist/css/mico.min.css">
```

For production, use a specific version:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@micoframework/micocss@1.0.0/dist/css/mico.min.css">
```

### Via NPM

```bash
npm install @micoframework/micocss
```

Then import in your CSS:

```css
@import '@micoframework/micocss/dist/css/mico.min.css';
```

Or in JavaScript:

```javascript
import '@micoframework/micocss/dist/css/mico.min.css';
```

### WordPress Integration

Add Mico to your WordPress site by adding this to your theme's functions.php or using a code snippets plugin:

```php
function enqueue_mico_framework() {
    wp_enqueue_style(
        'mico-framework',
        'https://cdn.jsdelivr.net/npm/@micoframework/micocss@latest/dist/css/mico.min.css',
        array(),
        '1.0.0'
    );
}
add_action('wp_enqueue_scripts', 'enqueue_mico_framework');
```

Most WordPress themes and page builders also have sections for adding custom CSS/JS resources where you can simply paste the CDN link.

## Customization

### Using CSS Variables

Mico uses CSS variables for easy customization. Override them in your own CSS:

```css
:root {
  --mico-color-primary: #3498db;
  --mico-color-secondary: #2ecc71;
  --mico-color-accent: #e74c3c;
  --mico-font-family-base: 'Inter', sans-serif;
  --mico-border-radius-base: 0.5rem;
}
```

### Creating a Custom Build

Want to include only the utilities you need? Create a custom build to reduce file size:

1. **Install Mico via NPM** (required for custom builds):
   ```bash
   npm install @micoframework/micocss
   ```

2. **Create a configuration file** (`mico.config.js`) in your project root:
   ```javascript
   module.exports = {
     utilities: [
       'spacing',      // margin, padding utilities
       'typography',   // font, text utilities
       'colors',       // background, text colors
       'layout',       // display, grid, flex utilities
       'borders',      // border, radius utilities
       // Add only the utilities you need
     ]
   };
   ```

3. **Run the custom build**:
   ```bash
   npx mico build
   ```

4. **Use your custom build**:
   ```html
   <link rel="stylesheet" href="dist/mico.custom.min.css">
   ```

This approach can reduce your CSS bundle size by up to 70% depending on which utilities you include.

## Usage Examples

Mico provides a comprehensive set of utility classes for building custom interfaces. Here are some examples to get you started:

### Basic Layout

```html
<!-- Flexbox container with spacing -->
<div class="d--flex justify--center align--center p--4 gap--3">
  <div class="bg--primary text--white p--3 rounded">Item 1</div>
  <div class="bg--secondary text--white p--3 rounded">Item 2</div>
  <div class="bg--accent text--white p--3 rounded">Item 3</div>
</div>
```

### Responsive Grid

```html
<!-- Responsive grid layout -->
<div class="grid grid--cols-1 md:grid--cols-2 lg:grid--cols-3 gap--4">
  <div class="bg--light p--4 rounded shadow--sm">Card 1</div>
  <div class="bg--light p--4 rounded shadow--sm">Card 2</div>
  <div class="bg--light p--4 rounded shadow--sm">Card 3</div>
</div>
```

### Typography & Buttons

```html
<!-- Typography and button examples -->
<div class="text--center p--6">
  <h1 class="text--3xl font--bold mb--4">Welcome to Mico</h1>
  <p class="text--lg text--gray-600 mb--6">Build beautiful interfaces with utility classes</p>
  <button class="btn btn--primary btn--lg">Get Started</button>
  <button class="btn btn--outline btn--lg ml--3">Learn More</button>
</div>
```

## Browser Support

Mico supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Resources

- **Documentation**: [micocss.com](https://micocss.com) _(coming soon)_
- **GitHub Repository**: [github.com/micoframework/micocss](https://github.com/micoframework/micocss)
- **NPM Package**: [@micoframework/micocss](https://www.npmjs.com/package/@micoframework/micocss)
- **CDN**: [jsdelivr.net](https://cdn.jsdelivr.net/npm/@micoframework/micocss@latest/dist/css/mico.min.css)

## Contributing

We welcome contributions! Please feel free to submit issues and pull requests on our [GitHub repository](https://github.com/micoframework/micocss).

---

**Mico CSS** - Build beautiful, responsive websites with utility-first CSS.
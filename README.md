# Mico CSS Framework

An intelligent utility-first CSS framework for faster UI builds and zero CSS headaches. Perfect for frontend developers, WordPress, modern web apps, and any project requiring clean, maintainable CSS.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CSS Framework](https://img.shields.io/badge/CSS-Framework-blue.svg)](https://github.com/micoframework/micocss)
[![GitHub Release](https://img.shields.io/github/v/release/micoframework/micocss)](https://github.com/micoframework/micocss/releases)

## 🚀 Quick Start

Add this single line to your HTML `<head>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/micoframework/micocss@latest/dist/css/mico.min.css">
```

That's it! Start using utility classes in your HTML.

## 📦 Installation

### CDN (GitHub)
```html
<!-- Full Framework (Minified) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/micoframework/micocss@latest/dist/css/mico.min.css">

<!-- Full Framework (Unminified) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/micoframework/micocss@latest/dist/css/mico.css">

<!-- Variables Only (Minified) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/micoframework/micocss@latest/dist/css/variables.min.css">

<!-- Variables Only (Unminified) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/micoframework/micocss@latest/dist/css/variables.css">
```

### Download
Download the latest release from our [GitHub releases page](https://github.com/micoframework/micocss/releases/latest).

## 🎨 Getting Started

### Customize Your Brand Colors
Download or copy the content from [styleguide.css](https://github.com/micoframework/micocss/blob/main/src/css/styleguide.css) and customize your brand colors:

```css
:root {
  /* Customize your brand colors */
  --mico-color-primary: oklch(0.7 0.15 250);     /* Your primary brand color */
  --mico-color-secondary: oklch(0.6 0.12 200);   /* Your secondary brand color */
  --mico-color-accent: oklch(0.8 0.18 300);      /* Your accent color */

  /* You can also customize other variables */
  --mico-font-family-base: 'Inter', sans-serif;
  --mico-border-radius-base: 0.5rem;
}
```

### Use the Layout Grid System
```html
<body class="layout-grid">
  <main class="layout-content">
    <!-- Your main content here -->
  </main>

  <section class="layout-wide">
    <!-- Wider content that breaks out of main column -->
  </section>

  <section class="layout-full">
    <!-- Full-width content edge-to-edge -->
  </section>
</body>
```

## 💡 Usage Examples

### Responsive Typography
```html
<h1 class="fs--xxxl fw--700 text--primary">Large Heading</h1>
<h2 class="fs--xxl fw--600 text--secondary">Medium Heading</h2>
<p class="fs--lg text--gray">Body text with relaxed line height</p>
```

### Buttons
```html
<button class="bg--primary text--white p--4 rounded hover-bg--primary-dark">
  Primary Button
</button>
<button class="bg--secondary text--white p--4 rounded hover-bg--secondary-dark">
  Secondary Button
</button>
```

### Flexbox Layout
```html
<div class="flex justify-content--between align-items--center gap--4">
  <div class="flex-1">Content 1</div>
  <div class="flex-1">Content 2</div>
  <div class="flex-1">Content 3</div>
</div>
```

### Grid Layout
```html
<div class="grid grid-cols--3 gap--4">
  <div class="bg--primary-light p--4 rounded">Card 1</div>
  <div class="bg--secondary-light p--4 rounded">Card 2</div>
  <div class="bg--accent-light p--4 rounded">Card 3</div>
</div>
```

### Responsive Utilities
```html
<div class="p--2 md-p--4 lg-p--6">
  <!-- Padding increases on larger screens -->
</div>
<div class="grid grid-cols--1 md-grid-cols--2 lg-grid-cols--3">
  <!-- Responsive grid columns -->
</div>
```

### Spacing Examples
```html
<div class="m--4 p--6">Margin 4, Padding 6</div>
<div class="mt--2 mb--4 px--3">Top margin 2, Bottom margin 4, Horizontal padding 3</div>
```

For all available utility classes, see our [Cheatsheet](https://micocss.com/cheatsheet) (coming soon).





## 🌐 Browser Support

| Browser | Version | Grid Support | Flexbox | Custom Properties | OKLCH Colors |
|---------|---------|--------------|---------|-------------------|--------------|
| Chrome  | 88+     | ✅ Full      | ✅ Full | ✅ Full          | ✅ Full      |
| Firefox | 113+    | ✅ Full      | ✅ Full | ✅ Full          | ✅ Full      |
| Safari  | 15.4+   | ✅ Full      | ✅ Full | ✅ Full          | ✅ Full      |
| Edge    | 88+     | ✅ Full      | ✅ Full | ✅ Full          | ✅ Full      |

**Note**: Framework uses modern CSS features including CSS Grid, Flexbox, Custom Properties (CSS Variables), OKLCH color space, and `clamp()` functions for responsive typography.

## Resources

- **Documentation**: [micocss.com](https://micocss.com) (Coming Soon)
- **GitHub Repository**: [github.com/micoframework/micocss](https://github.com/micoframework/micocss)
- **Latest Release**: [GitHub Releases](https://github.com/micoframework/micocss/releases/latest)
- **CDN**: [jsdelivr.net](https://cdn.jsdelivr.net/gh/micoframework/micocss@latest/dist/css/mico.min.css)

## License & Usage

- **License**: MIT - Free for personal and commercial use
- **Browser Support**: Modern browsers (Chrome 88+, Firefox 113+, Safari 15.4+, Edge 88+)
- **Production Ready**: Optimized for performance with comprehensive utility coverage

## Contributing

We welcome contributions! Please feel free to submit issues and pull requests on our GitHub repository.

---

**Ditch the CSS headaches and use Mico CSS build beautiful, responsive websites.**
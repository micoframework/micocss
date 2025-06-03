# CSS Variables Usage Guide - Mico Framework

This guide explains how to properly use Mico CSS Framework variables in your custom CSS files, including important considerations for responsive and media query-dependent variables.

## Table of Contents
- [Understanding Variable Types](#understanding-variable-types)
- [Safe Variable Usage](#safe-variable-usage)
- [Media Query Variables](#media-query-variables)
- [Best Practices](#best-practices)
- [Common Issues](#common-issues)
- [Examples](#examples)

## Understanding Variable Types

The Mico framework uses three types of CSS variables:

### 1. Static Variables
These variables have fixed values that don't change based on media queries:
```css
--mico-size-16: 16px;
--mico-color-primary: #3b82f6;
--mico-radius-md: 4px;
--mico-fw-500: 500;
```

### 2. Responsive Variables
These variables change based on media queries (like `prefers-color-scheme`):
```css
--mico-shadow-md: var(--mico-shadow-md-light); /* Changes in dark mode */
--mico-shadow-focus: 0 0 0 3px rgba(66, 153, 225, 0.5); /* Changes in dark mode */
```

### 3. Specific Variant Variables
These are the actual values that responsive variables reference:
```css
--mico-shadow-md-light: 0 4px 6px rgba(0, 0, 0, 0.1);
--mico-shadow-md-dark: 0 4px 6px rgba(255, 255, 255, 0.1);
```

## Safe Variable Usage

### ✅ Always Safe to Use
Static variables can be used anywhere without issues:
```css
.my-custom-element {
  padding: var(--mico-size-16);
  color: var(--mico-color-primary);
  border-radius: var(--mico-radius-md);
  font-weight: var(--mico-fw-500);
}
```

### ⚠️ Use with Caution
Responsive variables require special handling in custom CSS:
```css
/* ❌ This may not work as expected */
.my-button {
  box-shadow: var(--mico-shadow-md);
}

/* ✅ Better approach - use specific variants */
.my-button {
  box-shadow: var(--mico-shadow-md-light);
}

@media (prefers-color-scheme: dark) {
  .my-button {
    box-shadow: var(--mico-shadow-md-dark);
  }
}
```

## Media Query Variables

### Shadow Variables
These variables change based on color scheme:
- `--mico-shadow-sm` → `--mico-shadow-sm-light` / `--mico-shadow-sm-dark`
- `--mico-shadow-md` → `--mico-shadow-md-light` / `--mico-shadow-md-dark`
- `--mico-shadow-lg` → `--mico-shadow-lg-light` / `--mico-shadow-lg-dark`
- `--mico-shadow-xl` → `--mico-shadow-xl-light` / `--mico-shadow-xl-dark`

### Focus Variables
These also adapt to color schemes and contrast preferences:
- `--mico-shadow-focus`
- `--mico-shadow-inset-sm`
- `--mico-shadow-inset-md`

## Best Practices

### 1. Prefer Framework Utility Classes
Instead of using variables directly, use framework utilities:
```css
/* ❌ Avoid this */
.my-button {
  box-shadow: var(--mico-shadow-md);
}

/* ✅ Use framework utilities */
<button class="btn btn-shadow">My Button</button>
```

### 2. Use Specific Variants for Custom CSS
When you must use variables directly:
```css
.custom-card {
  /* Light mode */
  box-shadow: var(--mico-shadow-md-light);
  border: 1px solid var(--mico-color-border-primary);
}

@media (prefers-color-scheme: dark) {
  .custom-card {
    /* Dark mode */
    box-shadow: var(--mico-shadow-md-dark);
    border-color: var(--mico-color-border-secondary);
  }
}
```

### 3. Test in Both Light and Dark Modes
Always test your custom CSS in both color schemes:
```css
/* Test this in both light and dark browser settings */
.my-element {
  background: var(--mico-color-bg-primary);
  color: var(--mico-color-text-primary);
  box-shadow: var(--mico-shadow-sm-light);
}

@media (prefers-color-scheme: dark) {
  .my-element {
    box-shadow: var(--mico-shadow-sm-dark);
  }
}
```

## Common Issues

### Issue 1: Shadows Not Appearing
**Problem**: Using `var(--mico-shadow-md)` in custom CSS doesn't show shadows.
**Solution**: Use specific variants or framework utilities.

```css
/* ❌ Problem */
.btn {
  box-shadow: var(--mico-shadow-md) !important;
}

/* ✅ Solution 1: Use specific variants */
.btn {
  box-shadow: var(--mico-shadow-md-light) !important;
}

@media (prefers-color-scheme: dark) {
  .btn {
    box-shadow: var(--mico-shadow-md-dark) !important;
  }
}

/* ✅ Solution 2: Use framework utilities */
<button class="btn shadow-md">Button</button>
```

### Issue 2: Inconsistent Behavior Across Browsers
**Problem**: Variables work differently in different browsers.
**Solution**: Always provide fallbacks and test thoroughly.

```css
.my-element {
  /* Fallback */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* Framework variable */
  box-shadow: var(--mico-shadow-md-light);
}
```

## Examples

### Example 1: Custom Button with Proper Shadow Support
```css
.custom-btn {
  padding: var(--mico-size-12) var(--mico-size-24);
  border-radius: var(--mico-radius-md);
  background: var(--mico-color-primary);
  color: white;
  border: none;
  cursor: pointer;
  
  /* Light mode shadow */
  box-shadow: var(--mico-shadow-md-light);
  transition: box-shadow 0.2s ease;
}

.custom-btn:hover {
  box-shadow: var(--mico-shadow-lg-light);
}

@media (prefers-color-scheme: dark) {
  .custom-btn {
    box-shadow: var(--mico-shadow-md-dark);
  }
  
  .custom-btn:hover {
    box-shadow: var(--mico-shadow-lg-dark);
  }
}
```

### Example 2: Custom Card Component
```css
.custom-card {
  padding: var(--mico-size-24);
  border-radius: var(--mico-radius-lg);
  background: var(--mico-color-bg-primary);
  border: 1px solid var(--mico-color-border-primary);
  
  /* Responsive shadow */
  box-shadow: var(--mico-shadow-sm-light);
}

@media (prefers-color-scheme: dark) {
  .custom-card {
    box-shadow: var(--mico-shadow-sm-dark);
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .custom-card {
    border-width: 2px;
    box-shadow: none;
  }
}
```

### Example 3: Using Framework Utilities (Recommended)
```html
<!-- Instead of custom CSS, use framework utilities -->
<div class="p-24 radius-lg bg-primary border border-primary shadow-sm">
  <h3 class="fs-lg fw-600 text-white">Card Title</h3>
  <p class="fs-md text-white-200">Card content goes here.</p>
  <button class="btn btn-shadow bg-white text-primary">Action</button>
</div>
```

## Quick Reference

### Safe Variables (Use Anywhere)
- Size: `--mico-size-*`
- Colors: `--mico-color-*` (except responsive ones)
- Typography: `--mico-fs-*`, `--mico-fw-*`, `--mico-lh-*`
- Border radius: `--mico-radius-*`

### Requires Media Query Support
- Shadows: `--mico-shadow-*` (use `-light`/`-dark` variants)
- Focus indicators: `--mico-shadow-focus`
- Inset shadows: `--mico-shadow-inset-*`

### Best Practice
When in doubt, use framework utility classes instead of variables directly.

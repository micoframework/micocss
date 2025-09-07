# 🚀 Migration Guide: v0.2.5 → v1.0.0

**This guide helps you upgrade from Mico CSS v0.2.5 to v1.0.0 with the new double-dash naming convention.**

## ⚠️ **Breaking Changes Overview**

### **Major Change: Double-Dash Naming Convention**

Mico CSS v1.0.0 introduces a **BEM-inspired double-dash naming convention** that provides semantic clarity:

- **Property + Value = Double-dash**: `.w--100`, `.m--4`, `.bg--primary`
- **Direct CSS Values = Single-dash**: `.flex`, `.inline-block`, `.space-between`

This change affects **most utility classes** and requires updating your HTML.

---

## 🔄 **Automated Migration**

### **Find & Replace Patterns**

Use these regex patterns in your code editor to automate most of the migration:

#### **Spacing Utilities**
```regex
# Margins
\.m-(\d+) → .m--$1
\.mt-(\d+) → .mt--$1
\.mb-(\d+) → .mb--$1
\.ml-(\d+) → .ml--$1
\.mr-(\d+) → .mr--$1
\.mx-(\d+) → .m-x--$1
\.my-(\d+) → .m-y--$1

# Paddings
\.p-(\d+) → .p--$1
\.pt-(\d+) → .pt--$1
\.pb-(\d+) → .pb--$1
\.pl-(\d+) → .pl--$1
\.pr-(\d+) → .pr--$1
\.px-(\d+) → .p-x--$1
\.py-(\d+) → .p-y--$1
```

#### **Sizing Utilities**
```regex
# Width & Height
\.w-(\d+|auto|none|screen|fit|min|max|\d+p) → .w--$1
\.h-(\d+|auto|none|screen|fit|min|max|\d+p) → .h--$1

# Min/Max Width & Height
\.min-w-(\w+) → .min-w--$1
\.min-h-(\w+) → .min-h--$1
\.max-w-(\w+) → .max-w--$1
\.max-h-(\w+) → .max-h--$1
```

#### **Color Utilities**
```regex
# Background Colors
\.bg-(primary|secondary|accent|neutral|success|warning|error|\w+-\d+) → .bg--$1

# Text Colors
\.text-(primary|secondary|accent|neutral|success|warning|error|\w+-\d+) → .text--$1

# Border Colors
\.border-(primary|secondary|accent|neutral|success|warning|error|\w+-\d+) → .border--$1
```

#### **Border Utilities**
```regex
# Border Width
\.border-(\d+) → .border--$1

# Border Radius
\.rounded-(none|sm|md|lg|xl|full) → .rounded--$1
```

#### **Typography Utilities**
```regex
# Font Size
\.fs-(\d+) → .fs--$1

# Font Weight
\.fw-(light|normal|medium|semibold|bold|black) → .fw--$1
```

#### **Layout Utilities**
```regex
# Positioning
\.right-(\d+|auto) → .right--$1
\.bottom-(\d+|auto) → .bottom--$1
\.left-(\d+|auto) → .left--$1
\.top-(\d+|auto) → .top--$1

# Inset
\.inset-(\d+|auto) → .inset--$1
\.inset-x-(\d+|auto) → .inset-x--$1
\.inset-y-(\d+|auto) → .inset-y--$1

# Grid
\.col-end-(\d+) → .col-end--$1
\.row-start-(\d+) → .row-start--$1
\.row-end-(\d+) → .row-end--$1
```

---

## ✅ **Classes That DON'T Change**

These classes remain **exactly the same** because they use direct CSS values:

### **Display Values**
```css
.block, .inline, .flex, .grid
.inline-block, .inline-flex, .inline-grid
.table, .table-row, .table-cell
.none, .contents, .flow-root
```

### **Position Values**
```css
.static, .relative, .absolute, .fixed, .sticky
```

### **Flexbox Values**
```css
.justify-start, .justify-center, .justify-between
.items-start, .items-center, .items-end
.flex-row, .flex-col, .flex-wrap, .flex-nowrap
.space-between, .space-around, .space-evenly
```

### **Text Values**
```css
.text-left, .text-center, .text-right
.uppercase, .lowercase, .capitalize
.underline, .line-through, .no-underline
```

### **Border Styles**
```css
.border-solid, .border-dashed, .border-dotted
.border-none
```

---

## 📝 **Manual Migration Examples**

### **Before (v0.2.5)**
```html
<div class="w-100 h-50 m-4 p-8 bg-primary text-white border-2 rounded-lg">
  <h1 class="fs-24 fw-bold mb-4">Heading</h1>
  <p class="fs-16 text-center">Content</p>
</div>
```

### **After (v1.0.0)**
```html
<div class="w--100 h--50 m--4 p--8 bg--primary text--white border--2 rounded--lg">
  <h1 class="fs--24 fw--bold mb--4">Heading</h1>
  <p class="fs--16 text-center">Content</p>
</div>
```

**Note**: `text-center` remains unchanged because it's a direct CSS value.

---

## 🔧 **Step-by-Step Migration Process**

### **1. Backup Your Project**
```bash
git commit -am "Backup before Mico CSS v1.0.0 migration"
```

### **2. Update CDN Link**
```html
<!-- Old v0.2.5 (GitHub CDN) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/michaelkatiba/mico@v0.2.5/dist/css/mico.min.css">

<!-- New v1.0.0 (NPM CDN - Recommended) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@micoframework/micocss@1.0.0/dist/css/mico.min.css">

<!-- Alternative: Latest version -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@micoframework/micocss@latest/dist/css/mico.min.css">
```

### **3. Run Find & Replace**
Use the regex patterns above in your code editor to update utility classes.

### **4. Test Your Application**
- Check all pages for layout issues
- Verify responsive design still works
- Test interactive elements (hover, focus states)

### **5. Update Custom CSS**
If you have custom CSS that references Mico classes, update those as well.

---

## 🛠️ **Migration Tools**

### **VS Code Extension**
Consider using the "Search and Replace" extension with regex support for batch updates.

### **Command Line (Linux/Mac)**
```bash
# Example: Update margin classes in all HTML files
find . -name "*.html" -exec sed -i 's/\.m-\([0-9]\+\)/\.m--\1/g' {} +
```

### **Node.js Script**
```javascript
// migration-script.js
const fs = require('fs');
const path = require('path');

const patterns = [
  { from: /\.m-(\d+)/g, to: '.m--$1' },
  { from: /\.p-(\d+)/g, to: '.p--$1' },
  { from: /\.w-(\d+)/g, to: '.w--$1' },
  // Add more patterns as needed
];

// Run on your HTML files
```

---

## ⚡ **Quick Reference**

### **Most Common Changes**
| **v0.2.5** | **v1.0.0** | **Type** |
|------------|-------------|----------|
| `.m-4` | `.m--4` | Spacing |
| `.p-8` | `.p--8` | Spacing |
| `.w-100` | `.w--100` | Sizing |
| `.bg-primary` | `.bg--primary` | Color |
| `.fs-16` | `.fs--16` | Typography |
| `.border-2` | `.border--2` | Border |
| `.rounded-lg` | `.rounded--lg` | Border |
| `.right-0` | `.right--0` | Position |

### **No Changes Needed**
| **Class** | **Reason** |
|-----------|------------|
| `.flex` | Direct CSS value |
| `.inline-block` | Direct CSS value |
| `.text-center` | Direct CSS value |
| `.justify-between` | Direct CSS value |
| `.relative` | Direct CSS value |

---

## 🆘 **Troubleshooting**

### **Common Issues**

#### **Layout Broken After Migration**
- **Check**: Ensure all utility classes were updated correctly
- **Solution**: Use browser dev tools to identify missing classes

#### **Styles Not Applied**
- **Check**: Verify CDN link points to v1.0.0
- **Solution**: Clear browser cache and reload

#### **Custom CSS Conflicts**
- **Check**: Update any custom CSS that references old class names
- **Solution**: Search for old patterns in your CSS files

### **Getting Help**
- Check the [GitHub Issues](https://github.com/MichaelKatiba/mico/issues)
- Review the [documentation](docs/guidelines/)
- Join our community discussions

---

## 🎉 **Benefits of v1.0.0**

After migration, you'll enjoy:

- **Semantic Clarity**: Class names are self-documenting
- **Better Developer Experience**: Intuitive naming convention
- **Modern CSS Features**: OKLCH colors, logical properties
- **Improved Performance**: Optimized bundle size
- **Future-Proof**: Stable API for long-term projects

---

**Migration complete? Welcome to Mico CSS v1.0.0! 🚀**

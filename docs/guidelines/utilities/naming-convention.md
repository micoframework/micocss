# 🎯 Mico CSS Naming Convention - The Double-Dash Logic

**This is the definitive guide for understanding and applying Mico CSS's BEM-inspired double-dash naming convention.**

## 🧠 The Core Philosophy

**Double-dash (`--`) indicates semantic separation between CSS property and custom value**
**Single-dash (`-`) is reserved for compound CSS values from the CSS specification**

This creates **semantic clarity** that makes utility classes self-documenting and logically structured.

---

## 📐 The Golden Rule

### **✅ USE DOUBLE-DASH WHEN:**
**You're combining a CSS property abbreviation with a custom value**

```css
/* Property Abbreviation + Custom Value = Double-Dash */
.w--100         /* width: 100px (custom size) */
.m--4           /* margin: 4px (custom size) */
.bg--primary    /* background-color: var(--mico-color-primary) (custom color) */
.fs--16         /* font-size: 16px (custom size) */
.border--2      /* border-width: 2px (custom width) */
.rounded--lg    /* border-radius: large (custom radius) */
.z--10          /* z-index: 10 (custom index) */
.opacity--50    /* opacity: 0.5 (custom opacity) */
```

### **❌ DON'T USE DOUBLE-DASH WHEN:**
**You're using direct CSS specification values (especially compound values)**

```css
/* Direct CSS Values = Single-Dash (or no dash) */
.flex              /* display: flex */
.inline-block      /* display: inline-block */
.table-row         /* display: table-row */
.space-between     /* justify-content: space-between */
.flex-start        /* align-items: flex-start */
.grid-cols-3       /* grid-template-columns: repeat(3, 1fr) */
.relative          /* position: relative */
.uppercase         /* text-transform: uppercase */
```

---

## 🔍 Decision Flowchart

```
Is this a direct CSS value name?
├─ YES → Use single-dash (or no dash)
│   └─ Examples: .flex, .inline-block, .space-between
│
└─ NO → Is this property + custom value?
    ├─ YES → Use double-dash
    │   └─ Examples: .w--100, .bg--primary, .m--4
    │
    └─ UNSURE → Check CSS specification
        ├─ Found in CSS spec → Single-dash
        └─ Not in CSS spec → Double-dash
```

---

## 📚 Category-by-Category Examples

### **🎨 Colors (Double-Dash)**
```css
/* Background Colors */
.bg--primary, .bg--secondary, .bg--accent
.bg--neutral-100, .bg--neutral-900
.bg--success, .bg--warning, .bg--error

/* Text Colors */
.text--primary, .text--white, .text--black
.text--neutral-500, .text--accent-light

/* Border Colors */
.border--primary, .border--transparent
```

### **📏 Sizing (Double-Dash)**
```css
/* Width */
.w--auto, .w--100, .w--50p, .w--screen
.min-w--none, .max-w--full

/* Height */
.h--auto, .h--100, .h--50p, .h--screen
.min-h--none, .max-h--full
```

### **📦 Spacing (Mixed Patterns)**
```css
/* Basic Margin/Padding (Double-Dash) */
.m--0, .m--2, .m--4, .m--8, .m--auto
.mt--4, .mb--8, .ml--2, .mr--6
.p--0, .p--2, .p--4, .p--8
.pt--4, .pb--8, .pl--2, .pr--6

/* Logical Properties (Single-dash + Double-dash) */
.m-x--4, .m-y--8    /* margin-inline, margin-block */
.p-x--4, .p-y--8    /* padding-inline, padding-block */
```

### **🎭 Display & Layout (Single-Dash)**
```css
/* Display Values */
.block, .inline, .flex, .grid
.inline-block, .inline-flex, .inline-grid
.table, .table-row, .table-cell

/* Position Values */
.static, .relative, .absolute, .fixed, .sticky
```

### **🔧 Flexbox & Grid (Property + Double-dash + Value)**
```css
/* Flexbox Properties (Full Property Names) */
.justify-content--center, .justify-content--between
.align-items--start, .align-items--center, .align-items--end
.align-content--start, .align-content--center
.justify-items--start, .justify-items--center    /* Grid-specific */

/* Flex Direction & Wrap (Property + Double-dash) */
.flex--row, .flex--column, .flex--wrap, .flex--nowrap

/* Grid Template (Property + Double-dash) */
.grid-cols--1, .grid-cols--12
.grid-rows--1, .grid-rows--6

/* Grid Positioning (Property + Double-dash) */
.col--1, .col--12, .row--1, .row--6
.col-start--1, .col-end--12
.row-start--1, .row-end--6
```

### **🎨 Typography (Mixed)**
```css
/* Font Sizes (Double-Dash - Custom Values) */
.fs--12, .fs--14, .fs--16, .fs--18, .fs--24

/* Font Weights (Double-Dash - Custom Values) */
.fw--light, .fw--normal, .fw--bold, .fw--black

/* Text Alignment (Single-Dash - CSS Values) */
.text-left, .text-center, .text-right, .text-justify

/* Text Transform (Single-Dash - CSS Values) */
.uppercase, .lowercase, .capitalize
```

### **🎯 Borders (Double-Dash)**
```css
/* Border Width */
.border--0, .border--1, .border--2, .border--4

/* Border Radius */
.rounded--none, .rounded--sm, .rounded--md, .rounded--lg
.rounded-t--lg, .rounded-r--md

/* Border Style (Exception: Direct CSS values) */
.border-solid, .border-dashed, .border-dotted
```

---

## ⚠️ Common Pitfalls & Solutions

### **❌ Wrong:**
```css
.display--flex          /* display is not abbreviated, flex is CSS value */
.position--relative     /* position is not abbreviated, relative is CSS value */
.justify-content--center /* too verbose, center is CSS value */
.w-100                  /* missing semantic separation */
.bg-primary             /* missing semantic separation */
```

### **✅ Correct:**
```css
.flex                   /* Direct CSS value */
.relative               /* Direct CSS value */
.justify-center         /* Shortened CSS value */
.w--100                 /* Property + custom value */
.bg--primary            /* Property + custom value */
```

---

## 🎯 Quick Reference

| **Pattern** | **Use Case** | **Example** |
|-------------|--------------|-------------|
| `property--value` | CSS property + custom value | `.w--100`, `.bg--primary` |
| `css-value` | Direct CSS specification value | `.flex`, `.inline-block` |
| `property-css-value` | Property + CSS value | `.text-center`, `.border-solid` |

---

## 🔧 Implementation Guidelines

### **For AI/Developers:**
1. **Always check CSS specification first**
2. **When in doubt, ask: "Is this a real CSS value?"**
3. **Maintain consistency within utility categories**
4. **Document exceptions with clear reasoning**
5. **Update this guide when new patterns emerge**

### **For Code Reviews:**
1. **Verify naming convention logic is applied**
2. **Check for consistency across similar utilities**
3. **Ensure no duplicate patterns exist**
4. **Validate semantic clarity of class names**

---

**Last Updated:** $(date)
**Maintained By:** AI-Human Collaboration Team
**Status:** ✅ Active Standard

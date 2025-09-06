# 🎯 Mico CSS Complete Naming Convention Guide

**The definitive guide for understanding and applying Mico CSS's naming patterns across all utility categories.**

## 🧠 **Core Philosophy**

Mico CSS uses **semantic naming patterns** that make utility classes self-documenting and logically structured:

1. **Double-dash (`--`)** = Separates CSS property from custom value
2. **Single-dash (`-`)** = Used for compound CSS values or logical property modifiers
3. **No dash** = Direct CSS values (display, position, etc.)

---

## 📐 **The Complete Pattern System**

### **Pattern 1: Property + Custom Value**
```css
/* Format: .property--value */
.w--100         /* width: 100px */
.m--4           /* margin: 4px */
.bg--primary    /* background-color: var(--mico-color-primary) */
.fs--16         /* font-size: 16px */
.border--2      /* border-width: 2px */
```

### **Pattern 2: Logical Properties (Modern CSS)**
```css
/* Format: .property-axis--value */
.m-x--4         /* margin-inline: 4px */
.m-y--8         /* margin-block: 8px */
.p-x--4         /* padding-inline: 4px */
.p-y--8         /* padding-block: 8px */
```

### **Pattern 3: Complex Properties (Full Property Name)**
```css
/* Format: .full-property-name--value */
.justify-content--center        /* justify-content: center */
.align-items--start            /* align-items: start */
.justify-items--center         /* justify-items: center (grid) */
.align-content--between        /* align-content: space-between */
```

### **Pattern 4: Direct CSS Values**
```css
/* Format: .css-value (no modification) */
.flex               /* display: flex */
.inline-block       /* display: inline-block */
.relative           /* position: relative */
.uppercase          /* text-transform: uppercase */
.space-between      /* Used in compound values */
```

---

## 📚 **Complete Category Breakdown**

### **🎨 Colors**
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

### **📏 Sizing**
```css
/* Width & Height */
.w--auto, .w--100, .w--50p, .w--screen
.h--auto, .h--100, .h--50p, .h--screen

/* Min/Max Sizing */
.min-w--none, .min-w--fit, .min-w--100p
.max-w--none, .max-w--screen, .max-w--100p
.min-h--none, .min-h--screen, .min-h--100p
.max-h--none, .max-h--screen, .max-h--100p
```

### **📦 Spacing**
```css
/* Basic Margin/Padding */
.m--0, .m--4, .m--8, .m--auto
.mt--4, .mb--8, .ml--2, .mr--6
.p--0, .p--4, .p--8
.pt--4, .pb--8, .pl--2, .pr--6

/* Logical Properties (Modern CSS) */
.m-x--4         /* margin-inline: 4px */
.m-y--8         /* margin-block: 8px */
.p-x--4         /* padding-inline: 4px */
.p-y--8         /* padding-block: 8px */
```

### **🎭 Display & Layout**
```css
/* Display Values (Direct CSS) */
.block, .inline, .flex, .grid
.inline-block, .inline-flex, .inline-grid
.table, .table-row, .table-cell
.none, .contents, .flow-root

/* Position Values (Direct CSS) */
.static, .relative, .absolute, .fixed, .sticky
```

### **🔧 Flexbox**
```css
/* Flex Direction & Wrap */
.flex--row, .flex--column, .flex--wrap, .flex--nowrap

/* Justify Content (Full Property Name) */
.justify-content--flex-start
.justify-content--center
.justify-content--between
.justify-content--around
.justify-content--evenly

/* Align Items (Full Property Name) */
.align-items--flex-start
.align-items--center
.align-items--end
.align-items--baseline
.align-items--stretch

/* Align Content (Full Property Name) */
.align-content--start
.align-content--center
.align-content--between
.align-content--stretch
```

### **🏗️ Grid**
```css
/* Grid Template */
.grid-cols--1, .grid-cols--12
.grid-rows--1, .grid-rows--6

/* Grid Items */
.col--1, .col--12
.row--1, .row--6

/* Grid Positioning */
.col-start--1, .col-end--12
.row-start--1, .row-end--6

/* Grid-Specific Alignment */
.justify-items--start, .justify-items--center
.place-items--start, .place-items--center
```

### **📍 Positioning**
```css
/* Position Values */
.top--0, .right--0, .bottom--0, .left--0
.inset--0, .inset--auto
.inset-x--0, .inset-y--0
```

### **🎨 Typography**
```css
/* Font Sizes */
.fs--12, .fs--16, .fs--24, .fs--32

/* Font Weights */
.fw--light, .fw--normal, .fw--bold, .fw--black

/* Text Alignment (Direct CSS) */
.text-left, .text-center, .text-right, .text-justify

/* Text Transform (Direct CSS) */
.uppercase, .lowercase, .capitalize
```

### **🎯 Borders**
```css
/* Border Width */
.border--0, .border--1, .border--2, .border--4

/* Border Radius */
.rounded--none, .rounded--sm, .rounded--md, .rounded--lg

/* Border Style (Direct CSS) */
.border-solid, .border-dashed, .border-dotted
```

---

## 🎯 **Context-Specific Guidelines**

### **Flexbox vs Grid Utilities**

#### **Flexbox-Specific:**
```css
.justify-content--*     /* Works with flex containers */
.align-items--*         /* Works with flex containers */
.flex--row, .flex--column
```

#### **Grid-Specific:**
```css
.justify-items--*       /* Works with grid containers */
.place-items--*         /* Works with grid containers */
.grid-cols--*, .grid-rows--*
.col-start--*, .row-end--*
```

#### **Universal (Both Flex & Grid):**
```css
.align-content--*       /* Works with both */
.justify-self--*        /* Works with both */
.align-self--*          /* Works with both */
```

---

## 🔍 **Decision Flowchart**

```
1. Is this a direct CSS value?
   ├─ YES → Use as-is (.flex, .relative, .uppercase)
   └─ NO → Continue to step 2

2. Is this a logical property (inline/block)?
   ├─ YES → Use single-dash + double-dash (.m-x--4, .p-y--8)
   └─ NO → Continue to step 3

3. Is this a complex CSS property (2+ words)?
   ├─ YES → Use full property name + double-dash (.justify-content--center)
   └─ NO → Continue to step 4

4. Is this property + custom value?
   ├─ YES → Use double-dash (.w--100, .bg--primary)
   └─ NO → Review and classify
```

---

## ⚠️ **Common Pitfalls**

### **❌ Wrong:**
```css
.px--4              /* Should be .p-x--4 (logical property) */
.justify-center     /* Should be .justify-content--center (full property) */
.items-start        /* Should be .align-items--start (full property) */
.display--flex      /* Should be .flex (direct CSS value) */
```

### **✅ Correct:**
```css
.p-x--4             /* padding-inline: 4px */
.justify-content--center  /* justify-content: center */
.align-items--start       /* align-items: start */
.flex                     /* display: flex */
```

---

## 🎯 **WordPress & Platform Compatibility**

### **WordPress-Friendly Patterns:**
- **No special characters** that break WordPress editors
- **Semantic class names** that are self-explanatory
- **Consistent patterns** that are easy to remember
- **No JavaScript dependencies** for maximum compatibility

### **Universal Platform Support:**
- **Pure CSS** - works everywhere
- **Standard HTML classes** - no special syntax
- **CDN delivery** - no build process required
- **Semantic naming** - easy to understand and maintain

---

**Last Updated:** $(date)
**Maintained By:** Mico Framework Team
**Status:** ✅ Complete Reference Guide

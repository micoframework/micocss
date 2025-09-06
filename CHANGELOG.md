# Changelog

All notable changes to the Mico CSS Framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-XX (Upcoming Release)

### 🎉 **MAJOR RELEASE - BREAKING CHANGES**

This release introduces the **double-dash naming convention** and represents the first stable version of Mico CSS Framework.

### ⚠️ **BREAKING CHANGES**

#### **Double-Dash Naming Convention**
- **BREAKING**: All utility classes now use double-dash (`--`) to separate CSS property from custom value
- **BREAKING**: Single-dash (`-`) is reserved for direct CSS specification values
- **Migration Required**: See [MIGRATION.md](MIGRATION.md) for upgrade guide

**Examples of Breaking Changes:**
```css
/* v0.2.5 (Old) → v1.0.0 (New) */
.w-100 → .w--100
.m-4 → .m--4
.bg-primary → .bg--primary
.border-2 → .border--2
.right-0 → .right--0
.min-w-none → .min-w--none

/* These remain unchanged (direct CSS values): */
.flex, .inline-block, .space-between
```

### ✨ **Added**

#### **Core Framework Features**
- **Double-dash naming convention** for semantic clarity
- **OKLCH color system** with perceptually uniform colors
- **Comprehensive spacing utilities** (2px-100px scale)
- **Logical properties support** (margin-inline, margin-block)
- **Modern CSS custom properties** throughout
- **State utilities** (hover, focus, active variations)

#### **Utility Categories**
- **Spacing**: Complete margin/padding utilities with double-dash convention
- **Typography**: Font size, weight, and text utilities
- **Colors**: Background, text, and border color utilities
- **Layout**: Display, flexbox, grid, and positioning utilities
- **Borders**: Border width, radius, and style utilities
- **States**: Hover, focus, and active state variations

#### **Build System**
- **Automated build process** with minification
- **Separate variable files** for modular usage
- **Development and production builds**
- **JSDelivr CDN compatibility**

### 🔧 **Changed**

#### **Framework Architecture**
- **Utility-first approach**: Focus exclusively on utility classes
- **Vanilla CSS only**: No JavaScript dependencies
- **Pruned scale**: Optimized 2-100px range for practical use
- **BEM-inspired naming**: Semantic double-dash convention

#### **File Structure**
- **Reorganized source files** in `src/css/` directory
- **Separated core and utilities** for better organization
- **Updated build output** structure in `dist/`

### 🐛 **Fixed**

#### **Naming Convention Consistency**
- **Fixed layout.css inconsistencies** with double-dash logic
- **Standardized all utility files** to follow naming convention
- **Removed duplicate utility classes**
- **Corrected semantic separation** throughout framework

### 📚 **Documentation**

#### **Comprehensive Guidelines**
- **AI-Human collaboration hub** in `docs/guidelines/`
- **Naming convention guide** with decision flowchart
- **Development workflow** documentation
- **Quality assurance standards**

#### **Migration Support**
- **Migration guide** for v0.2.5 → v1.0.0 upgrade
- **Breaking changes documentation**
- **Updated examples** and usage patterns

### 🎯 **Framework Identity**

#### **Core Values**
- **Semantic Clarity**: Self-documenting utility classes
- **Performance First**: Lean bundle sizes for production
- **Developer Experience**: Intuitive naming and comprehensive coverage
- **Modern Standards**: OKLCH colors, logical properties, rem scaling
- **Vanilla Approach**: No JavaScript dependencies

#### **Target Audience**
- Frontend developers building modern web applications
- WordPress users and theme developers
- Teams prioritizing performance and maintainability
- Projects requiring semantic, readable CSS class names

### 🚀 **Performance**

#### **Optimizations**
- **Reduced bundle size** through pruned utility scale
- **Efficient CSS variables** for dynamic theming
- **Minified production builds** for optimal loading
- **Modular architecture** for selective imports

---

## [0.2.5] - Previous Release

### **Legacy Features**
- Single-dash naming convention
- Basic utility classes
- Initial framework structure

**Note**: v0.2.5 is the last version using single-dash naming. Users should migrate to v1.0.0 for continued support and new features.

---

## Migration Guide

For detailed migration instructions from v0.2.5 to v1.0.0, see [MIGRATION.md](MIGRATION.md).

## Contributing

Please read our [development guidelines](docs/guidelines/workflow.md) for information on our development process and coding standards.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

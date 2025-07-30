# Mico CSS Framework - New Codebase Structure

This document outlines the new professional codebase structure implemented for the Mico CSS Framework.

## 📁 Directory Structure

```
mico/
├── src/                          # Source files (development)
│   ├── css/                      # CSS source files
│   │   ├── core/                 # Core framework files
│   │   │   ├── variables.css     # CSS custom properties
│   │   │   └── accessibility.css # Accessibility features
│   │   ├── utilities/            # Utility classes
│   │   │   ├── animation.css     # Animation utilities
│   │   │   ├── borders.css       # Border utilities
│   │   │   ├── colors.css        # Color utilities
│   │   │   ├── layout.css        # Layout utilities
│   │   │   ├── miscellaneous.css # Misc utilities
│   │   │   ├── responsive.css    # Responsive utilities
│   │   │   ├── spacing.css       # Spacing utilities
│   │   │   ├── states.css        # State utilities (hover, focus)
│   │   │   └── typography.css    # Typography utilities
│   │   ├── components/           # Component-like styles
│   │   │   └── buttons.css       # Button components
│   │   ├── presets/              # Framework presets
│   │   │   ├── oxygenbuilder.pre.css
│   │   │   └── styleguide.css
│   │   └── mico.css              # Main entry point
│   ├── js/                       # JavaScript source files
│   │   └── animation/            # Animation engine
│   └── jit/                      # JIT generator source
│       ├── generator.js          # JIT generator
│       └── runtime.js            # JIT runtime
├── build/                        # Build scripts and tools
│   ├── build-css.js              # CSS build script
│   ├── build-js.js               # JavaScript build script
│   ├── build-variables.js        # Variables build script
│   ├── build-custom.js           # Custom build script
│   └── build-jit.js              # JIT build script
├── dist/                         # Built/compiled files (production)
│   ├── css/                      # Compiled CSS files
│   │   ├── mico.css              # Full framework (unminified)
│   │   ├── mico.min.css          # Full framework (minified)
│   │   ├── mico-utilities.css    # Utilities only (unminified)
│   │   ├── mico-utilities.min.css # Utilities only (minified)
│   │   ├── mico-components.css   # Components only (unminified)
│   │   ├── mico-components.min.css # Components only (minified)
│   │   ├── variables.css         # Variables only (unminified)
│   │   └── variables.min.css     # Variables only (minified)
│   └── js/                       # Compiled JavaScript files
│       ├── mico.js               # Framework JS (unminified)
│       ├── mico.min.js           # Framework JS (minified)
│       └── micocss.jit.js        # JIT generator bundle
├── docs/                         # Documentation
│   └── guidelines/               # Development guidelines
│       ├── utilities/            # Utility guidelines
│       ├── components/           # Component guidelines
│       ├── workflow.md           # Development workflow
│       └── commit-checklist.md   # Commit checklist
├── integrations/                 # Third-party integrations
│   ├── oxygen-builder/           # Oxygen Builder integration
│   └── vscode-extension/         # VS Code extension
├── tests/                        # Test files
└── sandbox/                      # Development sandbox
```

## 🚀 Build Scripts

### Main Build Commands
- `npm run build` - Build everything (CSS, JS, Variables, JIT)
- `npm run build:clean` - Clean and rebuild everything
- `npm run dev` - Start development mode with CSS watching

### Individual Build Commands
- `npm run build:css` - Build all CSS variants (full, utilities-only, components-only)
- `npm run build:js` - Build JavaScript files
- `npm run build:variables` - Build variables-only CSS files
- `npm run build:jit` - Build JIT generator
- `npm run build:custom` - Build custom configurations

### Development Commands
- `npm run watch:css` - Watch CSS files for changes
- `npm run lint:css` - Lint CSS files
- `npm run test` - Run tests
- `npm run serve` - Serve files locally

## 📦 Distribution Files

The framework now generates multiple distribution variants:

### CSS Files
- **mico.css / mico.min.css** - Complete framework
- **mico-utilities.css / mico-utilities.min.css** - Utilities only
- **mico-components.css / mico-components.min.css** - Components only
- **variables.css / variables.min.css** - Variables only

### JavaScript Files
- **mico.js / mico.min.js** - Framework JavaScript
- **micocss.jit.js** - JIT generator for dynamic CSS generation

## 🔄 Migration Notes

### What Changed
1. **Source files moved** from `css/` to `src/css/`
2. **Build scripts moved** from `scripts/` to `build/`
3. **Documentation moved** from `guidelines/` to `docs/guidelines/`
4. **Integrations organized** into `integrations/` directory
5. **New CSS build system** with multiple output variants
6. **Updated package.json scripts** to reflect new structure

### What Stayed the Same
- All functionality is preserved
- Build output remains in `dist/` directory
- CSS class names and API unchanged
- Configuration files remain in root

## 🎯 Benefits

1. **Professional Structure** - Follows industry standards for CSS frameworks
2. **Clear Separation** - Source vs. built files clearly separated
3. **Modular Organization** - Core, utilities, components clearly organized
4. **Multiple Build Variants** - Utilities-only, components-only, full framework
5. **Easier Maintenance** - Logical file organization for easier development
6. **Scalable Architecture** - Easy to add new utilities and components

## 🔧 Development Workflow

1. **Edit source files** in `src/css/`
2. **Run build commands** to generate `dist/` files
3. **Test changes** using sandbox or test files
4. **Commit changes** following the commit checklist
5. **Push to dev branch** for development, main branch for releases

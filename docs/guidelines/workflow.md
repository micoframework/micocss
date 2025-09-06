# 🤖 AI-Human Collaboration Hub - Mico CSS Framework

**This is the central command center for AI-Human collaboration on the Mico CSS Framework.**

## 📋 Table of Contents
- [🎯 Current Project Status](#-current-project-status)
- [🧠 AI Instructions & Rules](#-ai-instructions--rules)
- [🏗️ Framework Architecture](#️-framework-architecture)
- [📐 Naming Convention Logic](#-naming-convention-logic)
- [🔄 Development Workflow](#-development-workflow)
- [📦 Build & Release Process](#-build--release-process)
- [✅ Quality Assurance](#-quality-assurance)
- [🎨 Brand & Project Identity](#-brand--project-identity)
- [📈 Progress Tracking](#-progress-tracking)

---

## 🎯 Current Project Status

### **Framework State:** Development Phase
### **Current Version:** v0.x.x (Pre-release)
### **Active Branch:** `dev`
### **Production Branch:** `main`

### **Recent Achievements:**
- ✅ Implemented double-dash naming convention across 5/6 utility files
- ✅ Completed spacing utilities with comprehensive coverage (2-100px scale)
- ✅ Established OKLCH color system with auto-generated variations
- ✅ Built comprehensive state utilities (hover, focus, active)

### **Current Priority:**
- 🔧 Fix layout.css naming convention inconsistencies
- 📝 Complete guidelines documentation restructure
- 🧪 Implement comprehensive testing strategy

---

## 🧠 AI Instructions & Rules

### **Core AI Behavior Rules:**
1. **Always read guidelines first** - Check this file and utilities folder before any task
2. **Follow naming convention logic** - Understand double-dash vs single-dash rules
3. **Plan before executing** - Use "Planning Mode" for complex tasks
4. **Auto-commit changes** - Commit and push all changes to dev branch with clear messages
5. **Question decisions** - Don't blindly agree; analyze, weigh pros/cons, suggest alternatives
6. **Stick to project goals** - Always align with framework vision and best practices
7. **Use DRY principles** - Minimize repetitive code, maximize CSS efficiency
8. **Avoid hallucination** - Never create invalid solutions or duplicate code
9. **Comment and structure** - Always properly comment and organize code
10. **Never touch sandbox** - Unless explicitly instructed

### **Task Execution Strategy:**
1. **Information Gathering** - Use codebase-retrieval and git-commit-retrieval
2. **Planning Phase** - Break down complex tasks, identify dependencies
3. **Implementation** - Follow naming conventions, maintain consistency
4. **Quality Check** - Verify no duplicates, test functionality
5. **Documentation** - Update relevant guidelines and comments
6. **Commit & Push** - Clear commit messages, push to dev branch

---

## 🏗️ Framework Architecture

### **Core Philosophy:**
- **Utility-First:** Focus exclusively on utility classes, no components
- **Vanilla CSS Only:** No JavaScript dependencies (except build tools)
- **Performance-Optimized:** Lean, pruned, production-ready
- **Semantic Naming:** BEM-inspired double-dash convention
- **OKLCH Color System:** Modern, perceptually uniform colors
- **Rem-Based Scaling:** Typography and spacing use rem units

### **File Structure:**
```
src/css/
├── core/
│   ├── variables.css      # All CSS custom properties
│   └── reset.css          # CSS reset/normalize
├── utilities/
│   ├── spacing.css        # Margin, padding utilities
│   ├── typography.css     # Font, text utilities
│   ├── colors.css         # Background, text colors
│   ├── borders.css        # Border, radius utilities
│   ├── layout.css         # Display, grid, flex utilities
│   └── states.css         # Hover, focus, active states
└── mico.css              # Main entry point
```

---

## 📐 Naming Convention Logic

### **🎯 THE GOLDEN RULE:**
**Double-dash (`--`) separates CSS property from value**
**Single-dash (`-`) is for compound CSS values**

### **✅ WHEN TO USE DOUBLE-DASH:**
**Property + Value Separation** (CSS property abbreviated + custom value)
```css
/* Property--Value Pattern */
.w--none        /* width: none */
.w--100         /* width: 100px */
.m--4           /* margin: 4px */
.bg--primary    /* background-color: var(--mico-color-primary) */
.fs--16         /* font-size: 16px */
.border--1      /* border-width: 1px */
.rounded--md    /* border-radius: medium value */
```

### **❌ WHEN NOT TO USE DOUBLE-DASH:**
**Direct CSS Value Names** (especially compound values from CSS spec)
```css
/* Direct CSS Values - No Double-Dash */
.flex              /* display: flex */
.inline-block      /* display: inline-block */
.table-row         /* display: table-row */
.space-between     /* justify-content: space-between */
.flex-start        /* align-items: flex-start */
.grid-cols-3       /* grid-template-columns: repeat(3, 1fr) */
```

### **🔍 DECISION FLOWCHART:**
1. **Is this a direct CSS value?** → No double-dash
2. **Is this property + custom value?** → Use double-dash
3. **Is this a compound CSS value?** → No double-dash
4. **When in doubt:** Check if it's a real CSS value name

### **📝 EXAMPLES BY CATEGORY:**

#### **Display & Layout (No Double-Dash):**
```css
.block, .inline, .flex, .grid
.inline-block, .inline-flex
.table, .table-row, .table-cell
```

#### **Flexbox & Grid (No Double-Dash):**
```css
.justify-center, .justify-between
.items-center, .items-start
.flex-wrap, .flex-nowrap
.grid-cols-1, .grid-rows-2
```

#### **Positioning (No Double-Dash):**
```css
.relative, .absolute, .fixed, .sticky
```

#### **Sizing (Double-Dash):**
```css
.w--auto, .w--100, .w--50p
.h--screen, .h--fit, .h--32
.min-w--none, .max-h--100p
```

#### **Spacing (Double-Dash):**
```css
.m--0, .m--4, .m--auto
.p--2, .p--8, .p--16
.gap--4, .space-x--2
```

## 🔄 Development Workflow

### **Branch Strategy:**
- **`main`**: Production-ready, stable releases only
- **`dev`**: Active development, all changes go here first
- **Feature branches**: For major features (optional)

### **Daily Development Process:**

#### **1. Start Work Session:**
```bash
git checkout dev
git pull origin dev
```

#### **2. Make Changes:**
- Follow naming convention logic
- Update relevant documentation
- Test changes thoroughly
- Maintain code quality

#### **3. Auto-Commit Strategy (AI):**
```bash
git add .
git commit -m "type: clear description of changes"
git push origin dev
```

#### **4. Commit Message Format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New utility classes or features
- `fix`: Bug fixes or corrections
- `docs`: Documentation updates
- `style`: Code formatting, no logic changes
- `refactor`: Code restructuring
- `perf`: Performance improvements
- `test`: Testing additions
- `chore`: Build process, tooling

#### **5. Examples:**
```
feat: add comprehensive spacing utilities

- Implement double-dash naming convention
- Add margin utilities from m--2 to m--100
- Add padding utilities with consistent pattern
- Update variables.css with new size tokens

Closes #45
```

```
fix: correct layout.css naming inconsistencies

- Convert single-dash to double-dash where appropriate
- Maintain direct CSS values without double-dash
- Update .inline-block, .table-row to follow convention
- Ensure semantic separation of property and value

Fixes #67
```

### **Release to Main Process:**

#### **1. Prepare Release:**
- Ensure all tests pass
- Update version in package.json
- Update CHANGELOG.md
- Run build process

#### **2. Create Pull Request:**
- From `dev` to `main`
- Detailed description of changes
- Reference related issues
- Request review if needed

#### **3. Post-Merge:**
```bash
git checkout main
git pull origin main
git tag -a v1.0.0 -m "Version 1.0.0 - Description"
git push origin v1.0.0
```

## Semantic Versioning

The Mico CSS Framework follows semantic versioning (vX.Y.Z):

- **X (Major)**: Increment when making incompatible API changes
  - Example: Renaming core utility classes, changing the framework's architecture

- **Y (Minor)**: Increment when adding functionality in a backward-compatible manner
  - Example: Adding new utility classes, introducing new features

- **Z (Patch)**: Increment when making backward-compatible bug fixes
  - Example: Fixing bugs, improving performance, refactoring code

### Version Progression Example

- v0.1.0: Initial development version
- v0.2.0: Added hover utility classes
- v0.2.1: Fixed bugs in hover utilities
- v1.0.0: First stable release
- v1.1.0: Added new animation utilities
- v1.1.1: Fixed browser compatibility issues
- v2.0.0: Major redesign of the framework architecture

## Release Process

1. **Ensure all tests pass** and the build is successful
2. **Update version number** in package.json
3. **Update CHANGELOG.md** with the changes in the new version
4. **Merge dev to main** through a pull request
5. **Tag the release** with the version number
6. **Create a GitHub release** with release notes

## Build Process

The Mico CSS Framework uses PostCSS for processing CSS files. The build process includes:

1. **Development build**: Compiles CSS with source maps for development
2. **Production build**: Minifies and optimizes CSS for production

### Build Commands

- `npm run build`: Build the CSS framework for production
- `npm run dev`: Build with source maps and watch for changes
- `npm run lint`: Run stylelint to check for CSS issues

### Files to Commit

When committing changes, include:

- Source CSS files in the `css` directory
- Configuration files (postcss.config.js, mico.config.js, etc.)
- Documentation files
- Test files

Do NOT commit:
- `node_modules` directory
- Build artifacts in the `dist` directory (these should be generated during the build process)
- IDE-specific files (.idea, .vscode)
- Log files
- Temporary files

---

## ✅ Quality Assurance

### **Code Quality Standards:**
- [ ] Follow naming convention logic
- [ ] No duplicate utility classes
- [ ] Proper CSS variable usage
- [ ] Consistent formatting and indentation
- [ ] Comprehensive comments

### **Testing Requirements:**
- [ ] Cross-browser compatibility
- [ ] Responsive design verification
- [ ] Accessibility compliance (WCAG AA)
- [ ] Performance impact assessment
- [ ] No regressions in existing functionality

### **Documentation Standards:**
- [ ] All new utilities documented
- [ ] Examples provided for complex features
- [ ] Guidelines updated when patterns change
- [ ] Comments added for complex logic

---

## 🎨 Brand & Project Identity

### **Framework Vision:**
**Mico CSS** - A lean, semantic, utility-first CSS framework that prioritizes developer experience and production performance.

### **Core Values:**
- **Semantic Clarity**: Every class name should be self-explanatory
- **Performance First**: Lean bundle sizes, optimized for production
- **Developer Experience**: Intuitive naming, comprehensive coverage
- **Modern Standards**: OKLCH colors, logical properties, rem scaling
- **Vanilla Approach**: No JavaScript dependencies, pure CSS

### **Target Audience:**
- Frontend developers building modern web applications
- Teams prioritizing performance and maintainability
- Projects requiring semantic, readable CSS class names
- Developers who appreciate BEM-inspired naming conventions

### **Competitive Advantages:**
- **Double-dash convention**: Clearer semantic separation
- **OKLCH color system**: Perceptually uniform, modern colors
- **Pruned scale**: Practical size range (2-100px) reduces bloat
- **Logical properties**: Future-proof CSS with margin-inline/block
- **Comprehensive states**: Hover, focus, active variations

---

## 📈 Progress Tracking

### **Current Sprint Goals:**
- [ ] Fix layout.css naming inconsistencies
- [ ] Complete guidelines documentation
- [ ] Implement comprehensive testing
- [ ] Optimize build process
- [ ] Prepare v1.0.0 release

### **Backlog:**
- [ ] Add animation utilities
- [ ] Implement dark mode system
- [ ] Create component examples
- [ ] Build documentation website
- [ ] Add CSS-in-JS compatibility

### **Completed Milestones:**
- [x] Core utility system established
- [x] Double-dash naming convention implemented
- [x] OKLCH color system integrated
- [x] Comprehensive spacing utilities
- [x] State utilities (hover, focus, active)
- [x] Build system configured

### **Next Major Version Goals (v2.0.0):**
- Advanced animation system
- Component library integration
- CSS-in-JS tooling
- Advanced theming capabilities

---

## 🔧 **IMMEDIATE ACTION ITEMS**

### **Priority 1: Fix Layout.css Naming Convention**
**Status:** 🔴 Critical - Needs immediate attention

**Problem:** Mixed single-dash and double-dash conventions in layout.css
**Solution:** Apply naming convention logic systematically

**Examples to Fix:**
```css
/* ❌ Current (Inconsistent) → ✅ Should Be (Consistent) */
.right-0 → .right--0                    /* Property + Value */
.min-w-none → .min-w--none             /* Property + Value */
.col-end-1 → .col-end--1               /* Property + Value */

/* ✅ Keep As-Is (Direct CSS Values) */
.inline-block                          /* display: inline-block */
.table-row                             /* display: table-row */
.flex                                  /* display: flex */
.space-between                         /* justify-content: space-between */
```

### **Priority 2: Update Utility Documentation**
**Status:** 🟡 In Progress

Update all utility documentation files to reflect:
- Double-dash naming convention
- Current utility coverage
- Proper examples and usage

### **Priority 3: Comprehensive Testing**
**Status:** 🟡 Planned

Implement testing strategy for:
- Cross-browser compatibility
- Accessibility compliance
- Performance benchmarks
- Regression testing

---

**Last Updated:** $(date)
**Next Review:** Weekly
**Maintained By:** AI-Human Collaboration Team

## Continuous Integration

Consider setting up GitHub Actions for:
- Running tests on pull requests
- Linting code
- Building the framework
- Deploying documentation

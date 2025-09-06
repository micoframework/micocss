# 🤖 AI-Human Commit Checklist - Mico CSS Framework

**This checklist ensures every commit maintains framework quality and follows our collaboration standards.**

## 🎯 Pre-Commit Validation

### **🔍 Naming Convention Compliance**
- [ ] **Double-dash logic applied correctly**
  - [ ] Property + Value separation uses `--` (e.g., `.w--100`, `.m--4`)
  - [ ] Direct CSS values use single dash (e.g., `.inline-block`, `.space-between`)
  - [ ] No mixed conventions within same file
- [ ] **Consistent across all utility files**
- [ ] **No duplicate utility classes**

### **📐 Code Quality Standards**
- [ ] **CSS variables used** (no hardcoded values)
- [ ] **Proper formatting and indentation**
- [ ] **Comprehensive comments for complex logic**
- [ ] **BEM-inspired semantic clarity**
- [ ] **Performance-optimized** (no unnecessary declarations)

### **🧪 Functionality Verification**
- [ ] **Cross-browser compatibility tested**
- [ ] **Responsive design verified**
- [ ] **Accessibility compliance** (WCAG AA minimum)
- [ ] **No regressions** in existing functionality
- [ ] **Build process successful**

### **📚 Documentation Alignment**
- [ ] **New utilities documented** in guidelines/utilities/
- [ ] **Examples provided** for complex features
- [ ] **Guidelines updated** when patterns change
- [ ] **Comments explain reasoning** for non-obvious decisions

---

## 🚀 Commit Execution Process

### **📁 Files to Include**
- [ ] **Source CSS files** in `src/css/` directory
- [ ] **Updated documentation** in `docs/guidelines/`
- [ ] **Configuration files** (if modified)
- [ ] **Test files** (when applicable)

### **🚫 Files to Exclude**
- [ ] `node_modules/` directory
- [ ] Build artifacts in `dist/` (auto-generated)
- [ ] IDE-specific files (`.idea/`, `.vscode/`)
- [ ] Log files and temporary files
- [ ] Sandbox folder (unless explicitly instructed)

### **💬 Commit Message Standards**

#### **Format:**
```
<type>: <subject>

<body>

<footer>
```

#### **Types:**
- `feat`: New utility classes or features
- `fix`: Bug fixes or corrections
- `docs`: Documentation updates
- `style`: Code formatting (no logic changes)
- `refactor`: Code restructuring
- `perf`: Performance improvements
- `test`: Testing additions
- `chore`: Build process, tooling

#### **AI-Optimized Examples:**

```
feat: implement double-dash naming convention

- Convert spacing utilities to use property--value pattern
- Update margin utilities (.m--2, .m--4, .m--8, etc.)
- Update padding utilities (.p--2, .p--4, .p--8, etc.)
- Maintain direct CSS values without double-dash (.flex, .inline-block)
- Update documentation to reflect naming logic

Closes #45
```

```
fix: correct layout.css naming inconsistencies

- Apply double-dash logic to property+value utilities
- Convert .right-0 to .right--0 (property + value)
- Convert .min-w-none to .min-w--none (property + value)
- Keep .inline-block as-is (direct CSS value)
- Keep .space-between as-is (direct CSS value)
- Ensure semantic separation throughout file

Fixes #67
```

```
docs: update guidelines with AI collaboration standards

- Restructure workflow.md as AI-Human collaboration hub
- Add naming convention decision flowchart
- Include progress tracking and sprint goals
- Update commit checklist for AI-focused workflow
- Add brand identity and competitive advantages

Improves #23
```

---

## 🔄 Post-Commit Actions

### **📤 Auto-Push Protocol (AI)**
- [ ] **Push to dev branch** immediately after commit
- [ ] **Verify push successful** (check for conflicts)
- [ ] **Update progress tracking** in workflow.md if milestone reached

### **🔍 Continuous Validation**
- [ ] **Monitor build status** (if automated builds exist)
- [ ] **Check for any immediate issues** reported
- [ ] **Update task status** in guidelines if applicable

---

## 🎯 Release Management

### **🚀 Release Preparation Checklist**
- [ ] **All sprint goals completed**
- [ ] **No critical bugs outstanding**
- [ ] **Documentation fully updated**
- [ ] **Build process successful**
- [ ] **Cross-browser testing completed**
- [ ] **Performance benchmarks met**

### **📋 Version Bump Guidelines**

#### **🔴 Major Version (X.0.0) - Breaking Changes**
- Renaming core utility classes
- Changing naming convention logic
- Removing features or utilities
- Framework architecture changes
- Any changes breaking existing implementations

#### **🟡 Minor Version (0.X.0) - New Features**
- Adding new utility categories
- Introducing new features
- Expanding existing functionality
- New color system or theming
- Backward-compatible additions

#### **🟢 Patch Version (0.0.X) - Bug Fixes**
- Fixing bugs or inconsistencies
- Performance improvements
- Code refactoring
- Documentation updates
- Build process improvements

### **📦 Release Execution**
1. **Merge dev to main** via pull request
2. **Update version** in package.json
3. **Update CHANGELOG.md** with detailed changes
4. **Create git tag** with version number
5. **Push tag to GitHub**
6. **Create GitHub release** with comprehensive notes

---

## 🤖 AI-Specific Guidelines

### **🧠 AI Decision Making**
- [ ] **Analyze before agreeing** - Don't blindly accept all suggestions
- [ ] **Weigh pros and cons** of major decisions
- [ ] **Suggest alternatives** when appropriate
- [ ] **Question inconsistencies** in requirements
- [ ] **Stick to project goals** and framework vision

### **📝 AI Documentation Standards**
- [ ] **Update this checklist** when new patterns emerge
- [ ] **Document reasoning** for complex decisions
- [ ] **Maintain progress tracking** in workflow.md
- [ ] **Keep guidelines current** with actual implementation

### **🔄 AI Workflow Integration**
- [ ] **Read guidelines first** before starting any task
- [ ] **Use planning mode** for complex multi-step tasks
- [ ] **Follow naming convention logic** religiously
- [ ] **Auto-commit and push** all changes to dev branch
- [ ] **Update documentation** as part of every significant change

---

## ✅ Final Validation

### **🎯 Pre-Push Checklist**
- [ ] All code quality standards met
- [ ] Naming convention logic applied correctly
- [ ] No duplicate utilities created
- [ ] Documentation updated appropriately
- [ ] Commit message follows standards
- [ ] Changes align with framework vision

### **🚀 Ready to Push**
```bash
git add .
git commit -m "type: clear description following standards"
git push origin dev
```

---

**Last Updated:** $(date)
**Maintained By:** AI-Human Collaboration Team
**Next Review:** After each major feature completion

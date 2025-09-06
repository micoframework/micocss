# 📚 Documentation Update Checklist - Mico CSS Framework

**This checklist ensures all documentation stays current with codebase changes and provides clear guidance for development and public use.**

## 🎯 **Documentation Categories**

### **🔧 DEVELOPMENT DOCS (Internal Use)**
*For AI-Human collaboration and framework development*

#### **docs/guidelines/ (Development)**
- [ ] **workflow.md** - AI-Human collaboration hub
- [ ] **commit-checklist.md** - Quality assurance standards
- [ ] **utilities/naming-convention.md** - Naming convention guide
- [ ] **NAMING-CONVENTION-COMPLETE.md** - Complete reference
- [ ] **RELEASE-v1.0.0.md** - Release preparation

#### **Root Level (Development)**
- [ ] **CHANGELOG.md** - Version history and changes
- [ ] **MIGRATION.md** - Upgrade guides between versions

### **📖 PUBLIC DOCS (User-Facing)**
*For end users, developers, and WordPress users*

#### **Root Level (Public)**
- [ ] **README.md** - Main project documentation
- [ ] **LICENSE** - Framework license

#### **Future Public Docs**
- [ ] **docs/examples/** - Usage examples (planned)
- [ ] **docs/api/** - API documentation (planned)
- [ ] **Website documentation** (planned)

---

## 🔄 **Update Triggers & Actions**

### **When Utility Classes Change:**

#### **✅ MUST UPDATE:**
1. **docs/guidelines/utilities/naming-convention.md**
   - Add new utility patterns
   - Update examples with actual class names
   - Verify decision flowchart accuracy

2. **docs/guidelines/NAMING-CONVENTION-COMPLETE.md**
   - Update category breakdowns
   - Add new utility examples
   - Verify pattern consistency

3. **MIGRATION.md** (for breaking changes)
   - Add new migration patterns
   - Update regex examples
   - Test migration instructions

#### **✅ SHOULD UPDATE:**
4. **README.md**
   - Update feature descriptions
   - Refresh examples if needed
   - Verify CDN links

5. **CHANGELOG.md**
   - Document changes in appropriate version
   - Categorize as Added/Changed/Fixed

### **When Build Process Changes:**

#### **✅ MUST UPDATE:**
1. **docs/guidelines/workflow.md**
   - Update build commands
   - Refresh file structure
   - Update release process

2. **docs/RELEASE-v1.0.0.md**
   - Update build verification steps
   - Refresh expected output structure

3. **README.md**
   - Update installation instructions
   - Verify CDN links and paths

### **When Repository Changes:**

#### **✅ MUST UPDATE:**
1. **All CDN Links** (Organization Move)
   - README.md
   - MIGRATION.md
   - docs/RELEASE-v1.0.0.md
   - Any other files with CDN references

2. **Repository References**
   - Update GitHub URLs
   - Update issue/PR links
   - Update contributor information

---

## 🌐 **CDN & Distribution Updates**

### **Current CDN Pattern:**
```html
<!-- GitHub CDN (JSDelivr) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/micoframework/mico@v1.0.0/dist/css/mico.min.css">

<!-- NPM CDN (Future) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mico-css@1.0.0/dist/css/mico.min.css">
```

### **✅ CDN Update Checklist:**
- [ ] **README.md** - Main installation instructions
- [ ] **MIGRATION.md** - Upgrade examples
- [ ] **docs/RELEASE-v1.0.0.md** - Release documentation
- [ ] **docs/guidelines/workflow.md** - Development examples

---

## 🎯 **WordPress Compatibility Documentation**

### **WordPress-Specific Considerations:**
- [ ] **No build process required** - emphasize CDN usage
- [ ] **Theme integration examples** - how to include in themes
- [ ] **Plugin compatibility** - works with page builders
- [ ] **Editor compatibility** - class names work in block editor

### **WordPress Documentation Needs:**
1. **Simple CDN inclusion** instructions
2. **Theme functions.php** examples
3. **Page builder integration** guides
4. **Common WordPress patterns** with Mico classes

---

## 📋 **Release Documentation Checklist**

### **Pre-Release (Development Docs):**
- [ ] **Update CHANGELOG.md** with all changes
- [ ] **Create/update MIGRATION.md** for breaking changes
- [ ] **Update docs/RELEASE-v1.0.0.md** with current status
- [ ] **Verify all naming convention docs** are accurate
- [ ] **Test all migration instructions** manually

### **Release (Public Docs):**
- [ ] **Update README.md** with new version info
- [ ] **Verify all CDN links** point to correct version
- [ ] **Update package.json** version number
- [ ] **Create GitHub release notes** from CHANGELOG
- [ ] **Update any website documentation** (if applicable)

### **Post-Release (Monitoring):**
- [ ] **Monitor GitHub issues** for documentation problems
- [ ] **Gather user feedback** on documentation clarity
- [ ] **Update docs based on** common questions
- [ ] **Plan next version documentation** improvements

---

## 🚨 **Critical Documentation Rules**

### **❌ NEVER DO:**
1. **Use class names that don't exist** in the framework
2. **Create examples without testing** them first
3. **Update public docs without** updating development docs
4. **Forget to update CDN links** when repository changes
5. **Document features that aren't** actually implemented

### **✅ ALWAYS DO:**
1. **Test all examples** before documenting them
2. **Use actual class names** from the codebase
3. **Update both development and public** docs together
4. **Verify CDN links** work before publishing
5. **Keep WordPress compatibility** in mind for all examples

---

## 🎯 **Documentation Quality Standards**

### **For Development Docs:**
- [ ] **Accurate technical details** for AI-Human collaboration
- [ ] **Complete naming convention** coverage
- [ ] **Clear workflow instructions** for development
- [ ] **Comprehensive checklists** for quality assurance

### **For Public Docs:**
- [ ] **Simple, clear language** for all skill levels
- [ ] **Working examples** that users can copy-paste
- [ ] **WordPress-friendly** instructions and examples
- [ ] **No technical jargon** without explanation

---

## 📊 **Documentation Maintenance Schedule**

### **After Every Commit:**
- [ ] Check if any docs need updates
- [ ] Update relevant development docs
- [ ] Test any changed examples

### **Before Every Release:**
- [ ] Complete pre-release checklist
- [ ] Review all public-facing docs
- [ ] Test all CDN links and examples

### **After Every Release:**
- [ ] Monitor for documentation issues
- [ ] Update based on user feedback
- [ ] Plan improvements for next version

---

## 🎯 **WordPress Integration Examples Needed**

### **Theme Integration:**
```php
// functions.php
function enqueue_mico_css() {
    wp_enqueue_style('mico-css', 'https://cdn.jsdelivr.net/gh/micoframework/mico@v1.0.0/dist/css/mico.min.css');
}
add_action('wp_enqueue_scripts', 'enqueue_mico_css');
```

### **Common WordPress Patterns:**
```html
<!-- WordPress Post Layout -->
<article class="bg--white p--8 rounded--lg border--1">
    <h2 class="fs--24 fw--bold mb--4">Post Title</h2>
    <div class="text--neutral-600 mb--6">Post content...</div>
    <a href="#" class="bg--primary text--white p-x--6 p-y--3 rounded--md">Read More</a>
</article>
```

---

**Last Updated:** $(date)
**Maintained By:** Mico Framework Team
**Next Review:** Before each release

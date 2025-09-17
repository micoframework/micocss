# 🚀 GitHub Versioning System - Mico CSS Framework

**Intelligent versioning system for GitHub-only releases with automatic file synchronization.**

## 🎯 **Purpose**

The intelligent versioning system maintains consistency across all framework files and automates the GitHub release process without NPM complexity.

## 📋 **What It Syncs**

### **Core Files:**
- ✅ `package.json` - Version number
- ✅ `README.md` - CDN links and version references  
- ✅ `CHANGELOG.md` - Release entries with dates
- ✅ `docs/versions/RELEASE-v*.md` - Individual release notes

### **Git Operations:**
- ✅ Creates git tags (`v1.2.0`)
- ✅ Commits all changes with proper messages
- ✅ Pushes to GitHub main branch
- ✅ Pushes tags for GitHub releases

## 🛠️ **Available Commands**

### **Analyze Changes**
```bash
npm run version:analyze
```
- Analyzes git commits since last release
- Suggests version bump type (major/minor/patch)
- Shows what changes will be included

### **Create Release**
```bash
npm run version:release
```
- Interactive release process with confirmation
- Updates all files automatically
- Creates GitHub release

### **Auto Release**
```bash
npm run version:release-auto
```
- Automated release without prompts
- Perfect for CI/CD workflows

## 📦 **Release Process**

### **1. Development Phase**
- Work in `dev` branch as usual
- Make commits with conventional format:
  - `feat:` for new features (minor bump)
  - `fix:` for bug fixes (patch bump)  
  - `BREAKING:` or `!:` for breaking changes (major bump)

### **2. Pre-Release**
```bash
# Switch to main and merge dev
git checkout main
git merge dev

# Analyze what will be released
npm run version:analyze
```

### **3. Release**
```bash
# Create release (interactive)
npm run version:release

# OR auto-release
npm run version:release-auto
```

### **4. Post-Release**
- GitHub release is automatically created
- CDN links are immediately available:
  - Latest: `https://cdn.jsdelivr.net/gh/micoframework/micocss@latest/dist/css/mico.min.css`
  - Versioned: `https://cdn.jsdelivr.net/gh/micoframework/micocss@v1.2.0/dist/css/mico.min.css`

## 🔄 **File Synchronization**

### **README.md Updates:**
- CDN links updated to new version
- Release links updated to latest tag
- Version badges automatically updated

### **CHANGELOG.md Updates:**
- New entry added with release date
- Git commit messages included
- Proper markdown formatting

### **Release Files:**
- Creates `docs/versions/RELEASE-v1.2.0.md`
- Includes installation instructions
- Contains change summary
- Links to GitHub release

### **Package.json Updates:**
- Version number bumped appropriately
- Maintains development configuration
- No NPM-specific metadata

## ✨ **Benefits**

### **🎯 Consistency:**
- All files always have matching version numbers
- CDN links never point to non-existent versions
- Release notes are automatically generated

### **⚡ Speed:**
- One command handles entire release process
- No manual file editing required
- Automatic git operations

### **🛡️ Reliability:**
- Semantic versioning based on commit analysis
- Prevents human error in version management
- Maintains proper git history

### **🚀 GitHub-First:**
- No NPM complexity or maintenance
- Direct GitHub releases and tags
- CDN automatically serves from GitHub

## 🔧 **Configuration**

The system is pre-configured for Mico CSS but can be customized by editing `scripts/intelligent-version.js`:

- **Repository URLs**: Update GitHub links
- **CDN Patterns**: Modify CDN link formats
- **File Paths**: Change which files get updated
- **Commit Analysis**: Adjust version bump logic

## 📚 **Examples**

### **Feature Release (v1.1.0 → v1.2.0):**
```bash
# After adding new utility classes
git commit -m "feat: add new transform utilities"
npm run version:release
# → Creates v1.2.0 with minor bump
```

### **Bug Fix Release (v1.2.0 → v1.2.1):**
```bash
# After fixing CSS issues
git commit -m "fix: resolve grid layout bug in Safari"
npm run version:release
# → Creates v1.2.1 with patch bump
```

### **Breaking Change (v1.2.1 → v2.0.0):**
```bash
# After removing deprecated classes
git commit -m "BREAKING: remove legacy spacing classes"
npm run version:release
# → Creates v2.0.0 with major bump
```

## 🎉 **Result**

Every release automatically:
1. ✅ Updates all version references
2. ✅ Creates comprehensive release notes  
3. ✅ Pushes to GitHub with proper tags
4. ✅ Makes framework immediately available via CDN
5. ✅ Maintains perfect version consistency

**No more manual version management or NPM publishing headaches!** 🚀

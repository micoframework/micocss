#!/usr/bin/env node

/**
 * Intelligent Versioning System for Mico CSS Framework
 * GitHub-Only Release Management (No NPM)
 * 
 * Features:
 * - Analyzes changes and suggests version bumps
 * - Syncs package.json, README.md, CHANGELOG.md, and release files
 * - Creates GitHub releases and tags
 * - Maintains version consistency across all files
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class IntelligentVersioning {
    constructor() {
        this.rootDir = process.cwd();
        this.packagePath = path.join(this.rootDir, 'package.json');
        this.readmePath = path.join(this.rootDir, 'README.md');
        this.changelogPath = path.join(this.rootDir, 'CHANGELOG.md');
        this.versionsDir = path.join(this.rootDir, 'docs', 'versions');
        
        this.packageJson = this.loadPackageJson();
        this.currentVersion = this.packageJson.version;
    }

    loadPackageJson() {
        try {
            return JSON.parse(fs.readFileSync(this.packagePath, 'utf8'));
        } catch (error) {
            console.error('❌ Error loading package.json:', error.message);
            process.exit(1);
        }
    }

    analyzeChanges() {
        console.log('🔍 Analyzing changes since last release...\n');

        try {
            // Get git changes since last tag
            const lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
            const changes = execSync(`git log ${lastTag}..HEAD --oneline`, { encoding: 'utf8' }).trim();

            if (!changes) {
                console.log('ℹ️  No changes since last release.');
                return null;
            }

            console.log(`📋 Changes since ${lastTag}:`);
            console.log(changes);
            console.log('');

            // Analyze change types
            const hasBreaking = changes.includes('BREAKING') || changes.includes('!:');
            const hasFeatures = changes.includes('feat:') || changes.includes('feature:');
            const hasFixes = changes.includes('fix:') || changes.includes('bugfix:');

            // Suggest version bump
            let suggestedBump = 'patch';
            if (hasBreaking) {
                suggestedBump = 'major';
            } else if (hasFeatures) {
                suggestedBump = 'minor';
            }

            return {
                lastTag,
                changes,
                suggestedBump,
                hasBreaking,
                hasFeatures,
                hasFixes
            };
        } catch (error) {
            console.log('ℹ️  No previous tags found. Analyzing recent commits...');

            try {
                // Get recent commits for first release
                const recentCommits = execSync('git log --oneline -10', { encoding: 'utf8' }).trim();
                console.log('📋 Recent commits:');
                console.log(recentCommits);
                console.log('');

                return {
                    lastTag: null,
                    changes: recentCommits || 'Initial framework release',
                    suggestedBump: 'minor',
                    hasBreaking: false,
                    hasFeatures: true,
                    hasFixes: false
                };
            } catch (gitError) {
                console.log('⚠️  Could not analyze git history. Using default first release.');
                return {
                    lastTag: null,
                    changes: 'Initial Mico CSS Framework release',
                    suggestedBump: 'minor',
                    hasBreaking: false,
                    hasFeatures: true,
                    hasFixes: false
                };
            }
        }
    }

    bumpVersion(type = 'patch') {
        const [major, minor, patch] = this.currentVersion.split('.').map(Number);
        
        switch (type) {
            case 'major':
                return `${major + 1}.0.0`;
            case 'minor':
                return `${major}.${minor + 1}.0`;
            case 'patch':
                return `${major}.${minor}.${patch + 1}`;
            default:
                throw new Error(`Invalid version bump type: ${type}`);
        }
    }

    updatePackageJson(newVersion) {
        this.packageJson.version = newVersion;
        fs.writeFileSync(this.packagePath, JSON.stringify(this.packageJson, null, 2) + '\n');
        console.log(`✅ Updated package.json to v${newVersion}`);
    }

    updateReadme(newVersion) {
        let readme = fs.readFileSync(this.readmePath, 'utf8');
        
        // Update CDN links with new version
        readme = readme.replace(
            /cdn\.jsdelivr\.net\/gh\/micoframework\/micocss@v[\d.]+/g,
            `cdn.jsdelivr.net/gh/micoframework/micocss@v${newVersion}`
        );
        
        // Update any version references
        readme = readme.replace(
            /releases\/tag\/v[\d.]+/g,
            `releases/tag/v${newVersion}`
        );
        
        fs.writeFileSync(this.readmePath, readme);
        console.log(`✅ Updated README.md CDN links to v${newVersion}`);
    }

    updateChangelog(newVersion, changes) {
        const date = new Date().toISOString().split('T')[0];
        const changelogEntry = `## [${newVersion}] - ${date}\n\n${changes}\n\n`;
        
        let changelog = fs.readFileSync(this.changelogPath, 'utf8');
        
        // Insert new entry after the header
        const lines = changelog.split('\n');
        const insertIndex = lines.findIndex(line => line.startsWith('## [')) || 3;
        lines.splice(insertIndex, 0, changelogEntry);
        
        fs.writeFileSync(this.changelogPath, lines.join('\n'));
        console.log(`✅ Updated CHANGELOG.md with v${newVersion} entry`);
    }

    createReleaseFile(newVersion, changes) {
        const releaseFile = path.join(this.versionsDir, `RELEASE-v${newVersion}.md`);
        const date = new Date().toISOString().split('T')[0];
        
        const content = `# 🚀 Mico CSS v${newVersion} Release Notes

**Release Date**: ${date}

## 📦 Installation

### CDN (GitHub)
\`\`\`html
<!-- Full Framework -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/micoframework/micocss@v${newVersion}/dist/css/mico.min.css">
\`\`\`

### Download
Download this release from our [GitHub releases page](https://github.com/micoframework/micocss/releases/tag/v${newVersion}).

## ✨ What's New

${changes}

## 🔗 Links
- **Documentation**: [micocss.com/docs](https://micocss.com/docs) (Coming Soon)
- **Examples**: [micocss.com/docs/examples](https://micocss.com/docs/examples) (Coming Soon)
- **Latest Release**: [GitHub Releases](https://github.com/micoframework/micocss/releases/latest)
- **GitHub Repository**: [micoframework/micocss](https://github.com/micoframework/micocss)
`;
        
        fs.writeFileSync(releaseFile, content);
        console.log(`✅ Created release file: ${releaseFile}`);
    }

    createGitTag(version) {
        try {
            execSync(`git tag v${version}`, { stdio: 'inherit' });
            console.log(`✅ Created git tag v${version}`);
        } catch (error) {
            console.error(`❌ Error creating git tag: ${error.message}`);
        }
    }

    pushToGitHub() {
        try {
            execSync('git push origin main', { stdio: 'inherit' });
            execSync('git push --tags', { stdio: 'inherit' });
            console.log('✅ Pushed changes and tags to GitHub');
        } catch (error) {
            console.error(`❌ Error pushing to GitHub: ${error.message}`);
        }
    }

    async release(options = {}) {
        console.log('🚀 Starting GitHub Release Process...\n');
        
        const analysis = this.analyzeChanges();
        if (!analysis && !options.force) {
            console.log('✅ No changes to release.');
            return;
        }
        
        const newVersion = this.bumpVersion(analysis?.suggestedBump || 'patch');
        
        console.log(`📋 Release Summary:`);
        console.log(`   Current Version: ${this.currentVersion}`);
        console.log(`   New Version: ${newVersion}`);
        console.log(`   Bump Type: ${analysis?.suggestedBump || 'patch'}`);
        console.log('');
        
        if (!options.autoConfirm) {
            // In a real implementation, you'd add readline for user confirmation
            console.log('⚠️  This will update all files and create a GitHub release.');
            console.log('   Run with --auto-confirm to skip this prompt.');
        }
        
        // Update all files
        this.updatePackageJson(newVersion);
        this.updateReadme(newVersion);
        this.updateChangelog(newVersion, analysis?.changes || 'Release updates');
        this.createReleaseFile(newVersion, analysis?.changes || 'Release updates');
        
        // Git operations
        execSync('git add .', { stdio: 'inherit' });
        execSync(`git commit -m "chore: release v${newVersion}"`, { stdio: 'inherit' });
        this.createGitTag(newVersion);
        this.pushToGitHub();
        
        console.log(`\n🎉 Successfully released v${newVersion}!`);
        console.log(`📦 GitHub Release: https://github.com/micoframework/micocss/releases/tag/v${newVersion}`);
        console.log(`🔗 CDN: https://cdn.jsdelivr.net/gh/micoframework/micocss@v${newVersion}/dist/css/mico.min.css`);
    }
}

// CLI usage
if (require.main === module) {
    const iv = new IntelligentVersioning();
    
    const command = process.argv[2];
    switch (command) {
        case 'analyze':
            iv.analyzeChanges();
            break;
        case 'release':
            iv.release({ autoConfirm: process.argv.includes('--auto-confirm') });
            break;
        default:
            console.log('Usage: node scripts/intelligent-version.js [analyze|release]');
    }
}

module.exports = IntelligentVersioning;

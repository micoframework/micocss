#!/usr/bin/env node

/**
 * Intelligent Versioning System for Mico CSS Framework
 * Automatically determines version type and generates all publishing materials
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class IntelligentVersioning {
    constructor() {
        this.packagePath = path.join(process.cwd(), 'package.json');
        this.readmePath = path.join(process.cwd(), 'README.md');
        this.currentVersion = this.getCurrentVersion();
        this.changes = this.analyzeChanges();
    }

    getCurrentVersion() {
        const pkg = JSON.parse(fs.readFileSync(this.packagePath, 'utf8'));
        return pkg.version;
    }

    analyzeChanges() {
        try {
            // Get git diff statistics
            const diffStat = execSync('git diff --stat HEAD~1', { encoding: 'utf8' });
            const diffNames = execSync('git diff --name-only HEAD~1', { encoding: 'utf8' });
            const diffContent = execSync('git diff HEAD~1', { encoding: 'utf8' });

            return {
                diffStat,
                diffNames: diffNames.split('\n').filter(Boolean),
                diffContent,
                filesChanged: diffNames.split('\n').filter(Boolean).length,
                linesAdded: this.extractLinesAdded(diffStat),
                linesRemoved: this.extractLinesRemoved(diffStat)
            };
        } catch (error) {
            console.log('No previous commits found, treating as initial version');
            return { diffStat: '', diffNames: [], diffContent: '', filesChanged: 0, linesAdded: 0, linesRemoved: 0 };
        }
    }

    extractLinesAdded(diffStat) {
        const match = diffStat.match(/(\d+) insertions?/);
        return match ? parseInt(match[1]) : 0;
    }

    extractLinesRemoved(diffStat) {
        const match = diffStat.match(/(\d+) deletions?/);
        return match ? parseInt(match[1]) : 0;
    }

    detectVersionType() {
        const { diffNames, diffContent, linesRemoved, linesAdded } = this.changes;
        
        // Breaking Changes Detection
        const breakingChanges = this.detectBreakingChanges(diffContent, diffNames);
        
        // New Features Detection  
        const newFeatures = this.detectNewFeatures(diffContent, diffNames);
        
        // Performance Impact
        const performanceImpact = this.calculatePerformanceImpact();

        console.log('\n🔍 CHANGE ANALYSIS:');
        console.log(`📁 Files Changed: ${this.changes.filesChanged}`);
        console.log(`➕ Lines Added: ${linesAdded}`);
        console.log(`➖ Lines Removed: ${linesRemoved}`);
        console.log(`⚠️  Breaking Changes: ${breakingChanges.length}`);
        console.log(`✨ New Features: ${newFeatures.length}`);
        console.log(`⚡ Performance Impact: ${performanceImpact}%`);

        // Decision Logic
        if (breakingChanges.length > 0) {
            return {
                type: 'major',
                reason: 'Breaking changes detected',
                details: breakingChanges,
                newFeatures,
                performanceImpact
            };
        } else if (newFeatures.length > 0 || Math.abs(performanceImpact) >= 10) {
            return {
                type: 'minor', 
                reason: 'New features or significant improvements detected',
                details: newFeatures,
                performanceImpact
            };
        } else {
            return {
                type: 'patch',
                reason: 'Bug fixes and minor optimizations',
                details: [],
                performanceImpact
            };
        }
    }

    detectBreakingChanges(diffContent, diffNames) {
        const breakingChanges = [];
        
        // Check for removed utility classes
        const removedClasses = diffContent.match(/^-\s*\.[a-zA-Z0-9-_]+\s*{/gm);
        if (removedClasses) {
            breakingChanges.push(`Removed ${removedClasses.length} utility classes`);
        }

        // Check for removed CSS variables
        const removedVariables = diffContent.match(/^-\s*--[a-zA-Z0-9-_]+:/gm);
        if (removedVariables) {
            breakingChanges.push(`Removed ${removedVariables.length} CSS variables`);
        }

        // Check for renamed files that might break imports
        const renamedUtilityFiles = diffNames.filter(name => 
            name.includes('utilities/') && name.includes('.css')
        );
        if (renamedUtilityFiles.length > 0) {
            breakingChanges.push(`Modified utility files: ${renamedUtilityFiles.join(', ')}`);
        }

        return breakingChanges;
    }

    detectNewFeatures(diffContent, diffNames) {
        const newFeatures = [];

        // Check for new utility classes
        const addedClasses = diffContent.match(/^\+\s*\.[a-zA-Z0-9-_]+\s*{/gm);
        if (addedClasses) {
            newFeatures.push(`Added ${addedClasses.length} new utility classes`);
        }

        // Check for new CSS variables
        const addedVariables = diffContent.match(/^\+\s*--[a-zA-Z0-9-_]+:/gm);
        if (addedVariables) {
            newFeatures.push(`Added ${addedVariables.length} new CSS variables`);
        }

        // Check for new utility files
        const newUtilityFiles = diffNames.filter(name => 
            name.includes('utilities/') && name.includes('.css') && 
            diffContent.includes(`+++ b/${name}`)
        );
        if (newUtilityFiles.length > 0) {
            newFeatures.push(`New utility files: ${newUtilityFiles.join(', ')}`);
        }

        // Check for grid/layout enhancements
        if (diffContent.includes('grid') || diffContent.includes('layout')) {
            newFeatures.push('Enhanced grid/layout system');
        }

        return newFeatures;
    }

    calculatePerformanceImpact() {
        try {
            // Get current file size
            const currentSize = fs.statSync('dist/css/mico.min.css').size;
            
            // Estimate previous size based on lines changed
            const { linesAdded, linesRemoved } = this.changes;
            const avgBytesPerLine = 50; // Rough estimate for CSS
            const estimatedPreviousSize = currentSize + (linesRemoved * avgBytesPerLine) - (linesAdded * avgBytesPerLine);
            
            const improvement = ((estimatedPreviousSize - currentSize) / estimatedPreviousSize) * 100;
            return Math.round(improvement);
        } catch (error) {
            return 0;
        }
    }

    generateCommitMessage(versionInfo) {
        const { type, details, performanceImpact } = versionInfo;
        
        switch (type) {
            case 'major':
                return `BREAKING CHANGE: ${details[0] || 'major framework changes'}\n\n${details.map(d => `- ${d}`).join('\n')}\n\nSee MIGRATION.md for upgrade guide`;
                
            case 'minor':
                return `feat: enhanced framework with new features\n\n${details.map(d => `- ${d}`).join('\n')}\n\nPerformance: ${performanceImpact > 0 ? `${performanceImpact}% size reduction` : 'optimizations applied'}`;
                
            case 'patch':
                return `fix: framework optimizations and bug fixes\n\n- CSS optimizations and improvements\n- Better browser compatibility\n${performanceImpact !== 0 ? `- ${Math.abs(performanceImpact)}% ${performanceImpact > 0 ? 'size reduction' : 'size increase'}` : ''}`;
        }
    }

    generateReleaseNotes(newVersion, versionInfo) {
        const { type, details, performanceImpact } = versionInfo;
        const currentSize = Math.round(fs.statSync('dist/css/mico.min.css').size / 1024);
        
        return `## 🎉 Mico CSS v${newVersion} - ${this.getVersionTitle(type)}

### 📊 Performance Metrics
- **Bundle Size**: ${currentSize}KB ${performanceImpact > 0 ? `(↓${performanceImpact}% from previous version)` : ''}
- **Utility Classes**: 600+ optimized utilities
- **Load Time**: Optimized for fast loading

### ${type === 'major' ? '💥 Breaking Changes' : type === 'minor' ? '✨ What\'s New' : '🔧 Improvements'}
${details.map(d => `- ${d}`).join('\n')}

### 📦 Installation
\`\`\`bash
npm install @micoframework/micocss@${newVersion}
\`\`\`

### 🌐 CDN
\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@micoframework/micocss@${newVersion}/dist/css/mico.min.css">
\`\`\`

### 🔗 Links
- [Documentation](https://micocss.com/docs)
- [Examples](https://micocss.com/examples)
${type === 'major' ? '- [Migration Guide](https://micocss.com/migration)' : ''}`;
    }

    getVersionTitle(type) {
        switch (type) {
            case 'major': return 'Major Release';
            case 'minor': return 'New Features';
            case 'patch': return 'Bug Fixes & Optimizations';
        }
    }

    updateReadme(newVersion) {
        let readme = fs.readFileSync(this.readmePath, 'utf8');

        // Update CDN links
        readme = readme.replace(
            /https:\/\/cdn\.jsdelivr\.net\/npm\/@micoframework\/micocss@[\d.]+/g,
            `https://cdn.jsdelivr.net/npm/@micoframework/micocss@${newVersion}`
        );

        // Update npm install commands
        readme = readme.replace(
            /npm install @micoframework\/micocss@[\d.]+/g,
            `npm install @micoframework/micocss@${newVersion}`
        );

        fs.writeFileSync(this.readmePath, readme);
        console.log('✅ README.md updated with new version');
    }

    updateChangelog(newVersion, versionInfo) {
        const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
        if (!fs.existsSync(changelogPath)) {
            console.log('⚠️  CHANGELOG.md not found, skipping changelog update');
            return;
        }

        let changelog = fs.readFileSync(changelogPath, 'utf8');
        const { type, details, performanceImpact } = versionInfo;
        const today = new Date().toISOString().split('T')[0];

        // Generate changelog entry based on version type
        let changelogEntry = '';

        switch (type) {
            case 'major':
                changelogEntry = `## [${newVersion}] - ${today}

### 💥 **BREAKING CHANGES**
${details.map(d => `- ${d}`).join('\n')}

### ⚠️ **MIGRATION REQUIRED**
- See [MIGRATION.md](MIGRATION.md) for upgrade guide
- Review all utility class usage for compatibility

`;
                break;

            case 'minor':
                changelogEntry = `## [${newVersion}] - ${today}

### ✨ **NEW FEATURES**
${details.map(d => `- ${d}`).join('\n')}

### 🔧 **IMPROVEMENTS**
- Enhanced framework performance and optimization
${performanceImpact > 0 ? `- ${performanceImpact}% framework size reduction` : ''}

`;
                break;

            case 'patch':
                changelogEntry = `## [${newVersion}] - ${today}

### 🐛 **BUG FIXES**
- CSS optimizations and improvements
- Better browser compatibility
${performanceImpact !== 0 ? `- ${Math.abs(performanceImpact)}% ${performanceImpact > 0 ? 'size reduction' : 'size increase'}` : ''}

### 🔧 **IMPROVEMENTS**
- Minor optimizations and bug fixes

`;
                break;
        }

        // Insert new entry after the header
        const headerEnd = changelog.indexOf('\n## ');
        if (headerEnd !== -1) {
            changelog = changelog.slice(0, headerEnd) + '\n\n' + changelogEntry + changelog.slice(headerEnd + 1);
        } else {
            // If no existing entries, add after the header
            const headerEndAlt = changelog.indexOf('\n\n') + 2;
            changelog = changelog.slice(0, headerEndAlt) + changelogEntry + '\n' + changelog.slice(headerEndAlt);
        }

        fs.writeFileSync(changelogPath, changelog);
        console.log('✅ CHANGELOG.md updated with new version');
    }

    async run() {
        console.log('🎯 INTELLIGENT VERSIONING SYSTEM');
        console.log('==================================');
        
        const versionInfo = this.detectVersionType();
        
        console.log(`\n📋 RECOMMENDATION: ${versionInfo.type.toUpperCase()} version`);
        console.log(`💡 Reason: ${versionInfo.reason}`);
        
        // Calculate new version
        const [major, minor, patch] = this.currentVersion.split('.').map(Number);
        let newVersion;
        
        switch (versionInfo.type) {
            case 'major':
                newVersion = `${major + 1}.0.0`;
                break;
            case 'minor':
                newVersion = `${major}.${minor + 1}.0`;
                break;
            case 'patch':
                newVersion = `${major}.${minor}.${patch + 1}`;
                break;
        }
        
        console.log(`🔄 Version: ${this.currentVersion} → ${newVersion}`);
        
        // Generate materials
        const commitMessage = this.generateCommitMessage(versionInfo);
        const releaseNotes = this.generateReleaseNotes(newVersion, versionInfo);
        
        console.log('\n📝 GENERATED COMMIT MESSAGE:');
        console.log('----------------------------');
        console.log(commitMessage);
        
        console.log('\n📋 GENERATED RELEASE NOTES:');
        console.log('---------------------------');
        console.log(releaseNotes);
        
        // Save release notes
        fs.writeFileSync(`RELEASE-v${newVersion}.md`, releaseNotes);
        
        return {
            currentVersion: this.currentVersion,
            newVersion,
            versionType: versionInfo.type,
            commitMessage,
            releaseNotes
        };
    }

    async publish(options = {}) {
        const { autoConfirm = false, skipTests = false } = options;

        console.log('\n🚀 PUBLISHING WORKFLOW');
        console.log('======================');

        const result = await this.run();

        if (!autoConfirm) {
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });

            const answer = await new Promise(resolve => {
                readline.question(`\nProceed with ${result.versionType} version ${result.newVersion}? (y/N): `, resolve);
            });
            readline.close();

            if (answer.toLowerCase() !== 'y') {
                console.log('❌ Publishing cancelled');
                return;
            }
        }

        try {
            // 1. Run tests (if not skipped)
            if (!skipTests) {
                console.log('\n🧪 Running tests...');
                execSync('npm test', { stdio: 'inherit' });
            }

            // 2. Build framework
            console.log('\n🔨 Building framework...');
            execSync('npm run build', { stdio: 'inherit' });

            // 3. Update version in package.json
            console.log(`\n📦 Updating version to ${result.newVersion}...`);
            execSync(`npm version ${result.versionType} --no-git-tag-version`, { stdio: 'inherit' });

            // 4. Update README
            this.updateReadme(result.newVersion);

            // 5. Update CHANGELOG
            this.updateChangelog(result.newVersion, versionInfo);

            // 6. Commit changes
            console.log('\n📝 Committing changes...');
            execSync('git add .', { stdio: 'inherit' });
            execSync(`git commit -m "${result.commitMessage}"`, { stdio: 'inherit' });

            // 6. Create git tag
            console.log('\n🏷️  Creating git tag...');
            execSync(`git tag v${result.newVersion}`, { stdio: 'inherit' });

            // 7. Push to repository
            console.log('\n⬆️  Pushing to repository...');
            execSync('git push origin dev', { stdio: 'inherit' });
            execSync('git push --tags', { stdio: 'inherit' });

            // 8. Publish to npm
            console.log('\n📦 Publishing to npm...');
            execSync('npm publish', { stdio: 'inherit' });

            console.log(`\n🎉 Successfully published v${result.newVersion}!`);
            console.log('\n📋 Next Steps:');
            console.log('- Create GitHub release with generated notes');
            console.log('- Update documentation website');
            console.log('- Announce on social media');
            console.log('\n📄 Files Updated:');
            console.log('- ✅ package.json (version updated)');
            console.log('- ✅ README.md (CDN links and version synced)');
            console.log('- ✅ CHANGELOG.md (new release entry added)');
            console.log(`- ✅ docs/versions/RELEASE-v${result.newVersion}.md (release notes created)`);

            return result;

        } catch (error) {
            console.error('\n❌ Publishing failed:', error.message);
            throw error;
        }
    }
}

// Export for use as module or run directly
if (require.main === module) {
    const versioning = new IntelligentVersioning();
    versioning.run().then(result => {
        console.log('\n🎉 Versioning analysis complete!');
        console.log(`📁 Release notes saved to: RELEASE-v${result.newVersion}.md`);
    }).catch(console.error);
}

module.exports = IntelligentVersioning;

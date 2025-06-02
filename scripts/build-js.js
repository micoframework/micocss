/**
 * JavaScript build script for Mico CSS Framework
 * Concatenates and minifies JavaScript files
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define directories
const jsDir = path.join(__dirname, '../js');
const distDir = path.join(__dirname, '../dist/js');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// JavaScript files to include (in order)
const jsFiles = [
  'animation/animation-helpers.js',
  'animation/animation-engine.js',
  'mico.js'
];

/**
 * Build JavaScript files
 */
function buildJavaScript() {
  console.log('🔧 Building JavaScript files...\n');

  try {
    let combinedContent = '';

    // Add header comment
    combinedContent += `/**
 * Mico CSS Framework - JavaScript Bundle
 * Version: 1.0.0
 * Author: Michael Katiba
 *
 * This file contains all JavaScript functionality for the Mico CSS Framework.
 * It includes animation engine, utilities, and framework initialization.
 */

`;

    // Combine all JavaScript files
    jsFiles.forEach(file => {
      const filePath = path.join(jsDir, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        combinedContent += `\n/* === ${file} === */\n`;
        combinedContent += content;
        combinedContent += '\n';
        console.log(`✅ Added ${file}`);
      } else {
        console.warn(`⚠️ Warning: JavaScript file ${filePath} not found`);
      }
    });

    // Write unminified version
    const outputFile = path.join(distDir, 'mico.js');
    fs.writeFileSync(outputFile, combinedContent);
    console.log('✅ Created mico.js');

    return { success: true, outputFile, combinedContent };
  } catch (error) {
    console.error('❌ Error building JavaScript files:', error.message);
    return { success: false };
  }
}

/**
 * Minify JavaScript files
 */
function minifyJS(outputFile, combinedContent) {
  console.log('\nMinifying JavaScript files...');

  try {
    // Try to use Terser for minification
    const minOutputFile = path.join(distDir, 'mico.min.js');
    execSync(`npx terser ${outputFile} -o ${minOutputFile} --compress --mangle`, { stdio: 'inherit' });
    console.log('✅ Created mico.min.js');
    return true;
  } catch (error) {
    console.warn('⚠️ Terser not available, creating unminified copy');
    // Fallback: just copy the file
    const minOutputFile = path.join(distDir, 'mico.min.js');
    fs.writeFileSync(minOutputFile, combinedContent);
    console.log('✅ Created mico.min.js (unminified fallback)');
    return true;
  }
}

// Run the build process
async function main() {
  console.log('🚀 Starting JavaScript build process...\n');

  const buildResult = buildJavaScript();

  if (buildResult.success) {
    const minifyResult = minifyJS(buildResult.outputFile, buildResult.combinedContent);

    if (minifyResult) {
      console.log('\n✅ JavaScript build completed successfully!');
      console.log('📁 Files created:');
      console.log('   - dist/js/mico.js');
      console.log('   - dist/js/mico.min.js');
      return 0;
    }
  }

  console.error('\n❌ JavaScript build failed');
  return 1;
}

// Run the build
main().then(exitCode => {
  process.exit(exitCode);
});

/**
 * CSS build script for Mico CSS Framework
 * Builds the main CSS file and specialized builds (utilities-only, components-only)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define directories
const srcDir = path.join(__dirname, '../src/css');
const distDir = path.join(__dirname, '../dist/css');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

/**
 * Build main CSS file (full framework)
 */
function buildMainCSS() {
  console.log('🔧 Building main CSS file...\n');

  try {
    const inputFile = path.join(srcDir, 'mico.css');
    const outputFile = path.join(distDir, 'mico.css');
    const minOutputFile = path.join(distDir, 'mico.min.css');

    // Build unminified version
    execSync(`npx postcss ${inputFile} -o ${outputFile} --env development`, { stdio: 'inherit' });
    console.log('✅ Created mico.css');

    // Build minified version
    execSync(`npx postcss ${inputFile} -o ${minOutputFile} --env production`, { stdio: 'inherit' });
    console.log('✅ Created mico.min.css');

    return true;
  } catch (error) {
    console.error('❌ Error building main CSS:', error.message);
    return false;
  }
}

/**
 * Build utilities-only CSS file
 */
function buildUtilitiesCSS() {
  console.log('\n🔧 Building utilities-only CSS file...\n');

  try {
    // Create utilities-only CSS content
    let utilitiesContent = `/**
 * Mico CSS Framework - Utilities Only
 * Version: 1.0.0
 * Author: Michael Katiba
 */

/* Core Variables */
@import "core/variables.css";

/* Utility Classes Only */
@import "utilities/miscellaneous.css";
@import "utilities/borders.css";
@import "utilities/spacing.css";
@import "utilities/layout.css";
@import "utilities/typography.css";
@import "utilities/colors.css";
@import "utilities/states.css";
@import "utilities/animation.css";
@import "utilities/responsive.css";
`;

    // Write temporary file
    const tempFile = path.join(srcDir, 'mico-utilities.css');
    fs.writeFileSync(tempFile, utilitiesContent);

    const outputFile = path.join(distDir, 'mico-utilities.css');
    const minOutputFile = path.join(distDir, 'mico-utilities.min.css');

    // Build unminified version
    execSync(`npx postcss ${tempFile} -o ${outputFile} --env development`, { stdio: 'inherit' });
    console.log('✅ Created mico-utilities.css');

    // Build minified version
    execSync(`npx postcss ${tempFile} -o ${minOutputFile} --env production`, { stdio: 'inherit' });
    console.log('✅ Created mico-utilities.min.css');

    // Clean up temporary file
    fs.unlinkSync(tempFile);

    return true;
  } catch (error) {
    console.error('❌ Error building utilities CSS:', error.message);
    return false;
  }
}

/**
 * Build components-only CSS file
 */
function buildComponentsCSS() {
  console.log('\n🔧 Building components-only CSS file...\n');

  try {
    // Create components-only CSS content
    let componentsContent = `/**
 * Mico CSS Framework - Components Only
 * Version: 1.0.0
 * Author: Michael Katiba
 */

/* Core Variables */
@import "core/variables.css";

/* Component Styles Only */
@import "components/buttons.css";
`;

    // Write temporary file
    const tempFile = path.join(srcDir, 'mico-components.css');
    fs.writeFileSync(tempFile, componentsContent);

    const outputFile = path.join(distDir, 'mico-components.css');
    const minOutputFile = path.join(distDir, 'mico-components.min.css');

    // Build unminified version
    execSync(`npx postcss ${tempFile} -o ${outputFile} --env development`, { stdio: 'inherit' });
    console.log('✅ Created mico-components.css');

    // Build minified version
    execSync(`npx postcss ${tempFile} -o ${minOutputFile} --env production`, { stdio: 'inherit' });
    console.log('✅ Created mico-components.min.css');

    // Clean up temporary file
    fs.unlinkSync(tempFile);

    return true;
  } catch (error) {
    console.error('❌ Error building components CSS:', error.message);
    return false;
  }
}

// Run the build process
async function main() {
  console.log('🚀 Starting CSS build process...\n');

  const mainResult = buildMainCSS();
  const utilitiesResult = buildUtilitiesCSS();
  const componentsResult = buildComponentsCSS();

  if (mainResult && utilitiesResult && componentsResult) {
    console.log('\n✅ CSS build completed successfully!');
    console.log('📁 Files created:');
    console.log('   - dist/css/mico.css');
    console.log('   - dist/css/mico.min.css');
    console.log('   - dist/css/mico-utilities.css');
    console.log('   - dist/css/mico-utilities.min.css');
    console.log('   - dist/css/mico-components.css');
    console.log('   - dist/css/mico-components.min.css');
    return 0;
  } else {
    console.error('\n❌ CSS build failed');
    return 1;
  }
}

// Run the build
main().then(exitCode => {
  process.exit(exitCode);
});

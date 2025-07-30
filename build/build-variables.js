/**
 * Script to build separate variables.css and variables.min.css files
 * This script creates standalone variable files without utility classes
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define directories
const sourceFile = path.join(__dirname, '../src/css/core/variables.css');
const distDir = path.join(__dirname, '../dist/css');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

/**
 * Build variables.css files
 */
function buildVariables() {
  console.log('🔧 Building variables.css files...\n');

  try {
    // Check if source file exists
    if (!fs.existsSync(sourceFile)) {
      console.error('❌ Source variables.css file not found at:', sourceFile);
      return false;
    }

    // Read the source variables file
    const variablesContent = fs.readFileSync(sourceFile, 'utf8');

    // Write unminified version
    const outputFile = path.join(distDir, 'variables.css');
    fs.writeFileSync(outputFile, variablesContent);
    console.log('✅ Created variables.css');

    // Create minified version using PostCSS
    try {
      const minOutputFile = path.join(distDir, 'variables.min.css');
      execSync(`npx postcss ${outputFile} -o ${minOutputFile} --env production`, { stdio: 'inherit' });
      console.log('✅ Created variables.min.css');
    } catch (error) {
      console.error('❌ Error creating minified variables file:', error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error('❌ Error building variables files:', error.message);
    return false;
  }
}

// Run the build process
async function main() {
  console.log('🚀 Starting variables build process...\n');

  const success = buildVariables();

  if (success) {
    console.log('\n✅ Variables build completed successfully!');
    console.log('📁 Files created:');
    console.log('   - dist/css/variables.css');
    console.log('   - dist/css/variables.min.css');
    return 0;
  } else {
    console.error('\n❌ Variables build failed');
    return 1;
  }
}

// Run the build
main().then(exitCode => {
  process.exit(exitCode);
});

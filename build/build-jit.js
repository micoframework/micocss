/**
 * JIT Generator build script for Mico CSS Framework
 * Builds the JIT generator bundle
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define directories
const jitSrcDir = path.join(__dirname, '../src/jit');
const distDir = path.join(__dirname, '../dist/js');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

/**
 * Build JIT generator
 */
function buildJIT() {
  console.log('🔧 Building JIT generator...\n');

  try {
    // Run the JIT generator
    const generatorPath = path.join(jitSrcDir, 'generator.js');
    execSync(`node ${generatorPath}`, { stdio: 'inherit' });
    console.log('✅ JIT generator completed successfully');

    return true;
  } catch (error) {
    console.error('❌ Error building JIT generator:', error.message);
    return false;
  }
}

// Run the build process
async function main() {
  console.log('🚀 Starting JIT build process...\n');

  const success = buildJIT();

  if (success) {
    console.log('\n✅ JIT build completed successfully!');
    console.log('📁 Files created:');
    console.log('   - dist/js/micocss.jit.js');
    return 0;
  } else {
    console.error('\n❌ JIT build failed');
    return 1;
  }
}

// Run the build
main().then(exitCode => {
  process.exit(exitCode);
});

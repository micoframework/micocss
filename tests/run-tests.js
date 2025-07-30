/**
 * Simple test runner for Mico CSS Framework
 * This script checks for basic CSS validity and browser compatibility
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define test directories
const testDir = path.join(__dirname);
const cssDir = path.join(__dirname, '../css');
const distDir = path.join(__dirname, '../dist/css');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Function to run stylelint on CSS files
function lintCssFiles() {
  console.log('Running CSS linting tests...');
  try {
    execSync('npx stylelint "css/**/*.css"', { stdio: 'inherit' });
    console.log('✅ CSS linting passed');
    return true;
  } catch (error) {
    console.error('❌ CSS linting failed');
    return false;
  }
}

// Function to check CSS file sizes
function checkFileSizes() {
  console.log('\nChecking file sizes...');
  
  const files = fs.readdirSync(distDir).filter(file => file.endsWith('.css'));
  
  files.forEach(file => {
    const filePath = path.join(distDir, file);
    const stats = fs.statSync(filePath);
    const fileSizeKB = (stats.size / 1024).toFixed(2);
    
    console.log(`${file}: ${fileSizeKB} KB`);
    
    // Warning for large files
    if (stats.size > 100 * 1024) { // 100 KB
      console.warn(`⚠️ Warning: ${file} is larger than 100 KB`);
    }
  });
  
  return true;
}

// Function to check CSS variable consistency
function checkCssVariables() {
  console.log('\nChecking CSS variable consistency...');
  
  const variablesFile = path.join(cssDir, 'mico.variables.css');
  const variablesContent = fs.readFileSync(variablesFile, 'utf8');
  
  // Extract variable names
  const variableRegex = /--mico-[a-zA-Z0-9-]+:/g;
  const variables = variablesContent.match(variableRegex) || [];
  const variableNames = variables.map(v => v.replace(':', '').trim());
  
  console.log(`Found ${variableNames.length} CSS variables`);
  
  // Check for variable usage in other files
  const cssFiles = getAllFiles(cssDir).filter(file => file.endsWith('.css') && !file.includes('mico.variables.css'));
  
  let unusedVariables = [...variableNames];
  
  cssFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    unusedVariables = unusedVariables.filter(variable => {
      return !content.includes(`var(${variable})`);
    });
  });
  
  if (unusedVariables.length > 0) {
    console.warn(`⚠️ Warning: Found ${unusedVariables.length} unused variables:`);
    unusedVariables.slice(0, 10).forEach(v => console.warn(`  - ${v}`));
    if (unusedVariables.length > 10) {
      console.warn(`  ... and ${unusedVariables.length - 10} more`);
    }
  } else {
    console.log('✅ All variables are used');
  }
  
  return true;
}

// Helper function to get all files recursively
function getAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath));
    } else {
      results.push(filePath);
    }
  });
  
  return results;
}

// Function to check browser compatibility
function checkBrowserCompatibility() {
  console.log('\nChecking browser compatibility...');
  
  // This is a simplified check - in a real scenario, you'd use a tool like Browserslist
  const browserslistFile = path.join(__dirname, '../.browserslistrc');
  
  if (fs.existsSync(browserslistFile)) {
    const browserslist = fs.readFileSync(browserslistFile, 'utf8');
    console.log('Supported browsers:');
    console.log(browserslist);
    
    console.log('✅ Browser compatibility configuration found');
    return true;
  } else {
    console.warn('⚠️ Warning: No .browserslistrc file found');
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('🧪 Running Mico CSS Framework tests...\n');
  
  const results = [];
  
  results.push(lintCssFiles());
  results.push(checkFileSizes());
  results.push(checkCssVariables());
  results.push(checkBrowserCompatibility());
  
  const passedTests = results.filter(Boolean).length;
  const totalTests = results.length;
  
  console.log(`\n📊 Test Results: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('✅ All tests passed!');
    return 0;
  } else {
    console.error(`❌ ${totalTests - passedTests} tests failed`);
    return 1;
  }
}

// Run the tests
runAllTests().then(exitCode => {
  process.exit(exitCode);
});

/**
 * Script for component cleanup (currently disabled)
 * This script was previously used to remove component files
 * but is now disabled as we focus on utility classes only
 */

console.log('ℹ️  Component cleanup is disabled');
console.log('ℹ️  Focusing on utility classes only');
console.log('✅ Cleanup task completed (no action required)');

// Create a .gitkeep file in the components directory to maintain the directory structure
// but keep it empty (optional - remove this if you want to completely remove the directory)
/*
try {
  // Create the components directory if it doesn't exist
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }

  // Create a .gitkeep file
  fs.writeFileSync(path.join(componentsDir, '.gitkeep'), '');
  console.log('Created .gitkeep file in components directory');
} catch (error) {
  console.error('Error creating .gitkeep file:', error.message);
}
*/

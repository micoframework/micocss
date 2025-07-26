const fs = require("fs");
const path = require("path");

// Configuration - Update these paths as needed
const CONFIG = {
  // Using the minified CSS as source
  inputCssPath: path.resolve(__dirname, "../dist/css/mico.min.css"),
  outputDistPath: path.resolve(__dirname, "../dist/js/micocss.jit.js"),
  outputSandboxPath: path.resolve(__dirname, "../sandbox/jit-generator/micocss.jit.js"),
  runtimePath: path.resolve(__dirname, "./runtime.js")
};

// Helper function to clean and normalize CSS content
function cleanCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ')             // Normalize whitespace
    .trim();
}

// Helper function to process selectors and their styles
function processSelector(selector, styles, map) {
  selector.split(',').forEach(sel => {
    sel = sel.trim();
    
    // Handle class selectors
    if (sel.startsWith('.')) {
      const [baseSelector, ...pseudo] = sel.slice(1).split(':');
      const pseudoState = pseudo.join(':'); // Rejoin in case there are multiple colons

      // Clean up styles
      const cleanStyles = styles.trim();
      
      if (pseudoState) {
        // Store with pseudo-state (e.g., "myClass:hover")
        map[`${baseSelector}:${pseudoState}`] = cleanStyles;
        console.log(`Added pseudo-state class: ${baseSelector}:${pseudoState} -> ${cleanStyles}`);
      } else {
        // Store base class
        map[baseSelector] = cleanStyles;
        console.log(`Added base class: ${baseSelector} -> ${cleanStyles}`);
      }
    }
    // Handle attribute selectors like [data-*]
    else if (sel.startsWith('[data-')) {
      const attrName = sel.match(/\[([^\]]+)\]/)[1];
      map[`__attr__${attrName}`] = styles.trim();
      console.log(`Added attribute selector: ${attrName}`);
    }
    // Handle global selectors like :root and element selectors
    else if (isGlobalSelector(sel)) {
      if (!map.__global__) map.__global__ = '';
      map.__global__ += `${sel}{${styles.trim()}}\n`;
      console.log(`Added to global CSS: ${sel}`);
    }
  });
}

// Helper function to determine if a selector should be in global CSS
function isGlobalSelector(selector) {
  // Only include :root and @-rules in global CSS
  return selector.trim().startsWith(':root') || selector.trim().startsWith('@');
}

// Main CSS parsing and map generation function
function generateJITMap(css) {
  const map = {};
  let currentStyles = '';
  let inRule = false;
  let currentSelector = '';
  let braceCount = 0;

  // Clean and normalize CSS
  css = cleanCSS(css);

  // Basic CSS parsing
  for (let i = 0; i < css.length; i++) {
    const char = css[i];

    if (char === '{') {
      if (braceCount === 0) {
        currentSelector = currentStyles.trim();
        currentStyles = '';
        inRule = true;
      }
      braceCount++;
    } 
    else if (char === '}') {
      braceCount--;
      if (braceCount === 0 && inRule) {
        processSelector(currentSelector, currentStyles, map);
        currentStyles = '';
        inRule = false;
      }
    }
    else {
      currentStyles += char;
    }
  }

  return map;
}

// Main function to generate the JIT bundle
function generateJITBundle() {
  try {
    console.log('Reading CSS from:', CONFIG.inputCssPath);
    const css = fs.readFileSync(CONFIG.inputCssPath, 'utf8');
    
    console.log('Generating CSS map...');
    const map = generateJITMap(css);
    
    console.log('Reading runtime script...');
    const runtime = fs.readFileSync(CONFIG.runtimePath, 'utf8');
    
    // Create the bundle with the map and runtime
    const bundle = `/**
 * MicoCSS JIT (Just-In-Time) CSS Framework
 * Version: 1.0.0
 * License: MIT
 * https://github.com/yourusername/mico
 */
window.JIT_CSS_MAP = ${JSON.stringify(map, null, 2)};
window.JIT_GLOBAL_CSS = ${JSON.stringify(map.__global__ || '')};

${runtime}`;
    
    // Ensure dist directory exists
    const distDir = path.dirname(CONFIG.outputDistPath);
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Write distribution bundle
    fs.writeFileSync(CONFIG.outputDistPath, bundle, "utf8");
    console.log('Wrote distribution bundle to:', CONFIG.outputDistPath);
    
    // Write sandbox bundle (for testing)
    const sandboxDir = path.dirname(CONFIG.outputSandboxPath);
    if (!fs.existsSync(sandboxDir)) {
      fs.mkdirSync(sandboxDir, { recursive: true });
    }
    fs.writeFileSync(CONFIG.outputSandboxPath, bundle, "utf8");
    console.log('Wrote sandbox bundle to:', CONFIG.outputSandboxPath);
    
    return true;
  } catch (error) {
    console.error('Error generating JIT bundle:', error);
    return false;
  }
}

// Main execution
try {
  // Ensure minified CSS exists
  if (!fs.existsSync(CONFIG.inputCssPath)) {
    console.log("❌ Minified CSS not found. Building CSS first...");
    throw new Error(`Minified CSS file not found at: ${CONFIG.inputCssPath}. Please run 'npm run build:css' first.`);
  }
  
  // Read and process CSS, then generate JIT bundle
  generateJITBundle();

  console.log(`✅ Generated MicoCSS JIT bundle with ${Object.keys(map).length} entries + global styles`);
  console.log(`📦 Distribution file: ${CONFIG.outputDistPath}`);
  console.log(`🧪 Sandbox test file: ${CONFIG.outputSandboxPath}`);

} catch (error) {
  console.error("❌ Error generating bundle:", error.message);
  process.exit(1);
}

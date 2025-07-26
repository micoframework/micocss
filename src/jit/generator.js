const fs = require("fs");
const path = require("path");

// Configuration - Update these paths as needed
const CONFIG = {
  inputCssPath: path.resolve(__dirname, "../../sandbox/assets/css/input.css"),
  outputDistPath: path.resolve(__dirname, "../../dist/micocss.jit.js"),
  outputSandboxPath: path.resolve(__dirname, "../../sandbox/jit-generator/micocss.jit.js"),
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
    
    // Handle class selectors with pseudo-states
    if (sel.startsWith('.')) {
      const baseClass = sel.slice(1);
      if (baseClass.includes(':')) {
        // Handle pseudo-states (hover, focus, active)
        const [className, pseudoState] = baseClass.split(':');
        map[`${className}:${pseudoState}`] = styles;
      } else {
        // Regular class
        map[baseClass] = styles;
      }
    }
    // Handle data-* attribute selectors
    else if (sel.startsWith('[data-')) {
      map[sel] = styles;
    }
  });
}

// Main CSS processing function
function processCSSFile(cssContent) {
  const cleanedCSS = cleanCSS(cssContent);
  const map = {};
  let globalCSS = '';

  // Extract :root and other global styles
  const rootRegex = /((?::root|@[\w-]+)\s*{[^}]+})/g;
  let rootMatch;
  while ((rootMatch = rootRegex.exec(cleanedCSS)) !== null) {
    globalCSS += rootMatch[1] + '\n';
  }

  // Remove global styles from CSS for further processing
  let remainingCSS = cleanedCSS.replace(rootRegex, '').trim();

  // Process remaining rules
  const ruleRegex = /([^{]+)\{([^}]+)\}/g;
  let match;

  while ((match = ruleRegex.exec(remainingCSS)) !== null) {
    const selector = match[1].trim();
    const styles = match[2].trim();
    processSelector(selector, styles, map);
  }

  return { globalCSS, map };
}

// Main execution
try {
  // Read input CSS file
  if (!fs.existsSync(CONFIG.inputCssPath)) {
    throw new Error(`Input CSS file not found at: ${CONFIG.inputCssPath}`);
  }
  
  const css = fs.readFileSync(CONFIG.inputCssPath, "utf8");
  const { globalCSS, map } = processCSSFile(css);
  
  // Read runtime code
  const runtime = fs.readFileSync(CONFIG.runtimePath, "utf8");
  
  // Generate bundle content
  const bundle = `/**
 * MicoCSS JIT (Just-In-Time) CSS Framework
 * Version: 1.0.0
 * License: MIT
 * https://github.com/yourusername/mico
 */
window.JIT_GLOBAL_CSS = \`${globalCSS}\`;
window.JIT_CSS_MAP = ${JSON.stringify(map, null, 2)};

${runtime}`;

  // Write distribution bundle
  fs.writeFileSync(CONFIG.outputDistPath, bundle, "utf8");
  
  // Write sandbox bundle (for testing)
  fs.writeFileSync(CONFIG.outputSandboxPath, bundle, "utf8");

  console.log(`✅ Generated MicoCSS JIT bundle with ${Object.keys(map).length} entries + global styles`);
  console.log(`📦 Distribution file: ${CONFIG.outputDistPath}`);
  console.log(`🧪 Sandbox test file: ${CONFIG.outputSandboxPath}`);

} catch (error) {
  console.error("❌ Error generating bundle:", error.message);
  process.exit(1);
}

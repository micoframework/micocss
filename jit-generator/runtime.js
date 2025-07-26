/**
 * MicoCSS JIT Runtime
 * This script handles the dynamic application of CSS styles based on DOM content
 */
(function () {
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const map = window.JIT_CSS_MAP || {};
    const global = window.JIT_GLOBAL_CSS || "";
    const used = new Set();
    const style = document.createElement("style");
    style.setAttribute("data-micocss-jit", "true");
    document.head.appendChild(style);
    
    // Debug: Log the map to see what classes are available
    console.log('JIT CSS Map:', map);
    console.log('Map keys:', Object.keys(map));
    
    // Apply global styles immediately
    if (global) {
      style.textContent += global + "\n";
      console.log('Applied global CSS');
    }

    function applyStyles(classList) {
      console.log('Applying styles for classes:', classList);
      for (const cls of classList) {
        const direct = map[cls];
        const hover = map[`${cls}:hover`];
        const focus = map[`${cls}:focus`];
        const active = map[`${cls}:active`];
  
        if (direct && !used.has(cls)) {
          console.log(`Applying direct style for .${cls}:`, direct);
          used.add(cls);
          style.textContent += `.${cls}{${direct}}\n`;
        }
        if (hover && !used.has(`${cls}:hover`)) {
          console.log(`Applying hover style for .${cls}:hover:`, hover);
          used.add(`${cls}:hover`);
          style.textContent += `.${cls}:hover{${hover}}\n`;
        }
        if (focus && !used.has(`${cls}:focus`)) {
          console.log(`Applying focus style for .${cls}:focus:`, focus);
          used.add(`${cls}:focus`);
          style.textContent += `.${cls}:focus{${focus}}\n`;
        }
        if (active && !used.has(`${cls}:active`)) {
          console.log(`Applying active style for .${cls}:active:`, active);
          used.add(`${cls}:active`);
          style.textContent += `.${cls}:active{${active}}\n`;
        }
      }
    }
    function scanElement(element) {
      if (element.classList && element.classList.length) {
        console.log('Scanning element:', element, 'with classes:', Array.from(element.classList));
        applyStyles(Array.from(element.classList));
      }
    }
  
    function scanDOM(root = document.body) {
      console.log('Starting DOM scan from:', root);
      // Handle the root element itself
      scanElement(root);
      
      // Handle all descendants
      const elements = root.getElementsByTagName('*');
      for (const element of elements) {
        scanElement(element);
      }
    }
  
    // Set up MutationObserver to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Handle added nodes
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // ELEMENT_NODE
            scanElement(node);
            // Scan descendants of added node
            const elements = node.getElementsByTagName('*');
            for (const element of elements) {
              scanElement(element);
            }
          }
        });
      });
    });
  
    // Start observing the document with configured parameters
    observer.observe(document.body, { 
      childList: true,
      subtree: true 
    });
  
    // Perform initial scan
    console.log('Performing initial DOM scan');
    scanDOM();
  }
})();

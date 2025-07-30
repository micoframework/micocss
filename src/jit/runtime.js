/**
 * MicoCSS JIT Runtime v2.0
 * Handles initial DOM scan, dynamically added elements,
 * and dynamic attribute changes (e.g., class toggling).
 */
(function () {
  // Wait for the DOM to be ready before initializing
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Retrieve the pre-generated CSS map and global styles
    const map = window.JIT_CSS_MAP || {};
    const globalCSS = window.JIT_GLOBAL_CSS || "";
    
    // A Set to keep track of which CSS rules have already been injected
    const injectedRules = new Set();
    
    // Create a single <style> tag to hold all our generated styles
    const styleSheet = document.createElement("style");
    styleSheet.setAttribute("data-micocss-jit", "true");
    document.head.appendChild(styleSheet);
    
    // Apply global styles (:root variables, semantic tag selectors, etc.) immediately
    // These styles are always included regardless of what classes are used in the HTML
    if (globalCSS && !injectedRules.has('__global__')) {
      styleSheet.textContent += globalCSS + "\n";
      injectedRules.add('__global__');
      console.log('✅ Applied global CSS including semantic tag selectors');
    }

    /**
     * The core engine. Takes an array of class names, checks if they
     * exist in the map and haven't been injected yet, and then injects
     * the corresponding CSS rules into our stylesheet.
     * @param {string[]} classList - An array of class names to process.
     */
    function applyStyles(classList) {
      let cssToInject = '';
      for (const className of classList) {
        // We check for the base class and its common pseudo-states
        const states = {
          base: className,
          hover: `${className}:hover`,
          focus: `${className}:focus`,
          active: `${className}:active`,
        };

        for (const state in states) {
          const mapKey = states[state];
          if (map[mapKey] && !injectedRules.has(mapKey)) {
            // Found a valid rule that we haven't used yet.
            injectedRules.add(mapKey); // Mark it as used
            
            // Reconstruct the full CSS rule
            const selector = mapKey.includes(':') ? `.${mapKey.replace(':', '\\:')}` : `.${mapKey}`;
            cssToInject += `${selector} { ${map[mapKey]} }\n`;
          }
        }
      }
      
      // Append the new rules in a single batch for better performance
      if (cssToInject) {
        styleSheet.textContent += cssToInject;
      }
    }
  
    /**
     * Scans a given element and all of its descendants for classes to apply.
     * @param {HTMLElement} rootElement - The element to start scanning from.
     */
    function scanAndApply(rootElement) {
        if (!rootElement || rootElement.nodeType !== 1) return;

        const elementsToProcess = new Set([rootElement]);
        rootElement.querySelectorAll('[class]').forEach(el => elementsToProcess.add(el));

        const allClasses = new Set();
        elementsToProcess.forEach(el => {
            el.classList.forEach(cls => allClasses.add(cls));
        });

        applyStyles(Array.from(allClasses));
    }
  
    // --- THE FIX IS HERE: A MORE POWERFUL MUTATION OBSERVER ---

    const observer = new MutationObserver((mutationsList) => {
      const classesToProcess = new Set();

      for (const mutation of mutationsList) {
        // Type 1: A class attribute was added/changed on an existing element
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          mutation.target.classList.forEach(cls => classesToProcess.add(cls));
        }
        // Type 2: New elements were added to the DOM
        else if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Ensure it's an element
              // Add the new element's own classes
              node.classList.forEach(cls => classesToProcess.add(cls));
              // Add classes from all descendants of the new element
              node.querySelectorAll('[class]').forEach(el => {
                el.classList.forEach(cls => classesToProcess.add(cls));
              });
            }
          });
        }
      }
      
      if (classesToProcess.size > 0) {
        applyStyles(Array.from(classesToProcess));
      }
    });
  
    // Configure and start the observer
    observer.observe(document.body, { 
      attributes: true,       // *** THIS IS THE KEY: Watch for attribute changes ***
      attributeFilter: ['class'], // Only care about the 'class' attribute for performance
      childList: true,        // Watch for added/removed nodes
      subtree: true           // Watch all descendants
    });
  
    // Perform the initial full-body scan on page load
    scanAndApply(document.body);
  }
})();
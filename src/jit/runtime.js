/**
 * MicoCSS JIT Runtime
 * This script handles the dynamic application of CSS styles based on DOM content
 */
(function () {
  const map = window.JIT_CSS_MAP || {};
  const global = window.JIT_GLOBAL_CSS || "";
  const used = new Set();
  const style = document.createElement("style");
  style.setAttribute("data-micocss-jit", "true");
  document.head.appendChild(style);

  // Apply global styles immediately
  if (global) {
    style.textContent += global + "\n";
  }

  function applyStyles(classList) {
    classList.forEach(cls => {
      const direct = map[cls];
      const hover = map[`${cls}:hover`];
      const focus = map[`${cls}:focus`];
      const active = map[`${cls}:active`];

      if (direct && !used.has(cls)) {
        used.add(cls);
        style.textContent += `.${cls}{${direct}}\n`;
      }
      if (hover && !used.has(`${cls}:hover`)) {
        used.add(`${cls}:hover`);
        style.textContent += `.${cls}:hover{${hover}}\n`;
      }
      if (focus && !used.has(`${cls}:focus`)) {
        used.add(`${cls}:focus`);
        style.textContent += `.${cls}:focus{${focus}}\n`;
      }
      if (active && !used.has(`${cls}:active`)) {
        used.add(`${cls}:active`);
        style.textContent += `.${cls}:active{${active}}\n`;
      }
    });
  }

  function scanDOM(root = document) {
    const elements = root.querySelectorAll("[class]");
    elements.forEach(el => {
      const classList = (el.getAttribute("class") || "").trim().split(/\s+/).filter(Boolean);
      applyStyles(classList);

      // Handle data-* attributes
      Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith("data-")) {
          const selector = `[${attr.name}="${attr.value}"]`;
          if (map[selector] && !used.has(selector)) {
            used.add(selector);
            style.textContent += `${selector}{${map[selector]}}\n`;
          }
        }
      });
    });
  }

  // Initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      scanDOM();
      startObserving();
    });
  } else {
    scanDOM();
    startObserving();
  }

  function startObserving() {
    if (!document.body) {
      return setTimeout(startObserving, 50);
    }
    
    // Watch for DOM changes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) scanDOM(node);
          });
        } else if (mutation.type === "attributes") {
          if (mutation.attributeName === "class") {
            const classes = mutation.target.className.trim().split(/\s+/).filter(Boolean);
            applyStyles(classes);
          } else if (mutation.attributeName.startsWith("data-")) {
            const val = mutation.target.getAttribute(mutation.attributeName);
            const selector = `[${mutation.attributeName}="${val}"]`;
            if (map[selector] && !used.has(selector)) {
              used.add(selector);
              style.textContent += `${selector}{${map[selector]}}\n`;
            }
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true,
    });
  }
})();

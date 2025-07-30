/**
 * Mico CSS Framework - JavaScript Entry Point
 * 
 * Main JavaScript file that initializes all Mico framework features.
 * This file provides a unified API for all JavaScript functionality.
 * 
 * @version 1.0.0
 * @author Michael Katiba
 */

// Import theme toggle functionality
// import './theme-toggle.js';

// Import animation engine (if using modules)
// import MicoAnimationEngine from './animation/animation-engine.js';
// import { MicoEasing, MicoDuration, MicoAnimationUtils } from './animation/animation-helpers.js';

/**
 * Main Mico Framework Class
 */
class MicoFramework {
  constructor(options = {}) {
    this.version = '1.0.0';
    this.options = {
      // Animation options
      animation: {
        enabled: options.animation?.enabled !== false,
        ...options.animation
      },
      
      // Debug mode
      debug: options.debug || false,
      
      // Auto-initialization
      autoInit: options.autoInit !== false
    };

    this.components = {};
    this.animationEngine = null;
    
    if (this.options.autoInit) {
      this.init();
    }
  }

  /**
   * Initialize the framework
   */
  init() {
    if (this.options.debug) {
      console.log(`🚀 Mico Framework v${this.version} initializing...`);
    }

    // Initialize animation engine
    if (this.options.animation.enabled) {
      this.initAnimationEngine();
    }

    // Initialize other components
    this.initUtilities();
    
    // Mark as initialized
    document.documentElement.setAttribute('data-mico-initialized', 'true');
    
    if (this.options.debug) {
      console.log('✅ Mico Framework initialized successfully');
    }
  }

  /**
   * Initialize animation engine
   */
  initAnimationEngine() {
    if (typeof MicoAnimationEngine !== 'undefined') {
      this.animationEngine = new MicoAnimationEngine({
        ...this.options.animation,
        debug: this.options.debug
      });
    } else if (this.options.debug) {
      console.warn('⚠️ MicoAnimationEngine not found. Animation features disabled.');
    }
  }

  /**
   * Initialize utility functions
   */
  initUtilities() {
    // Initialize form enhancements
    this.initFormEnhancements();
    
    // Initialize accessibility features
    this.initAccessibilityFeatures();
    
    // Initialize responsive utilities
    this.initResponsiveUtilities();
  }

  /**
   * Initialize form enhancements
   */
  initFormEnhancements() {
    // Auto-resize textareas
    const textareas = document.querySelectorAll('textarea[data-auto-resize]');
    textareas.forEach(textarea => {
      this.autoResizeTextarea(textarea);
    });

    // Enhanced file inputs
    const fileInputs = document.querySelectorAll('input[type="file"][data-enhanced]');
    fileInputs.forEach(input => {
      this.enhanceFileInput(input);
    });
  }

  /**
   * Auto-resize textarea based on content
   */
  autoResizeTextarea(textarea) {
    const resize = () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    };

    textarea.addEventListener('input', resize);
    textarea.addEventListener('change', resize);
    
    // Initial resize
    resize();
  }

  /**
   * Enhance file input with custom styling
   */
  enhanceFileInput(input) {
    const wrapper = document.createElement('div');
    wrapper.className = 'file-input-wrapper';
    
    const label = document.createElement('label');
    label.className = 'file-input-label btn btn-outline';
    label.textContent = input.dataset.label || 'Choose File';
    label.setAttribute('for', input.id);
    
    const feedback = document.createElement('span');
    feedback.className = 'file-input-feedback';
    feedback.textContent = 'No file chosen';
    
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
    wrapper.appendChild(label);
    wrapper.appendChild(feedback);
    
    input.addEventListener('change', (e) => {
      const files = e.target.files;
      if (files.length > 0) {
        feedback.textContent = files.length === 1 
          ? files[0].name 
          : `${files.length} files selected`;
      } else {
        feedback.textContent = 'No file chosen';
      }
    });
  }

  /**
   * Initialize accessibility features
   */
  initAccessibilityFeatures() {
    // Focus management
    this.initFocusManagement();
    
    // Keyboard navigation
    this.initKeyboardNavigation();
    
    // ARIA enhancements
    this.initAriaEnhancements();
  }

  /**
   * Initialize focus management
   */
  initFocusManagement() {
    // Focus trap for modals
    const modals = document.querySelectorAll('[data-modal]');
    modals.forEach(modal => {
      this.createFocusTrap(modal);
    });

    // Skip link functionality
    const skipLinks = document.querySelectorAll('.skip-link');
    skipLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /**
   * Create focus trap for modal elements
   */
  createFocusTrap(element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  /**
   * Initialize keyboard navigation
   */
  initKeyboardNavigation() {
    // Arrow key navigation for button groups
    const buttonGroups = document.querySelectorAll('.btn-group');
    buttonGroups.forEach(group => {
      this.addArrowKeyNavigation(group, 'button');
    });

    // Arrow key navigation for tab lists
    const tabLists = document.querySelectorAll('[role="tablist"]');
    tabLists.forEach(tabList => {
      this.addArrowKeyNavigation(tabList, '[role="tab"]');
    });
  }

  /**
   * Add arrow key navigation to element groups
   */
  addArrowKeyNavigation(container, selector) {
    const items = container.querySelectorAll(selector);
    
    items.forEach((item, index) => {
      item.addEventListener('keydown', (e) => {
        let targetIndex;
        
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            e.preventDefault();
            targetIndex = (index + 1) % items.length;
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            e.preventDefault();
            targetIndex = (index - 1 + items.length) % items.length;
            break;
          case 'Home':
            e.preventDefault();
            targetIndex = 0;
            break;
          case 'End':
            e.preventDefault();
            targetIndex = items.length - 1;
            break;
          default:
            return;
        }
        
        items[targetIndex].focus();
      });
    });
  }

  /**
   * Initialize ARIA enhancements
   */
  initAriaEnhancements() {
    // Auto-generate ARIA labels for buttons without text
    const iconButtons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    iconButtons.forEach(button => {
      if (!button.textContent.trim()) {
        const title = button.getAttribute('title');
        if (title) {
          button.setAttribute('aria-label', title);
        }
      }
    });
  }

  /**
   * Initialize responsive utilities
   */
  initResponsiveUtilities() {
    // Responsive image loading
    this.initResponsiveImages();
    
    // Viewport size classes
    this.updateViewportClasses();
    window.addEventListener('resize', () => this.updateViewportClasses());
  }

  /**
   * Initialize responsive images
   */
  initResponsiveImages() {
    // Lazy loading for images with data-src
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  /**
   * Update viewport size classes on document element
   */
  updateViewportClasses() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const doc = document.documentElement;
    
    // Remove existing viewport classes
    doc.classList.remove('viewport-xs', 'viewport-sm', 'viewport-md', 'viewport-lg', 'viewport-xl');
    
    // Add appropriate viewport class
    if (width < 576) {
      doc.classList.add('viewport-xs');
    } else if (width < 768) {
      doc.classList.add('viewport-sm');
    } else if (width < 992) {
      doc.classList.add('viewport-md');
    } else if (width < 1200) {
      doc.classList.add('viewport-lg');
    } else {
      doc.classList.add('viewport-xl');
    }
    
    // Add orientation class
    doc.classList.toggle('viewport-landscape', width > height);
    doc.classList.toggle('viewport-portrait', width <= height);
  }

  /**
   * Public API methods
   */
  
  // Animation methods
  animate(element, animationClass, options) {
    if (this.animationEngine) {
      return this.animationEngine.animate(element, animationClass, options);
    }
  }

  // Utility methods
  utils() {
    return typeof MicoAnimationUtils !== 'undefined' ? MicoAnimationUtils : {};
  }

  // Get framework version
  getVersion() {
    return this.version;
  }

  // Destroy framework instance
  destroy() {
    if (this.animationEngine) {
      this.animationEngine.destroy();
    }
    
    document.documentElement.removeAttribute('data-mico-initialized');
    
    if (this.options.debug) {
      console.log('🗑️ Mico Framework destroyed');
    }
  }
}

// Auto-initialize if not in module environment
if (typeof module === 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.Mico = new MicoFramework();
    });
  } else {
    window.Mico = new MicoFramework();
  }
}

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MicoFramework;
}



/* ====================================================================== */
/* CHAMELEON LAYOUT UI SYSTEM - START                                       */
/* ====================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const layoutContainer = document.querySelector('.chameleon-layout-container');
  // RENAMED: stickyContentItems -> stickyContentCards
  const stickyContentCards = document.querySelectorAll('.sticky-content-card');
  // RENAMED: gallerySections -> scrollingContentElements
  const scrollingContentElements = document.querySelectorAll('.scrolling-content');

  if (!layoutContainer || stickyContentCards.length === 0 || scrollingContentElements.length === 0) {
    console.warn('Chameleon layout elements not found. Aborting initialization.');
    return;
  }

  // RENAMED: currentActiveSyncId -> currentActiveContentId
  let currentActiveContentId = null;

  // RENAMED: newSyncId -> targetContentId
  function setActiveStickyContent(targetContentId) {
    if (targetContentId === currentActiveContentId) {
      const currentItem = layoutContainer.querySelector(`.sticky-content-card[data-content-id="${targetContentId}"]`);
      if (currentItem && !currentItem.classList.contains('is-active')) { // Ensure it is indeed active
          currentItem.classList.remove('is-exiting');
          currentItem.classList.add('is-active');
      }
      return;
    }

    if (currentActiveContentId !== null) {
      const previousActiveItem = layoutContainer.querySelector(`.sticky-content-card[data-content-id="${currentActiveContentId}"]`);
      if (previousActiveItem) {
        previousActiveItem.classList.remove('is-active');
        previousActiveItem.classList.add('is-exiting');
        setTimeout(() => {
          // FIXED: Use data-content-id for comparison
          if (previousActiveItem.dataset.contentId !== targetContentId) {
            previousActiveItem.classList.remove('is-exiting');
          }
        }, 1000 * 0.7);
      }
    }

    const newActiveItem = layoutContainer.querySelector(`.sticky-content-card[data-content-id="${targetContentId}"]`);
    if (newActiveItem) {
      newActiveItem.classList.remove('is-exiting');
      newActiveItem.classList.add('is-active');
    }

    currentActiveContentId = targetContentId;
    // RENAMED: layoutContainer.dataset.activeSection -> layoutContainer.dataset.activeContent
    layoutContainer.dataset.activeContent = targetContentId;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -30% 0px', // Trigger when ~top 70% of section is visible
    threshold: 0.1 // A small part needs to be visible within the adjusted root
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetContentIdFromScroll = entry.target.dataset.contentTarget; // Reads from .scrolling-content
        if (targetContentIdFromScroll) {
          setActiveStickyContent(targetContentIdFromScroll);
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  scrollingContentElements.forEach(scrollingEl => observer.observe(scrollingEl));

  function setInitialActiveSection() {
    let bestCandidate = null;
    let maxVisibilityScore = -Infinity;

    scrollingContentElements.forEach(scrollingEl => {
      const rect = scrollingEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const isTopVisible = rect.top < viewportHeight && rect.bottom > 0;

      if (isTopVisible) {
        let score = 0;
        const elementCenterY = rect.top + rect.height / 2;
        const idealActivationZoneTop = viewportHeight * 0.35; // Adjust for earlier trigger
        const idealActivationZoneBottom = viewportHeight * 0.55;

        if (elementCenterY >= idealActivationZoneTop && elementCenterY <= idealActivationZoneBottom) {
          score = 1000;
        } else {
          score = viewportHeight - Math.abs(elementCenterY - (idealActivationZoneTop + idealActivationZoneBottom) / 2);
        }

        if (score > maxVisibilityScore) {
          maxVisibilityScore = score;
          bestCandidate = scrollingEl;
        }
      }
    });

    if (bestCandidate) {
      setActiveStickyContent(bestCandidate.dataset.contentTarget);
    } else if (scrollingContentElements.length > 0) {
      setActiveStickyContent(scrollingContentElements[0].dataset.contentTarget);
    }
  }

  setInitialActiveSection();
});

/* ====================================================================== */
/* CHAMELEON LAYOUT UI SYSTEM - END                                       */
/* ====================================================================== */

/**
 * Mico CSS Framework - JavaScript Bundle
 * Version: 1.0.0
 * Author: Michael Katiba
 *
 * This file contains all JavaScript functionality for the Mico CSS Framework.
 * It includes animation engine, utilities, and framework initialization.
 */


/* === animation/animation-helpers.js === */
/**
 * Mico CSS Framework - Animation Helpers
 * 
 * Additional utility functions and helpers for the Mico Animation Engine.
 * These functions provide convenient ways to create and manage animations.
 * 
 * @version 1.0.0
 * @author Michael Katiba
 */

/**
 * Animation timing functions and easing curves
 */
const MicoEasing = {
  // Standard easing functions
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  
  // Custom cubic-bezier curves
  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  
  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  
  easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  
  // Bounce effects
  easeOutBounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  
  // Elastic effects
  easeOutElastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

/**
 * Animation duration presets
 */
const MicoDuration = {
  instant: 0,
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 700,
  slowest: 1000
};

/**
 * Animation utility functions
 */
const MicoAnimationUtils = {
  /**
   * Animate element with custom properties
   */
  animate(element, properties, options = {}) {
    if (!element) return Promise.reject('Element not found');
    
    const {
      duration = MicoDuration.normal,
      easing = MicoEasing.easeOut,
      delay = 0,
      fill = 'both'
    } = options;
    
    return new Promise((resolve) => {
      // Apply initial styles if provided
      if (properties.from) {
        Object.assign(element.style, properties.from);
      }
      
      // Create animation
      setTimeout(() => {
        element.style.transition = `all ${duration}ms ${easing}`;
        
        // Apply final styles
        if (properties.to) {
          Object.assign(element.style, properties.to);
        }
        
        // Resolve promise when animation completes
        setTimeout(() => {
          if (fill !== 'forwards') {
            element.style.transition = '';
          }
          resolve(element);
        }, duration);
      }, delay);
    });
  },

  /**
   * Fade in animation
   */
  fadeIn(element, options = {}) {
    return this.animate(element, {
      from: { opacity: '0' },
      to: { opacity: '1' }
    }, options);
  },

  /**
   * Fade out animation
   */
  fadeOut(element, options = {}) {
    return this.animate(element, {
      from: { opacity: '1' },
      to: { opacity: '0' }
    }, options);
  },

  /**
   * Slide in from direction
   */
  slideIn(element, direction = 'up', options = {}) {
    const transforms = {
      up: 'translateY(100%)',
      down: 'translateY(-100%)',
      left: 'translateX(100%)',
      right: 'translateX(-100%)'
    };

    return this.animate(element, {
      from: { 
        opacity: '0',
        transform: transforms[direction] || transforms.up
      },
      to: { 
        opacity: '1',
        transform: 'translate(0, 0)'
      }
    }, options);
  },

  /**
   * Scale animation
   */
  scale(element, fromScale = 0, toScale = 1, options = {}) {
    return this.animate(element, {
      from: { 
        opacity: '0',
        transform: `scale(${fromScale})`
      },
      to: { 
        opacity: '1',
        transform: `scale(${toScale})`
      }
    }, options);
  },

  /**
   * Bounce animation
   */
  bounce(element, options = {}) {
    const keyframes = [
      { transform: 'translateY(0)', offset: 0 },
      { transform: 'translateY(-30px)', offset: 0.5 },
      { transform: 'translateY(0)', offset: 1 }
    ];

    const animationOptions = {
      duration: options.duration || MicoDuration.normal,
      easing: MicoEasing.easeOutBounce,
      iterations: options.iterations || 1
    };

    return element.animate(keyframes, animationOptions);
  },

  /**
   * Shake animation
   */
  shake(element, options = {}) {
    const keyframes = [
      { transform: 'translateX(0)', offset: 0 },
      { transform: 'translateX(-10px)', offset: 0.1 },
      { transform: 'translateX(10px)', offset: 0.2 },
      { transform: 'translateX(-10px)', offset: 0.3 },
      { transform: 'translateX(10px)', offset: 0.4 },
      { transform: 'translateX(-10px)', offset: 0.5 },
      { transform: 'translateX(10px)', offset: 0.6 },
      { transform: 'translateX(-10px)', offset: 0.7 },
      { transform: 'translateX(10px)', offset: 0.8 },
      { transform: 'translateX(-10px)', offset: 0.9 },
      { transform: 'translateX(0)', offset: 1 }
    ];

    const animationOptions = {
      duration: options.duration || 500,
      easing: MicoEasing.linear,
      iterations: options.iterations || 1
    };

    return element.animate(keyframes, animationOptions);
  },

  /**
   * Pulse animation
   */
  pulse(element, options = {}) {
    const keyframes = [
      { opacity: '1', transform: 'scale(1)', offset: 0 },
      { opacity: '0.7', transform: 'scale(1.05)', offset: 0.5 },
      { opacity: '1', transform: 'scale(1)', offset: 1 }
    ];

    const animationOptions = {
      duration: options.duration || MicoDuration.slow,
      easing: MicoEasing.easeInOut,
      iterations: options.iterations || 'infinite'
    };

    return element.animate(keyframes, animationOptions);
  },

  /**
   * Stagger animations for multiple elements
   */
  stagger(elements, animationFn, options = {}) {
    const {
      delay = 100,
      ...animationOptions
    } = options;

    const promises = [];
    
    elements.forEach((element, index) => {
      const staggerDelay = (animationOptions.delay || 0) + (delay * index);
      const promise = animationFn(element, {
        ...animationOptions,
        delay: staggerDelay
      });
      promises.push(promise);
    });

    return Promise.all(promises);
  },

  /**
   * Chain multiple animations
   */
  chain(animations) {
    return animations.reduce((promise, animation) => {
      return promise.then(() => animation());
    }, Promise.resolve());
  },

  /**
   * Parallax scroll effect
   */
  parallax(element, options = {}) {
    const {
      speed = 0.5,
      direction = 'vertical'
    } = options;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      
      if (direction === 'vertical') {
        element.style.transform = `translateY(${rate}px)`;
      } else {
        element.style.transform = `translateX(${rate}px)`;
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },

  /**
   * Check if element is in viewport
   */
  isInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    return (
      rect.top >= -threshold &&
      rect.left >= -threshold &&
      rect.bottom <= windowHeight + threshold &&
      rect.right <= windowWidth + threshold
    );
  },

  /**
   * Wait for animation to complete
   */
  waitForAnimation(element) {
    return new Promise((resolve) => {
      const handleAnimationEnd = () => {
        element.removeEventListener('animationend', handleAnimationEnd);
        element.removeEventListener('transitionend', handleAnimationEnd);
        resolve(element);
      };

      element.addEventListener('animationend', handleAnimationEnd);
      element.addEventListener('transitionend', handleAnimationEnd);
    });
  },

  /**
   * Performance-optimized animation frame
   */
  raf(callback) {
    return requestAnimationFrame(callback);
  },

  /**
   * Cancel animation frame
   */
  cancelRaf(id) {
    return cancelAnimationFrame(id);
  }
};

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MicoEasing,
    MicoDuration,
    MicoAnimationUtils
  };
}

// Make available globally if not in module environment
if (typeof window !== 'undefined') {
  window.MicoEasing = MicoEasing;
  window.MicoDuration = MicoDuration;
  window.MicoAnimationUtils = MicoAnimationUtils;
}


/* === animation/animation-engine.js === */
/**
 * Mico CSS Framework - Animation Engine
 * 
 * A lightweight, performant vanilla JavaScript animation engine that works
 * seamlessly with Mico CSS animation utilities.
 * 
 * Features:
 * - Intersection Observer for scroll-triggered animations
 * - Ripple effects for interactive elements
 * - Typewriter text effects
 * - Performance optimized with requestAnimationFrame
 * - Accessibility-aware (respects prefers-reduced-motion)
 * - Zero dependencies
 * 
 * @version 1.0.0
 * @author Michael Katiba
 */

class MicoAnimationEngine {
  constructor(options = {}) {
    this.options = {
      // Intersection Observer options
      rootMargin: options.rootMargin || '0px 0px -10% 0px',
      threshold: options.threshold || 0.1,
      
      // Animation options
      defaultDuration: options.defaultDuration || 800,
      defaultEasing: options.defaultEasing || 'ease-out',
      
      // Feature flags
      enableScrollAnimations: options.enableScrollAnimations !== false,
      enableRippleEffects: options.enableRippleEffects !== false,
      enableTypewriter: options.enableTypewriter !== false,
      
      // Selectors
      scrollAnimationSelector: options.scrollAnimationSelector || '.animate-on-scroll',
      rippleSelector: options.rippleSelector || '.btn-ripple',
      typewriterSelector: options.typewriterSelector || '.anim-typewriter',
      
      // Debug mode
      debug: options.debug || false
    };

    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.intersectionObserver = null;
    this.animatedElements = new Set();
    
    this.init();
  }

  /**
   * Initialize the animation engine
   */
  init() {
    if (this.options.debug) {
      console.log('🎬 Mico Animation Engine initializing...');
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  /**
   * Setup all animation features
   */
  setup() {
    // Respect user's motion preferences
    if (this.isReducedMotion) {
      this.disableAnimations();
      return;
    }

    // Initialize features
    if (this.options.enableScrollAnimations) {
      this.initScrollAnimations();
    }
    
    if (this.options.enableRippleEffects) {
      this.initRippleEffects();
    }
    
    if (this.options.enableTypewriter) {
      this.initTypewriterEffects();
    }

    // Listen for motion preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)')
      .addEventListener('change', (e) => {
        this.isReducedMotion = e.matches;
        if (e.matches) {
          this.disableAnimations();
        } else {
          this.setup();
        }
      });

    if (this.options.debug) {
      console.log('✅ Mico Animation Engine initialized');
    }
  }

  /**
   * Initialize scroll-triggered animations using Intersection Observer
   */
  initScrollAnimations() {
    const elements = document.querySelectorAll(this.options.scrollAnimationSelector);
    
    if (elements.length === 0) return;

    // Create intersection observer
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.triggerScrollAnimation(entry.target);
          this.animatedElements.add(entry.target);
        }
      });
    }, {
      rootMargin: this.options.rootMargin,
      threshold: this.options.threshold
    });

    // Observe all animation elements
    elements.forEach(element => {
      this.intersectionObserver.observe(element);
    });

    if (this.options.debug) {
      console.log(`🔍 Observing ${elements.length} scroll animation elements`);
    }
  }

  /**
   * Trigger scroll animation for an element
   */
  triggerScrollAnimation(element) {
    // Add the visible class to trigger CSS animations
    element.classList.add('is-visible');
    
    // Apply custom duration if specified
    const duration = element.dataset.animDuration;
    if (duration) {
      element.style.animationDuration = duration + 'ms';
    }
    
    // Apply custom delay if specified
    const delay = element.dataset.animDelay;
    if (delay) {
      element.style.animationDelay = delay + 'ms';
    }

    if (this.options.debug) {
      console.log('🎭 Triggered scroll animation for:', element);
    }
  }

  /**
   * Initialize ripple effects for interactive elements
   */
  initRippleEffects() {
    const elements = document.querySelectorAll(this.options.rippleSelector);
    
    elements.forEach(element => {
      element.addEventListener('click', (e) => this.createRipple(e));
      element.addEventListener('touchstart', (e) => this.createRipple(e));
    });

    if (this.options.debug) {
      console.log(`💧 Initialized ripple effects for ${elements.length} elements`);
    }
  }

  /**
   * Create ripple effect at click/touch position
   */
  createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    // Calculate ripple position
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.className = 'ripple-element';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    // Add ripple to button
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  /**
   * Initialize typewriter effects
   */
  initTypewriterEffects() {
    const elements = document.querySelectorAll(this.options.typewriterSelector);
    
    elements.forEach(element => {
      const text = element.dataset.typeText || element.textContent;
      const speed = parseInt(element.dataset.typeSpeed) || 50;
      const delay = parseInt(element.dataset.typeDelay) || 0;
      
      if (text) {
        setTimeout(() => {
          this.typewriterEffect(element, text, speed);
        }, delay);
      }
    });

    if (this.options.debug) {
      console.log(`⌨️ Initialized typewriter effects for ${elements.length} elements`);
    }
  }

  /**
   * Create typewriter effect for an element
   */
  typewriterEffect(element, text, speed) {
    element.textContent = '';
    element.classList.add('typewriter-cursor');
    
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        // Keep cursor blinking for a moment, then remove
        setTimeout(() => {
          element.classList.remove('typewriter-cursor');
        }, 2000);
      }
    }, speed);
  }

  /**
   * Disable all animations for reduced motion preference
   */
  disableAnimations() {
    // Disconnect intersection observer
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    
    // Show all scroll animation elements immediately
    const scrollElements = document.querySelectorAll(this.options.scrollAnimationSelector);
    scrollElements.forEach(element => {
      element.classList.add('is-visible');
      element.style.opacity = '1';
      element.style.transform = 'none';
    });

    if (this.options.debug) {
      console.log('🚫 Animations disabled due to reduced motion preference');
    }
  }

  /**
   * Manually trigger animation for an element
   */
  animate(element, animationClass, options = {}) {
    if (this.isReducedMotion) return;
    
    const duration = options.duration || this.options.defaultDuration;
    const delay = options.delay || 0;
    
    setTimeout(() => {
      element.classList.add('animate-on-scroll', animationClass);
      this.triggerScrollAnimation(element);
    }, delay);
  }

  /**
   * Add new elements to be observed (useful for dynamic content)
   */
  observe(elements) {
    if (!this.intersectionObserver) return;
    
    const elementsArray = Array.isArray(elements) ? elements : [elements];
    elementsArray.forEach(element => {
      if (element.classList.contains(this.options.scrollAnimationSelector.slice(1))) {
        this.intersectionObserver.observe(element);
      }
    });
  }

  /**
   * Remove elements from observation
   */
  unobserve(elements) {
    if (!this.intersectionObserver) return;
    
    const elementsArray = Array.isArray(elements) ? elements : [elements];
    elementsArray.forEach(element => {
      this.intersectionObserver.unobserve(element);
      this.animatedElements.delete(element);
    });
  }

  /**
   * Destroy the animation engine and clean up
   */
  destroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    
    this.animatedElements.clear();
    
    if (this.options.debug) {
      console.log('🗑️ Mico Animation Engine destroyed');
    }
  }
}

// Auto-initialize if not in module environment
if (typeof module === 'undefined') {
  // Initialize with default options when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    window.MicoAnimation = new MicoAnimationEngine();
  });
}

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MicoAnimationEngine;
}


/* === mico.js === */
/**
 * Mico CSS Framework - JavaScript Entry Point
 * 
 * Main JavaScript file that initializes all Mico framework features.
 * This file provides a unified API for all JavaScript functionality.
 * 
 * @version 1.0.0
 * @author Michael Katiba
 */

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


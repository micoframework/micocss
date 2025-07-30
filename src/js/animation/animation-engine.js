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

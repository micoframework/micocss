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

**Complete Animation Engine & Motion Utilities**

**I. HTML Setup (Prerequisites)**

1.  **`no-js` / `js` class on `<html>`:**
    *   In your `<head>`:
        ```html
        <script>document.documentElement.classList.add('no-js');</script>
        ```
2.  **Link CSS & JS:**
    *   `<link rel="stylesheet" href="path/to/motion-styles.css">` (This will contain both animation engine and transition utilities)
    *   `<script src="path/to/animation-engine.js" defer></script>`

---

**II. CSS (`motion-styles.css`)**

```css
/* ==========================================================================
   Motion Utilities (Transitions & Animations)
   ========================================================================== */

:root {
  /* General Durations & Delays (can be used by both transitions & animations) */
  --duration-xs: 0.2s;   /* For animations: anim-duration-xs */
  --duration-s: 0.5s;    /* For animations: anim-duration-s */
  --duration-normal: 0.8s;/* For animations: anim-duration-normal */
  --duration-l: 1.2s;    /* For animations: anim-duration-l */
  --duration-xl: 2s;     /* For animations: anim-duration-xl */

  --delay-s: 0.2s;       /* For animations: anim-delay-s */
  --delay-m: 0.4s;       /* For animations: anim-delay-m */
  --delay-l: 0.6s;       /* For animations: anim-delay-l */
  --delay-xl: 0.8s;      /* For animations: anim-delay-xl */

  /* Transition Specific Variables */
  --transition-duration-fast: 150ms;
  --transition-duration-default: 300ms; /* Renamed from normal to avoid conflict */
  --transition-duration-slow: 500ms;

  --transition-timing-default: ease-in-out;
  --transition-timing-ease: ease;
  --transition-timing-linear: linear;
  --transition-timing-ease-in: ease-in;
  --transition-timing-ease-out: ease-out;

  --transition-delay-short: 100ms;
  --transition-delay-default: 0ms; /* Default for transitions is usually no delay */

  /* Animation Engine Specific Variables */
  --anim-default-duration: var(--duration-normal); /* Default for .anim-* classes */
  --anim-default-timing-function: ease-out; /* Default for entrance anims */

  /* Interactive Element Variables */
  --ripple-bg-default: rgba(255, 255, 255, 0.3);
  --typewriter-cursor-color: currentColor;
}

/* -------------------------------------------------------------------------- */
/*                      Transition Utilities                                  */
/* -------------------------------------------------------------------------- */

.transition-none { transition-property: none !important; }
.transition-all {
  transition-property: all !important;
  transition-duration: var(--transition-duration-default);
  transition-timing-function: var(--transition-timing-default);
  transition-delay: var(--transition-delay-default);
}
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke, text-decoration-color !important;
  transition-duration: var(--transition-duration-default);
  transition-timing-function: var(--transition-timing-default);
  transition-delay: var(--transition-delay-default);
}
.transition-opacity {
  transition-property: opacity !important;
  transition-duration: var(--transition-duration-default);
  transition-timing-function: var(--transition-timing-default);
  transition-delay: var(--transition-delay-default);
}
.transition-transform {
  transition-property: transform !important;
  transition-duration: var(--transition-duration-default);
  transition-timing-function: var(--transition-timing-default);
  transition-delay: var(--transition-delay-default);
}
.transition-shadow {
  transition-property: box-shadow, filter !important;
  transition-duration: var(--transition-duration-default);
  transition-timing-function: var(--transition-timing-default);
  transition-delay: var(--transition-delay-default);
}
.transition-background {
  transition-property: background-color, background-image, background-position, background-size !important;
  transition-duration: var(--transition-duration-default);
  transition-timing-function: var(--transition-timing-default);
  transition-delay: var(--transition-delay-default);
}
.transition-border {
  transition-property: border-color, border-width, border-style !important;
  transition-duration: var(--transition-duration-default);
  transition-timing-function: var(--transition-timing-default);
  transition-delay: var(--transition-delay-default);
}

/* Transition Duration (Overrides) */
.duration-0    { transition-duration: 0ms !important; }
.duration-75   { transition-duration: 75ms !important; }
.duration-100  { transition-duration: 100ms !important; }
.duration-150  { transition-duration: var(--transition-duration-fast) !important; }
.duration-200  { transition-duration: 200ms !important; }
.duration-300  { transition-duration: var(--transition-duration-default) !important; }
.duration-500  { transition-duration: var(--transition-duration-slow) !important; }
.duration-700  { transition-duration: 700ms !important; }
.duration-1000 { transition-duration: 1000ms !important; }

/* Transition Timing Function (Overrides) */
.ease-default { transition-timing-function: var(--transition-timing-default) !important; }
.ease-linear  { transition-timing-function: var(--transition-timing-linear) !important; }
.ease-in     { transition-timing-function: var(--transition-timing-ease-in) !important; }
.ease-out    { transition-timing-function: var(--transition-timing-ease-out) !important; }
.ease-in-out { transition-timing-function: ease-in-out !important; } /* Explicit if default is different */

/* Transition Delay (Overrides) */
.delay-0    { transition-delay: 0ms !important; }
.delay-75   { transition-delay: 75ms !important; }
.delay-100  { transition-delay: var(--transition-delay-short) !important; }
.delay-150  { transition-delay: 150ms !important; }
.delay-200  { transition-delay: 200ms !important; } /* If a different default delay is needed */
.delay-300  { transition-delay: 300ms !important; }
.delay-500  { transition-delay: 500ms !important; }
.delay-700  { transition-delay: 700ms !important; }
.delay-1000 { transition-delay: 1000ms !important; }


/* -------------------------------------------------------------------------- */
/*                      ANIMATION ENGINE BASE & KEYFRAMES                     */
/* -------------------------------------------------------------------------- */
.animate-on-scroll {
  opacity: 0;
  /* Default transition if no specific .anim-* class is used for entrance */
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  will-change: opacity, transform;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: none; /* Reset initial transforms */
}

/* No-JS Fallback */
.no-js .animate-on-scroll {
  opacity: 1;
  transform: none;
}

/* Reduced Motion Preferences for Animations */
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll,
  .animate-on-scroll.is-visible,
  [class*="anim-"] {
    animation-name: none !important;
    animation-duration: 0s !important;
    animation-play-state: paused !important;
    /* Keep transition overrides if specific transitions are still desired for non-animation interactions */
    /* transition-property: none !important; */
    /* transition-duration: 0s !important; */
    opacity: 1 !important;
    transform: none !important;
  }
  .typewriter-cursor::after,
  .typewriter-cursor-managed {
      animation: none !important;
      opacity: 1 !important;
  }
  .ripple-element { /* Also disable JS ripple animation */
    animation-name: none !important;
  }
}

/* --- Keyframes (Fade, Slide, Scale, Rotate, Continuous, Ripple, Typewriter Cursor) --- */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeInUp { from { opacity: 0; transform: translate3d(0, 40px, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
@keyframes fadeInDown { from { opacity: 0; transform: translate3d(0, -40px, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
@keyframes fadeInLeft { from { opacity: 0; transform: translate3d(-40px, 0, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
@keyframes fadeInRight { from { opacity: 0; transform: translate3d(40px, 0, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }

@keyframes slideInUp { from { transform: translate3d(0, 100%, 0); opacity: 0; visibility: visible; } to { transform: translate3d(0, 0, 0); opacity: 1; } }
@keyframes slideInDown { from { transform: translate3d(0, -100%, 0); opacity: 0; visibility: visible; } to { transform: translate3d(0, 0, 0); opacity: 1; } }
@keyframes slideInLeft { from { transform: translate3d(-100%, 0, 0); opacity: 0; visibility: visible; } to { transform: translate3d(0, 0, 0); opacity: 1; } }
@keyframes slideInRight { from { transform: translate3d(100%, 0, 0); opacity: 0; visibility: visible; } to { transform: translate3d(0, 0, 0); opacity: 1; } }

@keyframes scaleIn { from { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); } to { opacity: 1; transform: scale3d(1, 1, 1); } }
@keyframes rotateIn { from { opacity: 0; transform: rotate3d(0, 0, 1, -180deg); } to { opacity: 1; transform: rotate3d(0, 0, 1, 0deg); } }

@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
@keyframes subtleBounce { 0%, 100% { transform: translateY(0); } 40% { transform: translateY(-8px); } 60% { transform: translateY(-4px); } }
@keyframes subtleFloat { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }

@keyframes ripple-effect-js { to { transform: scale(4); opacity: 0; } }
@keyframes blink-caret { from, to { opacity: 1; } 50% { opacity: 0; } }


/* -------------------------------------------------------------------------- */
/*            SCROLL-TRIGGERED & CONTINUOUS ANIMATION UTILITIES               */
/* -------------------------------------------------------------------------- */

/* Entrance Animations (Applied when .is-visible is added by JS) */
.anim-fade-in.is-visible { animation-name: fadeIn; }
.anim-fade-in-up.is-visible { animation-name: fadeInUp; }
.anim-fade-in-down.is-visible { animation-name: fadeInDown; }
.anim-fade-in-left.is-visible { animation-name: fadeInLeft; }
.anim-fade-in-right.is-visible { animation-name: fadeInRight; }

.anim-slide-in-up.is-visible { animation-name: slideInUp; }
.anim-slide-in-down.is-visible { animation-name: slideInDown; }
.anim-slide-in-left.is-visible { animation-name: slideInLeft; }
.anim-slide-in-right.is-visible { animation-name: slideInRight; }

.anim-scale-in.is-visible { animation-name: scaleIn; }
.anim-rotate-in.is-visible { animation-name: rotateIn; }

/* Common properties for these entrance animations */
.animate-on-scroll[class*="anim-fade-in"].is-visible,
.animate-on-scroll[class*="anim-slide-in"].is-visible,
.animate-on-scroll.anim-scale-in.is-visible,
.animate-on-scroll.anim-rotate-in.is-visible {
  animation-duration: var(--anim-default-duration);
  animation-timing-function: var(--anim-default-timing-function);
  animation-fill-mode: both; /* Default fill mode */
  /* animation-delay will be applied by .anim-delay-* utility classes */
}

/* Continuous Animations (Apply directly) */
.anim-pulse { animation: pulse 2s infinite ease-in-out; }
.anim-subtle-bounce { animation: subtleBounce 2.5s infinite ease-in-out; }
.anim-subtle-float { animation: subtleFloat 3s infinite ease-in-out; }
/* Apply default duration to continuous if not overridden by utility */
.anim-pulse, .anim-subtle-bounce, .anim-subtle-float {
    animation-duration: var(--anim-default-duration);
}


/* --- Animation Modifier & Control Utilities --- */
/* These apply to any element with an animation-name set */
.anim-duration-xs   { animation-duration: var(--duration-xs) !important; }
.anim-duration-s    { animation-duration: var(--duration-s) !important; }
.anim-duration-normal { animation-duration: var(--duration-normal) !important; } /* Explicit normal */
.anim-duration-l    { animation-duration: var(--duration-l) !important; }
.anim-duration-xl   { animation-duration: var(--duration-xl) !important; }

.anim-delay-s    { animation-delay: var(--delay-s) !important; }
.anim-delay-m    { animation-delay: var(--delay-m) !important; }
.anim-delay-l    { animation-delay: var(--delay-l) !important; }
.anim-delay-xl   { animation-delay: var(--delay-xl) !important; }

.anim-ease-linear  { animation-timing-function: linear !important; }
.anim-ease-in    { animation-timing-function: ease-in !important; }
.anim-ease-out   { animation-timing-function: ease-out !important; }
.anim-ease-in-out{ animation-timing-function: ease-in-out !important; }

.anim-infinite   { animation-iteration-count: infinite !important; }
.anim-iter-1     { animation-iteration-count: 1 !important; }
.anim-iter-2     { animation-iteration-count: 2 !important; }
.anim-iter-3     { animation-iteration-count: 3 !important; }

.anim-direction-normal           { animation-direction: normal !important; }
.anim-direction-reverse          { animation-direction: reverse !important; }
.anim-direction-alternate        { animation-direction: alternate !important; }
.anim-direction-alternate-reverse{ animation-direction: alternate-reverse !important; }

.anim-fill-none     { animation-fill-mode: none !important; }
.anim-fill-forwards { animation-fill-mode: forwards !important; }
.anim-fill-backwards{ animation-fill-mode: backwards !important; }
.anim-fill-both     { animation-fill-mode: both !important; }

.anim-paused { animation-play-state: paused !important; }
.anim-running { animation-play-state: running !important; }


/* -------------------------------------------------------------------------- */
/*                  INTERACTIVE ANIMATION UTILITIES & STYLES                  */
/* -------------------------------------------------------------------------- */

/* --- Ripple Effect --- */
.btn-ripple {
  /* position: relative; /* JS will add if not present */
  /* overflow: hidden;   /* JS will add if not present */
  -webkit-tap-highlight-color: transparent;
}
.ripple-element {
  position: absolute;
  border-radius: 50%;
  background: var(--ripple-bg-default);
  transform: scale(0);
  animation: ripple-effect-js 0.6s linear;
  pointer-events: none;
}

/* --- Typewriter Effect --- */
.typewriter-container {
  display: inline-block; /* Or as needed */
}
.anim-typewriter {
  display: inline; /* Or inline-block */
  /* Add specific text styling if needed */
}
.typewriter-cursor::after {
  content: '|';
  display: inline-block;
  animation: blink-caret 0.75s step-end infinite;
  margin-left: 0.05em;
  color: var(--typewriter-cursor-color);
}
/* Class for JS-managed cursor (if you choose that route for pausing blink) */
.typewriter-cursor-managed {
    display: inline-block;
    margin-left: 0.05em;
    color: var(--typewriter-cursor-color);
}
.typewriter-cursor-paused::after,
.typewriter-cursor-managed.is-paused { /* Example classes to pause blinking */
    animation-play-state: paused !important;
    opacity: 1 !important; /* Keep it visible when paused */
}
```

---

**III. JavaScript (`animation-engine.js`)**
*(The JavaScript from the previous response is largely complete and correct for this updated CSS. Key points to re-verify in that JS:*
*   The `DOMContentLoaded` listener.
*   `document.documentElement.classList.remove('no-js'); document.documentElement.classList.add('js');` at the top.
*   `initializeScrollAnimations()` for `.animate-on-scroll` and `.is-visible` logic.
*   `initializeRippleEffect()` for `.btn-ripple`.
*   `initializeTypewriterEffect()` for `.anim-typewriter` and its data attributes.
*   Ensure the JS for ripple correctly adds `position: relative` and `overflow: hidden` to the button *if they aren't already present*, to ensure the ripple is contained and positioned correctly. This is a good robustness check.
    ```javascript
    // Inside initializeRippleEffect, for each button:
    if (getComputedStyle(button).position === 'static') {
        button.style.position = 'relative';
    }
    if (getComputedStyle(button).overflow !== 'hidden') {
        button.style.overflow = 'hidden';
    }
    ```
*)

---

**IV. Final List of All Motion-Related Utility Classes (HTML Usage Summary)**

**A. General Transition Utilities (for hover, focus, JS state changes):**
*   **Property:** `.transition-none`, `.transition-all`, `.transition-colors`, `.transition-opacity`, `.transition-transform`, `.transition-shadow`, `.transition-background`, `.transition-border`
*   **Duration:** `.duration-0`, `.duration-75`, `.duration-100`, `.duration-150`, `.duration-200`, `.duration-300`, `.duration-500`, `.duration-700`, `.duration-1000`
*   **Easing:** `.ease-default`, `.ease-linear`, `.ease-in`, `.ease-out`, `.ease-in-out`
*   **Delay:** `.delay-0`, `.delay-75`, `.delay-100`, `.delay-150`, `.delay-200`, `.delay-300`, `.delay-500`, `.delay-700`, `.delay-1000`

**B. Scroll-Triggered Entrance Animations:**
*   **Required Base:** `.animate-on-scroll`
*   **Animation Types:**
    *   `.anim-fade-in`, `.anim-fade-in-up`, `.anim-fade-in-down`, `.anim-fade-in-left`, `.anim-fade-in-right`
    *   `.anim-slide-in-up`, `.anim-slide-in-down`, `.anim-slide-in-left`, `.anim-slide-in-right`
    *   `.anim-scale-in`
    *   `.anim-rotate-in`
*   **Behavioral Modifier:**
    *   `.anim-once` (or `data-anim-once="true"` attribute)

**C. Continuous Animations:**
*   `.anim-pulse`
*   `.anim-subtle-bounce`
*   `.anim-subtle-float`

**D. Animation Modifiers & Controls (for B and C):**
*   **Duration:** `.anim-duration-xs`, `.anim-duration-s`, `.anim-duration-normal`, `.anim-duration-l`, `.anim-duration-xl`
*   **Delay (Entrance Only):** `.anim-delay-s`, `.anim-delay-m`, `.anim-delay-l`, `.anim-delay-xl`
*   **Easing:** `.anim-ease-linear`, `.anim-ease-in`, `.anim-ease-out`, `.anim-ease-in-out`
*   **Iteration:** `.anim-infinite`, `.anim-iter-1`, `.anim-iter-2`, `.anim-iter-3`
*   **Play State:** `.anim-paused`, `.anim-running`
*   **Direction:** `.anim-direction-normal`, `.anim-direction-reverse`, `.anim-direction-alternate`, `.anim-direction-alternate-reverse`
*   **Fill Mode:** `.anim-fill-none`, `.anim-fill-forwards`, `.anim-fill-backwards`, `.anim-fill-both`

**E. Interactive Animations (Specific components/JS):**
*   **Button Ripple (JS-Enhanced):**
    *   `.btn-ripple`
*   **Typewriter Effect:**
    *   `.anim-typewriter`
    *   `.typewriter-cursor` (for CSS cursor)
    *   `data-type-text`, `data-type-speed`, `data-type-start-delay`, `data-type-phrase-delay`, `data-type-loop`, `data-type-erase`

---
This complete version now includes the general transition utilities and the refined animation control utilities (`animation-direction`, `animation-fill-mode`), making the entire "motion" part of your framework much more comprehensive and powerful. The CSS variable renaming (`--transition-duration-default`) also prevents potential conflicts and clarifies intent.
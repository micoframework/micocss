/**
 * Mico CSS Framework Configuration
 * This file allows you to customize which components and utilities to include in your build
 */

module.exports = {
  // Core modules (required)
  core: true,

  // Utility modules
  utilities: {
    typography: true,
    color: true,
    layout: true,
    border: true,
    spacing: true,
    states: true,
    button: true,
    animation: true,
    navigation: true
  },

  // Component modules (all disabled)
  components: {
    accordion: false,
    alert: false,
    article: false,
    avatar: false,
    badge: false,
    button: false,
    calender: false,
    card: false,
    form: false,
    modal: false,
    navigation: false,
    pagination: false,
    select: false,
    skeleton: false,
    slider: false,
    table: false,
    tabs: false,
    tooltip: false
  },

  // Presets
  presets: {
    oxygenbuilder: true
  },

  // Features
  features: {
    accessibility: true,
    motion: true,
    darkMode: true,
    rtl: false
  }
};

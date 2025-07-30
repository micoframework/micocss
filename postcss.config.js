module.exports = (ctx) => ({
  plugins: [
    require('postcss-import'),
    ctx.env === 'production' ? require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        // Enable proper whitespace normalization for minification
        normalizeWhitespace: true,
        // Disable calc optimization to avoid errors
        calc: false,
        // IMPORTANT: Disable all rule manipulation to preserve utility class structure
        mergeRules: false,
        mergeLonghand: false,
        minifySelectors: false,
        // Disable duplicate removal to prevent splitting multi-property classes
        discardDuplicates: false,
        // Disable other optimizations that might split rules
        reduceIdents: false,
        zindex: false,
        discardOverridden: false
      }]
    }) : false
    // Disable autoprefixer completely to prevent CSS custom property processing
    // require('autoprefixer')
  ]
});

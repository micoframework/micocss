module.exports = (ctx) => ({
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 2,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-query-ranges': true
      },
      // Important: Don't preserve original declarations to avoid duplicates
      preserve: false
    }),
    ctx.env === 'production' ? require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        // Enable proper whitespace normalization for minification
        normalizeWhitespace: true,
        // Disable calc optimization to avoid errors
        calc: false,
        // IMPORTANT: Disable mergeRules to prevent splitting multi-property classes
        mergeRules: false,
        // Remove duplicate properties
        discardDuplicates: true,
        // Disable mergeLonghand to preserve multi-property utility classes
        mergeLonghand: false,
        // Disable minifySelectors to preserve exact class names
        minifySelectors: false
      }]
    }) : false,
    require('autoprefixer')
  ]
});

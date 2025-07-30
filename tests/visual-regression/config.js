/**
 * Configuration for visual regression testing
 */

module.exports = {
  // Test URLs
  urls: [
    'http://localhost:3000/tests/browser-compatibility.html',
    'http://localhost:3000/tests/accessibility.html'
  ],
  
  // Viewport sizes to test
  viewports: [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 800 }
  ],
  
  // Browsers to test
  browsers: [
    'chrome',
    'firefox',
    'edge'
  ],
  
  // Components to test
  components: [
    { name: 'Typography', selector: '.test-section:nth-child(1)' },
    { name: 'Colors', selector: '.test-section:nth-child(2)' },
    { name: 'Layout', selector: '.test-section:nth-child(3)' },
    { name: 'Buttons', selector: '.test-section:nth-child(4)' },
    { name: 'Forms', selector: '.test-section:nth-child(5)' },
    { name: 'Cards', selector: '.test-section:nth-child(6)' },
    { name: 'Responsive', selector: '.test-section:nth-child(7)' }
  ]
};

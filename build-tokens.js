const StyleDictionary = require('style-dictionary');

// Register a simple transform or use built-ins
// Style Dictionary has built-in transforms for CSS variables: 'attribute/cti', 'name/cti/kebab', 'color/css', 'size/rem'

const sd = StyleDictionary.extend({
  source: ['tokens/design-tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'app/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables'
      }]
    }
  }
});

sd.buildAllPlatforms();

console.log('✅ Design tokens built successfully!');

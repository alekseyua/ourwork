const StyleLintPlugin = require('stylelint-webpack-plugin');
module.exports = {
  // ... other options
  plugins: [
    new StyleLintPlugin({
      files: ['**/*.{htm,html,css,sss,less,scss,sass}'],
    })
  ]
}
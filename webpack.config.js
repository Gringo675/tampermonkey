const path = require('path')

module.exports = {
  mode: 'development',
  devtool: false,
  entry: './gmail/index.js', // Entry point of your application
  output: {
    filename: 'bundle.js', // Output bundle file name
    path: path.resolve(__dirname, 'gmail'), // Output directory
  },
}

const path = require('path');
const webpack = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign(webpack, {
  entry: {
    main: path.join(__dirname, 'src/index.ts')
  },
  plugins: [new HtmlWebpackPlugin()]
});

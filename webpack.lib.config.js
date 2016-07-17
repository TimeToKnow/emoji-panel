'use strict';
const path = require('path');
const webpackBaseConfig = require('./webpack.config');

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports =
Object.assign(webpackBaseConfig, {
  output: Object.assign(webpackBaseConfig.output, {
    path: path.join(__dirname, 'lib'),
    libraryTarget: 'umd',
    umdNamedDefine: true
  }),
  module: Object.assign(webpackBaseConfig.module, {
    loaders: webpackBaseConfig.module.loaders
    .filter(loaderObj => loaderObj.test.toString() !== /\.acss.js$/.toString()) // Remove loader to add it later with different loader
    .concat(
      {
        test: /\.acss.js$/,
        // Without css-loader so it won't resolve file imports, raw instead, and replace emoji-datasource imports location (in `node_modules`)
        loader: ExtractTextPlugin.extract('style', 'raw!replace?flags=g&regex=~emoji-datasource&sub=\.\.\/\.\.\/emoji-datasource!absurd')
      }
    )
  })
});

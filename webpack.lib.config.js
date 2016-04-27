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
    .filter(loaderObj => loaderObj.test.toString() !== /\.acss.js$/.toString()) // Remove loader to add it later wiht different loader
    .concat(
      {
        test: /\.acss.js$/,
        loader: ExtractTextPlugin.extract('style', 'raw!absurd') // Without css-loader so it won't resolve file imports, raw instead
      }
    )
  })
});

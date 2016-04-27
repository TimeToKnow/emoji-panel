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
    loaders: webpackBaseConfig.module.loaders.map(loaderObj => {
      const loaderTestString = loaderObj.test.toString();
      if (loaderTestString === /\.(png|ttf)$/.toString()) {
        return Object.assign(loaderObj, {
          loader: 'file?name=../[path][name].[ext]' // So it won't copy the file to lib folder, only point to it's own location
        });
      } else {
        return loaderObj;
      }
    })
  })
});

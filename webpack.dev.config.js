'use strict';
const path = require('path');
const webpackBaseConfig = require('./webpack.config');

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =
Object.assign(webpackBaseConfig, {
  devtool: 'source-map',
  entry: Object.assign({},  {
    'dist/example.min': webpackBaseConfig.entry.example, // Change location and file name to match the ones in github page
    base: [] // Hot reload will be injected here
  }),
  module: Object.assign(webpackBaseConfig.module, {
    loaders: webpackBaseConfig.module.loaders.map(loaderObj => {
      const loaderTestString = loaderObj.test.toString();
      if (loaderTestString === /\.png$/.toString()) {
        return Object.assign(loaderObj, {
          loader: 'url?limit=1&name=/[hash].[ext]' // Changed to absolute path because css will try to loader assets from url
        });
      } else {
        return loaderObj;
      }
    })
  }),
  plugins: webpackBaseConfig.plugins.concat([
    new HtmlWebpackPlugin({
      chunks: ['base'],  // Others are added manually to `index.html`
      template: './index.html',
      inject: 'head'
    })
  ])
});

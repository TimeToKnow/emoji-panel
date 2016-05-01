'use strict';
const path = require('path');
const webpackBaseConfig = require('./webpack.config');

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const __PROD__ = process.env.NODE_ENV === 'production';

module.exports =
Object.assign(webpackBaseConfig, {
  devtool: 'source-map',
  entry: Object.keys(webpackBaseConfig.entry)
  .reduce((obj, entryName) => Object.assign(obj, {
    [`dist/${entryName}${__PROD__ ? '' : '.min'}`]: webpackBaseConfig.entry[entryName]
  }), {}),
  module: Object.assign(webpackBaseConfig.module, {
    loaders: webpackBaseConfig.module.loaders.map(loaderObj => {
      const loaderTestString = loaderObj.test.toString();
      if (loaderTestString === /\.(png|ttf)$/.toString()) {
        return Object.assign(loaderObj, {
          loader: 'file?name=/[hash].[ext]' // Changed to absolute path because css will try to loader assets from url
        });
      } else {
        return loaderObj;
      }
    })
  }),
  plugins: webpackBaseConfig.plugins.concat([
    new HtmlWebpackPlugin({
      chunks: [],  // All are added manually to `index.html`
      template: './index.html',
      inject: 'head'
    })
  ])
});

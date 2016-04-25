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
  entry: Object.assign({
    base: [] // Hot reload will be injected here
  },
  Object.keys(webpackBaseConfig.entry)
  .filter(entryName => entryName !== 'emoji-panel')
  .reduce((obj, entryName) => Object.assign(obj, {
    [`dist/${entryName}${__PROD__ ? '' : '.min'}`]: webpackBaseConfig.entry[entryName]
  }), {})),
  module: Object.assign(webpackBaseConfig.module, {
    loaders: webpackBaseConfig.module.loaders.map(loaderObj => {
      const loaderTestString = loaderObj.test.toString();
      if (loaderTestString === /\.(png|ttf)$/.toString()) {
        return Object.assign(loaderObj, {
          loader: 'url?limit=20000&name=/[hash].[ext]' // Changed to absolute path because css will try to loader assets from url
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

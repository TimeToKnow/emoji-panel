'use strict';
const webpack = require('webpack');
const path = require('path');

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const __PROD__ = process.env.NODE_ENV === 'production';
const __DEV__ = !__PROD__;

module.exports = {
  devtool: false,
  entry: {
    'emoji-panel': [
      './src/emoji-panel.js',
      './src/emoji-panel.scss'
    ],
    example: [
      './example/example.js',
      './example/example.scss'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `[name]${__PROD__ ? '.min' : ''}.js`,
    publicPath: ''
  },
  plugins: [
    new ExtractTextPlugin(`[name]${__PROD__ ? '.min' : ''}.css`),
    new webpack.DefinePlugin({
      __PROD__: JSON.stringify(__PROD__),
      __DEV__: JSON.stringify(__DEV__),
      'process.env': {
        NODE_ENV: JSON.stringify(__PROD__ ? 'production' : 'development')
      }
    })
  ].concat(__PROD__ ? [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      },
      sourceMap: false
    })
  ] : []),
  module: {
    preLoaders: [
      {
        test: /\.json$/,
        loader: 'json'
      }
    ],
    loaders: [
      {
        test: /\.ahtml.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'raw!absurd'
      },
      {
        test: name => name.match(/\.js$/) && !name.match(/(\.ahtml|\.acss).js$/),
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'example')
        ],
        loader: 'babel?presets[]=es2015'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.acss.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: ExtractTextPlugin.extract('style', 'css!absurd')
      },
      {
        test: /\.(png|ttf)$/,
        loader: 'url?limit=20000&name=./asset/[hash].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      'emoji-panel': path.join(__dirname, 'src', 'emoji-panel.js'),
      'emoji-panel.css': path.join(__dirname, 'src', 'emoji-panel.scss')
    }
  }
};

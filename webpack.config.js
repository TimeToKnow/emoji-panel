'use strict';
const webpack = require('webpack');
const path = require('path');
const fs =  require('fs');

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const __PROD__ = process.env.NODE_ENV === 'production';
const __DEV__ = !__PROD__;

const walk = dir => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      results.push(path.join(filePath));
    }
  });
  return results;
};

module.exports = {
  devtool: false,
  entry: Object.assign({
    'emoji-panel': ['./src/emoji-panel.js'],
    'example': [
      './example/example.js',
      './example/example.css'
    ]
  },
  walk(path.join(__dirname, 'src', 'sets'))
  .reduce((obj, fileName) => {
    const entryName = 'emoji-panel-' + path.basename(fileName).replace('.acss.js', '');
    return Object.assign(obj, {
      [entryName]: [fileName, './src/emoji-panel.scss']
    });
  }, {})),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `[name]${__PROD__ ? '.min' : ''}.js`,
    publicPath: '',
    library: 'EmojiPanel'
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
        test: name => name.match(/\.js$/) && !name.match(/(\.ahtml|\.acss).js$/),
        loader: 'babel?presets[]=es2015'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      {
        test: /\.ahtml.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'raw!html-minify!absurd'
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
        loader: 'file?name=./asset/[name].[ext]'
      }
    ]
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      'emoji-panel': path.join(__dirname, 'src', 'emoji-panel.js')
    }
  }
};

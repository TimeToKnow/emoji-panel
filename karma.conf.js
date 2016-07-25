const path = require('path');
// Require webpack config rather than duplicating it
const webpackConfig = require('./webpack.config');

const args = process.argv.slice(2);
const isCoverage = args.indexOf('-coverage') !== -1;
const isLcov = args.indexOf('-lcov') !== -1;

module.exports = function karmaConfig(config) {
  config.set({
    // ... normal karma configuration
    browsers: ['PhantomJS'],
    singleRun: true,
    files: [
      // 'node_modules/babel-polyfill/dist/polyfill.js',
      'test/index.js'
      // each file acts as entry point for the webpack configuration
    ],
    preprocessors: {
      // add webpack as preprocessor
      'test/index.js': ['webpack', 'sourcemap']
    },
    plugins: ['karma-webpack', 'karma-jasmine', 'karma-nyan-reporter', 'karma-coverage', 'karma-sourcemap-loader', 'karma-phantomjs-launcher', 'karma-phantomjs-shim'],
    frameworks: ['phantomjs-shim', 'jasmine'],
    reporters: [isLcov ? 'dots' : 'nyan'].concat(isCoverage ? ['coverage'] : []),
    // reporter options
    nyanReporter: {
      suppressErrorHighlighting: true
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{
        type: isLcov ? 'lcov' : 'html', // lcov or lcovonly are required for generating lcov.info files, html for local coverage report
        subdir: '.'
      }]
    },
    webpack: Object.assign(webpackConfig, {
      entry: undefined,
      output: undefined,
      devtool: 'inline-source-map',
      // *optional* isparta options: istanbul behind isparta will use it
      isparta: {
        embedSource: true,
        noAutoWrap: true,
        // these babel options will be passed only to isparta and not to babel-loader
        babel: {
          presets: ['es2015']
        }
      },
      // Override `module` in `webpackConfig` only if coverage is produced
      module: Object.assign(webpackConfig.module, {
        preLoaders: webpackConfig.module.preLoaders.concat(isCoverage ? [
          { // `isparta` all the code We want to be in the coverage report
            test: /\.js$/,
            include: [
              path.resolve('src/')
            ],
            loader: 'isparta'
          }, {
            // Addig js loader to preloader, with all the code we don't want in the coverage report which `isparta` doesn't coverage
            // Using `include` property to add those directories
            test: /\.js$/,
            include: [
              path.resolve('test/')
            ],
            loader: 'babel?presets[]=es2015'
          }
        ] : []),
        // Exclude js loaders from `loaders` because they are set in preLoaders
        loaders: webpackConfig.module.loaders
          .filter(loaderObj => (typeof loaderObj.test !== 'function' && loaderObj.test.toString().indexOf('.js') === -1))
          .concat(isCoverage ? [] : [{
            test: /\.js$/,
            loader: 'babel?presets[]=es2015'
          }])
      })
    }),
    webpackMiddleware: {
      noInfo: true
    }
  });
};

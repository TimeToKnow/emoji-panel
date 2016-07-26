import 'babel-polyfill';
// Disabling `no-undef` because we are using here require.context which requires files dynamically, instead of regular ES6 imports
/* eslint-disable no-undef */

// load all specs into one bundle
const testsContext = require.context('.', true, /-spec\.js$/);
testsContext.keys().forEach(testsContext);

// require all `src/**/*.js`
const componentsContext = require.context('src/', true, /\.js$/);
componentsContext.keys().forEach(componentsContext);

/* eslint-enable no-undef */

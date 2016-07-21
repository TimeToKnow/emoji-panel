// load all specs into one bundle
const testsContext = require.context('.', true, /-spec\.js$/);
testsContext.keys().forEach(testsContext);

// require all `src/**/*.js`
const componentsContext = require.context('../src/', true, /\.js$/);
componentsContext.keys().forEach(componentsContext);

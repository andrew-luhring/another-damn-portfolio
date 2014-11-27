var files = require('./files.js');

module.exports = {
  basePath: '../'
, frameworks: ['jasmine', 'requirejs']
, files: files
, exclude: [
  'tests/e2e/**/*.js'
  ]
, port: 9876
, colors: true
, autoWatch: true
, coverageReporter: {
    type : 'html'
  , dir : './tests/coverage/'
  , subdir: function(browser) {
      "use strict";
      // normalization process to keep a consistent browser name accross different
      // OS
      return browser.toLowerCase().split(/[ /-]/)[0];
    }
  },
};


//    ngHtml2JsPreprocessor: {
//      enableRequireJs: true,
//    },

//    traceurPreprocessor: {
//      options: {
//        sourcemaps: true,
//        modules: 'amd'
//      }
//    },
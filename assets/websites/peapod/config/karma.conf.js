"use strict";
//var myMocha = require('./mocha.conf');
module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['mocha'],
    plugins: ['karma-mocha', 'karma-unicorn-reporter', 'karma-growl-reporter'],
      files: [
	      "../public/lib/*.js",
	      "../public/css/*.css",
	      "../public/js/*.js",
	      "../public/tests/*.js"
      ],
    exclude: [
	    'node_modules/*',
	    '**/*_ignore.js*'
    ],
	  
	  
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: [ 'unicorn' , 'growl'],
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // - Chrome, PhantomJS
    browsers: [],
    captureTimeout: 60000,
    singleRun: false
  });
};

// Karma configuration
// Generated on Tue Dec 03 2013 13:45:17 GMT-0600 (CST)

module.exports = function(config) {
  config.set({

    basePath: './',
    frameworks: ['mocha', 'expect'],
    plugins: ['karma-*'],
      files: [
	      "public/stylesheets/style.css",
	      "public/javascripts/lib/jquery.js",
	      "public/tests/_vipEci.js",
	      "public/javascripts/script.js"
      ],
    exclude: [
	    'node_modules/*',
	    '**/*_ignore.js*'
    ],
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'unicorn' , 'coverage'],
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

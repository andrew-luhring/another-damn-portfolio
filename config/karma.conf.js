/*jshint expr: true, undef: true*/
var commonConfig = require('./common.conf.js');

module.exports = function(config) {
  "use strict";
  commonConfig.reporters = [
    'progress'
  , 'nyan'
  , 'growl'
  ];
  commonConfig.browsers = ['PhantomJS'];
  commonConfig.captureTimeout = 120000;
  commonConfig.singleRun = false;
  commonConfig.autoWatch = true;

  commonConfig.logLevel = config.LOG_DEBUG;
  config.set (commonConfig);
};
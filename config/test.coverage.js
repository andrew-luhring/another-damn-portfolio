var commonConfig = require('./common.conf.js');

module.exports = function(config) {
  "use strict";
  commonConfig.reporters = ['progress','coverage'];
  commonConfig.browsers  = ['PhantomJS', 'Chrome', 'Safari', 'Firefox'];
  commonConfig.captureTimeout = 120000;
  commonConfig.singleRun = true;
  commonConfig.logLevel  = config.LOG_DEBUG;
  commonConfig.preprocessors = {};
  commonConfig.preprocessors['./assets/main.js']                     = ['coverage'];
  commonConfig.preprocessors['./assets/js/init/apps_init.js']        = ['coverage'];
  commonConfig.preprocessors['./assets/js/gallery/gallery.js']       = ['coverage'];
  commonConfig.preprocessors['./assets/js/gallery/services/*.js']    = ['coverage'];
  commonConfig.preprocessors['./assets/js/gallery/controllers/*.js'] = ['coverage'];
  commonConfig.preprocessors['./assets/js/gallery/directives/*.js']  = ['coverage'];
  commonConfig.preprocessors['./assets/js/common/services/*.js']     = ['coverage'];
  commonConfig.preprocessors['./assets/js/init/apps_bootstrap.js']   = ['coverage'];
  config.set(commonConfig);
};
/*jshint expr: true, undef: true , strict: false*/
module.exports = function (config) {
//  "use strict";
  const ASSETS_DIR = './assets/'
    , JS_DIR = ASSETS_DIR + 'js/'
    , COMMON_DIR = JS_DIR + 'common/'
    , CSS_DIR = ASSETS_DIR + 'css/'
    , LESS_DIR = ASSETS_DIR + 'less/'
    , LIB_DIR = ASSETS_DIR + 'lib/'
    , TEST_DIR = 'tests/'
    , RECURSIVE_TEST_DIR = TEST_DIR + '**/'
    , CSS_F = CSS_DIR + 'style.css'
    , MAIN_F = ASSETS_DIR + 'main.js'
    , TEST_F = TEST_DIR + 'test-main.js'
    //
    , GLOB = {
      lib : LIB_DIR + '*.js'
    , lib_recursive : LIB_DIR + '**/*.js'
    , lib_recursiver : LIB_DIR + '**/**/*.js'
    , js : JS_DIR + '*.js'
    , js_recursive : JS_DIR + '**/*.js'
    , js_recursiver : JS_DIR + '**/**/*.js'
    , common : COMMON_DIR + '*.js'
    , recursive : RECURSIVE_TEST_DIR + '_*.js'
    , less : LESS_DIR + '*.less'
  };

  var karmaObj = {
    basePath : '../',

    frameworks : ['jasmine', 'requirejs'],
    files : [
      CSS_F,
      {included : false,  pattern : GLOB.lib_recursiver},
      {included : false,  pattern : GLOB.lib_recursive},
      {included : false,  pattern : GLOB.lib},
      {included : false,  pattern : GLOB.js},
      {included : false,  pattern : GLOB.js_recursive},
      {included : false,  pattern : GLOB.js_recursiver},
      {included : false,  pattern : GLOB.recursive},
      TEST_F
    ],
    exclude : [
      '**/*ignore*',
      'tests/e2e/*',
      MAIN_F
    ],
//    preprocessors : {
//      'public/js/**/*.js' : ['coverage'],
//    , 'public/js/**/**/*.js' : ['coverage']
//    },
//    ngHtml2JsPreprocessor: {
//      enableRequireJs: true,
//    },
    reporters: [
      'progress'
//       'minimalist'
//       , 'nyan'
    /*'mocha'*/
      , 'growl'
       /* ,'coverage'*/],
//    coverageReporter : {
//      type : 'html',
//      dir : TEST_DIR + 'results/coverage/'
//    },
    port : 9876,
    colors : true,
    captureTimeout : 60000,
    singleRun : false,
    logLevel : config.LOG_INFO,
//    logLevel : config.LOB_DEBUG,
    autoWatch : true,
//    browsers : ['PhantomJS']
    browsers : ['Chrome']
  };

  config.set(karmaObj);

};
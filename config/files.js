const ASSETS_DIR =                './assets/'
  , JS_DIR     = ASSETS_DIR     + 'js/'
  , COMMON_DIR = JS_DIR         + 'common/'
  , CSS_DIR    = ASSETS_DIR     + 'css/'
  , LESS_DIR   = ASSETS_DIR     + 'less/'
  , LIB_DIR    = ASSETS_DIR     + 'lib/'
  , TEST_DIR   =                  'tests/'
  , RECURSIVE_TEST_DIR =          TEST_DIR + '**/'
  , CSS_F      = CSS_DIR        + 'style.css'
  , MAIN_F     = ASSETS_DIR     + 'main.js'
  , TEST_F     = TEST_DIR       + 'test-main.js'
  , GLOB = {
      lib_recursive   : LIB_DIR     + '**/*.js'
    , lib_recursiver  : LIB_DIR     + '**/**/*.js'
    , js              : JS_DIR      + '*.js'
    , js_recursive    : JS_DIR      + '**/*.js'
    , js_recursiver   : JS_DIR      + '**/**/*.js'
    , common          : COMMON_DIR  + '*.js'
    , recursive       : RECURSIVE_TEST_DIR + '_*.js'
    , less            : LESS_DIR    + '*.less'
  };
module.exports = [
    CSS_F
  , {included : false,  pattern : GLOB.lib_recursiver}
  , {included : false,  pattern : GLOB.lib_recursive}
  , {included : false,  pattern : GLOB.js}
  , {included : false,  pattern : GLOB.js_recursive}
  , {included : false,  pattern : GLOB.js_recursiver}
  , {included : false,  pattern : GLOB.recursive}
  , TEST_F
  , {
  //fixtures
    pattern: 'tests/mocks/*.json'
  , watched: true
  , served: true
  , included: false
  }
];

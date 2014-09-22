/*jshint expr: true, undef: true */
(function(){
  'use strict';


  var tests = []
    , regex = /(tests\/)(_.*\.js)/
    , recursive = /(tests\/)(.*\/)(_.*\.js)/
    , not = /(.[_])*((^(?:(?!ignore).)*)(js))/;

  for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
      if (regex.test(file)  || recursive.test(file) && not.test(file) ) {
//    console.log('\n******************************' + 'testing: ' + file + '\n******************************' );
//      tests.push (file);
        tests.unshift(file);
      }
    }
  }

  var com= 'js/common'
    , init= 'js/init'
    , gal = 'js/gallery'
    , galD = gal + '/directives'
    , galC = gal + '/controllers'
    , galS = gal + '/services';

  require.config({
    baseUrl: '/base/assets/'
    , paths : {

//        Frameworks
        'angular': 'lib/angular/angular'
      , 'angular.animate' : 'lib/angular-animate/angular-animate'
      , 'ngSanitize' : 'lib/angular-sanitize/angular-sanitize'
      , 'lodash': 'lib/lodash/dist/lodash.compat'
      , 'jquery': 'lib/jquery/dist/jquery'
      , 'mixitup' : 'lib/mixitup/src/jquery.mixitup'
      , 'ui_router': 'lib/angular-ui-router/release/angular-ui-router'
      , 'mocks': 'lib/angular-mocks/angular-mocks'
      , 'transform' : 'lib/xml-to-json/jquery.xml2json'
      , 'traceur' : 'lib/traceur-runtime/traceur-runtime'
//    Initialization
//    -----------------------
      ,  init : init
//    Common
//    -----------------------
      ,  com : com
//    Gallery
//    -----------------------
      , gal: gal
      , galC : galC
      , galD : galD
      , galS : galS
    }
    , shim: {
        'angular' : {'exports' : 'angular'}
      , 'angular.animate' : {deps: ['angular']}
      , 'ui_router' : ['angular']
      , 'mocks': {
          'deps': ['angular']
        , 'exports': 'angular.mock'
        }
      , 'ngSanitize': {
          'deps': ['angular']
        }
    }
    , priority: 'angular'
    , deps: tests
    , callback: window.__karma__.start
  });
  require([
    'init/jquery_bootstrap'
    , 'init/apps_bootstrap'
  ]);

})();



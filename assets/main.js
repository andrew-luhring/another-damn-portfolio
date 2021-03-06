/*jshint expr: true, undef: true */
(function(){
  'use strict';

  var com = 'js/common'
    , comS= com + '/services'
    , init= 'js/init'
    , gal = 'js/gallery'
    , galD = gal + '/directives'
    , galC = gal + '/controllers'
    , galS = gal + '/services'
    , pla = 'js/play'
    , plaD = pla + '/directives'
    , plaC = pla + '/controllers'
    , plaTmpl = pla + '/tmpl';


  requirejs.onError = function (err) {
    console.log("error type:   "+ err.requireType);
    console.log('modules: ' + err.requireModules);
    console.trace();
    if (err.requireType === 'timeout') {
      console.log('modules: ' + err.requireModules);
    }
    throw err;
  };

  require.config({
      baseUrl: '/nerd/assets/'
    , paths : {

//        Frameworks
        'angular': 'lib/angular/angular'
      , 'angular.animate' : 'lib/angular-animate/angular-animate'
      , 'ngSanitize' : 'lib/angular-sanitize/angular-sanitize'
      , 'lodash': 'lib/lodash/dist/lodash.compat'
      , 'esapi' : 'lib/esapi'
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
      ,  comS : comS
//    Gallery
//    -----------------------
      , gal: gal
      , galC : galC
      , galD : galD
      , galS : galS
      , pla : pla
      , plaC : plaC
      , plaD : plaD
      , plaTmpl : plaTmpl
    }
    , shim: {
        'angular' : {'exports' : 'angular'}
      , 'angular.animate' : {deps: ['angular']}
      , 'mocks': {
          'deps': ['angular']
        , 'exports': 'angular.mock'
      }
      , 'ngSanitize': {
          'deps': ['angular']
      }
      , 'ui_router' : ['angular']
    }
    , priority: 'angular'
  });

  // create a new object that inherits from an old one.
  if (typeof Object.create !== 'function'){
    Object.create = function(o){
      function F(){}
      F.prototype = o;
      return new F();
    };
  }
  requirejs([
      'angular'
    , 'jquery'
    , 'init/apps_bootstrap'
    ]
    , function(angular, jquery, apps_bootstrap) {

    });
})();

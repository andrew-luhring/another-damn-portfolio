/*jshint expr: true, undef: true */
(function(){
  'use strict';

  var com= 'js/common'
    , init= 'js/init'
    , gal = 'js/gallery'
    , galD = gal + '/directives'
    , galC = gal + '/controllers'
    , galS = gal + '/services';


  requirejs.onError = function (err) {
    console.log("error type:   "+ err.requireType);
    console.log('modules: ' + err.requireModules);
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
      , 'lodash': 'lib/lodash/dist/lodash.compat'
      , 'jquery': 'lib/jquery/dist/jquery'
      , 'mixitup' : 'lib/mixitup/src/jquery.mixitup'
      , 'ui_router': 'lib/angular-ui-router/release/angular-ui-router'
      , 'mocks': 'lib/angular-mocks/angular-mocks'

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
      , 'mocks': {
          'deps': ['angular']
        , 'exports': 'angular.mock'
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
    ]
    , function(angular, jquery) {
    }
  );
})();

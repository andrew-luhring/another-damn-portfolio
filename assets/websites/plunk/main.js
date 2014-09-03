"use strict";

require.config({
  baseUrl: '',
  paths: {
    'angular' : 'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.17/angular'
  , "mocks" : 'angular-mocks'
  , 'jquery' : 'http://code.jquery.com/jquery-2.0.3.min'
  , 'mocha' : '//cdnjs.cloudflare.com/ajax/libs/mocha/1.20.1/mocha'
  , 'chai' : '//cdnjs.cloudflare.com/ajax/libs/chai/1.9.1/chai'
  , 'script' : 'script'
  , '_script' : '_script'
  , 'init' : 'init'
  , '_init' : '_init'
  , 'utility' : 'utility'
  , '_utility': '_utility'
  },
  shim: {
    'angular' : {'exports' : 'angular'}
,   'mocks': {
        deps: ['angular']
    ,   'exports': 'angular.mock'
    }
  }
});


require([
    'angular'

 , '_init'
], function(angular, _init) {
  
});
define([
  'require'
, 'angular'
, 'ngSanitize'
, 'uiRouter'
], function(require, angular){
  "use strict";
  function interpolate($interpolateProvider){
      $interpolateProvider.startSymbol('[[');
      $interpolateProvider.endSymbol(']]');
  }
  function configureRouter($stateProvider, $urlRouteProvider){
    $stateProvider.
      state('index', {
        url: ""
      , views: {
          lightbox : {
            templateUrl: '/nerd/assets/tmpl/lightbox.html'
          }
        }
      }).
      state('index.lightbox', {
        url: 'lightbox?id'
      });

  }


  /**
   *
   * Apps - a container for all the angular apps.
   * @returns {object} - an object that contains all the angular modules as properties.
   */
  var Apps = Object.create(Object.prototype, {
      meta: { writable:true, configurable:true, value: "test", enumerable: true }
    });

  /**
   * An angular module that is responsible for all interactions that are gallery related.
   * @type {Object}
   */
  Apps.gallery =
    angular.
      module('gallery', [ 'ngSanitize', 'ui.router']).
      config([
         '$interpolateProvider'
        , '$stateProvider'
        , '$urlRouterProvider'
        , function($interpolateProvider, $sP, $urlP){
            interpolate($interpolateProvider);
            configureRouter($sP, $urlP);
        }
      ]);

  /**
   * A module which exports all angular modules.
   * @exports init/apps_init
   * @version 1.0
   */
return Apps;
});
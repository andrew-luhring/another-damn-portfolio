define([
  'require'
, 'angular'
, 'ngSanitize'
, 'angular.animate'
], function(require, angular){
  "use strict";
  function interpolate($interpolateProvider){
      $interpolateProvider.startSymbol('[[');
      $interpolateProvider.endSymbol(']]');
  }
  /**
   * AngularModule factory.
   * @param {string} - name - name of the module.
   * @param {array} - depsArr - the array of dependencies.
   * @param {array} - configArr - the configuration array.
   * @returns {object} - an angular module.
   * @constructor
   */
  function AngularModule(name, depsArr, configArr ){
    if(depsArr && configArr){
      return angular.module(name, depsArr).config(configArr);
    }
    if(depsArr && !configArr){
      return angular.module(name, depsArr);
    }
    if(!depsArr && !configArr){
      throw new Error('you need at least a dep array.');
    }
  }

  /**
   *
   *
   * Apps - a container for all the angular apps.
   * @returns {object} - an object that contains all the angular modules as properties.
   */
  var Apps = Object.create(
    Object.prototype, {
      meta: { writable:true, configurable:true, value: "test", enumerable: true }
    });


    /**
   * An angular module that is responsible for all interactions that are gallery related.
   * @type {Object}
   */
  Apps.gallery = new AngularModule('gallery'
    , ['ngSanitize']
    , [ '$interpolateProvider'
      , function($interpolateProvider){
        interpolate($interpolateProvider);
      }
    ]);
  Apps.play = new AngularModule('play', [
    'ngAnimate'
  ]);

  /**
   * A module which exports all angular modules.
   * @exports init/apps_init
   * @version 1.0
   */
return Apps;
});

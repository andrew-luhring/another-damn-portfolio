define([
  'require'
, 'angular'
], function(require, angular){
  "use strict";
  function interpolate($interpolateProvider){
      $interpolateProvider.startSymbol('[[');
      $interpolateProvider.endSymbol(']]');
  }

  /**
   * AngularModule factory.
   *
   * @param {string} - name - name of the module.
   * @param {array} - depsArr - the array of dependencies.
   * @param {array} - configArr - the configuration array.
   * @returns {object} - an angular module.
   * @constructor
   */
  function AngularModule(name, depsArr, configArr ){
    return angular.module(name, depsArr).config(configArr);
  }


  /**
   *
   * Apps - a container for all the angular apps.
   *
   * @returns {object} - an object that contains all the angular modules as properties.
   */
  var Apps = Object.create(Object.prototype, {
    meta: { writable:true, configurable:true, value: "test", enumerable: true }
  });


    /**
   * An angular module that is responsible for all interactions that are gallery related
   *
   * @type {Object}
   */
  Apps.gallery = new AngularModule('gallery'
    , []
    , ['$interpolateProvider'
    , function($interpolateProvider){
        interpolate($interpolateProvider);
      }
    ]);
//    function(){
//    return angular.module('gallery', []).config([
//      '$interpolateProvider'
//      , interpolate($interpolateProvider)]);
//  }
  console.log (Apps);


return Apps;
});

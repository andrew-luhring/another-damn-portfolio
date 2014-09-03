/*jshint expr: true*/
define([
   'angular'
  , 'init/apps_init'
], function(
    angular
  , apps_init){
"use strict";
describe("\n================\n\ngallery", function(){
  var $scope
  , gallery = apps_init.gallery;
    it("exists", function(){
      expect(gallery).toExist();
    });
  });
});
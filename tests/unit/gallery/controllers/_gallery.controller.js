/*jshint expr: true*/

define([
    'angular'
  , 'init/apps_init'
  , 'com/matchers'
  , 'mocks'
  , 'lodash'
], function(
  angular
, apps_init
, matchers
, mocks
, _
){
"use strict";


  var inject = mocks.inject;



  describe("\n================\n\ngalleryController", function(){
    var $scope
      , controller;

    beforeEach(function(){
      this.addMatchers(matchers);
    });
    beforeEach(function(){
      module('gallery');
      inject(function( _$rootScope_, _$controller_){
        $scope = _$rootScope_.$new();
        controller = _$controller_('GalleryController',{ $scope: $scope});
      });
    });
    describe("GalleryController", function () {
      it("exists", function () {
        expect(controller).toExist();
      });
      xit("has a method triggerLightbox", function(){
        expect(controller).toRespondTo('triggerLightbox');
      });
      xit("will return the gallery item that has been clicked", function(){
        var data = controller.data
          , lightBoxTriggered = controller.triggerLightbox(data[0].url);
        expect(lightBoxTriggered).toBe(data[0].url);
      });


    });
  });
});

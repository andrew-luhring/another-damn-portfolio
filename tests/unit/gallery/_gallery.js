/*jshint expr: true*/
define([
   'angular'
  , 'init/apps_init'
  , 'lodash'
  , 'mocks'
], function(
    angular
  , apps_init
  , _
  , mocks){
"use strict";
describe("\n================\n\ngallery", function(){
  var $scope
  , gallery = apps_init.gallery
  , inject = mocks.inject
  , module = mocks.module
  , $injector
  , $compile
  , $controller
  , DataService
  , rooGallery
  , GalleryController;

  beforeEach(function () {
    module('gallery');
    inject(function (_$rootScope_, _$injector_, _$compile_, _$controller_, $templateCache) {
      var html = "<div rooGallery></div>";
      $scope = _$rootScope_.$new();
      $injector = _$injector_;
      $compile = _$compile_;
      $controller = _$controller_;

      DataService       = $injector.get('DataService');
      GalleryController = $controller('GalleryController', {$scope : $scope, DataService: DataService, $sanitize: '$sanitize'} );
      rooGallery        = $compile(html)($scope);
    });
  });

  it("exists", function(){
     expect(gallery).toExist();
    });
  it("has a controller GalleryController", function (){
    expect(GalleryController).toExist();
  });
  it("has a directive rooGallery", function (){
    expect(rooGallery).toExist();
  });
  it("has a DataService",function (){
    expect(DataService).toExist();
  });

});
});


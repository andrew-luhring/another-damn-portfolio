/*jshint expr: true*/
/*global $compile: true, ddescribe: true, xdescribe, xit, iit*/
define([
  'angular'
, 'mocks'
, 'gal/gallery'
, 'com/matchers'
], function(
    angular
  , mocks
  , gallery
  , matchers){

  "use strict";
  xdescribe("\n================\n\ngalleryDirective", function() {
    var $scope
      , inject = mocks.inject
      , module = mocks.module
      , elem;
    beforeEach(module('gallery'));
    beforeEach(function () {
      this.addMatchers(matchers);
    });

    beforeEach(
      inject(['$compile', '$rootScope', function ($compile, $rootScope) {
        $scope = $rootScope;
        elem = angular.element("<div></div>");
        $compile(elem)($rootScope);
        $scope.$digest();
      }])
    );

    it("exists", function () {
      expect(elem.html()).toEqual('<div>derp</div>');
    });
  });
});
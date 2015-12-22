/*jshint expr: true*/
define([
    'angular'
  , 'init/apps_init'
  , 'com/matchers'
  , 'mocks'
  , 'lodash'
  , 'comS/private.tester'
], function(
  angular
  , apps_init
  , matchers
  , mocks
  , _
  , Tester
){
  "use strict";


  var inject = mocks.inject;
  var tester = new Tester(true);

  beforeEach(function(){
    this.addMatchers(matchers);
  });

  describe("\n================\n\ngalleryController", function(){
    var $scope
      , controller;

    describe("PlayController", function () {
      beforeEach(function(){
        module('play');
        inject(function( _$rootScope_, _$controller_){
          $scope = _$rootScope_.$new();
          controller = _$controller_('PlayController',{ $scope: $scope});
        });
      });
      it("exists", function () {
        expect(controller).toExist();
      });
      it("has a method flipMode", function(){
        expect(controller).toRespondTo('flipMode');
      });
      it('mode and modeVals exist', function(){
        expect(controller.modeVal).toExist();
        expect(controller.mode).toExist();
      });
      describe('flipMode', function(){
        it('toggles mode and modeVal on click', function(){
          var beforeVal = controller.modeVal
          , beforeMode = controller.mode
          , afterVal
          , afterMode;

          expect(beforeVal).toBe(false);
          expect(beforeMode).not.toBeUndefined();

          controller.flipMode();
          afterVal = controller.modeVal;
          afterMode = controller.mode;

          expect(afterVal).not.toBe(beforeVal);
          expect(afterMode).not.toBe(beforeMode);
        });

      });
    });
  });
});

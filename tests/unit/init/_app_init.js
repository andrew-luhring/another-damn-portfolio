/*jshint expr: true*/

define([
    'angular'
  , 'mocks'
  , 'init/apps_init'
  , 'com/matchers'
],  function(
     angular , mocks, apps_init, matchers){
"use strict";
var gallery = apps_init.gallery
  , inject = mocks.inject;

  beforeEach(function(){
    this.addMatchers(matchers);
  });

  describe("\n================\n\napps_init", function(){
    it("exists", function(){
      expect(apps_init).toBeTypeOf('object');
    });
  });
// gallery
    describe("has", function () {
      describe("a gallery module", function () {
        it("...", function(){
          expect(gallery).toExist();
        });
        describe('and it', function(){
          var element
              , $scope;
          beforeEach(inject(function(_$compile_, _$rootScope_){
            $scope = _$rootScope_;
            }));
        });
      });
    });
});
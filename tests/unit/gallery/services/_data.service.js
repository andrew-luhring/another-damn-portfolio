define([
    'galS/data.service'
  , 'com/matchers'
  , 'mocks'
  , 'lodash'
], function(dataService, matchers, mocks, _) {
  "use strict";

  var module = mocks.module
    , inject = mocks.inject;

  beforeEach(function () {
    this.addMatchers(matchers);
  });
  describe("\n================\n\nDataService", function () {
    var mock
      , DataService
      , getCurrentView
      , registerCurrentView
      , $scope
      , $rootScope
      , $injector
      , $httpBackend
      , deferred;


    beforeEach(function () {
      module('gallery');
      inject(function (_$rootScope_, _$injector_, $templateCache, $q) {
        $rootScope  = _$rootScope_;
        $scope      = $rootScope.$new();
        $injector   = _$injector_;
        DataService = $injector.get('DataService');
        $httpBackend= $injector.get('$httpBackend');
        deferred    = $q.defer();

        $httpBackend.
          when('GET', '/nerd/content/images/2014/Sep/data.json').
          respond({
            "db": [
              {
                "data": {
                  "posts": []
                }
              }
            ]
          });

      });
    });
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    it("exists", function () {
      expect(DataService).toBeDefined();
    });
    describe("and has a list method", function () {
      beforeEach(function(){
        spyOn(DataService, 'list').andReturn(deferred.promise);
      })
      it("which returns a promise object", function () {
        expect(DataService.list()).toBeInstanceOf(Object);
      });
      it("that is not empty", function(){
        var obj = {}
          , result = DataService.list(obj);
        result.then(function(data){
          expect(data).toExist();
        });
        deferred.resolve({data: { nested : true}});
        $scope.$digest();
      });


      it("that contains data", function(){
        $httpBackend.expectGET('/nerd/content/images/2014/Sep/data.json');
        var obj = $scope
        , result = DataService.data(obj)
        $httpBackend.flush();

        expect($scope.data).toBeInstanceOf(Object);
        expect($scope.data.posts).toBeInstanceOf(Array);
      });
    });
  });
});
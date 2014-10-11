/*jshint expr: true*/
/*global spyOn: true*/
define([
    'galS/data.service'
  , 'com/matchers'
  , 'mocks'
  , 'lodash'
  , 'testmocks/_data.service.mocks'
], function(dataService, matchers, mocks, _, testmocks) {
  "use strict";

  var module = mocks.module
    , inject = mocks.inject
    , postMocks = testmocks.mockPosts
    , tagMocks = testmocks.mockTags;

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
        deferred    = $q.defer();
        $httpBackend= $injector.get('$httpBackend');
      });
    });
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });


    it("exists", function () {
      expect(DataService).toBeDefined();
    });
    describe("and has a data method", function () {

      beforeEach(function(){
        spyOn(DataService, 'data').andReturn(deferred.promise);
      });

      it("which returns a promise object", function () {
        expect(DataService.data()).toBeInstanceOf(Object);
      });

      it("that is not empty", function(){
        var obj = {}
          , result = DataService.data(obj);
        result.then(function(data){
//          console.log (data);
          expect(data).toExist();
        });
        deferred.resolve(postMocks);
        $scope.$digest();

      });
    });
    describe("and the data method", function(){
      beforeEach(function(){
        $httpBackend.
          when('GET', '/nerd/api/public/tags/').
          respond(tagMocks);
        $httpBackend.
          when('GET', '/nerd/api/public/posts/').
          respond(postMocks);

      });
      afterEach(function(){
        $httpBackend.flush();
      });

      it("assigns postsArr to the object passed into it", function(){
          DataService.data($scope).then(function(data){
            var posts = $scope.postsArr;
            expect(posts).toBeTruthy();
          });
      });
      describe("and postsArr ", function(){
        it("is an Array", function(){
          DataService.data($scope).then(function(data){
            var posts = $scope.postsArr;
            expect(posts).toBeInstanceOf(Object);
            expect(posts).toBeInstanceOf(Array);
          });
        });
        it("of posts", function(){
          DataService.data($scope).then(function(data){
            var posts = $scope.postsArr
            , post = posts[0];

            expect(post).toBeInstanceOf(Object);
          });
        });
        it("and a post contains markdown, tags, and tagClasses properties", function(){
          DataService.data($scope).then(function(data){
            var posts       = $scope.postsArr
              , post        = posts[0]
              , markdown    = post.markdown
              , tags        = post.tags
              , tagClasses  = post.tagClasses;
            expect(markdown).toExist();
            expect(tags).toExist();
            expect(tagClasses).toExist();
            expect(tags).toBeInstanceOf(Array);
            expect(tagClasses).toBeInstanceOf(Array);
          });
        });
      });

      it("and also assigns tags to the object passed into it", function(){
        DataService.data($scope).then(function(data){
          var tags = $scope.tags;
          expect(tags).toBeTruthy();
        });
      });
      describe("and tags ", function(){
        it("is an Array", function(){
          DataService.data($scope).then(function(data){
            var tags = $scope.tags;
            expect(tags).toBeInstanceOf(Array);
          });
        });
        it("of tags", function(){
          DataService.data($scope).then(function(data){
            var tags = $scope.tags
              , tag = tags[0];
            expect(tag).toBeInstanceOf(Object);
          });
        });
        it("and a tag contains id and name properties", function(){
          DataService.data($scope).then(function(data){
            var tags = $scope.tags
              , tag = tags[0]
              , id = tag.id
              , name = tag.name;
            expect(id).toExist();
            expect(name).toExist();
          });
        });
      });

    });
  });
});
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
    var mock, DataService, getCurrentView, registerCurrentView, $scope, $injector;
    beforeEach(function () {
      module('gallery');
      inject(function (_$rootScope_, _$injector_, $templateCache) {
        $scope = _$rootScope_.$new();
        $injector = _$injector_;
        DataService = $injector.get('DataService');
      });
    });
    it("exists", function () {
      expect(DataService).toBeDefined();
    });
    xdescribe("and has a list method", function () {
      it("which is an array of DataObjects", function () {
        expect(DataService.list()).toBeTypeOf('object');
        expect(DataService.list()).toBeInstanceOf(Array);
      });
      it("that is not empty", function(){
        expect(DataService.list().length).toBeGreaterThan(1);
      });
    });
    xdescribe("and has a dataObject constructor", function(){
      it("...", function(){
        expect(DataService.dataObject).toBeTypeOf('function');
      });
      it("which requires a url and an alt ", function () {
        var obj =  new DataService.dataObject('http://www.google.com', 'google');
        var noSecondParam = function () { new DataService.dataObject('google');}
        , invalidParam = function () { new DataService.dataObject('google', null);};
        expect( noSecondParam ).toThrow();
        expect( invalidParam ).toThrow();
        // ^ same as:
        try{
          new DataService.dataObject();
        } catch(e){
          expect(e).toExist();
        }
      });
    });
    xdescribe("and has a generateObjects function", function () {
      var validUrls = [
        'build/images/gallerythumb.png'
      , 'images/test1.jpg'
      , 'images/test2.jpg'
      , 'images/test3.jpg'
      , 'images/test4.png'
      ]
      , validAlts = [
        'placeholder thumb'
      , 'test 1'
      , 'test 2'
      , 'test 3'
      , 'test 4'
      ]
      , failUrls = [ 'images/test1.jpg' , 'images/test1.jpg', 'images/test1.jpg' ]
      , failUrlsAlts = [ 'a' , 'b' , 'c' , 'this should fail' , 'this should fail' ];
      it("...", function () {
        expect(DataService).toRespondTo('generateObjects');
      });
      it("that returns an array", function(){
        var result = DataService.generateObjects(validUrls, validAlts);
        expect(result).toBeInstanceOf(Array);
      });
      it("which is an array of DataObject objects", function(){
        var result = DataService.generateObjects(validUrls, validAlts);
        var DataObject = DataService.dataObject;
        var FailObject = function(){this.property = "fail";};
        expect(result[0]).toBeTypeOf('object');
        expect(result[0]).toBeInstanceOf(DataObject);
        expect(result[0]).not.toBeInstanceOf(FailObject);

      });
      describe("regardless of whether or not", function () {
         var failAlts = [ 'alt 1' ]
            , failAltsUrls = [
              'images/test1.jpg'
            , 'images/test2.jpg'
            , 'images/test3.jpg'
            , 'images/missing_image.jpg'
            , 'images/missing_image.jpg'
            ]
            , notEnoughAlts
            , notEnoughUrls;
         beforeEach(function(){
           notEnoughAlts = DataService.generateObjects(failAltsUrls, failAlts);
           notEnoughUrls = DataService.generateObjects(failUrls, failUrlsAlts);
         });
         afterEach(function(){
           notEnoughAlts = null;
           notEnoughUrls = null;
        });
         it("the number of image urls and alt attributes are the same length", function () {
           expect(notEnoughUrls.length).toBe(5);
           expect(notEnoughAlts.length).toBe(5);
         });
         it("because if they are not the same length, it will add placeholder data", function(){
            expect(notEnoughUrls[4]).toContain("this should fail");
            expect(notEnoughAlts[4]).toContain(failAltsUrls[4]);
         });
      });
      describe("regardless of whether or not ",function(){
        var failRexUrls
      , failRexAlts ;
        beforeEach(function(){
          failRexUrls = [
          'ang/registration/vat-account.html'
          , 'images/test1.jpg'
          , 'js/json2.js'
          , 'images/test2.jpg'
          , 'images/test2.jpg'
          ];
          failRexAlts = [
            'an html file'
          , 'a valid image'
          , 3
          , function(){}
          , 'a js file'
          ];
        });
        afterEach(function(){
          failRexUrls = null;
          failRexAlts = null;
        });
        it("\n\n\nThere's a REALLY weird thing happening here, unskip the next 'it' by changing xit to it to see it.\n\n\n", function(){
          expect(true).toBe(true);
        });
        xit("what the fuck?? why is this happening?! this should fail:", function(){
          var before = failRexUrls;
          // why does this pass:
          expect(before).toContain('ang/registration/vat-account.html');
          (function(){
            var obj = DataService.generateObjects(failRexUrls, validAlts);
          })();
          // but this doesnt:
          expect(before).toContain('ang/registration/vat-account.html');

          // something about DataService.generateObjects(failRexUrls, validAlts);
          // causes failRexUrls to change from:
          //
          //  ['ang/registration/vat-account.html', 'images/test1.jpg', 'js/json2.js', 'images/test2.jpg', 'images/test2.jpg']
          // to
          // ['images/not_an_image.jpg', 'images/test1.jpg', 'images/not_an_image.jpg', 'images/test2.jpg', 'images/test2.jpg']
          //
          // the value that 'before' represents -- failRexUrls -- is being passed into the function as a parameter...
          // not only should failRexUrls not change, but 'before' should DEFINITELY not change...

        });

        it("the urls are valid image urls", function () {
          var failRxUrlArr = DataService.generateObjects(failRexUrls, validAlts);
          expect(failRxUrlArr[0]).toContain('fail');
          expect(failRxUrlArr[1]).not.toContain('fail');
          expect(failRxUrlArr[2]).toContain('fail');
          expect(failRxUrlArr[3]).not.toContain('fail');
          expect(failRxUrlArr[4]).not.toContain('fail');

          expect(failRxUrlArr[0].fail.pos).toBe(0);
          expect(failRxUrlArr[0].fail.failure).toBe('url');
        });
        it("because it will replace an invalid image url with a valid image.", function(){
          var failRxUrlArr = DataService.generateObjects(failRexUrls, validAlts)
          , instance = failRxUrlArr[0];
          expect(instance.fail).toContain(instance.fail.replacedWith);
          expect(instance.url).toBe(instance.fail.replacedWith);
        });
        it("the alt tags are dangerous", function(){
          var dangerousAlts = [
            "is everything, Ok?! - sometimes... I _ ... I dont know."
          , '%20; '
          , "&amp; ' /"
          , "\\"+"033'"
          , '^[ [2;10H'
          ]
          , failRxAltArr = DataService.generateObjects(validUrls, dangerousAlts);

          expect(failRxAltArr[0]).not.toContain('fail');
          expect(failRxAltArr[1]).toContain('fail');
          expect(failRxAltArr[2]).toContain('fail');
          expect(failRxAltArr[3]).toContain('fail');
          expect(failRxAltArr[4]).not.toContain('fail');
          expect(failRxAltArr[1].fail.pos).toBe(1);
          expect(failRxAltArr[2].fail.failure).toBe('alt');
          expect(failRxAltArr[3].alt).toBe(failRxAltArr[3].fail.replacedWith);
        });
         it("because it will replace unsafe alt text with safe alt text.", function(){
           var dangerousAlts = [
            "is everything, Ok?! - sometimes... I _ ... I dont know."
          , '%20; '
          , '&amp;'
          , "\\"+"033"
          , '^[ [2;10H'
          ]
          , failRxAltArr = DataService.generateObjects(validUrls, dangerousAlts);

           expect(failRxAltArr[3].fail).toContain(failRxAltArr[3].fail.replacedWith);
           expect(failRxAltArr[3].alt).toBe(failRxAltArr[3].fail.replacedWith);

        });
      });
    });
  });
});
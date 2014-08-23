/*jshint expr: true, -W053, -W010*/
/*global ddescribe: true , xdescribe*/
define([
  'angular'
  , 'lodash'
  , 'com/matchers'
  , 'mocks'
], function(
  angular
  , _
  , matchers
  , mocks
  ){
  "use strict";
  var inject = mocks.inject;
  var app = angular.module('app', []);


  describe("\n================\n\nmatchers", function(){
    it("exists", function(){
      expect(matchers).toBeTruthy();
    });
    describe("has a method toBeTypeOf", function(){
      it(" ", function(){
        expect(matchers.toBeTypeOf).toBeTruthy();
      });
      describe("|| which", function(){
      it(" accepts an argument", function(){
        expect(matchers.toBeTypeOf("thing")).not.toBeUndefined();
      });
      describe("and ", function(){
        beforeEach(function(){
          this.addMatchers(matchers);
        });
        it("that argument is compared to the type it is ", function(){
          var str = " "
          , func = function(){}
          , obj = {}
          , arr = []
          , num = 423
          , undef;
          expect(undef).toBeTypeOf('undefined');
          expect(str).toBeTypeOf('string');
          expect(obj).toBeTypeOf('object');
          expect(arr).toBeTypeOf('object');
          expect(num).toBeTypeOf('number');
          expect(func).toBeTypeOf('function');
        });
      });
    });
    });
    describe("has a method toExist", function(){
      it("  ", function(){
        expect(matchers.toExist).toBeTruthy();
      });
      describe("|| which ", function(){
        it("accepts an argument", function (){
          expect(matchers.toExist('st')).not.toBeUndefined();
        });
        describe("and  ", function(){
          beforeEach(function (){
            this.addMatchers(matchers);
          });
          it("that argument checks for existance.", function(){
            var obj = {
              value : ''
            , ok : "ok"
            };
            var arr = [];
            expect()                         .not.toExist();
            expect(null)                   .not.toExist();
            expect('')                       .not.toExist();
            expect(obj.value)         .not.toExist();
            expect(arr[0])                .not.toExist();
            expect(obj)                    .toExist();
            expect({})                       .toExist();
            expect("string")             .toExist();
            expect(2)                       .toExist();
            expect(function(){})       .toExist();
            expect(arr)                     .toExist();
            expect(false)                  .toExist();
            expect(true)                   .toExist();
            expect(obj.ok)               .toExist();
          });
        });
      });
    });
    describe("has a method toRespondTo", function () {

      it("that exists", function () {

        expect(matchers.toRespondTo).not.toBeUndefined();
//        expect(matchers.toRespondTo()).not.toBeUndefined();
      });
      describe("|| which", function () {
        it("it checks that an object is an object", function () {
          var derpa = function(){}
          , obj = {};
          expect(derpa).not.toRespondTo(derpa);
          expect(obj).not.toRespondTo(obj);
        });
        it("has a property", function () {
          var derp = {
               str : 'strings'
            };
          expect(derp).not.toRespondTo('str');
        });
        it("checks that an object has a property that is a function", function () {
          var derpa = function(){}
            , derp = {
                spike : function(){}
            };
          expect(derp).toRespondTo('spike');
        });
      });
    });
    describe('has a method toBeInstanceOf', function(){
      it("that exists", function () {
        expect(matchers.toBeInstanceOf).not.toBeUndefined();
      });
      describe("|| which", function(){
        it("compares an object to it's expected instance", function(){
          function Thing(str) {
            this.string = str;
          }
          function NotThing(str) {
            this.string = str;
          }
          var thing = new Thing("sdfssd");
          var notThing = new NotThing("lskdjfalkjsdf");
          expect(thing).toBeInstanceOf(Thing);
          expect(thing).not.toBeInstanceOf(NotThing);
          expect(notThing).toBeInstanceOf(NotThing);
        });
        it("will work on primitives", function(){
          var num = new Number(3)
          , obj = new Object()
          , func = function(){}
          , bool = new Boolean(true)
          , arr = []
          , str = new String('str');

          expect(num)     .toBeInstanceOf(Number);
          expect(obj)       .toBeInstanceOf(Object);
          expect(func)     .toBeInstanceOf(Function);
          expect(bool)     .toBeInstanceOf(Boolean);
          expect(str)        .toBeInstanceOf(String);
          expect(arr)       .toBeInstanceOf(Array);

        });


        xdescribe('will also work on angular objects', function(){
          var $document , $scope;

          beforeEach(function(){
            module('app');
            inject(function (_$rootScope_, _$document_) {
              $scope =  _$rootScope_;
              $document = _$document_;
            });
          });


          it('see:', function(){
            console.log(app.prototype);
            expect(app)
              .toBeInstanceOf(angular.injector);
          });

        });
      });
    });
    describe('has a method toContain', function() {
      it("...", function () {
        expect(matchers).toRespondTo('toContain');
      });
      describe("|| which", function () {
        it("requires a collection", function(){
          var num = 3
          , str = "string"
          , func = function(){}
          , nul = null
          , undef
          , bool = true
          , fbool = false;

          expect(function () {expect(     num    ).toContain(3);}).toThrow();
          expect(function () {expect(     str        ).toContain(3);}).toThrow();
          expect(function () {expect(     func    ).toContain(3);}).toThrow();
          expect(function () {expect(     nul      ).toContain(3);}).toThrow();
          expect(function () {expect(     bool    ).toContain(3);}).toThrow();
          expect(function () {expect(     fbool   ).toContain(3);}).toThrow();
          expect(function () {expect(     undef   ).toContain(undef);}).toThrow();
        });
      });
        describe("checks that an ", function(){
          it("array contains a value", function(){
            var arr = [1,2,3,4, "string"];
            expect(arr).toContain(3);
            expect(arr).toContain("string");
            expect(arr).not.toContain(6);
          });
          describe("or that an object", function(){
            var obj = {
              key: "value"
            , other: "thing"
            };

            it("contains a value", function(){
              expect(obj).toContain("value");
              expect(obj).toContain("thing");
              expect(obj).not.toContain("derp");
            });
            it("fails if value is not in object", function(){
              expect(obj).toContain("value");
              expect(obj).not.toContain("derp");
            });

            it("contains a key", function(){
              expect(obj).toContain("key");
              expect(obj).toContain("other");

            });
            it("fails if a key is not in the object", function(){
              expect(obj).toContain("key");
              expect(obj).toContain("other");
              expect(obj).not.toContain("derp");
            });
          });
        });
    });
  });
});



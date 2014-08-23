/*jshint expr: true*/
define([
  'com/helpers'
, 'com/matchers'
], function(Helpers, matchers){
"use strict";
describe("\n================\n\n", function(){
  var helpersDev = new Helpers(true)
  , helpersProd = new Helpers(false);

  beforeEach(function () {
    this.addMatchers(matchers);
  });
    it("exists", function(){
      expect(helpersDev).toExist();
      expect(helpersProd).toExist();
      expect(helpersDev).toBeInstanceOf(Helpers);
      expect(helpersProd).toBeInstanceOf(Helpers);
    });
    describe("has a method isKarma", function(){
      var $window = window || {};
      it("...", function(){
        expect(helpersDev).toRespondTo("isKarma");
        expect(helpersProd).toRespondTo("isKarma");
      });
      describe("that", function(){
        it("checks that both parameters exist and that isWindow is a window and location is a string", function(){
          expect(function(){
           helpersDev.isKarma();
          }).toThrow();
          expect(function(){
            helpersProd.isKarma();
          }).toThrow();
          expect(function(){
           helpersDev.isKarma($window);
          }).toThrow();
          expect(function(){
            helpersProd.isKarma($window);
          }).toThrow();
          expect(function(){
           helpersDev.isKarma($window, '/');
          }).not.toThrow();
          expect(function(){
            helpersProd.isKarma($window, '/');
          }).not.toThrow();
        });
        it("checks that window.location is the intended location", function(){
          var kD = helpersDev.isKarma
          , kP = helpersProd.isKarma
          , location = "/derp";
          expect(kD($window, location)).toBe(false);
        });
      });
    });
    describe("has a method readOnly", function(){
      it("...", function(){
        expect(helpersDev).toRespondTo("readOnly");
        expect(helpersProd).toRespondTo("readOnly");
      });
      describe("that", function () {
        var roD = helpersDev.readOnly
        , roP = helpersProd.readOnly;

        it("accepts a plain js Object ", function () {

          expect(function(){ roD(   []                  , 'prop', 'val');   }).toThrow();
          expect(function(){ roD(   function(){}   , 'prop', 'val');   }).toThrow();
          expect(function(){ roD(   null              , 'prop', 'val');   }).toThrow();
          expect(function(){ roD(   true              , 'prop', 'val');   }).toThrow();
          expect(function(){ roD(   8                  , 'prop', 'val');   }).toThrow();
          expect(function(){ roD(   'df'               , 'prop', 'val');   }).toThrow();
          expect(function(){ roD(   ''                  , 'prop', 'val');           }).toThrow();

          expect(roD({}, 'prop', 'derp')).toExist();

        });
        it("accepts a valid property string-- alphaNumeric and underscores only", function(){

          expect(function(){ roD( {}    , '-'              , 'val');   }).toThrow();
          expect(function(){ roD( {}    , '/'              , 'val');   }).toThrow();
          expect(function(){ roD( {}    , '/sdf'         , 'val');   }).toThrow();
          expect(function(){ roD( {}    , 'asd\f'       , 'val');   }).toThrow();
          expect(function(){ roD( {}    , '𝌆'      , 'val');   }).toThrow();
          expect(function(){ roD( {}    , 'U+0000'  , 'val');   }).toThrow();
          expect(function(){ roD( {}    , 'U+1D306', 'val');   }).toThrow();
          expect(function(){ roD( {}    , ' '               , 'val');   }).toThrow();
          expect(function(){ roD( {}    , ''                , 'val');   }).toThrow();

          expect(function(){ roP( {}    , '-');   }).toThrow();
          expect(function(){ roP( {}    , '/');   }).toThrow();
          expect(function(){ roP( {}    , '/sdf');   }).toThrow();
          expect(function(){ roP( {}    , 'asd\f');   }).toThrow();
          expect(function(){ roP( {}    , '𝌆');   }).toThrow();
          expect(function(){ roP( {}    , 'U+0000');   }).toThrow();
          expect(function(){ roP( {}    , 'U+1D306');   }).toThrow();
          expect(function(){ roP( {}    , ' ');   }).toThrow();
          expect(function(){ roP( {}    , '');   }).toThrow();

          // todo: should throw but doesn't:
//          expect(function(){ roD( {}    , '0x00A9');   }).toThrow();
        });
        xit("will make a property readOnly", function(){
          var _obj = {}
          , _objP = {}
          , prop = "prop"
          , val = "you can't even read."
          , fail = "you can read!";

          roD(_obj, prop, val);
          roP(_objP, prop, val);
          console.log( _obj );
          console.log( _objP );



          _objP.prop = fail;
          _obj.prop = fail;

          console.log( _obj );
          console.log( _objP );
        });
      });

    });
  });
});
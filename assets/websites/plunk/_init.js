define([
    'chai'
  , 'init'
  , '_utility'
  , 'utility'
  , '_script'
  ], function(chai, init, _utility, utility){
  "use strict";
    mocha.setup('bdd');
    var expect = chai.expect
      , should = chai.should
      , assert = chai.assert;
    
    
    describe('mocha', function(){
      it("runs stuff!", function(){
        expect($("#log")).to.be.ok;
      });
      it("really", function(){
        expect("this").to.be.a('string');
      })
    });
  mocha.run();
});


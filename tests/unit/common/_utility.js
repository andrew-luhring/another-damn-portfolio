///*jshint expr: true*/
//
//define([
//      'jquery'
//    , 'com/utility'
//], function(jquery, utility) {
//  "use strict";
//
//  var  silent = true;
//
//
//    var $ = jquery
//      , div = document.createElement('div').id = 'test';
//
//	// using this rather than utility.testDiv because we havent tested testDiv at this point yet.
//    function testObj(id, str) {
//      return {
//          sel: id || "test"
//        , string: str || "a string"
//      };
//    }
//
//
//	/*
// Exception
// keysVals
// testDiv
// log
// logDom
// animatevisibility
// */
//	describe("\n\nutility has a", function(done) {
//      var logToDom = testObj("logToDom", "logging to dom");
////        ,   allTheChai = testObj("chai", keysVals(chai));
//		describe ("method animateVisibility that", function () {
//			var domObj;
//			beforeEach(function (done) {
//				var tester = testObj('tester', 'is testing');
//				domObj = utility.testDiv(tester.sel, true);
//				done();
//			});
//			it ("exists", function () {
//				expect (utility).to.respondTo ('animateVisibility');
//			});
//			it ("accepts 3 arguments with an optional callback", function (done) {
//				var av = utility.animateVisibility
//				  , sel = "#" + domObj.id
//				  , res = av(sel, '', 'unhide');
//				expect(res).to.be.ok;
//				done();
//			});
//			it ("will add modifiers to selector", function (done) {
//				var av = utility.animateVisibility
//				  , sel = "#" + domObj.id
//				  , res = av(sel, 'modifier another', 'unhide');
////				console.log(res.selector[0]);
//				res.selector[0].classList[0].should.contain('modifier');
//				res.selector[0].classList[1].should.contain('another');
//				done();
//			});
//			it ("will throw an exception if invalid options are passed", function (done) {
//				var av = utility.animateVisibility
//				  , sel = "#" + domObj.id
//				  , noSel = av('', '', 'unhide')
//				  , noMod = av(sel)
//				  , invMod = av(sel, {}, 'unhide')
//				  , noAction = av(sel, 'derp')
//				  , invAction = av(sel, 'derp', 'unhid');
//				expect(noSel).to.be.instanceOf(Error);
//				expect(noMod).to.be.instanceOf(Error);
//				expect(invMod).to.be.instanceOf(Error);
//				expect(noAction).to.be.instanceOf(Error);
//				expect(invAction).to.be.instanceOf(Error);
//
//				done();
//			});
//
//		});
//	    describe("method logDom that", function () {
//			    it("exists", function () {
//	                expect(utility).to.respondTo('logDom');
//			    });
//			    it("accepts 3 parameters- thingToLog {string}, objectToLogTo {jquery/dom selector},  isError {bool}", function (done) {
//				    var loggedToDom = utility.logDom(' 3 params', 'div', false);
//				    loggedToDom.should.not.include(false);
//
//				    expect(loggedToDom[0]).to.be.true;
//				    done();
//			    });
//			    it("will add a class of error to the object it's inserting into the dom", function (done) {
//				    var loggedToDom = utility.logDom(logToDom.string, logToDom.sel, true);
//				    loggedToDom.should.not.include(false);
//				    expect(loggedToDom.length).to.equal(2);
//				    done();
//			    });
//			    it("will throw an exception if invalid", function (done) {
//				    var noArgs = utility.logDom()
//				      , invalidDom = utility.logDom('swag', false)
//				      , invalidIsError = utility.logDom(logToDom.string, logToDom.sel, ' a string');
//
//				    expect(noArgs).to.be.an.instanceOf(Error);
//				    expect(invalidDom).to.be.an.instanceOf(Error);
//				    expect(invalidIsError).to.be.an.instanceOf(Error);
//
//				    done();
//			    });
//		    });
//		describe('method testDiv that', function(){
//			it("exists", function () {
//				expect(utility).to.respondTo('testDiv');
//			});
//			it("checks that this is a browser", function (done) {
//				var div = utility.testDiv('yolo');
//				expect(div).to.not.be.an.instanceOf(Error);
//				done();
//			});
//			it("will return the id of the div it created by default", function (done) {
//				var div = utility.testDiv('yolo');
//				expect(div).to.contain('yolo');
//				done ();
//			});
//			it("will return an actual div if 2nd arg is true", function (done) {
//				var div = utility.testDiv('yolo', true);
//				expect(div).to.be.instanceOf(HTMLDivElement);
//				done ();
//			});
//		});
//	    describe("method keysVals that", function() {
//	            var obj = testObj("keysVals", "this is a string");
//		    it("exists", function () {
//			    expect(utility).to.respondTo('keysVals');
//		    });
//		    it.skip("only accepts an object as its first parameter", function () {
//			    var kv = utility.keysVals
//		         , vals = kv(obj)
//			     , notString = kv('obj')
//			     , notFunction = kv(function(){});
////			    expect(vals).to.be.true;
//
////			    assert.ok(notString);
////			    console.log(notFunction);
//			    assert.notOk(notFunction);
//		    });
//		    it("will simply return true if its second parameter {shouldLog} is false" , function(){
//			    var kv = utility.keysVals
//			      , vals = kv(obj, false);
//			        expect(vals).to.be.true;
//		    });
//		    it.skip("will log a string if shouldLog is true", function(){
//			    var kv = utility.keysVals
//			        , vals = kv(obj, true);
//				expect(vals).to.be.a('string');
//		    });
//		    it.skip("will throw an exception if invalid", function (done) {
//
//		    });
//	    });
//	    describe("a constructor Exception that", function(){
//		    it("exists", function () {
//			    expect(utility).to.respondTo('Exception');
//		    });
//		    it("accepts 3 parameters-- type {string}, message {string}, isFatal {bool}=> default is false ", function () {
//			    var X = utility.Exception
//			         , x = new X('Exception type', "that does stuff.", false);
//		    });
//		    it("will return an Error instance but not throw it if isFatal is falsy.", function () {
//		        var X = utility.Exception
//		          , x = new X('Exception type', "that does stuff.");
//			    expect(x).to.be.an('object');
//		    });
//		    it("will throw an exception if isFatal is true ", function () {
//			    var X = utility.Exception
//			      , xtype = "Exception Type"
//			      , xmsg = "that does stuff.";
//			    var fn = function () {
//				    new X(xtype, xmsg, true);
//			    };
//			    expect(fn).to.throw(Error);
//		    });
//		    it("will throw a fatal exception if invalid", function () {
//			    var X = utility.Exception;
//			    var fn = function () {
//			       new X();
//			    };
//			    expect(fn).to.throw(Error);
//		    });
//        });
//	});
//});
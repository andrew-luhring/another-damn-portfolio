/*global should, exports, describe, mocha, it, jquery, expect, example, beforeEach, mocha *//*

(function(){
	"use strict";
var jQuery = require("jquery");
var $ = jQuery;
var jsdom = require("jsdom").jsdom;
var document = jsdom('');
var window = document.createWindow();

function getWindowDimensions(){
	var win = {
		widthRem: (window.innerWidth / 10) + "rem",
		heightRem: (window.innerHeight / 10) + "rem",
		width: window.innerWidth,
		height: window.innerHeight,
		top: window.pageYOffset

	};
	return win;
}
function fullWindowResize(objToResize, currentWindowObj, animateTime) {
	var current;
	if (currentWindowObj instanceof jQuery) {
		current = currentWindowObj.get();
	} else{
		current = currentWindowObj;
	}
	var sec = $(objToResize),
		sections = $.makeArray(sec),
		currentHeight = current.height,
		currentTop = current.top;
	for (var i = 0; i < sections.length; i++) {
		var offsetTop = current.heightRem * i;
		$(sections).eq(i).addClass("animating").animate({
			"min-height": current.heightRem,
			"width": "100%",
			"top": offsetTop
		}, animateTime).removeClass("animating");
	}
}

	var Obj = function(selector){
		jQuery.call(this, selector);
		this.prototype = Object.create(jQuery.prototype);
		function jqTest (thingToTest){
			if(thingToTest instanceof jQuery){
				return true;
			} else {
				return  false;
			}
		}
		function listProp (objectToListPropertiesOf){
			var arr = [];
			for (var i in objectToListPropertiesOf){
				if (objectToListPropertiesOf.hasOwnProperty(objectToListPropertiesOf[i])) {
				} else {
					var keys = i ;
					var props = objectToListPropertiesOf[i];
					arr.push(keys, props);
				}
			}
			return arr;
		}
		this.wasjQuery = jqTest(selector);
		this.numberOfProperties = listProp(this).length + 1;
		this.listProperties = listProp(this);
	}
	var JqObj = function(selector){
		var thing = $(selector);
		this.jqSelector = thing;
		this.width =  thing.width();
		console.log(thing.selector + " width " + this.width)
		this.height = thing.height();
		this.resize  =  function(){
			fullWindowResize(this, win, 100);
		};
		Obj.call(this, selector);
	}


	jQuery("body").append("<iframe src ='http://localhost:5000' id='test'></iframe>");
	var win = getWindowDimensions();
	jQuery(document).ready(function($){
	var didScroll
		,   animateScroll
		,   direction = "none"
		,   didResize
		,   current = win
		,   objSelector = "#test"
		,   $iframe = $(objSelector);
			win = getWindowDimensions();
			fullWindowResize($iframe, win, 1000);
});



		(function(){
		function quietMode(on, debuggerStatement){
			//turns off debugger statements for completed tasks.
			if( on !== true ){
				debuggerer(debuggerStatement);
			}
		}
		function debuggerer(smartAssRemark){
			if(smartAssRemark){
				console.log("\n >>>>>>>>>>>>>>>>>" +  smartAssRemark + "<<<<<<<<<<<<<<<<<  \n");
			} else {
				console.log("\n >>>>>>>>>>>>>>>>>DUDE YOU MESSED UP YOUR DEBUGGERER STATEMENT. TURN YOUR LIFE AROUND.<<<<<<<<<<<<<<<<<  \n");
			}
		}
		var quietModeIsOn = true,   $iframe = new JqObj($("#test"));
		describe('make an object', function(){
			var obj = new Obj($("body"));
				it("will return an object", function(){
					var pass = obj + " is a valid object.";
					var failError = obj + " is NOT a valid object";
					expect(obj).to.be.a("object");
					if(typeof obj === "object"){
						quietMode(quietModeIsOn, pass );
					} else{
						quietMode(quietModeIsOn, failError );
					}
				});
		});
		describe("lists length properties array", function(){
			var obj = new Obj($("body"));
			it("will enumerate properties of an object", function(){
				var num = obj.numberOfProperties;
				expect(num).to.be.greaterThan(1);
				quietMode(quietModeIsOn, "the jQuery 'body' object has " + num + " properties");
			});
		});
		describe("verify properties exist", function(){
			var obj = new Obj($("body"));
			it("will list properties of the object", function(){
				var things = obj.listProperties;

				expect(things).to.not.be.empty();
				quietMode(quietModeIsOn, "the jQuery 'body' object has the properties " + things);

			});
			it("wasjQuery", function(){
				expect(obj.wasjQuery).to.be(true);
			});

		});
		describe("iframe", function(){
			it("exists", function(){
				if(!$iframe){
					expect().fail( "no iframe");
					quietMode(false, "no iframe");
				} else {
					expect($iframe);
					quietMode(quietModeIsOn, "iframe exists.");
				}
			});
		});
		describe("iframe's", function(){
		it("width should be  greater than or equal to window size's width", function(){
				var wid = new JqObj($("#test"));
				var counter = 0;
				if( typeof wid.width !== "undefined"){
					var pass = "wid.width aka JqObj's width is " + wid.width;
					expect(wid.width).to.be.lessThan(win.width);
					quietMode(quietModeIsOn, pass + " which is less than window width: " + win.width);
					expect(wid.width).to.be.greaterThan(299);
					quietMode(quietModeIsOn, wid.width + " wid.width is also greater than 299" );
				} else {
					var failError = "wid.width aka JqObj is undefined";
					expect().fail( failError );
					quietMode(false, failError);
				}
		});
	});
		describe("input", function(){
			var inpt = "[ng-app='inputTester'] input"
				,   result
				,   inputTest
				,   InptObj
				,   op;
			beforeEach(function(){
				$(document).ready(function(){
					inputTest = $("<div ng-app='inputTester'> <label for='font_size'>Font Size</label><input class='font_size' name='font_size' type='number' placeholder='font size' ng-model='font_size' ng-required='true' required></div>");
					result = $("<div class='test'></div>");
					$("body").append(inputTest).append(result);
					op = false;
					InptObj = new JqObj($(inpt));
				});
			});
			it("exists", function(){
				InptObj.length = $(inpt).length;
				expect(InptObj).to.be.ok();
				if(InptObj.length < 1){
					console.log('input doesnt exist');
				} else {
					op = true;
				}
			});
			it("recognizes blur", function(){
				var blurred = false;
				$(inpt).trigger("focus");
				$(inpt).on("blur", function(){
					blurred = true;
				});
				$(inpt).trigger("blur");
				expect(blurred).to.be(true);
				if(blurred === true){
					op = true;
				}
			});

			afterEach(function(){
				if(op === true){
					inputTest.remove();
				}
			});
		});

	})();
})();*/

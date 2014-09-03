/*global should, exports, describe, mocha, it, jquery, expect, example, beforeEach, mocha */

/*
(function(){
    "use strict";
	var jQuery = require("../lib/jquery");
	var $ = jQuery;
	var jsdom = require("jsdom").jsdom;
	var document = jsdom('');
	var window = document.createWindow();
	var quietModeIsOn = true;
	var expect = require('expect.js');
    function quietMode(on, debuggerStatement){
        //turns off debugger statements for completed tasks.
        if( on !== true ){
            debuggerer(debuggerStatement);
        }
    }
    function debuggerer(thingToLog){
        if(thingToLog){
	        jQuery(document).ready(function($){
		        $("output").append(thingToLog);
	        });
            console.log("\n >>>>>>>>>>>>>>>>>" +  thingToLog + "<<<<<<<<<<<<<<<<<  \n");
        } else {
            console.log("\n >>>>>>>>>>>>>>>>>DUDE YOU MESSED UP YOUR DEBUGGERER STATEMENT. TURN YOUR LIFE AROUND.<<<<<<<<<<<<<<<<<  \n");
        }
    }
    function Frankenstein(selector, currentWindow ){
	
	this.obj = $(selector);
	
	//this.width = this.obj.width();
	//this.height = this.obj.height();
	(function resize(o, windowSize){
		var cols = $(".col").toArray()
			, rows = $(".row").toArray()
			, widthDenominator = cols.length / rows.length
			, heightDenominator = rows.length
			, objDimensions = {}
			, wide = ((windowSize.width / widthDenominator) /6)
			, high = ((windowSize.height / heightDenominator)/6)
			, dimensions
			, keys
			, vals
			, arr = [];
			
			//make Frankenstein a circle.
			if ( high > wide ){
				high = wide;
				dimensions = wide * 4;
			} else {
				wide = high;
				dimensions = high * 4;
			}
			
			Frankenstein.o = o.obj;
		    Frankenstein.width = dimensions;
		    Frankenstein.height = dimensions ;
			Frankenstein.marginH = high;
			Frankenstein.marginW = wide;
		Frankenstein.o.animate({
			width: Frankenstein.width + "px"
		,   height : Frankenstein.height + "px"
		,   bottom : Frankenstein.marginH + "px "
		,   left: Frankenstein.marginW + "px"
		}, 2000, function(){});
		
		
	})( this, currentWindow);
}
    describe('testing if', function(){
       it("exists", function(){
	       var a = 1;
	       var b = 1;
	       
	       quietMode(quietModeIsOn, "swag");
	       expect(a).to.equal(b);

       });
    });
	describe('Frankenstein', function(){
		//var window = document.createWindow();		
		//var dude = new Frankenstein($("body"), window);
		it("exists", function(){
		//	expect(dude);
		});
		
		
	});
})();


*/

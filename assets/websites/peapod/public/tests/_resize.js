var jsdom = require('jsdom').jsdom;
var doc = jsdom('').createWindow();
var jQuery = require('jquery');
var expect = require('expect.js');
(function(){
	"use strict";

	
	
	
	
	
	describe("mocha", function(){
		it("will run", function(){
			var cw = "resize";
			expect(cw).to.be.ok();
		});
	});
	
	
	
	
})();
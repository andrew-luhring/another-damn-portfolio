"use strict";
var expect = require ("expect.js");


describe ("test", function () {
	var a = 1;
	var b = 0;
	it (" that a will equal b", function () {
			expect(a).to.be.ok();
			console.log ("i killed you because ");	
	});
});


describe("test", function(){
	var a = 1
	,   b = 1;
	it(" 1 will equal 1.", function(){
		expect(1).to.equal(b);
	});
	it('will fail', function(){
		
	});
}); 

//var mocha = require("./mocha.conf.js");
var opts = require("./mocha.opts.js");
var Mocha = require('mocha');
var glob = require("glob");
var simplebuild = require('../extensions/simplebuild.js');
"use strict";
var arr = [];
exports.runTests = function(options, success, failure) {
	simplebuild.deglobSync(options.files).forEach(function(file) {
		//mocha.addFile(file);
		arr.push(file);
//		console.log(arr.length);
		//console.log(mocha);
	});
	/*
	'utils',
  'interfaces',
  'reporters',
  'Runnable',
  'Context',
  'Runner',
  'Suite',
  'Hook',
  'Test'*/
	
	
	var mocha = new Mocha(opts);
	
	
	for(var i = 0; i < arr.length; i++){
		var file = arr[i];
		mocha.addFile(file);
	}
	
	
	mocha.globals('window');
	mocha.slow(2).run(function(failures){
		console.log("i exist")
		process.on('exit', function(){
			console.log("i still")
			process.exit(failures);
		});
	});
	
/*

	mocha.run(function(failures){
		
		console.log("i exist")
		process.on('exit', function(){
		console.log("i still")
			process.exit(failures);
		})
	}).on("fail", function(err) {
		
//		failures = true;
		
	}).on("end", function() {
			console.log("end");
		if (failures) failure("Tests failed");
		success();
	});
*/

};

exports.runTests.title = "Mocha";
exports.runTests.description = "Run Mocha tests.";


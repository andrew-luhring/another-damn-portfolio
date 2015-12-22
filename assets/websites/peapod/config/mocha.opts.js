// Mocha configuration

"use strict";
var mocha = {
			ui: 'bdd'
		,   require : 'expect.js'
		,   colors : true
		,   reporter : 'nyan'	
		,   growl : true
		,   bail : false
		,   ignoreLeaks : false
		,   globals :  'window'
	};


module.exports = mocha;
	
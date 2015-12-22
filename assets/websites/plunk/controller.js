(function(){
	"use strict";

//noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols

	//  node requires

	//==============================
	// grunt
	// grunt-browserify
	// express-hbs
	// express
	//
	const express = require('express')
		, statPort = 5000
		, hbs = require('express-hbs')
		, path = require('path')
		, Server = require('./server')
		, bodyParser = require('body-parser')
		, serveStatic = require('serve-static')
		, session = require('express-session')
		, stat = express()
		, errorhandler = require('errorhandler')
		, testsD =  __dirname + './';


  stat.set('port', statPort)
    .set('cache', false);
	stat.use('/' , serveStatic ('./'));


	new Server(stat);


})();



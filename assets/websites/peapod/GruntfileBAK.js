module.exports = function(grunt) {
	"use strict";
	var   PUBLIC_DIR = "public/"
		,   STYLE_DIR =  PUBLIC_DIR + "css/"
		,   SCSS_DIR = PUBLIC_DIR + "scss/"
		,   VIEWS_DIR = 'views/'
		,   JS_DIR = PUBLIC_DIR + 'js/'
		,   TEST_DIR = PUBLIC_DIR + 'tests/'
		,   BUNDLE_DIR = PUBLIC_DIR + 'min/';


	var  cssF = STYLE_DIR  + "style.css";
	var  scssF = SCSS_DIR + "style.scss";
	var simplebuild = require("./extensions/simplebuild-ext-gruntify.js")(grunt);
	var config = 	{
		pkg: grunt.file.readJSON('package.json')
		,   sass: {
				dist : {
					files: {},
					options: sassOptions()
				}
		}
		,   jshint: {
				files : {
					src: [JS_DIR + "*.js", TEST_DIR + "*.js"]
					}
			,	options: lintOptions()
			}
		,   Mocha: {
				files: [ TEST_DIR + "*.js", "!node_modules/**/*"]
			,   success: "" 
			,   fail: ""
			}
		,   browserify: {
				client: {
					// A single entry point for our app
					src: JS_DIR + "script.js"
					// Compile to a single file to add a script tag for in your HTML
				,	dest: BUNDLE_DIR+ "bundle.js"
				}
			,   test: {
					src: TEST_DIR + "_script.js"
				,   dest: BUNDLE_DIR + "_bundle.js"
				}
			}
		,   watch:{
				js: {
					files: [JS_DIR + "*.js"]
				,   tasks: ['jshint', 'browserify']
				}
			,   test: {
					files: [ TEST_DIR + "*.js"]
				,   tasks: ['jshint', 'mocha']
				}
			,   style : {
					tasks: ['sass:dist']
				,	files: ["./public/scss*//*.scss"]
				}
			,   livereload: {
					files : [ STYLE_DIR + "*.css", VIEWS_DIR + "**/*.hbs", BUNDLE_DIR + "*.js"]
				,	options: {
						livereload: true
				}
			}
		}
	};

	//because you can't use expressions for identifiers in an object literal
	config["sass"]["dist"]["files"][cssF] = scssF;

	grunt.initConfig( config );

	simplebuild.loadNpmTasks("../config/simplebuild-mocha.js");
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	
	
	
	
	grunt.registerTask('bundle', "Browserify I choose you!", ["browserify:client", "browserify:test"]);
	grunt.registerTask('bundle_cli', "Browserify I choose you!", ["browserify:client"]);
	grunt.registerTask('bundle_test', "Browserify I choose you!", ["browserify:test"]);
	grunt.registerTask("lint", "Lint!", ["jshint"]);
	grunt.registerTask("mocha", "Test!", ["Mocha"]);
	grunt.registerTask("default", 'That income tax swag', ['sass:dist']);

};




function lintOptions() {
	"use strict";
	return {
		bitwise: true,
		curly: true,
		eqeqeq: true,
		forin: true,
		latedef: true,
		newcap: true,
		noarg: true,
		nonew: false,
		undef: true,
		unused: false,
		trailing: false,
		node: true,
		laxcomma: true,
		smarttabs: true,
		debug: true,
		sub: true,
		supernew: true,
		browser: true,
		devel: true,
		strict: true,
		globals : {
			jquery : true
		,   expect : true
		,   mocha : true
		,   describe : true
		,   it : true
		}
	};
}
function sassOptions(){
	return {
		compass : "true"
		,	lineNumbers: "true"
		,	style : 'expanded'
		,	sourcemap: 'true'
	};
}
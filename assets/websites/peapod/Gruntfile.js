module.exports = function(grunt) {
	"use strict";
	var   ASSETS_DIR =  "./public/"
		,   STYLE_DIR =  ASSETS_DIR + "css/"
		,   SCSS_DIR = ASSETS_DIR + "scss/"
		,   STYLEGUIDE_DIR = ASSETS_DIR + "styleguide/"
		,   JS_DIR = ASSETS_DIR + 'js/'
		,   TEST_DIR = ASSETS_DIR + 'tests/'
		,   BUNDLE_DIR = ASSETS_DIR + 'min/'
		,   VIEWS_DIR = './'
		,   LAYOUTS_DIR = VIEWS_DIR + 'layouts/'
		,   HBS_PARTIALS_DIR = VIEWS_DIR + 'partials/' ;

	var  styleFcss = STYLE_DIR  + "style.css"
		,   truckFcss = STYLE_DIR  + "truck.css"
		,   localFcss = STYLE_DIR  + "local.css"
		,   styleFscss = SCSS_DIR + "style.scss"
		,   truckFscss = SCSS_DIR + "truck.scss"
		,   localFscss  = SCSS_DIR + "local.scss"

//		,   styleguideF = LAYOUTS_DIR + 'styleguide.hbs';

	var simplebuild = require("./extensions/simplebuild-ext-gruntify.js")(grunt);
	var config = 	{
		pkg: grunt.file.readJSON('package.json')
		,   sass: {
				dist : {
					files: {},
					options: sassOptions()
				}
		}
		,   jshint:     {
				files : {
					src: [JS_DIR + "*.js", TEST_DIR + "*.js"]
					}
			,	options: lintOptions()
			}
		,   karma: {
				unit: {
					configFile: './karma.conf.js'
				,   background: true
				}
			}
		,   styleguide: {
				docco: {
					options: {
						framework:{
							name: 'styledocco',
							options: {
								gfm : true
							,   tables : true
							,   breaks : true
							,   smartLists: true
							}
						}
					,   name: 'doccoV'
					}
				,   files: {}
				}
			,   kss: {
					options: {
						framework:{
							name: 'kss'
						}
					,   name: 'kssV'
					}
					,   files: {}
				}
			}
		,   Mocha: {
				files: [ TEST_DIR + "/*.js", "!node_modules/**/*"]
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
					files: [ TEST_DIR + "*.js", JS_DIR + "*.js"]
				,   tasks: ['jshint', 'browserify', 'karma:unit:run', 'Mocha']
				}
			,   guide : {
					files: ['./README.md']
				,   tasks: ['styleguide:docco']
				}
			,   style : {
					tasks: ['sass:dist', 'styleguide:docco']
				,	files: [SCSS_DIR + "**/*.scss", SCSS_DIR + "**/**/.scss"]
				}
			,   livereload: {
					files : [ STYLE_DIR + "*.css", VIEWS_DIR + "**/*.hbs", BUNDLE_DIR + "*.js"]
				,	options: {
						livereload: true
				}
			}
		}
	};
	var arr = [{}, {}, {}];
	arr[0][styleFcss ] = styleFscss;
	arr[1][truckFcss] = truckFscss
	arr[2][localFcss] = localFscss;


	config["sass"]["dist"]["files"] = arr;
	console.log(config["sass"]["dist"]["files"] );
	config["styleguide"]["docco"]["files"][STYLEGUIDE_DIR] = SCSS_DIR +'*.scss' ;
	config["styleguide"]["kss"]["files"][STYLEGUIDE_DIR] = SCSS_DIR +'*.scss' ;
	//console.log(config["styleguide"]["docco"]["files"] );
	grunt.initConfig( config );


	simplebuild.loadNpmTasks("../config/simplebuild-mocha.js");
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-styleguide');
	grunt.registerTask('bundle_cli', "Browserify only client files!", ["browserify:client"]);
	grunt.registerTask('bundle_test', "Browserify only test files!", ["browserify:test"]);
	grunt.registerTask("default", 'That income tax swag', ['sass:dist', 'styleguide:docco']);



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
		,   beforeEach: true
		,   afterEach : true
		}
	};
}
function sassOptions(){
	return {
		compass : "true"

		,	style : 'expanded'
		,	sourcemap: 'true'
	};
}
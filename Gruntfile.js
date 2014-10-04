/*jshint expr: true, strict: false*/
function lintOptions(isBrowser) {
  "use strict";
  var opts = {
      laxcomma: true
    , bitwise: true
    , curly: true
    , esnext: true
    , eqeqeq: true
    , forin: true
    , latedef: true
    , newcap: true
    , noarg: true
    , nonew: false
    , undef: true
    , unused: false
    , trailing: false
    , node: true
    , smarttabs: true
    , debug: true
    , sub: true
    , supernew: true
    , browser: true
    , devel: true
    , strict: true
    , globals: {
        describe: true
      , ddescribe : true
      , xdescribe: true
      , it: true
      , iit: true
      , xit: true
      , protractor: true
      , inject:true
      , expect: true
      , before: true
      , beforeEach: true
      , after: true
      , afterEach: true
      , define: true
      , ACC: true
    }
  };
  if (isBrowser) {
    opts.globals.jquery = true;
    opts.globals.jQuery = true;
    opts.globals.$ = true;
    opts.globals.angular = true;
    opts.globals.require = true;
    opts.globals.requirejs = true;
  } else {
    opts.esnext = true;
  }
  return opts;
}
// TODO update docs and readme commands to reflect these changes.
module.exports = function(grunt) {

  const ASSETS_DIR = "./assets/"
    //
    //                                          style directories
    //
    , STYLE_DIR = ASSETS_DIR      + "css/"
    , LESS_DIR  = ASSETS_DIR      + "less/"
    , BUILD_DIR = ASSETS_DIR      + "build/"

    //============================================
    //
    //                                              style files
    //
    , cssF      = STYLE_DIR       + "style.css"
    , lessF     = LESS_DIR        + "style.less"

    //===========================================
    //
    //                                            js  directories
    //
    , JSDOC_DIR = ASSETS_DIR      + "jsdoc/"
    , JS_DIR    = ASSETS_DIR      + 'js/'
    , TEST_DIR  =                   'tests/'

    //===========================================
    //
    //                                                  js files
    //
    , frontendF = [
        ASSETS_DIR                + 'main.js'
      , JS_DIR                    + 'common/*.js'
      , JS_DIR                    + 'init/*.js'
      , JS_DIR                    + 'gallery/*.js'
      , JS_DIR                    + 'gallery/controllers/*.js'
      , JS_DIR                    + 'gallery/directives/*.js'
      , JS_DIR                    + 'gallery/services/*.js'

    //===========================================
    //
    //                                                    tests
    //
      , TEST_DIR                  + 'test-main'
      , TEST_DIR                  + 'unit/**/*.js'
      , TEST_DIR                  + 'unit/**/**/*.js'
      , TEST_DIR                  + 'e2e/*.js'
      ]
    , backendF = [
        './Gruntfile.js'
      , './config/*.js'
      ]

    //===========================================
    //
    //                                                  commands
    //
    , lesscmd = 'node ./node_modules/.bin/lessc --source-map-map-inline --source-map --source-map-rootpath=../less/ ' + lessF + ' ' + cssF
    , gruntcmd = './node node_modules/.bin/grunt'

    //============================================
    //
    //                                                       config
    //
    , config = {
        pkg: grunt.file.readJSON('package.json')

    //============================================
    //
    //                                          less (broken-- see shell : less)
    //
      , less: {
          dist: {
            files: {}
            , options: {
                sourceMap: true
              , dumpLineNumbers: true
              , outputSourceFiles : true
            }
          }
        , guide: {
          files: {}
          , options: {
            sourceMap: true
          }
        }
        , build: {
            files: {}
          }
        }

    //============================================
    //
    //                                                         exec
    //
      , exec: {
            hack                    : 'cp config/html2jsHack.js node_modules/karma-ng-html2js-preprocessor/lib/html2js.js ; '
        ,   push                    : 'cp -r ' + STYLE_DIR + '* ' + BUILD_DIR + 'css/ ; cp -r '+ JS_DIR + '* ' + BUILD_DIR + 'js/ ; cp ' + ASSETS_DIR + 'main.js ' + BUILD_DIR + 'main.js ;'
        ,   updateDriver       : 'webdriver-manager update'
        }

    //============================================
    //
    //                                                         shell
    //
      , shell: {
          jsdoc: {
          options: {
            stdout: true
          }
          , command: 'node node_modules/.bin/jsdoc -c jsdoc_conf.json '
        }
        , kss: {
          options: {
            stdout: true
          }
          , "command": "node node_modules/.bin/kss-node public/less public/styleguide --template public/styleguide-template/"
        }
        , less: {
            command: lesscmd
          , options: {
              stdout: true
            , stderr: true
            , failOnError: true
          }
        }
        , dev: {
          options: {
            stdout: true
          }
          , command: [lesscmd, gruntcmd + ' karma:unit:start watch -v'].join('&')
        }
      }

    //============================================
    //
    //                                                         jshint
    //
      , jshint: {
          frontend: {
          files: {
            src: [frontendF]
          }
          , options: lintOptions(true)
        }
        , backend: {
          src: [backendF]
          , options: lintOptions(false)
        }
      }

    //============================================
    //
    //                                                         karma
    //
      , karma: {
          unit: {
            configFile: './config/karma.conf.js'
          , background: true
          , autoWatch: false
        }
        , solo: {
            configFile: './config/karma.conf.js'
          , background: false
          , autoWatch: true
        }
        , verify: {
          configFile: './config/karma.conf.js'
        , singleRun: true
        , background: false
      }
      }

      //============================================
      //
      //                                                     clean
      //
      , clean: [JSDOC_DIR]

      //============================================
      //
      //                                                     protractor
      //
      , protractor: {
          verify: {
            configFile: './config/protractor.conf.js'
          , options:{
              keepAlive: false
            }
        }
        , watch : {
            configFile: './config/protractor.conf.js'
            , options: {
          keepAlive : true
//        , debug: true
        }
        }
          , spike : {
          configFile: './config/protractor.conf.js'
            , options: {
              keepAlive : false
        }
      }
      }

      //============================================
      //
      //                                                     protractor webdriver
      //
      , protractor_webdriver: {
          verify: {
            options: {
              keepAlive: false
            }
          }
        , watch: {
            options: {
              keepAlive: true
            }
          }
        }

      //============================================
      //
      //                                                         watch
      //
      , watch: {

      }
    };
  config["less"]["dist"]["files"][cssF] = lessF;

  grunt.initConfig(config);
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-protractor-webdriver');
  //
  //===========================================
  //
  //
  //
  //                                                      Tasks
  //
  //
  //
  //===========================================
  //
  grunt.registerTask(                 "less",                          "run less once.", function() {
    grunt.task.run('shell:less' );
  });
  grunt.registerTask(                 "browser",                   "run karma and watch", function() {
    config["watch"]['karma'] = {
        files: [frontendF, backendF]
      , tasks: ['karma:unit:run']
    };
    grunt.task.run('karma:unit:start', 'watch');
  });
  grunt.registerTask(                 "jsdoc",                        "run jsdoc", ['shell:jsdoc']);
  grunt.registerTask(                 "verify",                       "checks build for errors", [
    'jshint'
  , 'shell:less'
  , 'karma:verify'
  , 'exec:updateDriver'
  , 'protractor_webdriver:verify'
  , 'protractor:verify'
  ]);
  grunt.registerTask(                 "e2e",                          "run grunt watch with protractor", function(){
    config.watch = {
      pro : {
        files         : [TEST_DIR+ 'e2e/*.js']
      , tasks       : [
          'protractor_webdriver:watch'
        , 'protractor:watch'
        ]
      , options  : {
         atBegin: true

        }
      }
    };
    grunt.task.run('watch');
  });
  grunt.registerTask(                 "build",                       "removes old documentation + styleguide, generates jsdoc documentation, generates styleguide, replaces the default html2js plugin file with one that supports require.js", [
        'clean'
      , 'jsdoc'
      , 'shell:less'
      , 'exec:hack'
    ]);
  grunt.registerTask(                 "_watch",                    "run the actual watch command" , function() {
      config.watch = {
          backend: {
          files: backendF
          , tasks: ['jshint:backend']
          , options: {
            spawn: false
          }
        }
        , frontend: {
          files: [
            frontendF
          ]
          , tasks: ['jshint:frontend']
          , options: {
            spawn: true
            , atBegin: true
          }
        }
        , less : {
            files : [
                LESS_DIR + "*.less"
              , LESS_DIR + "**/*.less"
              , LESS_DIR + "**/**.less"
              , '!**/existing/**'
            ]
          , tasks : ['shell:less']
          , options: {
              livereload: false
            , livereloadOnError: false
            , spawn: false
            , atBegin: true
          }
        }
        , livereload : {
             options: { livereload: true }
          ,  files : [ cssF, frontendF]
        }
      };
      grunt.task.run('watch');
    });
  grunt.registerTask("default",                                      ["_watch"]);
};
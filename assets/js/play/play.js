define([
  'init/apps_init'
, 'plaC/play.controller'
, 'plaD/play.directive'
], function(init){
  "use strict";

  var Play = init.play;
  return Play.
    controller('PlayController', require('plaC/play.controller')).
    directive('rooPlayground', require('plaD/play.directive'));
});

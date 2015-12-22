/*jshint expr: true*/
define([
     'require'
  ,  'angular'
  ,  'gal/gallery'
  ,  'js/play/play'
], function(require, angular, gallery, play) {
  "use strict";
  /**
   * The module responsible for bootstrapping angular apps to the page.
   * @exports init/apps_bootstrap
   * @version 1.0
   */
  angular.bootstrap(document.body, [
    gallery.name
  , play.name
  ]);
  return angular;
});

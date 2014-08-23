/*jshint expr: true*/
define([
     'require'
  ,  'angular'
  , 'gal/gallery'
  ], function(require, angular, gallery) {
  "use strict";


  angular.bootstrap(document.body, [
    gallery.name
  ]);
  return angular;
});
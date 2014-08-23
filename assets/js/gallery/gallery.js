define([
  'init/apps_init'
, 'galS/data.service'
, 'galC/gallery.controller'
, 'galD/gallery.directive'
], function(init){
  "use strict";
  var Gallery = init.gallery;

  return Gallery
    .service('DataService', require('galS/data.service'))
    .directive('rooGallery', require('galD/gallery.directive'))
    .controller('GalleryController', require('galC/gallery.controller'));

});
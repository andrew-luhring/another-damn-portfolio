define([
  'init/apps_init'
, 'galS/data.service'
, 'galC/gallery.controller'
, 'galC/lightbox.controller'
, 'galD/gallery.directive'
, 'galD/lightbox.directive'
//, 'com/a.directive'
, 'com/services/ajax.service'
], function(init){
  "use strict";
  var Gallery = init.gallery;

  return Gallery
    .value('testmode', false)
    .service('AjaxService', require('com/services/ajax.service'))
    .service('DataService', require('galS/data.service'))
    .directive('rooGallery', require('galD/gallery.directive'))
    .directive('rooLightbox', require('galD/lightbox.directive'))
    .controller('GalleryController', require('galC/gallery.controller'))
    .controller('RooLightbox', require('galC/gallery.controller'));
});
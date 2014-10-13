define([
  'init/apps_init'
, 'galS/data.service'
, 'galC/gallery.controller'
, 'galD/gallery.directive'
, 'com/a.directive'
, 'com/services/ajax.service'
], function(init){
  "use strict";
  var Gallery = init.gallery;

  return Gallery
    .value('testmode', false)
    .service('AjaxService', require('com/services/ajax.service'))
    .service('DataService', require('galS/data.service'))
    .directive('rooGallery', require('galD/gallery.directive'))
    .controller('GalleryController', require('galC/gallery.controller'));
});
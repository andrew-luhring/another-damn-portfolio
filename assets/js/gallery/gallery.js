define([
  'init/apps_init'

, 'com/services/ajax.service'
, 'galS/data.service'
, 'galS/lightbox.service'

, 'galD/gallery.directive'
, 'galD/lightbox.directive'

, 'galC/gallery.controller'
, 'galC/lightbox.controller'

], function(init){
  "use strict";
  var Gallery = init.gallery;

  return Gallery
    .value('testmode', false)
    .service('AjaxService', require('com/services/ajax.service'))
    .service('DataService', require('galS/data.service'))
    .service('LightboxService', require('galS/lightbox.service'))

    .directive('rooGallery', require('galD/gallery.directive'))
    .directive('rooLightbox', require('galD/lightbox.directive'))

    .controller('GalleryController', require('galC/gallery.controller'))
    .controller('LightboxController', require('galC/lightbox.controller'));
});
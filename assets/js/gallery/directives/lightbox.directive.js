define([], function(){
  "use strict";
  return {
    restrict: 'A'
  , scope: {  lightbox : '='  }
  , templateUrl : '/js/gallery/tmpl/lightbox.tmpl.html'
  , controller : 'RooLightbox'
  , controllerAs : 'lb'
  , link : function(scope, elem, attr){
    }
  };


});
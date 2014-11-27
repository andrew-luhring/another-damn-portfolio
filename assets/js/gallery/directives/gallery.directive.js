define([
  'lodash'
], function(_) {
  "use strict";
  var types = ['illustration', 'website'];
  function generateOverlay(attr){
    var illustration = _.contains(attr, 'illustration')
    , website = _.contains(attr, 'website');
    if(illustration){
      return 'illustration';
    } else if(website) {
      return 'iframe';
    } else {
      return 'disabled';
    }
  }

  return function(){
    return {
      restrict: 'A'
    , scope : {
        rooGallery : '='
      }
    , link: function($scope, $elem, $attr){
        var hasLightbox = false;
        $elem.click(function(e){
          e.preventDefault();
          if(hasLightbox === true){
            console.log('already has lightbox');
            return;
          } else {
            console.log ('generate lightbox');
            
            $elem.append('<div class="lightbox" lightbox="'+ generateOverlay($attr.rooGallery) + '"></div>');
            hasLightbox = true;
          }

        });
      }
    };
  };
});
define([
  'lodash'
], function(_) {
  "use strict";
  var types = ['illustration', 'website'];
  function generateOverlay(attr){
    var illustration = _.contains(attr, 'illustration')
    , website = _.contains(attr, 'website');
    if(illustration){

    } else if(website) {

    } else {
      return;
    }
  }

  return function(){
    return {
      restrict: 'A'
    , scope : {
        rooGallery : '='
      }
    , link: function($scope, $elem, $attr){
        $elem.click(function(e){
          e.preventDefault();
          console.log ($elem);
          $elem.append('<div lightbox=""></div>')
          generateOverlay($attr.rooGallery);
        });
      }
    };
  };
});
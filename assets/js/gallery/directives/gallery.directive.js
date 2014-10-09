define([
  'lodash'
], function(_) {
  "use strict";
  var types = ['illustration', 'website'];
  function generateOverlay(attr){
    var illustration = _.contains(attr, 'illustration')
    , website = _.contains(attr, 'website');
    if(illustration){
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
          generateOverlay($attr.rooGallery);
        });
      }
    };
  };
});
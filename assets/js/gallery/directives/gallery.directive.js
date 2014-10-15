define([
  'lodash'
], function(_) {
  "use strict";
  return function(){
    return {
      restrict: 'A'
    , scope : {
        rooGallery : '='
      }
    , controller: 'GalleryController'
    , link: function($scope, $elem, $attr, cntrl){
        var instanceArray = $scope.rooGallery
          , instance;
        if( instanceArray === null ||
            typeof instanceArray === 'undefined' ||
            typeof instanceArray !== 'object'){
          return false;
        }
        if( instanceArray instanceof Array === false){
          instance = instanceArray;
        } else if (instanceArray[0] instanceof Array === false){
          instance = instanceArray[0];
        } else if (instanceArray[0][0] instanceof Array === false){
          instance = instanceArray[0][0];
        } else { throw new TypeError();}

        $elem.click(function(e){
          e.preventDefault();
          cntrl.clicked(instance);
        });

      }
    };
  };
});
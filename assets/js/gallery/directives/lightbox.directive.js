define([], function(){
"use strict";

  return function(){
    return {
      restrict: 'A'
      , scope : {
          rooLightbox : '='
      }
      , template : "" +
        "<div>" +
          "[[lb.obj]]" +
          "wtf" +
        "</div>"
      , controller: 'LightboxController'
      , link: function($scope, $elem, $attr, cntrl){
        console.log($scope);
        console.log($elem);
        console.log($attr);
      }
    };
  };
});
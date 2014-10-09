define(['lodash'], function(_) {
  "use strict";
  return ['$location' , '$anchorScroll', function($location, $anchorScroll){
    return{
      restrict: "EA"
      , transclude: false
      , scope: {}
      , template: ""
      , link: function (scope, elem, attr) {
        elem.click(function(e){
          console.log (e);

          e.preventDefault();
          console.log("yo");
        });
      }
    };
  }];
});
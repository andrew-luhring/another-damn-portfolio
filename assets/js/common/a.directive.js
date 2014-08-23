define(['lodash'], function(_) {
  "use strict";
  return ['$location' , '$anchorScroll', function($location, $anchorScroll){
    return{
      restrict: "EA"
      , trandsclude: true
      , scope: {}
      , template: ""
      , link: function (scope, elem, attr) {}
    };
  }];
});
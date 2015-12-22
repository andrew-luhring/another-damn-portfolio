define([
  'jquery'
], function(_$){
  "use strict";
  return function(){
    return {
      scope: {
        rooPlayground : '@'
      , action : '@'
      }
    , restrict : 'A'
    , templateUrl : 'assets/js/play/tmpl/play.tmpl.html'
    , controller : 'PlayController'
    , controllerAs : 'play'
    , transclude : true
    , link: function(scope, elem, attr, cntrl){
        cntrl.name = scope.rooPlayground;
        cntrl.action = scope.action;

      }
    }
  }
});

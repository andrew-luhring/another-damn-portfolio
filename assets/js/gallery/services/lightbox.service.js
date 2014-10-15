define(['lodash'], function(_){
  return [
    '$log'
  , '$window'
  , '$state'

  , function($log, $window, $state){
      var lbScope ;

      this.setLightboxScope = function(scope){
        lbScope = scope;
      }

      this.launchLightbox = function(obj){
        console.log (obj);
        $state.go('index.lightbox', obj);
      }

    }
  ]
});
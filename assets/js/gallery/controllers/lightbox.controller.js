define([
    'lodash'
  , 'galS/data.service'
  , 'galS/lightbox.service'
  , 'comS/private.tester'
  ]  , function(_){
  "use strict";


  return [
      '$scope'
    , '$window'
    , '$log'
    , 'DataService'
    , 'LightboxService'
    , function(
        $scope
      , $window
      , $log
      , DataService
      , LightboxService
      ){
      var lightbox = this
        , data;

      lightbox.meta = $scope;

      (function initializeLightbox(){
        LightboxService.setLightboxScope($scope);
      })()

      $scope.LightboxController = this;
    return $scope.LightboxController ;
  }];
});



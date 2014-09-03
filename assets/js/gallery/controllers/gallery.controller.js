define([
  'lodash'
  , 'galS/data.service'
  ]  , function(_){
  "use strict";

  return ['$scope', 'DataService', function($scope, DataService){



    this.meta = $scope;
    DataService.list();



    $scope.GalleryController = this;
    return $scope.CompanyController ;
  }];

});
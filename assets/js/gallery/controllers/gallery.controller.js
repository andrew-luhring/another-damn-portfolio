define([
  'lodash'
  , 'galS/data.service'
  ]  , function(_){
  "use strict";

  return ['$scope', 'DataService', function($scope, DataService){
    var data = DataService.list();
    this.meta = $scope;
    this.data = data;
  }];

});
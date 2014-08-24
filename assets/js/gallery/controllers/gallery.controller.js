define([
  'lodash'
  , 'galS/data.service'
  ]  , function(_){
  "use strict";

  return ['$scope', 'DataService', function($scope, DataService){
    var data = "derl" //DataService.list();
      console.log(_.keys(DataService));
    this.meta = $scope;
    this.data = data;
  }];

});
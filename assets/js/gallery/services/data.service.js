define([
  'lodash'
, 'jquery'
], function(_, _$){


var arr = [];

  function DataService() {}

  DataService.prototype.list = function(){
    return arr;
  };

  return ['$http','$log', function($http, $log){
    DataService();
  }]
});
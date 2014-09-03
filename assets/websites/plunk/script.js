define([
  'angular'
  ], function(angular){
  "use strict";
  
  var test = angular.module("test", []);
  
  test.directive('thing',function(){
    return{
      restrict: "E"
    , transclude : true
    , templateUrl: 'tmpl.html'
    , scope : {}
    }
  });
  
  function Test($scope){
    $scope.mdl = "thing";
  }
  
  angular.bootstrap(document, ['test']);
  // angular.element
  //.bootstrap(document, ['test']);
  // function Done(){
  //   var done = require('done');
  //   done();
  // }
});


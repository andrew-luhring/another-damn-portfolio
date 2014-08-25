define([
  'lodash'
, 'jquery'
], function(_, _$){

  return ['$http','$log', function($http, $log){

    this.list = function(){
      $http.get("/nerd/ghost/api/v0.1/posts/?status=published").
        success(function(data){
          console.log ("\n\n\nwin\n\n\n");


          console.log (data);

          return data;
        }).
        error(function(data){
          console.log ("\n\n\n\nlose\n\n\n ");
          console.log (data);
          return data;
        });
    }

  }]
});





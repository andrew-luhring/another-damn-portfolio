define([
  'lodash'
  , 'jquery'
  , 'transform'
], function(_, _$){


  return ['$http','$q', function($http, $q){

    this.list = function(list){

      return $http.get("/nerd/rss")
        .then(function(response){
          if(typeof response === 'object' && response instanceof Object){
//            console.log(response.data);
            var data = _$.xml2json(response.data);
            list.data  = data;
            return data;
          } else{
            console.log ('fail');
            return $q.reject (response.data);
          }
        }, function(response){
          console.log ('error');
          return $q.reject(response.data);
        })
    }
  }]
});





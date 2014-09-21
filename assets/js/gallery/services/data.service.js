define([
  'lodash'
  , 'jquery'
  , 'transform'
], function(_, _$){


  return ['$http','$q', '$log' ,function($http, $q, $log){

    this.data = function(list){
      return $http({
        method: "GET"
      , url: "/nerd/content/images/2014/Sep/data.json"
      }).
        success(function(data){
          $log.info("data:");
          $log.info(data.db[0].data);
          list.dat = data;
          return data;
        }).
        error(function(data){
            $log.warn(data);
        });

    }


    this.list = function(list){

      return $http.get("/nerd/rss")
        .then(function(response){
          if(typeof response === 'object' && response instanceof Object){
            var data = _$.xml2json(response.data);
            list.data  = data;
            return data;
          } else{
            $log.warn('fail');
            return $q.reject (response.data);
          }
        }, function(response){
          $log.error ('error');
          return $q.reject(response.data);
        })
    }
  }]
});





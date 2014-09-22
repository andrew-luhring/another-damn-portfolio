define([
  'lodash'
  , 'jquery'
  , 'transform'
], function(_, _$){


  return ['$http','$q', '$log' ,function($http, $q, $log){

    this.data = function(list){
        return $http.get("/nerd/content/images/2014/Sep/data.json").
        then(function(response){
          if(typeof response=== 'object' && response instanceof Object) {
            var obj = {
              posts: response.data.db[0].data.posts
            , tags: response.data.db[0].data.tags
            , posts_tags: response.data.db[0].data.posts_tags
            }
            list.blah = obj;
            return obj;
          } else {

            $log.error('fail');
            return $q.reject (response);
          }
        }, function(){
            $log.error ('error');
            return $q.reject(response);
        })
    }
    this.list = function(list){

      return $http.get("/nerd/rss")
        .then(function(response){
          if(typeof response === 'object' && response instanceof Object){
            var data = _$.xml2json(response.data);
            list.data  = data;
            return data;
          } else{
            $log.error('fail');
            return $q.reject (response.data);
          }
        }, function(response){
          $log.error ('error');
          return $q.reject(response.data);
        })
    }
  }]
});





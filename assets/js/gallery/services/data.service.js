define([
    'lodash'
  , 'jquery'
  , 'esapi'
  , 'transform'
], function(_, _$, esapi){
  "use strict";




  return ['$http','$q', '$log' ,function($http, $q, $log){
    /**
     *
     * @param {object} - response object to check
     * @returns {*}
     */
    function isValidResponse(resp){
      if(typeof resp === 'object' && resp instanceof Object) {

        if(_.has(resp, 'status')){
          if(resp.status === 200){
            return true;
          }
        }
        $log.warn('bad status');
        $log.error(resp);
        return $q.reject (resp);
      } else {
        $log.error('bad response');
        $log.error(resp);
        return $q.reject (resp);
      }
    }
    function getTags(obj){
      return $http.get("/nerd/api/public/tags/").
        then(function(response){
          if(isValidResponse(response)){
            var tags = [];
            _.each (response.data.tags, function (tag) {
              tags.push ({
                id: tag.id
              , name: tag.slug
              });
            });
            obj.tags = tags;

          }
        }, function(err){
          return isValidResponse(err);
        });
    }
    function getPosts(obj){
        return $http.get("/nerd/api/public/posts/").
        then(function(response){
            if(isValidResponse(response)){
              var data = response.data;
              obj.postsArr = data.posts;
              return obj;
            }
        }, function(err){
            return isValidResponse(err);
        });
    }
    function assignClasses(obj){
      _.each(obj.postsArr, function(post){

        var tagClasses = [];
        _.each(post.tags, function(tagNum){
         var tag = _.find(obj.tags, {'id':tagNum});
          tagClasses.push(tag.name);
        });
        post.tagClasses = tagClasses;
      });
      return obj;
    }


    this.data = function(obj){

      return getPosts(obj).
        then(function(val){

          return getTags(obj).
            then(function(){
              assignClasses(obj);
              return val;
            });

        });
    };

    this.list = function(list){
      return $http.get("/nerd/rss")
        .then(function(response){
          if(typeof response === 'object' && response instanceof Object){
            var data = _$.xml2json(response.data);
            list.listData  = data;
            return data;
          } else{
            $log.error('fail');
            return $q.reject (response.data);
          }
        }, function(response){
          $log.error ('error');
          return $q.reject(response.data);
        });
    };
  }];
});





//var obj = function(){
//  return {
//    esapi : function(){
//      return esapi;
//    }()
//  };
//}();

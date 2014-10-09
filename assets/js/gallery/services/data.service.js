define([
    'lodash'
  , 'jquery'
  , 'esapi'
  , 'transform'
], function(_, _$, esapi){
  "use strict";

  return ['$http','$q', '$log', 'AjaxService', function($http, $q, $log, AjaxService ){

    /**
     * takes url of api, makes request, checks response, returns response or throws error.
     * @param url
     * @returns {*}
     */
    function get(url){
      return $http.get(url).
        then(function(response){
          var isValidResponse = new AjaxService(response).isValidResponse();
          if(isValidResponse){
            return response;
          } else {
            $log.error("invalid response");
            $log.debug(response);
            throw new Error();
          }
        }, function(err){
          return new AjaxService(err).isValidResponse();
        });
    }
    function getTags(obj){
      var response = get("/nerd/api/public/tags/");
      return response.then(function(resp){
        var tags = [];
        _.each (resp.data.tags, function (tag) {
          tags.push ({
            id: tag.id
            , name: tag.slug
          });
        });
        obj.tags = tags;
      });
    }
    function getPosts(obj){
      var response = get("/nerd/api/public/posts/");
      return response.then(function(resp){
        var data = resp.data;
        obj.postsArr = data.posts;
        return obj;
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
  }];
});





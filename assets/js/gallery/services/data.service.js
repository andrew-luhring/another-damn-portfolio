define([
    'lodash'
  , 'jquery'
  , 'esapi'
  , 'transform'
], function(_, _$, esapi){
  "use strict";

  return [
      '$http'
    , '$q'
    , '$log'
    , 'AjaxService'
    , function($http, $q, $log, AjaxService){
      var that = this
      , localArr = []
      , localObj = {};
      that.counter = 0;




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
    /**
       *
       * @param rex - a regular expression
       * @param str - the string to check
       * @param arr - the array to push to (if there is one)
       * @returns {*}
       */
    function returnUseableString(rex, str, arr ){
      var result = rex.exec(str);
      if(result){
        var substr = result[0]
          , path = substr.split(":");

        path = path[1];
        path = path.split("'");
        path = path[1];
        if(arr){
          arr.push(path);
        }
        return path;
      } else {
        return null;
      }
    }
    /**
     * Splits an array of items into smaller arrays within the item.
     * @param   {Array}  - arrayOfItems
     * @param   {Number} - numberOfRows (default is 4)
     * @returns {Array}
     */
    function wrapIntoRows(arrayOfItems, numberOfRows){
      var items = arrayOfItems
        , rows = numberOfRows || 4
        , wrappedDom = [];

      function wrap(arr, num) {
        var surround
          , notSurrounded;

        if (arr.length > num) {
          surround      = arr.slice(0, num);
          notSurrounded = arr.slice(num, arr.length);
          wrappedDom.push(surround);
          wrap(notSurrounded, num);
        } else {
          var remainder = num - arr.length;
          surround = arr;

          for (var i = 0; i < remainder; i++) {
            var emptydiv = document.createElement('div');
            $(emptydiv).addClass("filler");
            surround.push({});
          }
          wrappedDom.push(surround);
        }
      }

      wrap(items, rows);

      return wrappedDom;
    }
    /**
     * this takes the promised data from DataService, formats it into a post, and attaches it to the gallery object(which was passed into Dataservice.data)
     * @param data
     */
    function formatPost(data, gallery){
        return data.then(function(gallery){
          var strArr = []
            , altArr = []
            , imgArr = []
            , urlArr = []
            , idArr  = []
            , img    = /'img':'[\/(\w)(\_\-)']*(\.(gif|png))'/ig
            , alt    = /'alt':'(.)*'/ig
            , url    = /'url':'(.)*'/ig
            , id     = /'id':'(\w)+'/;
          _.each(gallery.postsArr, function(post){
            var str = post.markdown.toString()
              , final = {};


            final.img = returnUseableString(img, str, strArr);
            final.alt = returnUseableString(alt, str, altArr);
            final.url = returnUseableString(url, str, urlArr);
            final.id = returnUseableString(id, str, idArr);
            final.classes = post.tagClasses;


            localArr.push({
              id  : final.id
            , obj : final
            });

            localObj[final.id] = final;
            if(final.img && final.alt){
              imgArr.push(final);
            }
          });
          gallery.rows = wrapIntoRows(imgArr);
          gallery.imgArr = imgArr;
          return gallery;
        });
      }

    this.data = function(obj){
      that.counter = that.counter + 1;
      return getPosts(obj).
      then(function(val){
        return getTags(obj).
          then(function(){
            assignClasses(obj);
            return val;
          });
      });
    };
    this.formatPosts = function(data, gallery){
      return formatPost(data, gallery);
    }
    this.route = function(id){
      console.log (localObj);
      
    }
  }];
});





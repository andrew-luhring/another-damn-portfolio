define([
    'lodash'
  , 'galS/data.service'
  ]  , function(_){
  "use strict";

  return ['$scope', 'DataService', '$sanitize', '$window', '$log', function($scope, DataService, $sanitize, $window, $log){
    var gallery = this;
    gallery.meta = $scope;
    
    var data = DataService.data(this);
    data.then(function(obj){
      var strArr = [];
      var altArr = [];
      var imgArr = [];

      function returnUseableString(rex, str, arr ){
        
        var result = rex.exec(str)
        if(result){
          var substr = result[0]
          var path = substr.split(":")
          path = path[1];
          path = path.split("'");
          path = path[1];
          arr.push(path);
          return path;
        } else {
          return null;
        }
      }
      _.each(obj.postsArr, function(post){
        let _post = post
          , str = post.markdown.toString()
          , img = /'img':'[\/(\w)(\_\-)']*(\.png)'/ig
          , alt = /'alt':'(.)*'/ig
          , url = /'url':'(.)*'/ig
          , final = {};
        

        final.img = returnUseableString(img, str, strArr);
        final.alt = returnUseableString(alt, str, altArr);
        final.url = returnUseableString(url, str, altArr);
        
        if(final.img && final.alt && final.url){
          imgArr.push(final);
        }
      });

      gallery.imgArr = imgArr;
      gallery.strArr = strArr;
      gallery.altArr = altArr;
    });


    function generatePostsForList(data){
      var _data = data
        , _posts = data.channel.item
        , postsArr= []
        , postHtmlArr = [];

      gallery.listData = _data;

      _.each(gallery.listData , function(item){
        _.each(item['item'], function(j){
          postsArr.push(j);
          postHtmlArr.push(j.description);
        });
      });

      gallery.listPostsArr = postsArr;
      gallery.listPosts = postHtmlArr;

    }
//    var list = DataService.list(this).
//      then(function(data){
//        generatePostsForList(data);
//      });

    
    $scope.GalleryController = this;
    return $scope.CompanyController ;
  }];
});

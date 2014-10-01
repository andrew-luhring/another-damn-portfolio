define([
    'lodash'
  , 'galS/data.service'
  ]  , function(_){
  "use strict";

  return ['$scope', 'DataService', '$sanitize', function($scope, DataService, $sanitize){
    var gallery = this;
    gallery.meta = $scope;
    
    var data = DataService.data(this);
    data.then(function(obj){
      var strArr = [];

      function returnUseableString(rex, str, arr ){

      }


      _.each(obj.postsArr, function(post){
        var _post = post;
        var str = post.markdown.toString();
        var img = /'img':'[\/(\w)(\_\-)']*(\.png)'/ig;
        var result = img.exec(str)
        if(result){
          var substr = result[0]
          var path = substr.split(":")
          path = path[1];
          path = path.split("'");
          path = path[1];
          strArr.push(path);
        }
      })
      window.strArr = strArr;
      gallery.strArr = strArr;

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

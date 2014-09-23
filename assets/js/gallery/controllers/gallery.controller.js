define([
    'lodash'
  , 'galS/data.service'
  ]  , function(_){
  "use strict";

  return ['$scope', 'DataService', '$sanitize', function($scope, DataService, $sanitize){
    var gallery = this;
    gallery.meta = $scope;

    var data = DataService.data(this);


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
    var list = DataService.list(this).
      then(function(data){
        generatePostsForList(data);
      });


    $scope.GalleryController = this;
    return $scope.CompanyController ;
  }];
});

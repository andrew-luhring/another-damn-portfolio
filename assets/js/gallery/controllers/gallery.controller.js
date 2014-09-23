define([
    'lodash'
  , 'galS/data.service'
  ]  , function(_){
  "use strict";

  return ['$scope', 'DataService', '$sanitize', function($scope, DataService, $sanitize){
    var gallery = this;
    this.meta = $scope;

    var dat = DataService.
      data(this).
      then(function(data){
        gallery.dat = data;
        console.log(gallery);
      });

    var list = DataService.list(this).then(function(data){
      var _data = data
        , _posts = data.channel.item
        , postsArr= []
        , postHtmlArr = []
        , classArr = []
        , containerArr = []
        , post
        , arr = []
        , test;
      
      gallery.data = _data;

      _.each(data, function(item){

        _.each(item['item'], function(j){
          postsArr.push(j);
          postHtmlArr.push(j.description);
        });

      });

      gallery.postsArr = postsArr;
      gallery.posts = postHtmlArr;


//!~!~!~rooGalleryImage --> removes <p> wrapper from before and after images in posts.
// todo use that^ to make a regex to remove the parent p element via regular expression
      // figure out how to test that's safety.


    });

    $scope.GalleryController = this;
    return $scope.CompanyController ;
  }];
});
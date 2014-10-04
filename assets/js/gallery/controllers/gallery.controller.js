define([
    'lodash'
  , 'galS/data.service'
  ]  , function(_){
  "use strict";

  function returnUseableString(rex, str, arr ){
    var result = rex.exec(str);
    if(result){
      var substr = result[0]
        , path = substr.split(":");

      path = path[1];
      path = path.split("'");
      path = path[1];
      arr.push(path);
      return path;
    } else {
      return null;
    }
  }


  return ['$scope', 'DataService', '$sanitize', '$window', '$log', function($scope, DataService, $sanitize, $window, $log){
    var gallery = this;
    gallery.meta = $scope;
    
    var data = DataService.data(this);
    data.then(function(obj){
      var strArr = []
        , altArr = []
        , imgArr = []
        , urlArr = [];


      _.each(obj.postsArr, function(post){
        let str = post.markdown.toString()
          , img = /'img':'[\/(\w)(\_\-)']*(\.(gif|png))'/ig
          , alt = /'alt':'(.)*'/ig
          , url = /'url':'(.)*'/ig
          , final = {};


        final.img = returnUseableString(img, str, strArr);
        final.alt = returnUseableString(alt, str, altArr);
        final.url = returnUseableString(url, str, urlArr);
        final.classes = post.tagClasses;

        if(final.img && final.alt){
          imgArr.push(final);
        }
      });

      gallery.imgArr = imgArr;


    });

    $scope.GalleryController = this;
    return $scope.CompanyController ;
  }];
});

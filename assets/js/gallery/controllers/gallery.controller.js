define([
    'lodash'
  , 'galS/data.service'
  ]  , function(_, jquery){
  "use strict";

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


  function wrapIntoRows(arrayOfItems){
    var items = arrayOfItems
      , wrappedDom = [];

    function wrap(arr) {
      if (typeof arr !== 'object' || arr instanceof Object !== true) { throw new TypeError(); }


      var surround
        , notSurrounded;
      console.log(arr);
      if (arr.length > 4) {
        surround = arr.slice(0, 4);
        notSurrounded = arr.slice(4, arr.length);
        wrappedDom.push(surround);
        wrap(notSurrounded);
      } else {
        var remainder = 4 - arr.length;
        surround = arr;

        for (var i = 0; i < remainder; i++) {
          var emptydiv = document.createElement('div');
          $(emptydiv).addClass("filler");
          surround.push({});
        }
        wrappedDom.push(surround);
      }
    }

    wrap(items);
    return wrappedDom;
  }


  /**
   * this takes the promised data from DataService, formats it into a post, and attaches it to the gallery object(which was passed into Dataservice.data)
   * @param data
   */
  function formatPost(data){
    data.then(function(gallery){
      var strArr = []
        , altArr = []
        , imgArr = []
        , urlArr = [];
      _.each(gallery.postsArr, function(post){
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

      gallery.rows = wrapIntoRows(imgArr);



      gallery.imgArr = imgArr;
    });
  }


  function surroundIntoDom(arr){

    $.each(arr, function(i){
      var surrounderDiv = document.createElement('div');

      $(surrounderDiv).addClass("surrounder");

      $.each(arr[i], function(j){
        $(arr[i][j]).appendTo(surrounderDiv);

      });

      $(surrounderDiv).appendTo("#galleryDiv");
    });

  }


  return ['$scope', 'DataService', '$sanitize', '$window', '$log', function($scope, DataService, $sanitize, $window, $log){
    var gallery = this
      , data = DataService.data(gallery);
    gallery.meta = $scope;

    formatPost(data);

    $scope.GalleryController = this;
    return $scope.CompanyController ;
  }];
});



define([
    'lodash'
  , 'galS/data.service'
  , 'comS/private.tester'
  ]  , function(_, jquery, Tester){
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
  function formatPost(data){
    data.then(function(gallery){
      var strArr = []
        , altArr = []
        , imgArr = []
        , urlArr = [];
      _.each(gallery.postsArr, function(post){
        var str = post.markdown.toString()
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



  return ['$scope', 'DataService', '$sanitize', '$window', '$log', function($scope, DataService, $sanitize, $window, $log){
    var gallery = this
      , data = DataService.data(gallery);
    gallery.meta = $scope;

    formatPost(data);


//    if($window.Tester){
//      Tester(true).returnUseableString = function(rex, str, arr){
//        return returnUseableString(rex, str, arr);
//      }
//      Tester.wrapIntoRows = function(arr, num){
//        return wrapIntoRows(arr, num);
//      }
//      Tester.formatPost = function(data){
//        return formatPost(data);
//      }
//    }

    $scope.GalleryController = this;
    return $scope.CompanyController ;
  }];
});



define([
    'lodash'
  , 'galS/data.service'
  , 'galS/lightbox.service'
  , 'comS/private.tester'
  ]  , function(_){
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
        final.id  = returnUseableString(id, str, idArr);
        final.classes = post.tagClasses;

        if(final.img && final.alt){
          imgArr.push(final);
        }
      });
      gallery.rows = wrapIntoRows(imgArr);
      gallery.imgArr = imgArr;
    });
  }



  return [
      '$scope'
    , '$window'
    , '$log'
    , 'DataService'
    , 'LightboxService'
    , function(
        $scope
      , $window
      , $log
      , DataService
      , LightboxService
      ){
    var gallery = this
      , data;
    gallery.meta = $scope;


    (function getPostData(){
      if(DataService.counter < 1){
        data = DataService.data(gallery);
        DataService.formatPosts(data, gallery).
        then(function(data){
            DataService.route(data);
        });


      }
    })();


    gallery.clicked = function(obj){

      LightboxService.launchLightbox(obj);
    }



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



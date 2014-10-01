define([
    'lodash'
  , 'jquery'
  , 'esapi'
  , 'transform'
], function(_, _$, esapi){
  
  var obj = function(){
    return {
      esapi : function(){
        return esapi;
      }()
    };

  }();
  //console.log (obj);
  
  var derp = function(){
    return {
      esapi : function(){
        return esapi;
      }()
    };
  }();

  //console.log (derp);

//  console.log (derp.test === obj.test);
//

  return ['$http','$q', '$log' ,function($http, $q, $log){



//    var img = /'img':'[\/(\w)(\_\-)']*(\.png)'/ig;
//    var str = derp.toString()
//    var result = img.exec(str)
//    var substr = result[0]
//    var path = substr.split(":")
//    path = path[1];
//    function transform(arr, container){
//      var img = /'img':'[\/(\w)(\_\-)']*(\.png)'/ig;
//
//      _.each(arr, function(i){
//        var md = i.markdown;
//        var result = img.test(md);
//
//        if(result){
//          var src = imgSrc.test(md);
//        }
//
//      })
//      return container;
//    }



    this.data = function(obj){
        return $http.get("/nerd/content/images/2014/Sep/data.json").
        then(function(response){

          if(typeof response=== 'object' && response instanceof Object) {

            var data = response.data.db[0].data;
            obj.postsArr      = data.posts;
            obj.tagsArr       = data.tags;
            obj.posts_tagsArr = data.posts_tags;

            return obj;
          } else {

            $log.error('fail');
            return $q.reject (response);
          }
        }, function(){
            $log.error ('error');
            return $q.reject(response);
        });
    };

    this.list = function(list){
      return $http.get("/nerd/rss")
        .then(function(response){
          if(typeof response === 'object' && response instanceof Object){
            var data = _$.xml2json(response.data);
            list.listData  = data;
            return data;
          } else{
            $log.error('fail');
            return $q.reject (response.data);
          }
        }, function(response){
          $log.error ('error');
          return $q.reject(response.data);
        })
    }
  }]
});







////
//var img = /'img':'[\/(\w)(\_\-)']*(\.png)'/ig;
//var str = derp.toString()
//var result = img.exec(str)
//var substr = result[0]
//var path = substr.split(":")
//path = path[1];
//function transform(arr, container){
//  var img = /'img':'[\/(\w)(\_\-)']*(\.png)'/ig;
//
//  _.each(arr, function(i){
//    var md = i.markdown;
//    var result = img.test(md);
//
//    if(result){
//      var src = imgSrc.test(md);
//    }
//
//  })
//  return container;
//}
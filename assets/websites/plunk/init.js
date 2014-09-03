define([
    'jquery'
  , 'utility'
  ], function(jquery, utility){
  "use strict";
    var $ = jquery
    , log = utility.log;
    
    $(document).ready(function(){
      $("#log").append("yo yo you");
      log("dude");
      // $("#angles").attr("ng-controller", "Test");
    });
  
});


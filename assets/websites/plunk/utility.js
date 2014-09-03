define([
    'jquery'
  ], function(jquery){
  "use strict";
  var $ = jquery;

  function Utility(){
    this.log = function(message, elem){
      var ret;
      if(elem){ 
        $(elem).append('<br />' + message);
      } else {
        $('#log').append('<br />' + message);
      }
      
      return(elem) ? $(elem).text() : $('#log').text();
    }
  }
  return new Utility();  
});


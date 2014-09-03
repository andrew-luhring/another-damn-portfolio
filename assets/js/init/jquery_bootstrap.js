define([
    'jquery'
  , 'com/utility'
], function($, utility){
  "use strict";

  var animateVisibility = utility.animateVisibility
    , keysVals = utility.keysVals
    , log = utility.log
    , logDom = utility.logDom
    , testDiv = utility.testDiv
    , silent = true;

  /**
   *
   * @param {selector} - if it is not a jquery element, it becomes one and can be accessed via the obj property.
   * @constructor
   */
  function JqInit(sel){
    var $id = (sel instanceof $) ? sel : $(sel);
    this.obj = $id;
    return this;
  }
  function initiateDom($){
    $(".no-js").removeClass("no-js");
    $(".gallery-caption").addClass("hidden");
  }
  /**
   * reduces font-size if text is too large.
   * @param elem
   * @param characterLimit
   */
  JqInit.prototype.dynamicText = function(characterLimit, subtractPerChar){
    var $elem = this.obj
        , rex = /\d*/g
        , amount = subtractPerChar || 0.25
        , currentSize = $elem.css('font-size')
        , text = $elem.text()
        , limit = (characterLimit) ? characterLimit : false
        , result = currentSize - amount;

//    currentSize = currentSize.match(rex)[0];

    // this would be useful for autodetermining how much to subtract.
    // later.
    function averageLength(elem){
      var arrLength = elem.length
      , charLength = elem.text().length
      , avg = charLength / arrLength;
      return Math.floor(avg);
    }

    var averageNumberOfCharacters = averageLength(this.obj);

    for(var i = 0; i < $elem.length; i++ ){
      if($elem.eq(i).text().length > characterLimit){
        var $thing = $elem.eq(i)
        , txt = $thing.text()
        , len = txt.length
        , overflow =  len - characterLimit
        , reduceBy = overflow * amount;
         result = currentSize - reduceBy;
        $thing.css('font-size', result + "px");
      }
    }

    

    return result;

  };


  $(document).ready(function(){
    initiateDom($);
  });

  /**
   * returns an instance of JqInit that protects itself from having prototypes appended to it.
   * @example var example = JqInit("#exaple", )
   */
  return function(id){
    return new JqInit(id);
  };
});
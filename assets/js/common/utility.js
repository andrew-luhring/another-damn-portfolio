/*jshint expr: true*/
// TODO

define (['jquery'], function (jquery) {
  "use strict";

  function Utility(){
    var derp = "4";
// todo: refactor this if else to a switch.
    /**
     * returns a call to the function passed to it or returns a log of the action passed to it.
     * @private
     *  @desc this is a long unnecessary version of "execute a callback if it exists, log a string or return fail if it's supposed to fail"
     * @param action { function | string }
     * @param fail
     * @returns {*}
     */
    function finished(action, fail){
      if(action && typeof action === 'function'){
        if(typeof fail === 'object'){
          return {
            action : (function(){
              action();
            })()
            ,   obj : fail
          };
        } else {
          action();
          return true;
        }
      } else if(action && typeof action === "string") {
        return action;
      }else if(typeof action === 'undefined'){
        if(typeof fail === 'object'){
          return fail;
        } else{
          return true;
        }
      } else {
        if(fail && typeof fail === "boolean"){
          console.warn(action);
          return fail;
        } else {
          throw "your action failed AND you passed a " + typeof fail + " rather than a boolean; \nstep your game up.";
        }
      }
    }
  }

  /**
   *
   * @param {string} -  id - id of actual div
   * @param {}  - shouldReturnActualDiv -
   * @returns {*}
   */
  Utility.prototype.testDiv = function newDiv(id, shouldReturnActualDiv){
    if(!window || !document.body){ return Utility.Exception("windowError", "this isn't being called in the context of a browser");}
    var createDiv = document.createElement('div')
      , body= document.body
      , _testDiv;

    createDiv.id = id;
    _testDiv = body.appendChild(createDiv);

    if(!shouldReturnActualDiv){
      return _testDiv.id;
    } else {
      return _testDiv;
    }
  };

  /**
     * will log to console by default. will log to object created from string if one is passed. will silently 'log' if silent is true.
     * @param {string} - thingToLog - message to log
     * @param {boolean} - silent - (mode) if silent is true, don't log
     * @param isError
     */
  Utility.prototype.log = function log(thingToLog, silent, isError){
    if(isError === true){
      console.warn(thingToLog);
    } else {
      if(!silent || silent === false){
        // this is a function to generate console.log  for
        // tests dynamically.
        console.log( thingToLog );
      }
    }
    return "logged";
  };

  /**
   *  will log to a dynamically inserted dom element by default.
   * @param isError   -   { boolean }
   * @param thingToLog    -   {string}
   * @param logToDomObj   -   { string }
   * @returns {Array}
   */
  Utility.prototype.logDom = function(thingToLog, logToDomObj, isError){

    if(typeof thingToLog !== 'string'){ return Utility.Exception('typeError', 'thingToLog is not a string!');}
    if(typeof logToDomObj !== 'string' && typeof logToDomObj !== 'object'){ return Utility.Exception('typeError', 'logToDomObj is neither a string, nor an object!');}
    if(typeof isError && typeof isError !== 'boolean'){ return Utility.Exception('typeError', 'isError exists but is not a boolean!');}

    var logged = []
      ,      selector = (logToDomObj instanceof jquery) ? logToDomObj.selector : "#"+logToDomObj
      ,      id = '#' + Utility.testDiv(logToDomObj);
    // checks to make sure it's been inserted into dom correctly by making sure the text is the same as
    // thingToLog text and that the id returned by testDiv is the same as the one passed to it.
    $(id).text(thingToLog);
    logged.push(($(selector).text() === thingToLog) ? true : false);

    if(isError === true){
      $(id).addClass("error");
      logged.push(($(selector).hasClass("error") === true) ? true : false);
    }
    return logged;
  };

  /**
   * isStringBoolean
   * @param str
   * @returns {*}
   */
  Utility.prototype.isStringBoolean = function(str) {
    if (str === "true") {
      return true;
    } else if (str === "false") {
      return false;
    } else if (typeof str === 'boolean') {
      return str;
    } else {
      alert("what");
      throw new Error("not string true or false: " + str);
    }
  };

  return Utility;
});
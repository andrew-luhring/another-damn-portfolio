define([
  'lodash'
], function(_){

  var arr = [
    'thing'
  , 'another thing'
  ]
  function DataService() {
//    this.generateObjects = generateObjects;
//    this.dataObject = DataObject;
//    this.validateParamsLength = validateParamsLength;
//    this.validateImageUrl = validateImageUrl;
//    this.validateImageProperties = validateImageProperties;
  }

  DataService.prototype.list = function(){
    /* note:
     notice that I'm calling the private version of generateObjects
     rather than the function assigned to the DataService Object.
     this is intentional.*/
    return arr;
  };

  return DataService;
});
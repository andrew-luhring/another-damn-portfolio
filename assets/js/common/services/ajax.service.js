define(['lodash'],
  function(_){
    "use strict";

    return [
      '$log', '$q', function($log, $q){
        /**
         * takes response object, checks that it is valid, logs and rejects if invalid.
         * @param _resp
         * @returns {{isValidResponse: isValidResponse}}
         * @constructor
         */
        function AjaxService(_resp){
          var resp = _resp;
          return {
            isValidResponse : function(){
              if(typeof resp === 'object' && resp instanceof Object) {
                if(_.has(resp, 'status')){
                  if(resp.status === 200){
                    return true;
                  } else {
                    $log.warn('bad status');
                    $log.warn(resp.status);
                  }
                } else {
                  $log.warn('no status.');
                  $log.error(resp);
                }
                return $q.reject (resp);
              } else {
                $log.error('bad response- response is either not an object or null:');
                $log.error(resp);
                return $q.reject (resp);
              }
            }
          };
        }
        return AjaxService;
      }
    ];
  });

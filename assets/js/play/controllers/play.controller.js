define([], function() {
  "use strict";
  return ['$scope', '$rootScope', '$animate' , function($scope, $rootScope, $animate) {
    var play = this;
    play.modeVal = false;
    play.mode = 'disengaged';
    play.toggleMode = function(){
      if(play.action === 'flipMode'){
        flipMode();
      } else if (play.action === 'gameMode'){
        gameMode();
      }
    }

    function toggleSwitch(){
      play.modeVal = !play.modeVal;
      play.mode = (play.modeVal) ? 'engaged': 'disengaged';
    }

    function flipMode(){
      toggleSwitch();
      if(play.modeVal === true){
        $rootScope.theme = true;
      } else {;
        $rootScope.theme = false;
      }
    };

    function gameMode(){
      toggleSwitch();
      alert('fight')
    }

  }];
});

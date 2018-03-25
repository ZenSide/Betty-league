betty2App.factory('BtLoading', function($rootScope) {
  var service = {
    startLoad : function(nocon){
      nocon ? $rootScope.btLoadingNoCon = true : $rootScope.btLoading = true;
      service.disableButtons();
    },
    endLoad : function(nocon){
      nocon ? $rootScope.btLoadingNoCon = false : $rootScope.btLoading = false;
      service.enableButtons();
    },
    disableButtons : function(btClassesString){
      if (!btClassesString){
        var buttons = document.getElementsByClassName("bt-btn")
      }
      else {
        var buttons = document.getElementsByClassName("bt-btn "+btClassesString+" ")
      }
      len = buttons !== null ? buttons.length : 0,
        i = 0;
      for(i; i < len; i++) {
        buttons[i].disabled = true;
      }
    },
    enableButtons : function(btClassesString){
      if (!btClassesString){
        var buttons = document.getElementsByClassName("bt-btn")
      }
      else {
        var buttons = document.getElementsByClassName("bt-btn "+btClassesString+" ")
      }
      len = buttons !== null ? buttons.length : 0,
        i = 0;
      for(i; i < len; i++) {
        buttons[i].disabled = false;
      }
    }
  };
  return service;
})
betty2App.factory('BtLoading', function($rootScope) {
  var service = {
    startLoad : function(){
      $rootScope.btLoading = true;
    },
    endLoad : function(){
      $rootScope.btLoading = false;
    }
  };
  return service;
})
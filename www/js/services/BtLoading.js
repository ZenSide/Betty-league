betty2App.factory('BtLoading', ['$rootScope', function($rootScope) {
  var service = {
    startLoad : function(){
      $rootScope.btLoading = true;
    },
    endLoad : function(){
      $rootScope.btLoading = false;
    }
  };
  return service;
}])
betty2App.factory('BtLoading', ['$rootScope', '$timeout', function($rootScope, $timeout) {
  var service = {
    inload: false,
    startLoad : function(){
      this.inload = true;
      $rootScope.btLoadingPhantom = true;
      $timeout(function () {
        if (service.inload) {
          $rootScope.btLoading = true;
        }
      }, 350);
    },
    endLoad : function(){
      this.inload = false;
      $rootScope.btLoading = false;
      $rootScope.btLoadingPhantom = false;
    }
  };
  return service;
}])
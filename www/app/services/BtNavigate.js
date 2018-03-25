betty2App.factory('BtNavigate', function($state,$rootScope,$timeout) {
  var service = {
    stateChange : function(animClass,route){
      console.log(animClass,route);
      $rootScope.viewAnimClass = animClass;
      $timeout(function(){
        $state.go(route);
      })
    }
  };
  return service;
})

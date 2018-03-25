'use strict';
betty2App.directive('btFocus', function($ionicScrollDelegate) {
  return {
    restrict: 'A',
    link: function($scope,elem,attrs) {
      elem.bind('keydown', function(e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
          var previousOrder = attrs.btSelectOrder;
          var nextOrder = parseInt(previousOrder, 10) + 1;
          var nextEt = document.getElementById("inputOrder"+nextOrder);
          if(nextEt){
            e.preventDefault();
            nextEt.focus();
          }
        }
      });
    }
  }
});

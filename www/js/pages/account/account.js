betty2App.controller('AccountCtrl', ['$scope', 'animation', 'BtLoading', 'BtNavigate', function ($scope, animation, BtLoading, BtNavigate) {
	BtLoading.endLoad();


  var accountCtrl = this;




  $scope.parentCtrl.activeHeaderBtns = [false, false, false, false, true];

  var footerStatus = {};
  footerStatus.leftBt = {
    btShow : false,
  };
  footerStatus.middleBt = {
    btShow : false
  };
  footerStatus.rightBt = {
    btShow : false
  };


  accountCtrl.changePswd = function () {
    BtNavigate.stateChange('goLeft', 'changepassword', {
      'animDirection': 'right'
    });
  }


  animation.promise.then(function () {
    $scope.parentCtrl.withHeadLogo = false;
    $scope.parentCtrl.footerStatus = footerStatus;
  });
}]);

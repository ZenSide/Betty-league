betty2App.controller('AccountCtrl', ['$scope', 'animation', 'BtLoading', function ($scope, animation, BtLoading) {
	BtLoading.endLoad();
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

  animation.promise.then(function () {
    $scope.parentCtrl.withHeadLogo = false;
    $scope.parentCtrl.footerStatus = footerStatus;
  });
}]);

betty2App.controller('AccountCtrl', function ($scope, BtLoading) {
	BtLoading.endLoad();
	$scope.parentCtrl.activeHeaderBtns = [false, false, false, false, true];
});
betty2App.controller('AccountCtrl', ['$scope', 'BtLoading', function ($scope, BtLoading) {
	BtLoading.endLoad();
	$scope.parentCtrl.activeHeaderBtns = [false, false, false, false, true];
}]);
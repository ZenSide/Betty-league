betty2App.controller('ShowdownCtrl', function ($scope, $stateParams, showdown) {
	var showdownCtrl = this;
	$scope.showdownId = $stateParams.showdownId;

	showdownCtrl.showdown = showdown;

});
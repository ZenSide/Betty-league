betty2App.controller('PrivateLeaguesCtrl', function (BtNavigate, $scope, BtLoading, animation) {
	var privateLeaguesCtrl = this;
	BtLoading.endLoad();

	privateLeaguesCtrl.newLeague = function () {
		BtNavigate.stateChange('goRight' ,'createleague', {
			'animDirection' : '3left'
		});
	}


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

	$scope.parentCtrl.activeHeaderBtns = [false, false, true, false];

	animation.promise.then(function () {
		console.log('HOP HOP HOP');
		$scope.parentCtrl.withHeadLogo = false;
		$scope.parentCtrl.footerStatus = footerStatus;
	});
});
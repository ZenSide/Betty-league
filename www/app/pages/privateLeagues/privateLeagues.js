betty2App.controller('PrivateLeaguesCtrl', function (ShowdownApi, BtMessages, myBettyLeagues, BtNavigate, $scope, BtLoading, animation) {
	var privateLeaguesCtrl = this;
	BtLoading.endLoad();

	privateLeaguesCtrl.newLeague = function () {
		BtNavigate.stateChange('goRight' ,'createleague', {
			'animDirection' : '3left'
		});
	};

	privateLeaguesCtrl.joinNewLeague = function () {
		BtNavigate.stateChange('goRight' ,'joinleague', {
			'animDirection' : '3left'
		});
	};

	privateLeaguesCtrl.joinBettyLeague = function (bettyleagueId) {
		BtLoading.startLoad();
		ShowdownApi.getNextOpenShowDown(bettyleagueId, function (showdown) {
			BtNavigate.stateChange('goTop' ,'bettyleague.showdown.step0', {
				'bettyLeagueId' : bettyleagueId,
				'showdownId' : showdown.id,
				'animDirection' : 'fade'
			});
		}, function (messages) {
			BtMessages.show(messages, null, function () {
				BtLoading.endLoad();
			})
		}, true);
	};

	privateLeaguesCtrl.copysuccess = function () {
		BtMessages.show([
			{
				'context':'success',
				'content':'MESSAGES.COPYSUCCESS',
			},

		])
	};

	privateLeaguesCtrl.myBettyLeagues = myBettyLeagues;

	console.log(myBettyLeagues);

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
		$scope.parentCtrl.withHeadLogo = false;
		$scope.parentCtrl.footerStatus = footerStatus;
	});
});
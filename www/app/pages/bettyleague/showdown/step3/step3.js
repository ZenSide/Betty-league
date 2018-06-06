betty2App.controller('Step3Ctrl', function (BetApi, BtMessages, translations, $scope, $stateParams, BtNavigate, BtLoading, animation) {
	var step3Ctrl = this;
	BtLoading.endLoad();

	var checkForm = function () {
		var withPenalty = $scope.showdownCtrl.showdown.smFixture.withPenalty;
		var betHomeScore = $scope.showdownCtrl.newBet.homeScore;
		var betAwayScore = $scope.showdownCtrl.newBet.awayScore;
		var betWinner = $scope.showdownCtrl.newBet.winner;
		var aggregateVisitorScore = $scope.showdownCtrl.showdown.smFixture.aggregateVisitorteamScore;
		var aggregateLocalScore = $scope.showdownCtrl.showdown.smFixture.aggregateLocalteamScore;

		if (betAwayScore === null) {
			BtMessages.show([{content:"SHOWDOWN.BET_FORM.EMPTY_SCORE",context:"alert"}]);
			return;
		}

		if (betWinner === null) {
			BtMessages.show([{content:"SHOWDOWN.BET_FORM.EMPTY_WINNER",context:"alert"}]);
			return;
		}

		BtLoading.startLoad();
		BetApi.createBet($scope.showdownCtrl.newBet, function () {
			BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step0', {
				'bettyLeagueId' : $stateParams.bettyLeagueId,
				'showdownId' : $stateParams.showdownId,
				'animDirection' : '3left'
			}, true);
		}, function () {
			BtLoading.endLoad();
		});
	};

	var withHeadLogo = false;
	var footerStatus = {};

	$scope.bettyLeagueCtrl.activeStream = false;

	footerStatus.leftBt = {
		btShow : true,
		btPosition: "left",
		btClasses: "bt-action--medium",
		btButtonClasses: "bt-action__btn--blue",
		btIco : "fas fa-arrow-left",
		btLabel:translations['LOGIN.FOOTER.MDP'],
		btDisabled: false,
		btSubmitForm: null,
		action:function(){
			$scope.showdownCtrl.newBet.awayScore = null;
			BtNavigate.stateChange('goLeft' ,'bettyleague.showdown.step2', {
				'bettyLeagueId' : $stateParams.bettyLeagueId,
				'showdownId' : $stateParams.showdownId,
				'animDirection' : '3right'
			});
		}
	};
	footerStatus.middleBt = {
		btShow : false
	};
	footerStatus.rightBt = {
		btShow : true,
		btPosition: "right",
		btClasses: "animated infinite pulse bt-action--medium",
		btButtonClasses: "bt-action__btn--gold",
		btIco : "fas fa-check",
		btLabel:translations['LOGIN.FOOTER.MDP'],
		btDisabled: false,
		btSubmitForm: null,
		action:function(){
			checkForm();
		}
	};

	animation.promise.then(function () {
		$scope.parentCtrl.withHeadLogo = withHeadLogo;
		$scope.parentCtrl.footerStatus = footerStatus;
	});
});
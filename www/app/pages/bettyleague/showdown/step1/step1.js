betty2App.controller('Step1Ctrl', function (BtMessages, translations, $scope, $stateParams, BtNavigate, BtLoading, animation) {
	var step1Ctrl = this;
	BtLoading.endLoad();
	step1Ctrl.stepId = $stateParams.stepId;

	var checkForm = function () {
		var withPenalty = $scope.showdownCtrl.showdown.smFixture.withPenalty;
		var betHomeScore = $scope.showdownCtrl.newBet.homeScore;
		var betAwayScore = $scope.showdownCtrl.newBet.awayScore;
		var aggregateVisitorScore = $scope.showdownCtrl.showdown.smFixture.aggregateVisitorteamScore;
		var aggregateLocalScore = $scope.showdownCtrl.showdown.smFixture.aggregateLocalteamScore;

		if (betHomeScore === null) {
			BtMessages.show([{content:"SHOWDOWN.BET_FORM.EMPTY_SCORE",context:"alert"}])
			return;
		}
		BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step2', {
			'bettyLeagueId' : $stateParams.bettyLeagueId,
			'showdownId' : $stateParams.showdownId,
			'animDirection' : '3left'
		});
	}

	var withHeadLogo = false;
	var footerStatus = {};

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
			$scope.showdownCtrl.newBet.homeScore = null;
			BtNavigate.stateChange('goLeft' ,'bettyleague.showdown.step0', {
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
		btClasses: "bt-action--big",
		btButtonClasses: "bt-action__btn--gold",
		btIco : "fas fa-arrow-right",
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
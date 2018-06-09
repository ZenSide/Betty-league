betty2App.controller('Step3Ctrl', ['BetApi', 'BtMessages', 'translations', '$scope', '$stateParams', 'BtNavigate', 'BtLoading', 'animation',
	function (BetApi, BtMessages, translations, $scope, $stateParams, BtNavigate, BtLoading, animation) {
	var step3Ctrl = this;
	BtLoading.endLoad();

	$scope.showdownCtrl.swipeLeft = function () {
	};

	$scope.showdownCtrl.swipeRight = function () {
		BtLoading.startLoad();
		$scope.showdownCtrl.newBet.awayScore = null;
		BtNavigate.stateChange('goLeft' ,'bettyleague.showdown.step2', {
			'bettyLeagueId' : $stateParams.bettyLeagueId,
			'showdownId' : $stateParams.showdownId,
			'animDirection' : '3right'
		});
	};


	var checkForm = function () {
		var betAwayScore = $scope.showdownCtrl.newBet.awayScore;
		var betWinner = $scope.showdownCtrl.newBet.winner;

		if (betAwayScore === null) {
			BtMessages.show([{content:"SHOWDOWN.BET_FORM.EMPTY_SCORE",context:"alert"}]);
			BtLoading.endLoad();
			return;
		}

		if (betWinner === null) {
			BtMessages.show([{content:"SHOWDOWN.BET_FORM.EMPTY_WINNER",context:"alert"}]);
			BtLoading.endLoad();
			return;
		}

		BetApi.createBet($scope.showdownCtrl.newBet, function () {
			BtNavigate.stateChange('fade' ,'bettyleague.showdown.step0', {
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
			BtLoading.startLoad();
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
			BtLoading.startLoad();
			checkForm();
		}
	};

	animation.promise.then(function () {
		$scope.parentCtrl.withHeadLogo = withHeadLogo;
		$scope.parentCtrl.footerStatus = footerStatus;
	});
}]);
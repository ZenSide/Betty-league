betty2App.controller('Step1Ctrl', ['BtMessages' ,'translations' ,'$scope' ,'$stateParams' ,'BtNavigate' ,'BtLoading' ,'animation',
	function (BtMessages, translations, $scope, $stateParams, BtNavigate, BtLoading, animation) {
	var step1Ctrl = this;
	BtLoading.endLoad();

	var checkForm = function () {
		var betHomeScore = $scope.showdownCtrl.newBet.homeScore;

		if (betHomeScore === null) {
			BtMessages.show([{content:"SHOWDOWN.BET_FORM.EMPTY_SCORE",context:"alert"}])
			BtLoading.endLoad();
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

	$scope.showdownCtrl.swipeLeft = function () {
	};

	$scope.showdownCtrl.swipeRight = function () {
		BtLoading.startLoad();
		$scope.showdownCtrl.newBet.homeScore = null;
		BtNavigate.stateChange('fade' ,'bettyleague.showdown.step0', {
			'bettyLeagueId' : $stateParams.bettyLeagueId,
			'showdownId' : $stateParams.showdownId,
			'animDirection' : '3right'
		});
	};

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
			$scope.showdownCtrl.newBet.homeScore = null;
			BtNavigate.stateChange('fade' ,'bettyleague.showdown.step0', {
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
		btClasses: "bt-action--medium",
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

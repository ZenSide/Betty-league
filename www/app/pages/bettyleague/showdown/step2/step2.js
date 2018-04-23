betty2App.controller('Step2Ctrl', function (BtMessages, translations, $scope, $stateParams, BtNavigate, BtLoading, animation) {
	var step2Ctrl = this;
	BtLoading.endLoad();
	step2Ctrl.stepId = $stateParams.stepId;

	var checkForm = function () {
		var withPenalty = $scope.showdownCtrl.showdown.smFixture.withPenalty;
		var betHomeScore = $scope.showdownCtrl.newBet.homeScore;
		var betAwayScore = $scope.showdownCtrl.newBet.awayScore;
		var aggregateVisitorScore = $scope.showdownCtrl.showdown.smFixture.aggregateVisitorteamScore;
		var aggregateLocalScore = $scope.showdownCtrl.showdown.smFixture.aggregateLocalteamScore;

		if (betAwayScore === null) {
			BtMessages.show([{content:"SHOWDOWN.BET_FORM.EMPTY_SCORE",context:"alert"}])
			return;
		}
		//matchs avec penalty
		if (withPenalty) {
			console.log('penalty');

			//cas des matchs retour
			console.log('match retour');
			if ($scope.showdownCtrl.showdown.smFixture.matchRetour) {

				//if score du cumul des deux matchs nuls GO STADE 3
				if ((aggregateVisitorScore + parseInt(betHomeScore)) == (aggregateLocalScore + parseInt(betAwayScore))) {

					//plus de buts à exterieur pour home Team
					if ((aggregateVisitorScore - parseInt(betHomeScore)) > (parseInt(betAwayScore) - aggregateLocalScore)) {
						console.log('home');
						$scope.showdownCtrl.newBet.winner = "home";
						//plus de buts à exterieur pour away Team
					} else if ((aggregateVisitorScore - parseInt(betHomeScore)) < (parseInt(betAwayScore) - aggregateLocalScore)) {
						console.log('away');
						$scope.showdownCtrl.newBet.winner = "away";
					} else {
						console.log('draw');
						BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step3', {
							'bettyLeagueId' : $stateParams.bettyLeagueId,
							'showdownId' : $stateParams.showdownId,
							'animDirection' : '3left'
						});
					}

					//winner home
				} else if ((aggregateVisitorScore + parseInt(betHomeScore)) > (aggregateLocalScore + parseInt(betAwayScore))) {
					console.log('home');
					$scope.showdownCtrl.newBet.winner = "home";
					//winner away
				} else if ((aggregateVisitorScore + parseInt(betHomeScore)) < (aggregateLocalScore + parseInt(betAwayScore))) {
					console.log('away');
					$scope.showdownCtrl.newBet.winner = "away";
				}

				//matchs avec penalty simples
			} else {
				//if score nul
				if (parseInt(betHomeScore) == parseInt(betAwayScore)) {
					console.log('draw');
					BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step3', {
						'bettyLeagueId' : $stateParams.bettyLeagueId,
						'showdownId' : $stateParams.showdownId,
						'animDirection' : '3left'
					});
					//winner home
				} else if (parseInt(betHomeScore) > parseInt(betAwayScore)) {
					console.log('home');
					$scope.showdownCtrl.newBet.winner = "home";
					//winner away
				} else if (parseInt(betHomeScore) < parseInt(betAwayScore)) {
					console.log('away');
					$scope.showdownCtrl.newBet.winner = "away";
				}
			}

		//matchs sans penalty
		} else {
			console.log('sans penalty');

			//draw
			if (parseInt(betHomeScore) == parseInt(betAwayScore)) {
				console.log('draw');
				$scope.showdownCtrl.newBet.winner = "draw";

				//winner home
			} else if (parseInt(betHomeScore) > parseInt(betAwayScore)) {
				console.log('home');
				$scope.showdownCtrl.newBet.winner = "home";

				//winner away
			} else if (parseInt(betHomeScore) < parseInt(betAwayScore)) {
				console.log('away');
				$scope.showdownCtrl.newBet.winner = "away";
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
		}
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
			$scope.showdownCtrl.newBet.awayScore = null;
			BtNavigate.stateChange('goLeft' ,'bettyleague.showdown.step1', {
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
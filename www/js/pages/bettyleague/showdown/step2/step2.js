betty2App.controller('Step2Ctrl', function (BetApi, BtMessages, translations, $scope, $stateParams, BtNavigate, BtLoading, animation) {
	var step2Ctrl = this;
	BtLoading.endLoad();

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

			//cas des matchs retour
			if ($scope.showdownCtrl.showdown.smFixture.matchRetour) {

				//if score du cumul des deux matchs nuls GO STADE 3
				if ((aggregateVisitorScore + parseInt(betHomeScore)) == (aggregateLocalScore + parseInt(betAwayScore))) {

					//plus de buts à exterieur pour home Team
					if ((aggregateVisitorScore - parseInt(betHomeScore)) > (parseInt(betAwayScore) - aggregateLocalScore)) {
						$scope.showdownCtrl.newBet.winner = "home";

					//plus de buts à exterieur pour away Team
					} else if ((aggregateVisitorScore - parseInt(betHomeScore)) < (parseInt(betAwayScore) - aggregateLocalScore)) {
						$scope.showdownCtrl.newBet.winner = "away";

					// vrai egalité
					} else {
						BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step3', {
							'bettyLeagueId' : $stateParams.bettyLeagueId,
							'showdownId' : $stateParams.showdownId,
							'animDirection' : '3left'
						});
						return;
					}

					//winner home
				} else if ((aggregateVisitorScore + parseInt(betHomeScore)) > (aggregateLocalScore + parseInt(betAwayScore))) {
					$scope.showdownCtrl.newBet.winner = "home";
					//winner away
				} else if ((aggregateVisitorScore + parseInt(betHomeScore)) < (aggregateLocalScore + parseInt(betAwayScore))) {
					$scope.showdownCtrl.newBet.winner = "away";
				}

				//matchs avec penalty simples
			} else {
				//if score nul
				if (parseInt(betHomeScore) == parseInt(betAwayScore)) {
					BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step3', {
						'bettyLeagueId' : $stateParams.bettyLeagueId,
						'showdownId' : $stateParams.showdownId,
						'animDirection' : '3left'
					});
					return;
					//winner home
				} else if (parseInt(betHomeScore) > parseInt(betAwayScore)) {
					$scope.showdownCtrl.newBet.winner = "home";
					//winner away
				} else if (parseInt(betHomeScore) < parseInt(betAwayScore)) {
					$scope.showdownCtrl.newBet.winner = "away";
				}
			}

		//matchs sans penalty
		} else {
			//draw
			if (parseInt(betHomeScore) == parseInt(betAwayScore)) {
				$scope.showdownCtrl.newBet.winner = "draw";

				//winner home
			} else if (parseInt(betHomeScore) > parseInt(betAwayScore)) {
				$scope.showdownCtrl.newBet.winner = "home";

				//winner away
			} else if (parseInt(betHomeScore) < parseInt(betAwayScore)) {
				$scope.showdownCtrl.newBet.winner = "away";
			}
		}

		BtLoading.startLoad();
		BetApi.createBet($scope.showdownCtrl.newBet, function () {
			BtNavigate.stateChange('fade' ,'bettyleague.showdown.step0', {
				'bettyLeagueId' : $stateParams.bettyLeagueId,
				'showdownId' : $stateParams.showdownId,
				'animDirection' : '3left'
			}, true);
		}, function (messages) {
			BtMessages.show(messages);
			BtLoading.endLoad();
		});
	};

	$scope.bettyLeagueCtrl.activeStream = false;

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
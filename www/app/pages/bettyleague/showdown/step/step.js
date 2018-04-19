betty2App.controller('StepCtrl', function (BtMessages, BetApi, $timeout, translations, ENV, previousShowDownId, nextShowDownId, $scope, $stateParams, BtNavigate, BtLoading, animation) {
	var stepCtrl = this;
	BtLoading.endLoad();
	stepCtrl.stepId = $stateParams.stepId;

	//status
	//postponed
	stepCtrl.sdStatus = function () {
		//postponed
		if ($scope.showdownCtrl.showdown.smFixture.sm__time__status === 'POSTP') {
			var startdate = new Date($scope.showdownCtrl.showdown.smFixture.sm__time__startingAt__dateTime);
			var now = new Date().getTime();
			var start = startdate.getTime();
			var distance = start - now;
			if (distance < 0) {
				return 'REPORTE';
			} else {
				return 'OPEN';
			}
		}
		return $scope.showdownCtrl.showdown.smFixture.showdownStatus;
	};

	stepCtrl.isShownEvent = function (eventType) {
		var okEventTypes = [
			'goal', 'penalty', 'own-goal', 'yellowred', 'redcard'
		];

		if (okEventTypes.indexOf(eventType) !== -1) {
			return true;
		}

		return false;
	};

	//checkForm
	var checkForm = function (step) {
		var withPenalty = $scope.showdownCtrl.showdown.smFixture.withPenalty;
		var betHomeScore = $scope.showdownCtrl.newBet.homeScore;
		var betAwayScore = $scope.showdownCtrl.newBet.awayScore;
		var aggregateVisitorScore = $scope.showdownCtrl.showdown.smFixture.aggregateVisitorteamScore;
		var aggregateLocalScore = $scope.showdownCtrl.showdown.smFixture.aggregateLocalteamScore;

		if (step == 1) {
			if (betHomeScore === null) {
				BtMessages.show([{content:"SHOWDOWN.BET_FORM.EMPTY_SCORE",context:"alert"}])
				return;
			}
			BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step', {
				'bettyLeagueId' : $stateParams.bettyLeagueId,
				'showdownId' : $stateParams.showdownId,
				'stepId' : '2',
				'animDirection' : '3left'
			});
		}
		if (step == 2) {
			console.log('step2');
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
							BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step', {
								'bettyLeagueId' : $stateParams.bettyLeagueId,
								'showdownId' : $stateParams.showdownId,
								'stepId' : '3',
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
						BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step', {
							'bettyLeagueId' : $stateParams.bettyLeagueId,
							'showdownId' : $stateParams.showdownId,
							'stepId' : '3',
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
			}


		}
	};

	var submit = function (submit) {

	};


	//parent config
	var withHeadLogo = false;
	var footerStatus = {};

	//step 0
	if (stepCtrl.stepId == 0) {
		// OPEN
		if (stepCtrl.sdStatus() === 'OPEN' && stepCtrl.stepId == 0) {
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
					BtNavigate.stateChange('goLeft' ,'bettyleague.showdown.step', {
						'bettyLeagueId' : $stateParams.bettyLeagueId,
						'showdownId' : previousShowDownId,
						'stepId' : '0',
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
				btIco : "icon-bty-ico-coin",
				btLabel:translations['SHOWDOWN.BET'],
				btDisabled: false,
				btSubmitForm: null,
				action:function(){
					BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step', {
						'bettyLeagueId' : $stateParams.bettyLeagueId,
						'showdownId' : $stateParams.showdownId,
						'stepId' : '1',
						'animDirection' : '3left'
					});
				}
			};
		} else {
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
					BtNavigate.stateChange('goLeft' ,'bettyleague.showdown.step', {
						'bettyLeagueId' : $stateParams.bettyLeagueId,
						'showdownId' : previousShowDownId,
						'stepId' : '0',
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
				btButtonClasses: "bt-action__btn--blue",
				btIco : "fas fa-arrow-right",
				btLabel:translations['LOGIN.FOOTER.SIGN'],
				btDisabled: false,
				btSubmitForm: null,
				action:function(){
					BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step', {
						'bettyLeagueId' : $stateParams.bettyLeagueId,
						'showdownId' : nextShowDownId,
						'stepId' : '0',
						'animDirection' : '3left'
					});
				}
			};
		};
	} else if (stepCtrl.stepId == 1) {
		//step 1
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
				BtNavigate.stateChange('goLeft' ,'bettyleague.showdown.step', {
					'bettyLeagueId' : $stateParams.bettyLeagueId,
					'showdownId' : $stateParams.showdownId,
					'stepId' : '0',
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
				checkForm(1);
			}
		};
	} else if (stepCtrl.stepId == 2) {
		//step 2
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
				BtNavigate.stateChange('goLeft' ,'bettyleague.showdown.step', {
					'bettyLeagueId' : $stateParams.bettyLeagueId,
					'showdownId' : $stateParams.showdownId,
					'stepId' : '1',
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
				checkForm(2);
			}
		};
	}

	animation.promise.then(function () {
		$scope.parentCtrl.withHeadLogo = withHeadLogo;
		$scope.parentCtrl.footerStatus = footerStatus;
	});
});
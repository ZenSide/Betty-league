betty2App.controller('RankingCtrl', function (BettyLeagueApi, UserApi, ranking, $timeout, $location, $ionicScrollDelegate, BetApi, ScoreOddApi, bettyLeague, ShowdownApi, BtMessages, translations, $scope, $stateParams, BtNavigate, BtLoading, animation) {
	var rankingCtrl = this;

	rankingCtrl.bettyLeague = bettyLeague;

	BtLoading.endLoad();

	if (rankingCtrl.bettyLeague.public) {
		$scope.parentCtrl.activeHeaderBtns = [false, false, true, false, false];
	} else {
		$scope.parentCtrl.activeHeaderBtns = [false, false, false, true, false];
	}


	//var scrollHandle = $ionicScrollDelegate.$getByHandle('btContentHandle');
	//
	//	rankingCtrl.scrollTo = function (anchor) {
	//		//$location.hash(anchor);
	//		//scrollHandle.anchorScroll();
	//		//$timeout(function () {
	//		//	scrollHandle.resize();
	//		//})
	//	};

	//rankingCtrl.scrollTo($stateParams.showdownId);



	rankingCtrl.ranking = ranking;


	var withHeadLogo = false;
	var footerStatus = {};

	rankingCtrl.user = UserApi.getUser();

	rankingCtrl.changePeriod = function (period) {
		BtLoading.startLoad();
		BettyLeagueApi.getRanking($stateParams.bettyLeagueId, {
			'period': period
		}, function (ranking) {
			rankingCtrl.ranking = ranking;
			BtLoading.endLoad();
		}, function (messages) {
			BtMessages.show(messages, null, function () {
				BtLoading.endLoad();
			})
		});
	}

	rankingCtrl.canIPrev = function (ranking, next) {
		switch (ranking.period) {
			case 'full_season':
				if (!next) {
					if (
						ranking.seasonNb == 1
					) {
						return false;
					}
					return true;
				} else {
					if (
						ranking.seasonNb == ranking.currentRoundNbs.seasonNb
					) {
						return false;
					}
					return true;
				}
				break;
			case 'half_season':
				if (!next) {
					if (
						(ranking.seasonNb == 1 && ranking.halfSeasonNb == 1)
					) {
						return false;
					}
					return true;
				} else {
					if (
						ranking.seasonNb == ranking.currentRoundNbs.seasonNb &&
						ranking.halfSeasonNb == ranking.currentRoundNbs.halfSeasonNb
					) {
						return false;
					}
					return true;
				}
				break;
			case 'for_rounds':
				if (!next) {
					if (
						ranking.seasonNb == 1 &&
						ranking.fourRoundsNb == 1
					) {
						return false;
					}
					return true;
				} else {
					if (
						ranking.seasonNb == ranking.currentRoundNbs.seasonNb &&
						ranking.fourRoundsNb == ranking.currentRoundNbs.fourRoundsNb
					) {
						return false;
					}
					return true;
				}
				break;
			case 'round':
				if (!next) {
					if (
						ranking.seasonNb == 1 &&
						ranking.roundNb == 1
					) {
						return false;
					}
					return true;
				} else {
					if (
						ranking.seasonNb == ranking.currentRoundNbs.seasonNb &&
						ranking.roundNb == ranking.currentRoundNbs.roundNb
					) {
						return false;
					}
					return true;
				}
				break;
				break;
		}
	};

	rankingCtrl.previousPeriod = function (ranking, next) {
		BtLoading.startLoad();

		var iteration = next ? 1 : -1;

		switch (ranking.period) {
			case 'full_season':
				var params = {
					'period': ranking.period,
					'seasonNb': parseInt(ranking.seasonNb) + iteration
				};
				break;
			case 'half_season':

				var halfSeasonNb = null;
				if (!next) {
					var halfSeasonNbTmp =  parseInt(ranking.halfSeasonNb) + iteration;
				} else {
					var halfSeasonNbTmp =  parseInt(ranking.halfSeasonNb);
				}

				var seasonNb =  parseInt(ranking.seasonNb);

				if (halfSeasonNbTmp % 2 == 0) {
					seasonNb = seasonNb + iteration;
					if (next) {
						halfSeasonNb = 1;
					} else {
						halfSeasonNb = 2;
					}
				}

				if (next && !halfSeasonNb) {
					halfSeasonNb =  halfSeasonNbTmp + iteration;
				} else if (!halfSeasonNb) {
					halfSeasonNb =  halfSeasonNbTmp;
				}

				var params = {
					'period': ranking.period,
					'seasonNb': seasonNb,
					'halfSeasonNb': halfSeasonNb
				};
				break;
			case 'for_rounds':
				//special cases
				var fourRoundsNb = null;
				if (!next) {
					var fourRoundsNbTmp =  parseInt(ranking.fourRoundsNb) + iteration;
				} else {
					var fourRoundsNbTmp =  parseInt(ranking.fourRoundsNb);
				}

				var seasonNb =  parseInt(ranking.seasonNb);

				if (fourRoundsNbTmp % 13 == 0) {
					seasonNb = seasonNb + iteration;
					if (next) {
						fourRoundsNb = 1;
					} else {
						fourRoundsNb = 13;
					}
				}

				if (next && !fourRoundsNb) {
					fourRoundsNb =  fourRoundsNbTmp + iteration;
				} else if (!fourRoundsNb) {
					fourRoundsNb =  fourRoundsNbTmp;
				}

				var params = {
					'period': ranking.period,
					'seasonNb': seasonNb,
					'fourRoundsNb': fourRoundsNb
				};
				break;
			case 'round':
				//special cases
				var roundNb = null;

				if (!next) {
					var roundNbTmp =  parseInt(ranking.roundNb) + iteration;
				} else {
					var roundNbTmp =  parseInt(ranking.roundNb);
				}

				var fourRoundsNb =  parseInt(ranking.fourRoundsNb);
				var halfSeasonNb =  parseInt(ranking.halfSeasonNb);
				var seasonNb =  parseInt(ranking.seasonNb);
				if (roundNbTmp % 4 == 0) {
					fourRoundsNb = fourRoundsNb + iteration;

				}
				if (roundNbTmp % 26 == 0) {
					halfSeasonNb = halfSeasonNb + iteration;
				}
				if (roundNbTmp % 52 == 0) {
					seasonNb = seasonNb + iteration;
					if (next) {
						roundNb = 1;
						halfSeasonNb = 1;
						fourRoundsNb = 1;

					} else {
						roundNb = 52;
						halfSeasonNb = 2;
						fourRoundsNb = 13;
					}
				}

				if (next && !roundNb) {
					roundNb =  roundNbTmp + iteration;
				} else if (!roundNb) {
					roundNb =  roundNbTmp;
				}

				var params = {
					'period': ranking.period,
					'seasonNb': seasonNb,
					'halfSeasonNb': halfSeasonNb,
					'fourRoundsNb': fourRoundsNb,
					'roundNb': roundNb
				};
				break;
		}

		BettyLeagueApi.getRanking($stateParams.bettyLeagueId, params, function (ranking) {
			rankingCtrl.ranking = ranking;
			BtLoading.endLoad();
		}, function (messages) {
			BtMessages.show(messages, null, function () {
				BtLoading.endLoad();
			})
		});
	};

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
			BtNavigate.stateChange('goBottom' ,'bettyleague.showdown.step0', {
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
		btShow : false
	};

	animation.promise.then(function () {
		$scope.parentCtrl.withHeadLogo = withHeadLogo;
		$scope.parentCtrl.footerStatus = footerStatus;
	});
});
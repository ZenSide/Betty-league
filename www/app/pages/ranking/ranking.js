betty2App.controller('RankingCtrl', function (BettyLeagueApi, UserApi, ranking, $timeout, $location, $ionicScrollDelegate, BetApi, ScoreOddApi, bettyLeague, ShowdownApi, BtMessages, translations, $scope, $stateParams, BtNavigate, BtLoading, animation) {
	var rankingCtrl = this;

	rankingCtrl.bettyLeague = bettyLeague;

	BtLoading.endLoad();

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
				var params = {
					'period': ranking.period,
					'seasonNb': ranking.seasonNb,
					'halfSeasonNb': parseInt(ranking.halfSeasonNb) + iteration
				};
				break;
			case 'for_rounds':
				var params = {
					'period': ranking.period,
					'seasonNb': ranking.seasonNb,
					'halfSeasonNb': ranking.halfSeasonNb,
					'fourRoundsNb': parseInt(ranking.fourRoundsNb) + iteration
				};
				break;
			case 'round':
				var params = {
					'period': ranking.period,
					'seasonNb': ranking.seasonNb,
					'halfSeasonNb': ranking.halfSeasonNb,
					'fourRoundsNb': ranking.fourRoundsNb,
					'roundNb': parseInt(ranking.roundNb) + iteration
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

	console.log(rankingCtrl.user);

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
		btShow : false
	};

	animation.promise.then(function () {
		$scope.parentCtrl.withHeadLogo = withHeadLogo;
		$scope.parentCtrl.footerStatus = footerStatus;
	});
});
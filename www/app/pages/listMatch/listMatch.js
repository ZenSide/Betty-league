betty2App.controller('ListMatchCtrl', function ($timeout, $location, $ionicScrollDelegate, bets, BetApi, ScoreOddApi, bettyLeague, showdowns, ShowdownApi, BtMessages, translations, $scope, $stateParams, BtNavigate, BtLoading, animation) {
	var listMatchCtrl = this;

	listMatchCtrl.bettyLeague = bettyLeague;

	listMatchCtrl.initialRange = true;


	$timeout(function () {
		listMatchCtrl.showdowns = showdowns;
	});

	BtLoading.endLoad();
	console.log(showdowns);

	var scrollHandle = $ionicScrollDelegate.$getByHandle('btContentHandle');

		listMatchCtrl.scrollTo = function (anchor) {
			$location.hash(anchor);
			scrollHandle.anchorScroll();
			$timeout(function () {
				scrollHandle.resize();
			})
		};

	listMatchCtrl.scrollTo($stateParams.showdownId);

	listMatchCtrl.goShowdown = function (showdown) {
		BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step0', {
			'bettyLeagueId' : $stateParams.bettyLeagueId,
			'showdownId' : showdown.id,
			'animDirection' : 'left'
		});
	};

	listMatchCtrl.extendedStatus = function (showdown) {
		var bet = BetApi.getBetSync(bets, showdown.id);
		return ShowdownApi.getShowdownExtendedStatus(showdown, bet);
	};

	listMatchCtrl.getShowdownStatus = function (showdown) {
		return ShowdownApi.getShowdownStatus(showdown);
	};

	listMatchCtrl.classRow = function (showdown) {
		var bet = BetApi.getBetSync(bets, showdown.id);
		var classes = ShowdownApi.getShowdownExtendedStatus(showdown, bet);

		if (showdown.id == listMatchCtrl.openedTooltip) {
			return classes + ' active'
		}
		return classes;
	};

	listMatchCtrl.betCol = function (showdown) {
		var bet = BetApi.getBetSync(bets, showdown.id);

		var resumee = BetApi.getMyBetResumee(bet, showdown);

		if (!resumee) {
			return null;
		}

		var stringed = resumee.home + "-" + resumee.away;

		if (resumee.totalHome && resumee.totalAway) {
			stringed += "<br>("+resumee.totalHome + "-" + resumee.totalAway+")"
		}

		return stringed;
	};

	listMatchCtrl.betResume = function (showdown) {
		var bet = BetApi.getBetSync(bets, showdown.id);

		var resume = BetApi.getMyBetResume(showdown, bet, ShowdownApi.getShowdownStatus(showdown));
		console.log(resume);
		return resume;
	};

	listMatchCtrl.openedTooltip = null;

	listMatchCtrl.toggleTooltip = function (item, open) {
		if (open) {
			listMatchCtrl.openedTooltip = item.id;
		} else {
			listMatchCtrl.openedTooltip = null;
		}

		console.log(listMatchCtrl.openedTooltip);
	};

	listMatchCtrl.openOddDetail = function (showdown) {
		BtLoading.startLoad();
		ScoreOddApi.getShowdownDetail(showdown.id, function (data) {
			BetApi.getBet(listMatchCtrl.bettyLeague.id, showdown.id, function (bet) {
				console.log(bet);

				$scope.parentCtrl.detailCotesModalData = {
					'homeTeam' : showdown.smFixture.homeTeam,
					'awayTeam' : showdown.smFixture.awayTeam,
					'bet' : bet,
					'showdown' : showdown,
					'scoreOdds' : data,
					'aggregateVisitorScore' : showdown.smFixture.aggregateVisitorteamScore,
					'aggregateLocalScore' : showdown.smFixture.aggregateLocalteamScore
			};
				BtLoading.endLoad();
				$scope.parentCtrl.showDetailCotesModal = true;
			}, function (messages) {
				BtLoading.endLoad();
				BtMessages.show(messages);
			});

		}, function (messages) {
			BtLoading.endLoad();
			BtMessages.show(messages);
		});
	};

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
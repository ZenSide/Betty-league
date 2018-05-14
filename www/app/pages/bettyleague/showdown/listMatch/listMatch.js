betty2App.controller('ListMatchCtrl', function ($timeout, $location, $ionicScrollDelegate, bets, BetApi, ScoreOddApi, bettyLeague, showdowns, ShowdownApi, BetApi, BtMessages, translations, $scope, $stateParams, BtNavigate, BtLoading, animation) {
	var listMatchCtrl = this;

	listMatchCtrl.bettyLeague = bettyLeague;
	listMatchCtrl.showdowns = showdowns;

	listMatchCtrl.initialRange = true;



	BtLoading.endLoad();
	console.log(showdowns);

	listMatchCtrl.sdStatus = function (showdown) {
		//postponed
		if (showdown.smFixture.sm__time__status === 'POSTP') {
			var startdate = new Date(showdown.smFixture.sm__time__startingAt__dateTime);
			var now = new Date().getTime();
			var start = startdate.getTime();
			var distance = start - now;
			if (distance <= 0) {
				return 'REPORTE';
			} else {
				return 'OPEN';
			}
		}

		return showdown.smFixture.showdownStatus;
	};


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

	listMatchCtrl.classRow = function (showdown) {
		var status = listMatchCtrl.sdStatus(showdown);
		var classes = '';

		var bet = BetApi.getBetSync(bets, showdown.id);

		if (bet && status == 'OPEN') {
			classes += 'open-parie';
		} else if (status == 'OPEN') {
			classes += 'open-non-parie';

		} else if (status == 'CLOSED') {
			classes += 'closed';

		} else if (status == 'LOCKED') {
			classes += 'locked';
		} else if (status == 'REPORTE') {
			classes += 'reporte';
		}

		if (showdown.id == listMatchCtrl.openedTooltip) {
			return classes + ' active'
		}
		return classes;
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
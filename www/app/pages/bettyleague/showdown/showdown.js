betty2App.controller('ShowdownCtrl', function (BetApi, ShowdownApi, UserApi, BtLoading, ScoreOddApi, BtMessages, $scope, $stateParams, showdown, bet, previousShowDownId, nextShowDownId) {
	var showdownCtrl = this;
	showdownCtrl.showdownId = $stateParams.showdownId;
	$scope.bettyLeagueCtrl.showdownId = showdownCtrl.showdownId;
	showdownCtrl.showdown = showdown;
	showdownCtrl.bet = bet;

	showdownCtrl.newBet = {
		bettyLeagueId : $scope.bettyLeagueCtrl.bettyLeagueId,
		showdownId : showdownCtrl.showdownId,
		winner : null,
		homeScore: null,
		awayScore: null
	};

	showdownCtrl.previousShowDownId = previousShowDownId;
	showdownCtrl.nextShowDownId = nextShowDownId;

	showdownCtrl.logout = function () {
		UserApi.logout();
	};

	showdownCtrl.extendedStatus = function (showdown, bet) {
		return ShowdownApi.getShowdownExtendedStatus(showdown, bet);
	};

	showdownCtrl.betCol = function (showdown, bet) {
		showdown = showdown ? showdown : showdownCtrl.showdown;
		bet = bet ? bet : showdownCtrl.bet;

		var resumee = BetApi.getMyBetResumee(bet, showdown);
		console.log(resumee);
		console.log(showdown);
		console.log(bet);

		if (!resumee) {
			return null;
		}

		var stringed = resumee.home + "-" + resumee.away;

		if (resumee.totalHome && resumee.totalAway) {
			stringed += "<br>("+resumee.totalHome + "-" + resumee.totalAway+")"
		}

		return stringed;
	};
	
	var getbetResume = function (showdown, bet) {
		showdown = showdown ? showdown : showdownCtrl.showdown;
		bet = bet ? bet : showdownCtrl.bet;

		var resume = BetApi.getMyBetResume(showdown, bet, ShowdownApi.getShowdownStatus(showdown));
		return resume;
	};

	showdownCtrl.betResume = getbetResume();

	showdownCtrl.openOddDetail  = function () {
		BtLoading.startLoad();
		ScoreOddApi.getShowdownDetail(showdownCtrl.showdownId, function (data) {
			$scope.parentCtrl.detailCotesModalData = {
				'homeTeam' : showdownCtrl.showdown.smFixture.homeTeam,
				'awayTeam' : showdownCtrl.showdown.smFixture.awayTeam,
				'bet' : showdownCtrl.bet,
				'showdown' : showdownCtrl.showdown,
				'scoreOdds' : data,
			};
			BtLoading.endLoad();
			$scope.parentCtrl.showDetailCotesModal = true;


		}, function (messages) {
			BtLoading.endLoad();
			BtMessages.show(messages);
		});
	}

	//LISTEN STREAMING
	$scope.$on('sdStream', function (event, data) {
		ShowdownApi.getShowdown($stateParams.bettyLeagueId, $stateParams.showdownId, function (showdown) {
			showdownCtrl.showdown = showdown;
		}, function (messages) {
		});
	});

	$scope.$on('fullBetStream', function (event, data) {
		BetApi.getBet($stateParams.bettyLeagueId, $stateParams.showdownId, function (bet) {
			showdownCtrl.bet = bet;
			showdownCtrl.betResume = getbetResume();
		}, function (messages) {
		});
	});
});
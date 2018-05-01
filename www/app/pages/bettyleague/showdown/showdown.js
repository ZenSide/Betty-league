betty2App.controller('ShowdownCtrl', function (BtLoading, ScoreOddApi, BtMessages, $scope, $stateParams, showdown, bet, previousShowDownId, nextShowDownId) {
	var showdownCtrl = this;
	showdownCtrl.showdownId = $stateParams.showdownId;
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

	showdownCtrl.openOddDetail  = function () {
		BtLoading.startLoad();
		ScoreOddApi.getShowdownDetail(showdownCtrl.showdownId, function (data) {
			$scope.parentCtrl.detailCotesModalData = {
				'homeTeam' : showdownCtrl.showdown.smFixture.homeTeam,
				'awayTeam' : showdownCtrl.showdown.smFixture.awayTeam,
				'bet' : showdownCtrl.bet,
				'scoreOdds' : data
			};
			BtLoading.endLoad();
			$scope.parentCtrl.showDetailCotesModal = true;


		}, function (messages) {
			BtLoading.endLoad();
			BtMessages.show(messages);
		});

	}
});
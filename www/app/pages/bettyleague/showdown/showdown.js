betty2App.controller('ShowdownCtrl', function ($scope, $stateParams, showdown, bet, previousShowDownId, nextShowDownId) {
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
});
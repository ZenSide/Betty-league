betty2App.controller('ShowdownCtrl', function ($scope, $stateParams, showdown) {
	var showdownCtrl = this;
	showdownCtrl.showdownId = $stateParams.showdownId;
	showdownCtrl.showdown = showdown;

	showdownCtrl.newBet = {
		bettyLeagueId : $scope.bettyLeagueCtrl.bettyLeagueId,
		showdownId : showdownCtrl.showdownId,
		winner : null,
		homeScore: null,
		awayScore: null
	};
});
betty2App.controller('BettyLeagueCtrl', function ($scope, $stateParams, bettyLeague) {
	var bettyLeagueCtrl = this;

	bettyLeagueCtrl.bettyLeagueId = $stateParams.bettyLeagueId;

	bettyLeagueCtrl.bettyLeague = bettyLeague;
});
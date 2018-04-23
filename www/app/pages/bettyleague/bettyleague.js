betty2App.controller('BettyLeagueCtrl', function ($scope, $stateParams, bettyLeague, UserApi) {
	var bettyLeagueCtrl = this;

	bettyLeagueCtrl.bettyLeagueId = $stateParams.bettyLeagueId;

	bettyLeagueCtrl.bettyLeague = bettyLeague;

	bettyLeagueCtrl.logout = function () {
		UserApi.logout();
	}
});
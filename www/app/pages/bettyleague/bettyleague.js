betty2App.controller('BettyLeagueCtrl', function ($scope, $stateParams, fullRange) {
	var bettyLeagueCtrl = this;

	bettyLeagueCtrl.bettyLeagueId = $stateParams.bettyLeagueId;

	bettyLeagueCtrl.fullRange = fullRange['hydra:member'];
});
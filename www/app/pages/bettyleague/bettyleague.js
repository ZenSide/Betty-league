betty2App.controller('BettyLeagueCtrl', function (seasonScore, $scope, $stateParams, bettyLeague, UserApi, BtNavigate) {
	var bettyLeagueCtrl = this;

	console.log('bettyleaguectrl');

	bettyLeagueCtrl.bettyLeagueId = $stateParams.bettyLeagueId;
	bettyLeagueCtrl.showdownId = null;

	bettyLeagueCtrl.bettyLeague = bettyLeague;

	bettyLeagueCtrl.seasonScore = seasonScore;

	bettyLeagueCtrl.logout = function () {
		UserApi.logout();
	};

	bettyLeagueCtrl.goListMatch = function () {
		BtNavigate.stateChange('goLeft' ,'listMatch', {
			'bettyLeagueId' : $stateParams.bettyLeagueId,
			'showdownId' : bettyLeagueCtrl.showdownId,
			'animDirection' : '3right'
		});
	}
});
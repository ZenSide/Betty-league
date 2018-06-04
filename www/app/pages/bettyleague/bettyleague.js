betty2App.controller('BettyLeagueCtrl', function (ShowdownApi, seasonScore, $scope, $stateParams, bettyLeague, UserApi, BtNavigate, $interval) {
	var bettyLeagueCtrl = this;

	console.log('bettyleaguectrl');

	bettyLeagueCtrl.bettyLeagueId = $stateParams.bettyLeagueId;
	bettyLeagueCtrl.showdownId = null;

	bettyLeagueCtrl.bettyLeague = bettyLeague;

	if (bettyLeagueCtrl.bettyLeague.endless && bettyLeagueCtrl.bettyLeague.public)
	{
		$scope.parentCtrl.activeHeaderBtns = [false, true, false, false];
	}

	bettyLeagueCtrl.seasonScore = seasonScore;

	bettyLeagueCtrl.goListMatch = function () {
		BtNavigate.stateChange('goLeft' ,'listMatch', {
			'bettyLeagueId' : $stateParams.bettyLeagueId,
			'showdownId' : bettyLeagueCtrl.showdownId,
			'animDirection' : 'fade'
		});
	}

	bettyLeagueCtrl.goRanking = function () {
		BtNavigate.stateChange('goLeft' ,'ranking', {
			'bettyLeagueId' : $stateParams.bettyLeagueId,
			'showdownId' : bettyLeagueCtrl.showdownId,
			'animDirection' : 'fade'
		});
	}

	//STREAMING !
	//stream fullrange (ttes les 10 minutes)
	var delay = 1000 * 10;
	//var delay = 1000 * 60 * 10;
	var fullSdStream = $interval(function () {
		console.log("streammm");
		ShowdownApi.getFullRange(bettyLeagueCtrl.bettyLeagueId, function () {
			$scope.$broadcast('fullSdStream')
		}, function (fullrange) {

		}, true);

	}, delay);


	$scope.$on('$destroy', function() {
		// Make sure that the interval is destroyed too
		if (angular.isDefined(fullSdStream)) {
			$interval.cancel(fullSdStream);
			fullSdStream = undefined;
		}
	});


	//stream fullrange live  (ttes les 30 secondes)

	//stream bet fullrange (ttes les 30 secondes)

});
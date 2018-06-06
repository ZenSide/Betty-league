betty2App.controller('BettyLeagueCtrl', function (BtLoading, BetApi, ShowdownApi, seasonScore, $scope, $stateParams, bettyLeague, UserApi, BtNavigate, $interval) {
	var bettyLeagueCtrl = this;

	bettyLeagueCtrl.bettyLeagueId = $stateParams.bettyLeagueId;
	bettyLeagueCtrl.showdownId = null;

	bettyLeagueCtrl.bettyLeague = bettyLeague;

	if (bettyLeagueCtrl.bettyLeague.public)
	{
		$scope.parentCtrl.activeHeaderBtns = [false, true, false, false];
	} else {
		$scope.parentCtrl.activeHeaderBtns = [false, false, true, false];
	}

	bettyLeagueCtrl.seasonScore = seasonScore;

	bettyLeagueCtrl.goListMatch = function () {
		BtLoading.startLoad();
		BtNavigate.stateChange('goLeft' ,'listMatch', {
			'bettyLeagueId' : $stateParams.bettyLeagueId,
			'showdownId' : bettyLeagueCtrl.showdownId,
			'animDirection' : 'fade'
		});
	}

	bettyLeagueCtrl.goRanking = function () {
		BtLoading.startLoad();
		BtNavigate.stateChange('goLeft' ,'ranking', {
			'bettyLeagueId' : $stateParams.bettyLeagueId,
			'showdownId' : bettyLeagueCtrl.showdownId,
			'animDirection' : 'fade'
		});
	}

	//STREAMING !

	bettyLeagueCtrl.activeStream = true;

	//stream fullrange (ttes les 10 minutes)
	var delay = 1000 * 60 * 10;
	var fullSdStream = $interval(function () {
		if (bettyLeagueCtrl.activeStream) {
			ShowdownApi.getFullRange(bettyLeagueCtrl.bettyLeagueId, function () {
				$scope.$broadcast('sdStream')
			}, function (fullrange) {

			}, true);
		}
	}, delay);

	//live range
	var delayLive = 1000 * 28;
	var liveSdStream = $interval(function () {
		if (bettyLeagueCtrl.activeStream) {
			ShowdownApi.getFullRange(bettyLeagueCtrl.bettyLeagueId, function () {
				$scope.$broadcast('sdStream')
			}, function (fullrange) {
			}, true, true);
		}
	}, delayLive);

	var delayBetRange = 1000 * 5;
	var fullBetStream = $interval(function () {
		if (bettyLeagueCtrl.activeStream) {
			BetApi.getFullRange(bettyLeagueCtrl.bettyLeagueId, function () {
				$scope.$broadcast('fullBetStream')
			}, function (fullrange) {

			}, true, true);
		}

	}, delayBetRange);

	$scope.$on('$destroy', function() {
		// Make sure that the interval is destroyed too
		if (angular.isDefined(fullSdStream)) {
			$interval.cancel(fullSdStream);
			fullSdStream = undefined;
		}
		if (angular.isDefined(liveSdStream)) {
			$interval.cancel(liveSdStream);
			liveSdStream = undefined;
		}

		if (angular.isDefined(fullBetStream)) {
			$interval.cancel(fullBetStream);
			fullBetStream = undefined;
		}
	});


	//stream fullrange live  (ttes les 30 secondes)

	//stream bet fullrange (ttes les 30 secondes)

});
betty2App.controller('BettyLeagueCtrl', ['BettyLeagueApi', 'BtLoading', 'BetApi', 'ShowdownApi', 'seasonScore', '$scope', '$stateParams', 'bettyLeague', 'BtNavigate', '$interval',
	function (BettyLeagueApi, BtLoading, BetApi, ShowdownApi, seasonScore, $scope, $stateParams, bettyLeague, BtNavigate, $interval) {
	var bettyLeagueCtrl = this;

	bettyLeagueCtrl.bettyLeagueId = $stateParams.bettyLeagueId;
	bettyLeagueCtrl.showdownId = null;

	bettyLeagueCtrl.bettyLeague = bettyLeague;

	if (bettyLeagueCtrl.bettyLeague.public)
	{
		$scope.parentCtrl.activeHeaderBtns = [false, false, true, false, false];
	} else {
		$scope.parentCtrl.activeHeaderBtns = [false, false, false, true, false];
	}

	bettyLeagueCtrl.seasonScore = seasonScore;

	bettyLeagueCtrl.goListMatch = function () {
		BtLoading.startLoad();
		BtNavigate.stateChange('goTop' ,'listMatch', {
			'bettyLeagueId' : $stateParams.bettyLeagueId,
			'showdownId' : bettyLeagueCtrl.showdownId,
			'animDirection' : 'fade'
		});
	}

	bettyLeagueCtrl.goRanking = function () {
		BtLoading.startLoad();
		BtNavigate.stateChange('goTop' ,'ranking', {
			'bettyLeagueId' : $stateParams.bettyLeagueId,
			'showdownId' : bettyLeagueCtrl.showdownId,
			'animDirection' : 'fade'
		});
	}

	//STREAMING !

	bettyLeagueCtrl.activeStream = true;

	//stream fullrange (ttes les 10 minutes)
	var delay = 1000 * 60 * 8;
	var fullSdStream = $interval(function () {
		if (bettyLeagueCtrl.activeStream) {
			ShowdownApi.getFullRange(bettyLeagueCtrl.bettyLeagueId, function () {
				$scope.$broadcast('sdStream')
			}, function (fullrange) {

			});
		}
	}, delay);

	//live range
	ShowdownApi.getFullRange(bettyLeagueCtrl.bettyLeagueId, function () {
		$scope.$broadcast('sdStream')
	}, function (fullrange) {
	}, true, true);

	var delayLive = 1000 * 30;
	var liveSdStream = $interval(function () {
		if (bettyLeagueCtrl.activeStream) {
			ShowdownApi.getFullRange(bettyLeagueCtrl.bettyLeagueId, function () {
				$scope.$broadcast('sdStream')
			}, function (fullrange) {
			}, true, true);
		}
	}, delayLive);

	//betRange
	BetApi.getFullRange(bettyLeagueCtrl.bettyLeagueId, function () {
		$scope.$broadcast('fullBetStream')
	}, function (fullrange) {
	}, true);

	var delayBetRange = 1000 * 15;
	var fullBetStream = $interval(function () {
		if (bettyLeagueCtrl.activeStream) {
			BetApi.getFullRange(bettyLeagueCtrl.bettyLeagueId, function () {
				$scope.$broadcast('fullBetStream')
			}, function (fullrange) {
			}, true);
		}
	}, delayBetRange);

	//totalScoreRange
	var totalScoreDelay = 1000 * 12;
	var totalScoreDelay = $interval(function () {
		if (bettyLeagueCtrl.activeStream) {
			BettyLeagueApi.getSeasonScore($stateParams.bettyLeagueId, function (score) {
				bettyLeagueCtrl.seasonScore = score;
			}, function (messages) {
			}, true);
		}

	}, totalScoreDelay);

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

		if (angular.isDefined(totalScoreDelay)) {
			$interval.cancel(totalScoreDelay);
			totalScoreDelay = undefined;
		}
	});


	//stream fullrange live  (ttes les 30 secondes)

	//stream bet fullrange (ttes les 30 secondes)

}]);
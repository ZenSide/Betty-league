betty2App.controller('Step0Ctrl', ['translations', '$scope', '$stateParams', 'BtNavigate', 'BtLoading', 'animation', function (translations, $scope, $stateParams, BtNavigate, BtLoading, animation) {

	var step0Ctrl = this;
	BtLoading.endLoad();
	step0Ctrl.stepId = $stateParams.stepId;

	step0Ctrl.sdStatus = function () {
		//postponed
		if ($scope.showdownCtrl.showdown.smFixture.sm__time__status === 'POSTP') {
			var startdate = new Date($scope.showdownCtrl.showdown.smFixture.sm__time__startingAt__dateTime);
			var now = new Date().getTime();
			var start = startdate.getTime();
			var distance = start - now;
			if (distance <= 0) {
				return 'REPORTE';
			} else {
				return 'OPEN';
			}
		}
		return $scope.showdownCtrl.showdown.smFixture.showdownStatus;
	};

	$scope.showdownCtrl.swipeLeft = function () {
		if ($scope.showdownCtrl.nextShowDownId) {
			BtLoading.startLoad();
			BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step0', {
				'bettyLeagueId' : $stateParams.bettyLeagueId,
				'showdownId' : $scope.showdownCtrl.nextShowDownId,
				'animDirection' : '3left'
			});
		}
	};

	$scope.showdownCtrl.swipeRight = function () {
		if ($scope.showdownCtrl.previousShowDownId) {
			BtLoading.startLoad();
			BtNavigate.stateChange('goLeft' ,'bettyleague.showdown.step0', {
				'bettyLeagueId' : $stateParams.bettyLeagueId,
				'showdownId' : $scope.showdownCtrl.previousShowDownId,
				'animDirection' : '2right'
			});
		}
	};

	step0Ctrl.isShownEvent = function (eventType) {
		var okEventTypes = [
			'goal', 'penalty', 'own-goal', 'yellowred', 'redcard'
		];

		if (okEventTypes.indexOf(eventType) !== -1) {
			return true;
		}

		return false;
	};

	$scope.bettyLeagueCtrl.activeStream = true;

	//parent config
	var withHeadLogo = false;
	var footerStatus = {};

	// OPEN
	footerStatus.leftBt = {
		btShow : $scope.showdownCtrl.previousShowDownId ? true : false,
		btPosition: "left",
		btClasses: "bt-action--medium",
		btButtonClasses: "bt-action__btn--blue",
		btIco : "fas fa-backward",
		btLabel:translations['LOGIN.FOOTER.MDP'],
		btDisabled: false,
		btSubmitForm: null,
		action:function(){
			BtLoading.startLoad();
			BtNavigate.stateChange('goLeft' ,'bettyleague.showdown.step0', {
				'bettyLeagueId' : $stateParams.bettyLeagueId,
				'showdownId' : $scope.showdownCtrl.previousShowDownId,
				'animDirection' : '2right'
			});
		}
	};
	footerStatus.middleBt = {
		btShow : step0Ctrl.sdStatus() === 'OPEN',
		btPosition: "middle",
		btClasses: !$scope.showdownCtrl.bet ? "bt-action--medium" : "bt-action--medium",
		btButtonClasses: "bt-action__btn--gold",
		btIco : "icon-bty-ico-coin",
		btLabel: $scope.showdownCtrl.bet ? translations['SHOWDOWN.MODIFY'] : translations['SHOWDOWN.BET'],
		btDisabled: false,
		btSubmitForm: null,
		action:function(){
			BtNavigate.stateChange('fade' ,'bettyleague.showdown.step1', {
				'bettyLeagueId' : $stateParams.bettyLeagueId,
				'showdownId' : $stateParams.showdownId,
				'animDirection' : '2left'
			});
		}
	};
	footerStatus.rightBt = {
		btShow : $scope.showdownCtrl.nextShowDownId ? true : false,
		btPosition: "right",
		btClasses: $scope.showdownCtrl.bet ? "bt-action--medium" : "bt-action--medium",
		btButtonClasses: "bt-action__btn--blue",
		btIco : "fas fa-forward",
		btLabel:translations['LOGIN.FOOTER.SIGN'],
		btDisabled: false,
		btSubmitForm: null,
		action:function(){
			BtLoading.startLoad();
			BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step0', {
				'bettyLeagueId' : $stateParams.bettyLeagueId,
				'showdownId' : $scope.showdownCtrl.nextShowDownId,
				'animDirection' : '3left'
			});
		}
	};
	//AUTRES STATUS

	animation.promise.then(function () {
		$scope.parentCtrl.withHeadLogo = withHeadLogo;
		$scope.parentCtrl.footerStatus = footerStatus;
	});
}]);

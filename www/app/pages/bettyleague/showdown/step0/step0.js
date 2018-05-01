betty2App.controller('Step0Ctrl', function (BtMessages, BetApi, $timeout, translations, ENV, $scope, $stateParams, BtNavigate, BtLoading, animation) {
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

	step0Ctrl.isShownEvent = function (eventType) {
		var okEventTypes = [
			'goal', 'penalty', 'own-goal', 'yellowred', 'redcard'
		];

		if (okEventTypes.indexOf(eventType) !== -1) {
			return true;
		}

		return false;
	};

	//parent config
	var withHeadLogo = false;
	var footerStatus = {};

	// OPEN NON PARIE
	if (step0Ctrl.sdStatus() === 'OPEN' && !$scope.showdownCtrl.bet) {
		footerStatus.leftBt = {
			btShow : true,
			btPosition: "left",
			btClasses: "bt-action--medium",
			btButtonClasses: "bt-action__btn--blue",
			btIco : "fas fa-arrow-left",
			btLabel:translations['LOGIN.FOOTER.MDP'],
			btDisabled: false,
			btSubmitForm: null,
			action:function(){
				BtNavigate.stateChange('goLeft' ,'bettyleague.showdown.step0', {
					'bettyLeagueId' : $stateParams.bettyLeagueId,
					'showdownId' : $scope.showdownCtrl.previousShowDownId,
					'animDirection' : '2right'
				});
			}
		};
		footerStatus.middleBt = {
			btShow : true,
			btPosition: "middle",
			btClasses: "bt-action--big",
			btButtonClasses: "bt-action__btn--gold",
			btIco : "icon-bty-ico-coin",
			btLabel:translations['SHOWDOWN.BET'],
			btDisabled: false,
			btSubmitForm: null,
			action:function(){
				BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step1', {
					'bettyLeagueId' : $stateParams.bettyLeagueId,
					'showdownId' : $stateParams.showdownId,
					'animDirection' : '2left'
				});
			}
		};
		footerStatus.rightBt = {
			btShow : false,
		};
	// OPEN DEJA PARIE
	} else if (step0Ctrl.sdStatus() === 'OPEN' && $scope.showdownCtrl.bet) {
		footerStatus.leftBt = {
			btShow : true,
			btPosition: "left",
			btClasses: "bt-action--medium",
			btButtonClasses: "bt-action__btn--blue",
			btIco : "fas fa-arrow-left",
			btLabel:translations['LOGIN.FOOTER.MDP'],
			btDisabled: false,
			btSubmitForm: null,
			action:function(){
				BtNavigate.stateChange('goLeft' ,'bettyleague.showdown.step0', {
					'bettyLeagueId' : $stateParams.bettyLeagueId,
					'showdownId' : $scope.showdownCtrl.previousShowDownId,
					'animDirection' : '2right'
				});
			}
		};
		footerStatus.middleBt = {
			btShow : true,
			btPosition: "middle",
			btClasses: "bt-action--big",
			btButtonClasses: "bt-action__btn--gold",
			btIco : "icon-bty-ico-coin",
			btLabel:translations['SHOWDOWN.MODIFY'],
			btDisabled: false,
			btSubmitForm: null,
			action:function(){
				BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step1', {
					'bettyLeagueId' : $stateParams.bettyLeagueId,
					'showdownId' : $stateParams.showdownId,
					'animDirection' : '2left'
				});
			}
		};
		footerStatus.rightBt = {
			btShow : true,
			btPosition: "right",
			btClasses: "bt-action--medium",
			btButtonClasses: "bt-action__btn--blue",
			btIco : "fas fa-arrow-right",
			btLabel:translations['LOGIN.FOOTER.SIGN'],
			btDisabled: false,
			btSubmitForm: null,
			action:function(){
				BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step0', {
					'bettyLeagueId' : $stateParams.bettyLeagueId,
					'showdownId' : $scope.showdownCtrl.nextShowDownId,
					'animDirection' : '3left'
				});
			}
		};
	//AUTRES STATUS
	} else  {
		footerStatus.leftBt = {
			btShow : true,
			btPosition: "left",
			btClasses: "bt-action--medium",
			btButtonClasses: "bt-action__btn--blue",
			btIco : "fas fa-arrow-left",
			btLabel:translations['LOGIN.FOOTER.MDP'],
			btDisabled: false,
			btSubmitForm: null,
			action:function(){
				BtNavigate.stateChange('goLeft' ,'bettyleague.showdown.step0', {
					'bettyLeagueId' : $stateParams.bettyLeagueId,
					'showdownId' : $scope.showdownCtrl.previousShowDownId,
					'animDirection' : '3right'
				});
			}
		};
		footerStatus.middleBt = {
			btShow : false
		};
		footerStatus.rightBt = {
			btShow : true,
			btPosition: "right",
			btClasses: "bt-action--medium",
			btButtonClasses: "bt-action__btn--blue",
			btIco : "fas fa-arrow-right",
			btLabel:translations['LOGIN.FOOTER.SIGN'],
			btDisabled: false,
			btSubmitForm: null,
			action:function(){
				BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step0', {
					'bettyLeagueId' : $stateParams.bettyLeagueId,
					'showdownId' : $scope.showdownCtrl.nextShowDownId,
					'animDirection' : '3left'
				});
			}
		};
	};

	animation.promise.then(function () {
		$scope.parentCtrl.withHeadLogo = withHeadLogo;
		$scope.parentCtrl.footerStatus = footerStatus;
	});
});
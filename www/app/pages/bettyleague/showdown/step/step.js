betty2App.controller('StepCtrl', function (translations, ENV, previousShowDownId, nextShowDownId, $scope, $stateParams, BtNavigate, BtLoading, animation) {
	var stepCtrl = this;
	stepCtrl.stepId = $stateParams.stepId;

	BtLoading.endLoad();

	//parent config
	var withHeadLogo = false;
	var footerStatus = {};
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
			BtNavigate.stateChange('goLeft' ,'bettyleague.showdown.step', {
				'bettyLeagueId' : $stateParams.bettyLeagueId,
				'showdownId' : previousShowDownId,
				'stepId' : '0',
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
			BtNavigate.stateChange('goBottom' ,'login', {
				'animDirection' : 'fade'
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
			BtNavigate.stateChange('goRight' ,'bettyleague.showdown.step', {
				'bettyLeagueId' : $stateParams.bettyLeagueId,
				'showdownId' : nextShowDownId,
				'stepId' : '0',
				'animDirection' : '2left'
			});
		}
	};

	animation.promise.then(function () {
		$scope.parentCtrl.withHeadLogo = withHeadLogo;
		$scope.parentCtrl.footerStatus = footerStatus;
	});

	//status
	//postponed
	stepCtrl.sdStatus = function () {
		//postponed
		if ($scope.showdownCtrl.showdown.smFixture.sm__time__status === 'POSTP') {
			var startdate = new Date($scope.showdownCtrl.showdown.smFixture.sm__time__startingAt__dateTime);
			var now = new Date().getTime();
			var start = startdate.getTime();
			var distance = start - now;
			if (distance < 0) {
				return 'REPORTE';
			} else {
				return 'OPEN';
			}
		}
		return $scope.showdownCtrl.showdown.smFixture.showdownStatus;
	}


	stepCtrl.isShownEvent = function (eventType) {
		var okEventTypes = [
			'goal', 'penalty', 'own-goal', 'yellowred', 'redcard'
		];

		if (okEventTypes.indexOf(eventType) !== -1) {
			return true;
		}

		return false;
	};



});
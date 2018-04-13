betty2App.controller('StepCtrl', function (ENV, previousShowDownId, nextShowDownId, $scope, $stateParams, BtNavigate, BtLoading, animation, $timeout) {
	var stepCtrl = this;
	stepCtrl.stepId = $stateParams.stepId;

	BtLoading.endLoad();

	//parent config
	var withHeadLogo = false;
	var footerStatus = {
		leftBt : {
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
					'stepId' : '0'
				});
			}
		},
		middleBt : {
			btShow : true,
			btPosition: "middle",
			btClasses: "bt-action--big",
			btButtonClasses: "bt-action__btn--blue",
			btIco : "icon-bty-ico-coin",
			btLabel:translations['LOGIN.FOOTER.MDP'],
			btDisabled: false,
			btSubmitForm: null,
			action:function(){
				BtNavigate.stateChange('goLeft' ,'login', {
				});
			}
		},
		rightBt : {
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
					'stepId' : '0'
				});
			}
		}
	};
	animation.promise.then(function () {
		$timeout(function(){
			$scope.parentCtrl.withHeadLogo = withHeadLogo;
			$scope.parentCtrl.footerStatus = footerStatus;
		});
	});

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
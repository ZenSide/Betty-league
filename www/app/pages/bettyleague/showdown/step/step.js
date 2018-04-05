betty2App.controller('StepCtrl', function ($scope, $stateParams, BtNavigate, BtLoading) {
	BtLoading.endLoad();
	var loginCtrl = this;

	loginCtrl.stepId = $stateParams.stepId;

	//parent config
	$scope.parentCtrl.withHeadLogo = false;

	$scope.parentCtrl.footerStatus = {
		leftBt : {
			btShow : true,
			btPosition: "left",
			btClasses: "bt-action--medium",
			btButtonClasses: "bt-action__btn--gold",
			btIco : "fas fa-unlock",
			btLabel:translations['LOGIN.FOOTER.MDP'],
			btDisabled: false,
			btSubmitForm: null,
			action:function(){
				BtNavigate.stateChange('goRight','login');
			}
		},
		middleBt : {
			btShow : true,
			btPosition: "middle",
			btClasses: "bt-action--big",
			btButtonClasses: "bt-action__btn--gold",
			btIco : "icon-bty-ico-coin",
			btLabel:translations['LOGIN.FOOTER.SIGN'],
			btDisabled: false,
			btSubmitForm: null,
			action:function(){
				BtNavigate.stateChange('goLeft','signin');
			}
		},
		rightBt : {
			btShow : true,
			btPosition: "right",
			btClasses: "bt-action--medium",
			btButtonClasses: "bt-action__btn--gold",
			btIco : "fab fa-angellist",
			btLabel:translations['LOGIN.FOOTER.SIGN'],
			btDisabled: false,
			btSubmitForm: null,
			action:function(){
				BtNavigate.stateChange('goLeft','signin');
			}
		}
	}
});
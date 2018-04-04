betty2App.controller('StepCtrl', function ($scope, $stateParams, BtNavigate, $rootScope) {
	$scope.stepId = $stateParams.stepId;
	$scope.parentParams.withHeadLogo = false;

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
			btClasses: "bt-action--medium",
			btButtonClasses: "",
			btIco : "fab fa-accessible-icon",
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
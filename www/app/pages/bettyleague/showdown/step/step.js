betty2App.controller('StepCtrl', function ($scope, $stateParams, BtNavigate, $rootScope) {
	$scope.stepId = $stateParams.stepId;
	$scope.parentParams.withHeadLogo = false;

	$scope.parentCtrl.footerStatus = {
		leftBt : {
			active : true,
			ico : "fas fa-unlock",
			position: "left",
			size: "medium",
			label:translations['LOGIN.FOOTER.MDP'],
			focus : false,
			disabled: false,
			action:function(){
				BtNavigate.stateChange('goRight','login');
			}
		},
		middleBt : {
			active : true,
			ico : "icon-bty-ico-coin",
			position: "middle",
			size: "big",
			color: "gold",
			label:translations['LOGIN.FOOTER.SIGN'],
			focus : false,
			disabled: false,
			action:function(){
				BtNavigate.stateChange('goLeft','signin');
			}
		},
		rightBt : {
			active : false
		}
	}
});
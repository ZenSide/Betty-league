betty2App.controller('JoinLeagueCtrl', ['BtNavigate', 'BettyLeagueApi', 'BtMessages', '$scope', 'BtLoading', 'animation',function (BtNavigate, BettyLeagueApi, BtMessages, $scope, BtLoading, animation) {
	var joinLeagueCtrl = this;
	BtLoading.endLoad();

	$scope.parentCtrl.activeHeaderBtns = [false, false, false, true, false];

	joinLeagueCtrl.newLeague = {
		codeName: ''
	};
	var fieldsNames = [
		'btNewLeagueName'
	];
	joinLeagueCtrl.submitForm = function(form){
		if(form.$valid){
			BtLoading.startLoad();
			BettyLeagueApi.joinPrivateBettyLeague(joinLeagueCtrl.newLeague, function (newbettyleague) {
				BtNavigate.stateChange('goTop' ,'privateleagues', {
					'animDirection' : 'fade'
				});
			}, function(messages) {
				BtMessages.show(messages);
				BtLoading.endLoad();
			})
		}
		else{
			BtMessages.showFormMessages(form, fieldsNames);
		}
	};

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
			BtNavigate.stateChange('goLeft' ,'privateleagues', {
				'animDirection' : 'right'
			});
		}
	};
	footerStatus.middleBt = {
		btShow : false
	};
	footerStatus.rightBt = {
		btShow : false
	};

	animation.promise.then(function () {
		$scope.parentCtrl.withHeadLogo = false;
		$scope.parentCtrl.footerStatus = footerStatus;
	});
}]);
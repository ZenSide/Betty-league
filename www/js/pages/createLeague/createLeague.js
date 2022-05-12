betty2App.controller('CreateLeagueCtrl', ['BtNavigate', 'BettyLeagueApi', 'BtMessages', '$scope', 'BtLoading', 'animation', function (BtNavigate, BettyLeagueApi, BtMessages, $scope, BtLoading, animation) {
	var createLeagueCtrl = this;
	BtLoading.endLoad();

	$scope.parentCtrl.activeHeaderBtns = [false, false, false, true, false];

	createLeagueCtrl.newLeague = {
		special: 'DEMOFORZA',
		name: ''
	};
	var fieldsNames = [
		'btNewLeagueName'
	];
	createLeagueCtrl.submitForm = function(form){
		if(form.$valid){
			BtLoading.startLoad();
			BettyLeagueApi.createPrivateBettyLeague(createLeagueCtrl.newLeague, function (newbettyleague) {
				BtMessages.show({
						context: 'success',
						content: 'COMMUNITY.NEW_LEAGUE_CREATED'
					}, null, function () {
					BtNavigate.stateChange('goTop' ,'privateleagues', {
						'animDirection' : 'fade'
					});
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

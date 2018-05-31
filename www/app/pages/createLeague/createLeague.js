betty2App.controller('CreateLeagueCtrl', function (BtNavigate, ShowdownApi, BettyLeagueApi, BtMessages, $scope, BtLoading, animation) {
	var createLeagueCtrl = this;
	BtLoading.endLoad();

	createLeagueCtrl.submitNewLeague = function () {
		console.log()
	};

	createLeagueCtrl.newLeague = {
		special: 'WC2018',
		name: ''
	};
	var fieldsNames = [
		'btNewLeagueName'
	];
	createLeagueCtrl.submitForm = function(form){
		console.log('pouet');
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
		btShow : false,
	};
	footerStatus.middleBt = {
		btShow : false
	};
	footerStatus.rightBt = {
		btShow : false
	};

	$scope.parentCtrl.activeHeaderBtns = [false, false, true, false];

	animation.promise.then(function () {
		$scope.parentCtrl.withHeadLogo = false;
		$scope.parentCtrl.footerStatus = footerStatus;
	});
});
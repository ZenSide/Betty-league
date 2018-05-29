betty2App.controller('CreateLeagueCtrl', function (BtMessages, $scope, BtLoading, animation) {
	var createLeagueCtrl = this;
	BtLoading.endLoad();

	createLeagueCtrl.submitNewLeague = function () {
		console.log()
	};

	createLeagueCtrl.newLeague = {
		name: ''
	};
	var fieldsNames = [
		'btNewLeagueName'
	];
	createLeagueCtrl.submitForm = function(form){
		console.log('pouet');
		if(form.$valid){
			BtLoading.startLoad();
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
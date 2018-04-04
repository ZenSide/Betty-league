'use strict';
betty2App.factory('ShowdownApi', function ($rootScope, $timeout, $cordovaFacebook, BtMessages, BtNavigate, BtLoading, ResourcesFactory, BtLocalStorage, AVATAR_HEIGHT, AVATAR_WIDTH) {
	var ShowdownApi = {

		//User Sign In
		getFullRange: function (bettyLeagueId) {

			BtLoading.startLoad();
			ResourcesFactory.get('/api/showdowns/fullrange').then(function (data) {
				//Success Sign In

				BtLocalStorage.setObject('FullRange', data);

				var messages = [
					{
						context: 'success',
						content: 'LOGIN.SIGNSUCCESS'
					}
				];
				BtMessages.show(messages, null, function () {
					BtNavigate.stateChange('goRight', 'login');
					BtLoading.endLoad();
				});
			}, function (messages) {

				//Sign Fail
				BtMessages.show(messages);
				BtLoading.endLoad();
				return;
			});
		},

	};
	return ShowdownApi;
});
'use strict';
betty2App.factory('ShowdownApi', function ($rootScope, $timeout, $cordovaFacebook, BtMessages, BtNavigate, ResourcesFactory, BtLocalStorage) {
	var ShowdownApi = {

		//User Sign In
		getFullRange: function (bettyLeagueId, resolve, reject, noCache) {
			var fullRange = BtLocalStorage.getObject('FullRange' + bettyLeagueId);
			if (fullRange !== {} && !noCache) {
				console.log('cachedFullrange');
				resolve(fullRange);
			}
			ResourcesFactory.get('/api/showdowns/fullrange').then(function (data) {
				BtLocalStorage.setObject('FullRange' + bettyLeagueId, data);
				resolve(data);
			}, function (messages) {
				//error
				BtMessages.show(messages);
				reject();
			});
		},

	};
	return ShowdownApi;
});
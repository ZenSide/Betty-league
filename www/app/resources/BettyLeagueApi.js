'use strict';
betty2App.factory('BettyLeagueApi', function ($rootScope, $timeout, $cordovaFacebook, BtMessages, BtNavigate, ResourcesFactory, BtLocalStorage) {
	var BettyLeagueApi = {
		//User Sign In
		getMyBettyLeagues: function (resolve, reject, noCache) {
			var myBettyLeagues = BtLocalStorage.getObject('MyBettyLeagues');
			if (myBettyLeagues !== {} && !noCache) {
				console.log('cachedMyBettyLeagues');
				resolve(myBettyLeagues['hydra:member']);
			}
			ResourcesFactory.get('/api/betty_leagues/my').then(function (data) {
				BtLocalStorage.setObject('MyBettyLeagues', data);
				resolve(data['hydra:member']);
			}, function (messages) {
				//error
				BtMessages.show(messages);
				reject();
			});
		},

	};
	return BettyLeagueApi;
});
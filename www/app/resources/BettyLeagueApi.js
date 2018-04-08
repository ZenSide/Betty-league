'use strict';
betty2App.factory('BettyLeagueApi', function ($filter, $rootScope, BtMessages, ResourcesFactory, BtLocalStorage) {
	var BettyLeagueApi = {
		//User Sign In
		getMyBettyLeagues: function (resolve, reject, noCache) {
			var myBettyLeagues = BtLocalStorage.getObject('MyBettyLeagues');
			console.log(myBettyLeagues);
			if (myBettyLeagues !== {} && !noCache) {
				console.log('cachedMyBettyLeagues');
				resolve(myBettyLeagues['hydra:member']);
				return;
			}
			ResourcesFactory.get('/api/betty_leagues/my').then(function (data) {
				BtLocalStorage.setObject('MyBettyLeagues', data);
				resolve(data['hydra:member']);
				return;
			}, function (messages) {
				//error
				reject(messages);
				return;
			}, noCache);
		},

		getBettyWorld: function (resolve, reject, noCache) {
			BettyLeagueApi.getMyBettyLeagues(function (bettyLeagues) {
				var result = $filter('filter')(bettyLeagues, {'endless':true, 'public': true});
				if (result.length > 0)
				{
					resolve(result[0]);
					return;
				} else {
					var messages = [
						{
							context:'alert',
							content:"MESSAGES.NOBETTYWORLD"
						}
					];
					reject(messages);
					return;
				}


			}, function (messages) {
				reject(messages);
				return;
			}, noCache)
		}

	};
	return BettyLeagueApi;
});
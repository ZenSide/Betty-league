'use strict';
betty2App.factory('ShowdownApi', function ($filter, ResourcesFactory, BtLocalStorage) {
	var ShowdownApi = {

		//User Sign In
		getFullRange: function (bettyLeagueId, resolve, reject, noCache) {
			var fullRange = BtLocalStorage.getObject('FullRange' + bettyLeagueId);
			if (fullRange !== {} && !noCache) {
				console.log('cachedFullrange');
				resolve(fullRange['hydra:member']);
				return;
			}
			ResourcesFactory.get('/api/showdowns/fullrange', {
				'bettyLeagueId': bettyLeagueId
			}).then(function (data) {
				BtLocalStorage.setObject('FullRange' + bettyLeagueId, data);
				resolve(data['hydra:member']);
				return;
			}, function (messages) {
				//error
				reject(messages);
				return;
			});
		},

		//get next open showdown
		getNextOpenShowDown: function (bettyLeagueId, resolve, reject, noCache) {
			ShowdownApi.getFullRange(bettyLeagueId, function (fullRange) {

				console.log(fullRange);

				var openShowdowns = $filter('filter')(fullRange, function (showdown) {
					if (showdown.smFixture.showdownStatus !== "OPEN") {
						return false;
					}
					return true;
				});

				console.log(openShowdowns);

				if (openShowdowns.length > 0) {
					resolve(openShowdowns[0]);
					return;
				}

				var messages = [
					{
						context:'alert',
						content:"MESSAGES.NONEXTOPENSHOWDOWN"
					}
				];
				reject(messages);
				return;

			}, function (messages) {
				reject(messages);
				return;
			}, true)
		}

	};
	return ShowdownApi;
});
'use strict';
betty2App.factory('ShowdownApi', function ($q, BetApi, $filter, ResourcesFactory, BtLocalStorage) {
	var ShowdownApi = {

		//User Sign In
		getFullRange: function (bettyLeagueId, resolve, reject, noCache) {
			var fullRange = BtLocalStorage.getObject('FullRange' + bettyLeagueId);
			if (fullRange !== {} && !noCache) {
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
			function sdFull() {
				var sdDefer = $q.defer();
				ShowdownApi.getFullRange(bettyLeagueId, function (fullRange) {
					var openShowdowns = $filter('filter')(fullRange, function (showdown) {
						if (showdown.smFixture.showdownStatus !== "OPEN") {
							return false;
						}
						return true;
					});

					if (openShowdowns.length > 0) {
						sdDefer.resolve(openShowdowns[0]);
						return;
					}

					var messages = [
						{
							context:'alert',
							content:"MESSAGES.NONEXTOPENSHOWDOWN"
						}
					];
					sdDefer.reject(messages);
					return;

				}, function (messages) {
					sdDefer.reject(messages);
					return;
				}, noCache);
				return sdDefer.promise;
			}

			function betFull() {
				var d = $q.defer();
				BetApi.getFullRange(bettyLeagueId, function (fullRange) {
					d.resolve(fullRange);
				}, function (messages) {
					d.reject(messages)
				}, noCache);
				return d.promise;
			}

			$q.all([
				sdFull(),
				betFull()
			]).then(function(data) {
				resolve(data[0], data[1]);
			}).catch(function(error) {
				reject(error[0], error[1]);
			});

		},
		getShowdown: function (bettyLeagueId, showdownId, resolve, reject, noCache) {
			ShowdownApi.getFullRange(bettyLeagueId, function (fullRange) {

				var showdown = $filter('filter')(fullRange, {id: parseInt(showdownId)}, true);

				if (showdown.length > 0) {
					resolve(showdown[0]);
					return;
				}

				var messages = [
					{
						context:'alert',
						content:"MESSAGES.SHOWDOWNNOTFOUND"
					}
				];
				reject(messages);
				return;

			}, function (messages) {
				reject(messages);
				return;
			}, noCache)
		},
		getNextShowdown: function (bettyLeagueId, showdownId, resolve, reject, noCache) {
			ShowdownApi.getFullRange(bettyLeagueId, function (fullRange) {

				var arrayLength = fullRange.length;
				var nextShowdownId = null;
				for (var i = 0; i < arrayLength; i++) {
					if (fullRange[i].id == showdownId) {
						nextShowdownId = fullRange[i+1].id
					}
				}
				resolve(nextShowdownId);

				return;

			}, function (messages) {
				reject(messages);
				return;
			}, noCache)
		},
		getPreviousShowdown: function (bettyLeagueId, showdownId, resolve, reject, noCache) {
			ShowdownApi.getFullRange(bettyLeagueId, function (fullRange) {

				var arrayLength = fullRange.length;
				var nextShowdownId = null;
				for (var i = 0; i < arrayLength; i++) {
					if (fullRange[i].id == showdownId) {
						nextShowdownId = fullRange[i-1].id
					}
				}
				resolve(nextShowdownId);

				return;

			}, function (messages) {
				reject(messages);
				return;
			}, noCache)
		}

	};
	return ShowdownApi;
});
'use strict';
betty2App.factory('ShowdownApi', function ($q, BetApi, $filter, BettyLeagueApi, ResourcesFactory, BtLocalStorage) {
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

			function seasonScore() {
				var d = $q.defer();
				BettyLeagueApi.getSeasonScore(bettyLeagueId, function (score) {
					d.resolve(score);
				}, function (messages) {
					d.reject(messages)
				}, noCache);
				return d.promise;
			}

			$q.all([
				sdFull(),
				betFull(),
				seasonScore()
			]).then(function(data) {
				resolve(data[0]);
			}).catch(function(error) {
				reject(error[0]);
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

						if (fullRange[i+1] !== undefined) {
							nextShowdownId = fullRange[i+1].id
						} else {
							nextShowdownId = null;
						}
					}
				}
				console.log(nextShowdownId);
				resolve(nextShowdownId);

				return;

			}, function (messages) {

				console.log('message'+messages);
				reject(messages);
				return;
			}, noCache)
		},
		getPreviousShowdown: function (bettyLeagueId, showdownId, resolve, reject, noCache) {
			ShowdownApi.getFullRange(bettyLeagueId, function (fullRange) {

				console.log('pouetpouet');

				var arrayLength = fullRange.length;
				console.log(arrayLength);

				var nextShowdownId = null;
				for (var i = 0; i < arrayLength; i++) {
					if (fullRange[i].id == showdownId) {
						if (fullRange[i-1] !== undefined) {
							nextShowdownId = fullRange[i-1].id
						} else {
							nextShowdownId = null;
						}
					}
				}
				console.log('pouetpouet');

				console.log(nextShowdownId);
				resolve(nextShowdownId);

				return;

			}, function (messages) {

				console.log('message'+messages);
				reject(messages);
				return;
			}, noCache)
		}

	};
	return ShowdownApi;
});
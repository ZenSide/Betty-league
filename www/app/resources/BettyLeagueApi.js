'use strict';
betty2App.factory('BettyLeagueApi', function ($filter, $rootScope, ResourcesFactory, BtLocalStorage) {
	var BettyLeagueApi = {
		//User Sign In
		getMyBettyLeagues: function (resolve, reject, noCache) {
			var myBettyLeagues = BtLocalStorage.getObject('MyBettyLeagues');
			if (myBettyLeagues !== {} && !noCache) {
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
		},

		getBettyLeague: function (bettyLeagueId, resolve, reject, noCache) {
			BettyLeagueApi.getMyBettyLeagues(function (bettyLeagues) {
				var result = $filter('filter')(bettyLeagues, {'id': bettyLeagueId});
				if (result.length > 0)
				{
					resolve(result[0]);
					return;
				} else {
					var messages = [
						{
							context:'alert',
							content:"MESSAGES.BETTYLEAGUENOTFOUND"
						}
					];
					reject(messages);
					return;
				}


			}, function (messages) {
				reject(messages);
				return;
			}, noCache)
		},

		getSeasonScore: function (bettyLeagueId, resolve, reject, noCache) {
			var seasonScore = BtLocalStorage.getObject('ScoreSeason' + bettyLeagueId);
			if (seasonScore !== {} && !noCache) {
				resolve(seasonScore['score']);
				return;
			}
			ResourcesFactory.get('/api/betty_league/' + bettyLeagueId + '/user-scores', {
				period: 'full_season'
			}).then(function (data) {
				BtLocalStorage.setObject('ScoreSeason' + bettyLeagueId, data);
				console.log(data);
				resolve(data['score']);
				return;
			}, function (messages) {
				//error
				reject(messages);
				return;
			}, noCache);
		}
	};
	return BettyLeagueApi;
});
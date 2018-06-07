'use strict';
betty2App.factory('ScoreOddApi', ['$q', 'BetApi', '$filter', 'ResourcesFactory', 'BtLocalStorage', function ($q, BetApi, $filter, ResourcesFactory, BtLocalStorage) {
	var ScoreOddApi = {

		//User Sign In
		getShowdownDetail: function (showdownId, resolve, reject, noCache) {
			//var fullRange = BtLocalStorage.getObject('FullRange' + bettyLeagueId);
			//if (fullRange !== {} && !noCache) {
			//	resolve(fullRange['hydra:member']);
			//	return;
			//}
			ResourcesFactory.get('/api/scoreodds/showdown-detail', {
				'showdownId': showdownId
			}).then(function (data) {
				//BtLocalStorage.setObject('FullRange' + bettyLeagueId, data);
				resolve(data['hydra:member']);
				return;
			}, function (messages) {
				//error
				reject(messages);
				return;
			});
		}
	};
	return ScoreOddApi;
}]);
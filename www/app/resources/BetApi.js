'use strict';
betty2App.factory('BetApi', function ($filter, ResourcesFactory, BtLocalStorage) {
	var BetApi = {

		createBet: function (newBet, resolve, reject) {
			ResourcesFactory.post('/api/bets/create', newBet).then(function (data) {
				//Success Sign In

				//BtLocalStorage.setObject('User', data);

				var messages = [
					{
						context: 'success',
						content: 'LOGIN.SIGNSUCCESS'
					}
				];
				resolve (messages);
				return;
			}, function (messages) {
				reject(messages);
				return;
			});
		},
	};
	return BetApi;
});
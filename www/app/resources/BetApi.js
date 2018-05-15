'use strict';
betty2App.factory('BetApi', function ($filter, ResourcesFactory, BtLocalStorage) {
	var BetApi = {

		createBet: function (newBet, resolve, reject) {
			ResourcesFactory.post('/api/bets/create', newBet).then(function (data) {
				//add new bet to local bets
				BetApi.setBet(data, newBet.bettyLeagueId, newBet.showdownId, function () {
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
			}, function (messages) {
				reject(messages);
				return;
			});
		},

		getFullRange: function (bettyLeagueId, resolve, reject, noCache) {
			var fullRange = BtLocalStorage.getObject('BetsFullRange' + bettyLeagueId);
			if (fullRange !== {} && !noCache) {
				resolve(fullRange['hydra:member']);
				return;
			}
			ResourcesFactory.get('/api/bets/fullrange', {
				'bettyLeagueId': bettyLeagueId
			}).then(function (data) {
				BtLocalStorage.setObject('BetsFullRange' + bettyLeagueId, data);
				resolve(data['hydra:member']);
				return;
			}, function (messages) {
				//error
				reject(messages);
				return;
			});
		},

		setFullRange: function (bettyLeagueId, newFullRange) {
			var fullRange = BtLocalStorage.getObject('BetsFullRange' + bettyLeagueId);

			fullRange['hydra:member'] = newFullRange;

			BtLocalStorage.setObject('BetsFullRange' + bettyLeagueId, fullRange);
		},

		getBet: function (bettyLeagueId, showdownId, resolve, reject, noCache) {
			BetApi.getFullRange(bettyLeagueId, function (betfullrange) {

				var bet = $filter('filter')(betfullrange, function (bet) {
					if (bet.scoreOdd.showdown.id !== parseInt(showdownId)) {
						return false;
					}
					return true;
				});
				if (bet.length > 0) {
					resolve(bet[0]);
					return;
				}

				if (bet.length === 0) {
					resolve(null);
					return;
				}

			}, function (messages) {
				reject(messages);
				return;
			}, noCache)
		},

		getBetSync: function (betfullrange, showdownId) {

			var bet = $filter('filter')(betfullrange, function (bet) {
				if (bet.scoreOdd.showdown.id !== parseInt(showdownId)) {
					return false;
				}
				return true;
			});
			if (bet.length > 0) {
				return bet[0];
			}

			if (bet.length === 0) {
				return null;
			}

		},

		setBet: function (bet, bettyLeagueId, showdownId, resolve, reject, noCache) {
			BetApi.getFullRange(bettyLeagueId, function (betfullrange) {
				console.log(betfullrange);
				console.log(bet);

				var arrayLength = betfullrange.length;
				var fundBetIndex = null;
				for (var i = 0; i < arrayLength; i++) {
					if (betfullrange[i].scoreOdd.showdown.id == showdownId) {
						fundBetIndex = i;
					}
				}

				if (fundBetIndex !== null) {
					betfullrange[fundBetIndex] = bet;
				} else {
					betfullrange.push(bet);
				}

				console.log(betfullrange);

				BetApi.setFullRange(bettyLeagueId, betfullrange);

				resolve(true);
				return;

			}, function (messages) {
				reject(messages);
				return;
			}, noCache)
		},

		getMyBetResumee: function (bet, showdown) {
			if (!bet) {
				return null;
			}

			var response = {
				'home': '_',
				'away': '_',
				'totalHome': null,
				'totalAway': null
			};

			if (bet.scoreOdd.homeScore !== null) {
				response.home = bet.scoreOdd.homeScore;
			}

			if (bet.scoreOdd.awayScore !== null) {
				response.away = bet.scoreOdd.awayScore;
			}

			if (showdown.smFixture.matchRetour) {
				response.totalHome = showdown.smFixture.aggregateVisitorteamScore + bet.scoreOdd.homeScore;
				response.totalAway = showdown.smFixture.aggregateLocalteamScore + bet.scoreOdd.awayScore;
			}

			return response;
		}
	};
	return BetApi;
});
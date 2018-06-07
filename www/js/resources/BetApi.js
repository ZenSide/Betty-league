'use strict';
betty2App.factory('BetApi', ['$filter', 'ResourcesFactory', 'BtLocalStorage', function ($filter, ResourcesFactory, BtLocalStorage) {
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
			if (fullRange && !noCache) {
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
		},

		getMyBetResume: function (showdown, bet, status) {
			var gain = 0;
			var winnerGain = 0;
			var scoreGain = 0;

			var response = {
				'potentiel': false,
				'gain': gain,
				'winnerGain': winnerGain,
				'scoreGain': scoreGain,
				'winner': null,
			};

			//gain potentiel

			//CLOSED : gain reel
			if (bet && status === 'CLOSED') {
				var winner = BetApi.getSmFixtureWinner(showdown.smFixture, showdown.smFixture.sm__scores__localteamScore, showdown.smFixture.sm__scores__visitorteamScore);
				response.winner = winner;

				//Check winner
				if (bet.winner === winner) {
					//GOOD WINNER !

					if (winner === 'home') {
						gain += bet.scoreOdd.showdown.homeWinOdd;
						winnerGain += gain;
					} else if (winner === 'away') {
						gain += bet.scoreOdd.showdown.awayWinOdd;
						winnerGain += gain;
					} else if (winner === 'draw') {
						gain += bet.scoreOdd.showdown.drawOdd;
						winnerGain += gain;
					}
				} else {
					//bad
				}

				//check score
				if (bet.scoreOdd.homeScore === showdown.smFixture.sm__scores__localteamScore && bet.scoreOdd.awayScore === showdown.smFixture.sm__scores__visitorteamScore) {
					//GOOD SCORE !!!
					gain += bet.scoreOdd.odd;
					scoreGain += bet.scoreOdd.odd;
				} else {
					//bad
				}
			} else if (bet) {
				//gain potentiel
				response.potentiel = true;
				if (bet.winner === 'home') {
					gain += bet.scoreOdd.showdown.homeWinOdd;
					winnerGain += gain;
				} else if (bet.winner === 'away') {
					gain += bet.scoreOdd.showdown.awayWinOdd;
					winnerGain += gain;
				} else if (bet.winner === 'draw') {
					gain += bet.scoreOdd.showdown.drawOdd;
					winnerGain += gain;
				}

				gain += bet.scoreOdd.odd;
				scoreGain += bet.scoreOdd.odd;
			} else {
				response.potentiel = true;
			}

			response.gain = gain;
			response.winnerGain = winnerGain;
			response.scoreGain = scoreGain;

			return response;
		},

		getSmFixtureWinner: function (smFixture, betHomeScore, betAwayScore, returnPossibilities) {
			var withPenalty = smFixture.withPenalty;
			var aggregateVisitorScore = smFixture.aggregateVisitorteamScore;
			var aggregateLocalScore = smFixture.aggregateLocalteamScore;

			if (withPenalty) {

				//cas des matchs retour
				if (smFixture.matchRetour) {

					//if score du cumul des deux matchs nuls
					if ((aggregateVisitorScore + parseInt(betHomeScore)) == (aggregateLocalScore + parseInt(betAwayScore))) {

						//plus de buts à exterieur pour home Team
						if ((aggregateVisitorScore - parseInt(betHomeScore)) > (parseInt(betAwayScore) - aggregateLocalScore)) {
							if (returnPossibilities) {
								return ['home'];
							}
							return 'home';


							//plus de buts à exterieur pour away Team
						} else if ((aggregateVisitorScore - parseInt(betHomeScore)) < (parseInt(betAwayScore) - aggregateLocalScore)) {
							if (returnPossibilities) {
								return ['away'];
							}
							return 'away';

							// vrai egalité
						} else {
							if (returnPossibilities) {
								return ['home','away'];
							}

							if (smFixture.sm__scores__localteamPenScore > smFixture.sm__scores__visitorteamPenScore) {
								return 'home';
							} else if (smFixture.sm__scores__localteamPenScore < smFixture.sm__scores__visitorteamPenScore) {
								return 'away';
							}
						}

						//winner home
					} else if ((aggregateVisitorScore + parseInt(betHomeScore)) > (aggregateLocalScore + parseInt(betAwayScore))) {
						if (returnPossibilities) {
							return ['home'];
						}
						return 'home';
						//winner away
					} else if ((aggregateVisitorScore + parseInt(betHomeScore)) < (aggregateLocalScore + parseInt(betAwayScore))) {
						if (returnPossibilities) {
							return ['away'];
						}
						return 'away';
					}

					//matchs avec penalty simples
				} else {
					//if score nul
					if (parseInt(betHomeScore) == parseInt(betAwayScore)) {
						if (returnPossibilities) {
							return ['home','away'];
						}

						if (smFixture.sm__scores__localteamPenScore > smFixture.sm__scores__visitorteamPenScore) {
							return 'home';
						} else if (smFixture.sm__scores__localteamPenScore < smFixture.sm__scores__visitorteamPenScore) {
							return 'away';
						}
						//winner home
					} else if (parseInt(betHomeScore) > parseInt(betAwayScore)) {
						if (returnPossibilities) {
							return ['home'];
						}
						return 'home';
					} else if (parseInt(betHomeScore) < parseInt(betAwayScore)) {
						if (returnPossibilities) {
							return ['away'];
						}
						return 'away';
					}
				}

				//matchs sans penalty
			} else {
				//draw
				if (parseInt(betHomeScore) == parseInt(betAwayScore)) {
					if (returnPossibilities) {
						return ['draw'];
					}
					return 'draw';

					//winner home
				} else if (parseInt(betHomeScore) > parseInt(betAwayScore)) {
					if (returnPossibilities) {
						return ['home'];
					}
					return 'home';

					//winner away
				} else if (parseInt(betHomeScore) < parseInt(betAwayScore)) {
					if (returnPossibilities) {
						return ['away'];
					}
					return 'away';
				}
			}
		}
	};
	return BetApi;
}]);
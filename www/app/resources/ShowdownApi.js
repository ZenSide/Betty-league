'use strict';
betty2App.factory('ShowdownApi', function ($q, BetApi, $filter, BettyLeagueApi, ResourcesFactory, BtLocalStorage) {
	var ShowdownApi = {

		//User Sign In
		getFullRange: function (bettyLeagueId, resolve, reject, noCache, live) {
			var fullRange = BtLocalStorage.getObject('FullRange' + bettyLeagueId);


			if (fullRange && !noCache) {
				resolve(fullRange['hydra:member']);
				return;
			}

			var params = {
				'bettyLeagueId': bettyLeagueId
			};

			if (live) {
				params.live = true;
			}

			ResourcesFactory.get('/api/showdowns/fullrange', params).then(function (data) {

				if (!live) {
					BtLocalStorage.setObject('FullRange' + bettyLeagueId, data);
					resolve(data['hydra:member']);
					return;
				} else {
					var liverange = data['hydra:member'];
					angular.forEach(liverange, function(showdown) {
						ShowdownApi.setShowdown(showdown, bettyLeagueId, function () {
							resolve(data['hydra:member']);
							return;
						}, function (messages) {
							reject(messages);
							return;
						})
					});
				}
			}, function (messages) {
				//error
				reject(messages);
				return;
			});
		},

		setShowdown: function (showdown, bettyLeagueId, resolve, reject, noCache) {
			ShowdownApi.getFullRange(bettyLeagueId, function (showdownFullrange) {

				var arrayLength = showdownFullrange.length;
				var fundShowdownIndex = null;
				for (var i = 0; i < arrayLength; i++) {
					if (showdownFullrange[i].id == showdown.id) {
						fundShowdownIndex = i;
					}
				}

				if (fundShowdownIndex !== null) {
					showdownFullrange[fundShowdownIndex] = showdown;
				} else {
					//showdownFullrange.push(showdown);
				}

				ShowdownApi.setFullRange(bettyLeagueId, showdownFullrange);

				resolve(true);
				return;

			}, function (messages) {
				reject(messages);
				return;
			}, noCache)
		},

		setFullRange: function (bettyLeagueId, newFullRange) {
			var fullRange = BtLocalStorage.getObject('FullRange' + bettyLeagueId);

			fullRange['hydra:member'] = newFullRange;

			BtLocalStorage.setObject('FullRange' + bettyLeagueId, fullRange);
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


					if (fullRange.length > 0) {
						sdDefer.resolve(fullRange[fullRange.length - 1]);
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
						if (fullRange[i-1] !== undefined) {
							nextShowdownId = fullRange[i-1].id
						} else {
							nextShowdownId = null;
						}
					}
				}
				resolve(nextShowdownId);

				return;

			}, function (messages) {
				reject(messages);
				return;
			}, noCache)
		},

		getShowdownStatus: function (showdown) {
			if (showdown.smFixture.sm__time__status === 'POSTP') {
				var startdate = new Date(showdown.smFixture.sm__time__startingAt__dateTime);
				var now = new Date().getTime();
				var start = startdate.getTime();
				var distance = start - now;
				if (distance <= 0) {
					return 'REPORTE';
				} else {
					return 'OPEN';
				}
			}

			return showdown.smFixture.showdownStatus;
		},

		getShowdownExtendedStatus: function (showdown, bet) {
			var status = ShowdownApi.getShowdownStatus(showdown);
			var classes = '';

			if (bet && status == 'OPEN') {
				classes += 'open-parie';

			} else if (status == 'OPEN') {
				classes += 'open';

			} else if (bet && status == 'CLOSED') {
				classes += 'closed-parie';

			} else if (status == 'CLOSED') {
				classes += 'closed';

			} else if (bet && status == 'LOCKED') {
				classes += 'locked-parie';

			} else if (status == 'LOCKED') {
				classes += 'locked';

			} else if (bet && status == 'REPORTE') {
				classes += 'reporte-parie';

			} else if (status == 'REPORTE') {
				classes += 'reporte';
			}

			return classes;
		}

	};
	return ShowdownApi;
});
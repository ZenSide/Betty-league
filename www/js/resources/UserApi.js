'use strict';
betty2App.factory('UserApi', function (BtLoading, $rootScope, $cordovaFacebook, BtMessages, BtNavigate, ResourcesFactory, BtLocalStorage, AVATAR_HEIGHT, AVATAR_WIDTH) {
	var UserApi = {

		//User Sign In
		sign: function (newUser, resolve, reject) {
			ResourcesFactory.post('/api/users/signin', newUser, true).then(function (data) {
				//Success Sign In

				BtLocalStorage.setObject('User', data);

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

		login: function (credentials, resolve, reject) {
			credentials.logfromfb = false;
			ResourcesFactory.post('/login_api', credentials, true).then(function (data) {

				BtLocalStorage.setObject('User', data);
				var messages = [
					{
						context: 'success',
						content: 'LOGIN.AUTHSUCCESS'
					}
				];
				resolve(messages);
				return;
			}, function (messages) {
				reject(messages);
				return;
			});
		},

		getUser: function () {
			return BtLocalStorage.getObject('User');
		},

		fbLogin: function (resolve, reject) {
			$cordovaFacebook.login(['public_profile']).then(function (response) {
				var authtoken = response.authResponse.accessToken;
				$cordovaFacebook
					.api('me/' + '?fields=id, name,email,first_name,last_name,gender,picture.height(' + AVATAR_HEIGHT + ').width(' + AVATAR_WIDTH + ')' + '&access_token=' + authtoken, ['public_profile', 'user_friends', 'email'])
					.then(function (response) {
						BtLoading.startLoad();
						var fbCredentials = {
							logfromfb: true,
							fbresult: response
						};

						ResourcesFactory.post('/login_api', fbCredentials, true).then(function (data) {
							BtLocalStorage.setObject('User', data);
							var messages = [
								{
									context: 'success',
									content: 'LOGIN.AUTHSUCCESS'
								}
							];
							resolve(messages);
							return;
						}, function (messages) {
							reject (messages);
							return;
						});
					}).catch(function () {
						var messages = [
							{
								context: 'alert',
								content: 'MESSAGES.GENERALERROR'
							}
						];
						reject (messages);
						return;
					});
			});
		},

		logout: function () {
			BtLocalStorage.remove('User');
			BtNavigate.stateChange('goBottom', 'login', {
				'animDirection': 'fade'
			});
		}
	};
	return UserApi;
});
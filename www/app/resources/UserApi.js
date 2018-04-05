'use strict';
betty2App.factory('UserApi', function ($rootScope, $timeout, $cordovaFacebook, BtMessages, BtNavigate, ResourcesFactory, BtLocalStorage, AVATAR_HEIGHT, AVATAR_WIDTH) {
	var UserApi = {

		//User Sign In
		sign: function (newUser) {
			ResourcesFactory.post('/api/users/signin', newUser, true).then(function (data) {
				//Success Sign In

				BtLocalStorage.setObject('User', data);

				var messages = [
					{
						context: 'success',
						content: 'LOGIN.SIGNSUCCESS'
					}
				];
				BtMessages.show(messages, null, function () {
					BtNavigate.stateChange('', 'landing');
				});
			}, function (messages) {

				//Sign Fail
				BtMessages.show(messages);
			});
		},

		login: function (credentials) {
			credentials.logfromfb = false;
			ResourcesFactory.post('/login_api', credentials, true).then(function (data) {

				BtLocalStorage.setObject('User', data);

				var messages = [
					{
						context: 'success',
						content: 'LOGIN.AUTHSUCCESS'
					}
				];
				BtMessages.show(messages, null, function () {
					BtNavigate.stateChange('', 'landing');
				});
			}, function (messages) {
				BtMessages.show(messages);
				BtLoading.endLoad();
			});
		},

		fbLogin: function () {
			$cordovaFacebook.login(['public_profile']).then(function (response) {
				var authtoken = response.authResponse.accessToken;
				$cordovaFacebook
					.api('me/' + '?fields=id, name,email,first_name,last_name,gender,picture.height(' + AVATAR_HEIGHT + ').width(' + AVATAR_WIDTH + ')' + '&access_token=' + authtoken, ['public_profile', 'user_friends', 'email'])
					.then(function (response) {
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
							BtMessages.show(messages, null, function () {
								BtNavigate.stateChange('', 'landing');
							});
						}, function (messages) {
							BtMessages.show(messages);
							BtLoading.endLoad();
						});
					}.catch(function () {
						var messages = [
							{
								context: 'alert',
								content: 'MESSAGES.GENERALERROR'
							}
						];
						BtMessages.show(messages);
						BtLoading.endLoad();
					}));
			});
			console.log('nobug');
		},

	};
	return UserApi;
});
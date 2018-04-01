'use strict';
betty2App.factory('UserApi', function($rootScope, $timeout, $cordovaFacebook, BtMessages, BtNavigate, BtLoading, ResourcesFactory, BtLocalStorage, AVATAR_HEIGHT, AVATAR_WIDTH) {
  var UserApi = {

    //User Sign In
    sign : function(newUser){
      BtLoading.startLoad();
      ResourcesFactory.post('/api/users/signin', newUser, true).then(function (data) {
        //Success Sign In

        BtLocalStorage.setObject('User', data);

        var messages = [
          {
            context:'success',
            content: 'LOGIN.SIGNSUCCESS'
          }
        ];
        BtMessages.show(messages,null,function(){
          BtNavigate.stateChange('goRight','login');
          BtLoading.endLoad();
        });
      }, function (messages) {

        //Sign Fail
        BtMessages.show(messages);
        BtLoading.endLoad();
        return;
      });
    },

    login : function(credentials){
      BtLoading.startLoad();
      credentials.logfromfb = false;
      ResourcesFactory.post('/login_api', credentials, true).then(function (data) {

        BtLocalStorage.setObject('User', data);

        var messages = [
          {
            context:'success',
            content: 'LOGIN.AUTHSUCCESS'
          }
        ];
        BtMessages.show(messages, null, function(){
          BtNavigate.stateChange('goTop','leagues');
          BtLoading.endLoad();
        });
      }, function (messages) {
        BtMessages.show(messages);
        BtLoading.endLoad();
        return;
      });
    },

    fbLogin: function () {
      //BtLoading.startLoad();
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
                    context:'success',
                    content: 'LOGIN.AUTHSUCCESS'
                  }
                ];
                BtMessages.show(messages, null, function(){
                  BtNavigate.stateChange('goTop','leagues');
                  BtLoading.endLoad();
                });
              }, function (messages) {
                BtMessages.show(messages);
                BtLoading.endLoad();
                return;
              });
            });
      });
      console.log('nobug');
    },

  };
  return UserApi;
});
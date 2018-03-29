'use strict';
betty2App.factory('UserApi', function($rootScope, BtMessages, BtNavigate, BtLoading, ResourcesFactory, BtLocalStorage) {
  var UserApi = {

    //User Sign In
    sign : function(newUser){
      BtLoading.startLoad();
      ResourcesFactory.post('/api/users/signin', newUser).then(function () {

        //Success Sign In
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

    login : function(user){
      BtLoading.startLoad();
      user.logfromfb = false;
      ResourcesFactory.post('/login_api', user, true).then(function (data) {

        BtLocalStorage.setObject('User', data);

        console.log(BtLocalStorage.getObject('User'));

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
      return $q(function (resolve, reject) {
        $cordovaFacebook.login(['public_profile', 'user_friends', 'email']).then(function (response) {
          var authtoken = response.authResponse.accessToken;
          $cordovaFacebook.api('me/' + '?fields=id, name,email,first_name,last_name,gender,picture.height(' + Config.CONST.AVATAR_HEIGHT + ').width(' + Config.CONST.AVATAR_WIDTH + ')' + '&access_token=' + authtoken, ['public_profile', 'user_friends', 'email']).then(function (response) {
            $log.log(response);
            var fbCredentials = {
              logfromfb: true,
              fbresult: response
            };
            User.login(fbCredentials).then(function (response) {
              resolve(response);
            }, function (error) {
              reject(error);
            });
          }, function (error) {
            $log.log(error);
            reject(error);
          });
        }, function (error) {
          $log.log(error);
          reject(error);
        });
      });
    },

  };
  return UserApi;
});
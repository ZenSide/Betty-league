'use strict';
betty2App.factory('UserApi', function($rootScope, BtMessages, BtNavigate, BtLoading, ResourcesFactory) {
  var UserApi = {
    sign : function(newUser){
      BtLoading.startLoad();
      ResourcesFactory.post('/api/users/signin', newUser).then(function () {
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
        BtMessages.show(messages);
        BtLoading.endLoad();
        return;
      });
    },
    login : function(user){
      BtLoading.startLoad();
      user.logfromfb = false;
      ResourcesFactory.post('/login_api', user, true).then(function (data) {
        //UserLocal.setToken(data.token);
        //UserLocal.setInfos(data);
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
  };
  return UserApi;
});
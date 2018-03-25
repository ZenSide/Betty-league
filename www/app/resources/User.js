'use strict';
betty2App.run(function ($localForage) {
  $localForage.createInstance({
    name: 'User'
  });
}).factory('UserLocal', function ($localForage) {
  var userStore = $localForage.instance('User');
  var UserLocal = {
    setInfos: function (loginResponse) {
      var infos = {
        'email': loginResponse.email,
        'pseudo': loginResponse.pseudo,
        'image64': loginResponse.image64
      };
      return userStore.setItem('infos', infos);
    },
    getInfos: function () {
      return userStore.getItem('infos');
    },
    setToken: function (token) {
      return userStore.setItem('token', token);
    },
    getToken: function () {
      return userStore.getItem('token');
    },
    clear: function () {
      return userStore.clear();
    }
  };
  return UserLocal ;
})
.factory('UserApi', function(UserLocal, $rootScope, BtMessages, BtNavigate, BtLoading, ResourcesFactory) {
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
        UserLocal.setToken(data.token);
        UserLocal.setInfos(data);
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
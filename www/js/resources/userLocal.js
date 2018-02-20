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
});

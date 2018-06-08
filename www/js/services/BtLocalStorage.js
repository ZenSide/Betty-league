betty2App.factory('BtLocalStorage', ['$window', 'BtNavigate', function($window, BtNavigate) {
  return {
    getUser: function () {
      return this.getObject('User');
    },
    set: function(key, value) {
      var userPrefix = '';
      if (key !== 'User') {
        var user = this.getUser();
        userPrefix = user.id;
      }
      $window.localStorage[userPrefix + key] = value;
    },
    get: function(key, defaultValue) {
      var userPrefix = '';
      if (key !== 'User') {
        var user = this.getUser();
        userPrefix = user.id;
      }
      return $window.localStorage[userPrefix + key] || defaultValue;
    },
    setObject: function(key, value) {
      var userPrefix = '';
      if (key !== 'User') {
        var user = this.getUser();
        userPrefix = user.id;
      }
      $window.localStorage[userPrefix + key] = JSON.stringify(value);
    },
    getObject: function(key) {
      var userPrefix = '';
      if (key !== 'User') {
        var user = this.getUser();
        userPrefix = user.id;
      }
      return JSON.parse($window.localStorage[userPrefix + key] || false);
    },
    remove: function(key) {
      var userPrefix = '';
      if (key !== 'User') {
        var user = this.getUser();
        userPrefix = user.id;
      }
      $window.localStorage.removeItem(userPrefix + key);
    },
    purge: function() {
      var user = this.getUser();
      $window.localStorage.clear();
      if (!user) {
        BtNavigate.stateChange(null, 'login');
      }
      this.setObject('User', user);
    }
  }
}]);
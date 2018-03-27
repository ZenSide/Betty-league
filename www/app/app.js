// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var betty2App = angular.module(
  'betty2',
  [
    'ionic',
    'restangular',
    'pascalprecht.translate',
    'ngCordova',
    'LocalForageModule'
  ]
);

betty2App.run(function($localForage, $http, $ionicPlatform, $rootScope, $timeout, $state, $translate, BtNavigate) {

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  //INIT ROOTSCOPES
  $rootScope.btLoading = false;
  $rootScope.btLoadingNoCon = false;

  //TRANSLATION
  if(typeof navigator.globalization !== "undefined") {
    navigator.globalization.getPreferredLanguage(function(language) {
      $translate.use((language.value).split("-")[0]).then(function(data) {
        console.log("SUCCESS -> " + data);
      }, function(error) {
        console.log("ERROR -> " + error);
      });
    }, null);
  }
}).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/pages/login/login.html',
      controller: 'LoginCtrl',
      resolve: {
        translations: function ($translate) {
          return $translate([
              'LOGIN.FOOTER.MDP',
              'LOGIN.FOOTER.SIGN',
              'LOGIN.FOOTER.LOG',
              'LOGIN.FOOTER.FB'
            ]
          ).then(function (translations) {
            return translations
          });
        }
      }
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'app/pages/signin/signin.html',
      controller: 'SigninCtrl'
    });
  $urlRouterProvider.otherwise('/login');
});


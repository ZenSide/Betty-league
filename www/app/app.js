// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var betty2App = angular.module(
  'betty2',
  [
    'ionic',
    'ionic.native',
    'ngTouch',
    'pascalprecht.translate',
    'ngclipboard'
  ]
);

betty2App.run(function($http, $ionicPlatform, $cordovaNetwork, $rootScope, $timeout, $state, $translate, $cordovaKeyboard, BtLoading, BtMessages) {

  FastClick.attach(document.body);

  //INIT ROOTSCOPES
  $rootScope.btLoading = false;
  $rootScope.btLoadingPhantom = false;

  //TRANSLATION
  if(typeof navigator.globalization !== "undefined") {
    navigator.globalization.getPreferredLanguage(function(language) {
      $translate.use((language.value).split("-")[0]).then(function(data) {
      }, function(error) {
      });
    }, null);
  }

  BtLoading.startLoad();

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    $cordovaKeyboard.hideKeyboardAccessoryBar(true);

    // Don't remove this line unless you know what you are doing. It stops the viewport
    // from snapping when text inputs are focused. Ionic handles this internally for
    // a much nicer keyboard experience.
    $cordovaKeyboard.disableScroll(true);
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(function ($ionicConfigProvider) {
  //$ionicConfigProvider.scrolling.jsScrolling(false);
})
;
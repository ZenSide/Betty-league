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
    'pascalprecht.translate'
  ]
);

betty2App.run(function($http, $ionicPlatform, $cordovaNetwork, $rootScope, $timeout, $state, $translate, $cordovaKeyboard, BtLoading, BtMessages) {
  FastClick.attach(document.body);

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

    $translate(['MESSAGES.NOCON']).then(function (translations) {

      //Network listener
      $cordovaNetwork.onConnect().subscribe(function() {
        console.log('online');
        $timeout(function() {
          BtLoading.endLoad(true);
        })
      });

      $cordovaNetwork.onDisconnect().subscribe(function() {
        console.log('offline');
        $timeout(function() {
          BtMessages.show([{
            context:"success",
            content:translations['MESSAGES.NOCON']
          }]);
          BtLoading.startLoad(true);
        })
      });
    });
  });
});
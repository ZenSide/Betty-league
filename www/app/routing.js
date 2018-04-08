betty2App.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    //USER
        .state('login', {
            url: '/login',
            templateUrl: 'app/pages/login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'loginCtrl',
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
            controller: 'SigninCtrl as signinCtrl',
            controllerAs: 'signinCtrl',
            resolve: {
                translations: function ($translate) {
                    return $translate([
                            'SIGNIN.PLACEHOLDERS.NEXT',
                        ]
                    ).then(function (translations) {
                        return translations
                    });
                }
            }
        })

        .state('landing', {
            url: '/landing',
            templateUrl: 'app/pages/landing/landing.html',
            controller: 'LandingCtrl',
            controllerAs: 'landingCtrl',
            resolve: {
                routeDispatcher: function ($q, BtLocalStorage, $state, BtNavigate, ShowdownApi, BettyLeagueApi, BtMessages) {
                    var deferred = $q.defer();

                    var localUser =  BtLocalStorage.getObject('User');

                    //User found
                    if (localUser !== {}) {
                        //Get my availables bettyleagues
                        BettyLeagueApi.getBettyWorld(function (bettyWorld) {
                            //find worldbettyLeague
                            //go to world bettyleague
                            console.log(bettyWorld);

                            //go to the next unbet showdown
                            ShowdownApi.getNextOpenShowDown(bettyWorld.id, function (showdown) {

                                BtNavigate.stateChange('goTop' ,'bettyleague.showdown.step', {
                                    'bettyLeagueId' : bettyWorld.id,
                                    'showdownId' : showdown.id,
                                    'stepId' : '0'
                                });
                            }, function (messages) {
                                BtMessages.show(messages, null, function () {
                                    BtNavigate.stateChange('', 'login');
                                })
                            }, true);

                        }, function (messages) {
                            BtMessages.show(messages, null, function () {
                                BtNavigate.stateChange('', 'login');
                            })
                        }, true);
                    } else {
                        //User not found
                        BtNavigate.stateChange('', 'login');
                    }
                    return deferred.promise;
                }
            }
        })

        .state('bettyleague', {
            abstract: true,
            url: '/bettyleague/:bettyLeagueId',
            templateUrl: 'app/pages/bettyleague/bettyleague.html',
            controller: 'BettyLeagueCtrl',
            controllerAs: 'bettyLeagueCtrl',
            resolve: {
                fullRange: function (ShowdownApi, BtNavigate, $stateParams, $q) {
                    var deferred = $q.defer();
                    ShowdownApi.getFullRange($stateParams.bettyLeagueId, function (data) {
                        deferred.resolve(data);
                    }, function () {
                        BtNavigate.stateChange('', 'login');
                    }, true);
                    return deferred.promise;
                }
            }
        })

        .state('bettyleague.showdown', {
            abstract: true,
            url: '/showdown/:showdownId',
            templateUrl: 'app/pages/bettyleague/showdown/showdown.html',
            controller: 'ShowdownCtrl',
            controllerAs: 'showdownCtrl',
            resolve: {
            }
        })

        .state('bettyleague.showdown.step', {
            url: '/step/:stepId',
            templateUrl: 'app/pages/bettyleague/showdown/step/step.html',
            controller: 'StepCtrl',
            controllerAs: 'stepCtrl',
            resolve: {
            }
        });

    $urlRouterProvider.otherwise('/landing');
});
betty2App.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    //USER
        .state('login', {
            url: '/login/:animDirection',
            params: {animDirection: null},
            templateUrl: 'app/pages/login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'loginCtrl',
            resolve: {
                animation: function (BtNavigate, $stateParams) {
                    return BtNavigate.anim($stateParams.animDirection);
                },
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
            url: '/signin/:animDirection',
            params: {animDirection: null},
            templateUrl: 'app/pages/signin/signin.html',
            controller: 'SigninCtrl as signinCtrl',
            controllerAs: 'signinCtrl',
            resolve: {
                animation: function (BtNavigate, $stateParams) {
                    return BtNavigate.anim($stateParams.animDirection);
                },
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
                routeDispatcher: function ($timeout, $q, BtLocalStorage, $state, BtNavigate, ShowdownApi, BettyLeagueApi, BtMessages) {
                    var deferred = $q.defer();

                    var localUser =  BtLocalStorage.getObject('User');
                    console.log(localUser);
                    //User found
                    if (Object.keys(localUser).length > 0) {
                        console.log('user ofund');
                        //Get my availables bettyleagues
                        BettyLeagueApi.getBettyWorld(function (bettyWorld) {
                            //find worldbettyLeague
                            //go to world bettyleague
                            //go to the next unbet showdown
                            ShowdownApi.getNextOpenShowDown(bettyWorld.id, function (showdown) {

                                BtNavigate.stateChange('goTop' ,'bettyleague.showdown.step0', {
                                    'bettyLeagueId' : bettyWorld.id,
                                    'showdownId' : showdown.id,
                                    'animDirection' : 'fade'
                                });
                            }, function (messages) {
                                BtMessages.show(messages, null, function () {
                                    BtNavigate.stateChange(null, 'login');
                                })
                            }, true);

                        }, function (messages) {
                            BtMessages.show(messages, null, function () {
                                BtNavigate.stateChange(null, 'login');
                            })
                        }, true);
                    } else {
                        //User not found
                        console.log('user not ofund');
                        $timeout(function () {
                            BtNavigate.stateChange(null, 'login');
                        })
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
                bettyLeague: function (BettyLeagueApi, BtNavigate, $stateParams, $q) {
                    var deferred = $q.defer();
                    BettyLeagueApi.getBettyLeague($stateParams.bettyLeagueId, function (bettyLeague) {
                        deferred.resolve(bettyLeague);
                    }, function (messages) {
                        BtMessages.show(messages, null, function () {
                            BtNavigate.stateChange(null, 'login');
                        })
                    });
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
                showdown: function (ShowdownApi, BtNavigate, $stateParams, $q) {
                    var deferred = $q.defer();
                    ShowdownApi.getShowdown($stateParams.bettyLeagueId, $stateParams.showdownId, function (showdown) {
                        deferred.resolve(showdown);
                    }, function (messages) {
                        BtMessages.show(messages, null, function () {
                            BtNavigate.stateChange(null, 'login');
                        })
                    });
                    return deferred.promise;
                },
                bet: function (BetApi, BtNavigate, $stateParams, $q) {
                    var deferred = $q.defer();
                    BetApi.getBet($stateParams.bettyLeagueId, $stateParams.showdownId, function (bet) {
                        deferred.resolve(bet);
                    }, function(messages) {
                        BtMessages.show(messages, null, function () {
                            BtNavigate.stateChange(null, 'login');
                        })
                    });
                    return deferred.promise;
                },
                nextShowDownId: function ($stateParams, ShowdownApi, BtMessages, $q) {
                    var deferred = $q.defer();
                    ShowdownApi.getNextShowdown($stateParams.bettyLeagueId, $stateParams.showdownId, function (nextShowdownID) {
                        deferred.resolve(nextShowdownID);
                    }, function (messages) {
                        BtMessages.show(messages, null, function () {
                        })
                    });
                    return deferred.promise;
                },
                previousShowDownId: function ($stateParams, ShowdownApi, BtMessages, $q) {
                    var deferred = $q.defer();
                    ShowdownApi.getPreviousShowdown($stateParams.bettyLeagueId, $stateParams.showdownId, function (previousShowDownId) {
                        deferred.resolve(previousShowDownId);
                    }, function (messages) {
                        BtMessages.show(messages, null, function () {
                        })
                    });
                    return deferred.promise;
                }
            }
        })

        .state('bettyleague.showdown.step0', {
            url: '/step0/:animDirection',
            params: {animDirection: null},
            templateUrl: 'app/pages/bettyleague/showdown/step0/step0.html',
            controller: 'Step0Ctrl',
            controllerAs: 'step0Ctrl',
            resolve: {
                translations: function ($translate) {
                    return $translate([
                            'SHOWDOWN.BET',
                            'SHOWDOWN.MODIFY'
                        ]
                    ).then(function (translations) {
                        return translations
                    });
                },
                animation: function (BtNavigate, $stateParams) {
                    return BtNavigate.anim($stateParams.animDirection);
                },
            }
        })
    
        .state('bettyleague.showdown.step1', {
            url: '/step1/:animDirection',
            params: {animDirection: null},
            templateUrl: 'app/pages/bettyleague/showdown/step1/step1.html',
            controller: 'Step1Ctrl',
            controllerAs: 'step1Ctrl',
            resolve: {
                translations: function ($translate) {
                    return $translate([
                        ]
                    ).then(function (translations) {
                        return translations
                    });
                },
                animation: function (BtNavigate, $stateParams) {
                    return BtNavigate.anim($stateParams.animDirection);
                },
            }
        })
    
        .state('bettyleague.showdown.step2', {
            url: '/step2/:animDirection',
            params: {animDirection: null},
            templateUrl: 'app/pages/bettyleague/showdown/step2/step2.html',
            controller: 'Step2Ctrl',
            controllerAs: 'step2Ctrl',
            resolve: {
                translations: function ($translate) {
                    return $translate([
                        ]
                    ).then(function (translations) {
                        return translations
                    });
                },
                animation: function (BtNavigate, $stateParams) {
                    return BtNavigate.anim($stateParams.animDirection);
                },
            }
        })

        .state('bettyleague.showdown.step3', {
            url: '/step3/:animDirection',
            params: {animDirection: null},
            templateUrl: 'app/pages/bettyleague/showdown/step3/step3.html',
            controller: 'Step3Ctrl',
            controllerAs: 'stepCtrl',
            resolve: {
                translations: function ($translate) {
                    return $translate([
                        ]
                    ).then(function (translations) {
                        return translations
                    });
                },
                animation: function (BtNavigate, $stateParams) {
                    return BtNavigate.anim($stateParams.animDirection);
                },
            }
        })

    ;

    $urlRouterProvider.otherwise('/landing');
});
betty2App.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
    //USER
        .state('login', {
            url: '/login/:animDirection',
            params: {animDirection: null},
            templateUrl: 'js/pages/login/login.html',
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
            templateUrl: 'js/pages/signin/signin.html',
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
            templateUrl: 'js/pages/landing/landing.html',
            controller: 'LandingCtrl',
            controllerAs: 'landingCtrl',
            resolve: {
                routeDispatcher: function (UserApi, $timeout, $q, BtLocalStorage, $state, BtNavigate, ShowdownApi, BettyLeagueApi, BtMessages) {
                    var deferred = $q.defer();
                    var localUser =  UserApi.getUser();
                    //User found
                    if (localUser) {
                        //Get my availables bettyleagues
                        BtNavigate.stateChange('goTop', 'home', {
                            'animDirection' : 'fade'
                        });
                        //BettyLeagueApi.getBettyWorld(function (bettyWorld) {
                        //    //find worldbettyLeague
                        //    //go to world bettyleague
                        //    //go to the next unbet showdown
                        //    ShowdownApi.getNextOpenShowDown(bettyWorld.id, function (showdown) {
                        //        BtNavigate.stateChange('goTop' ,'bettyleague.showdown.step0', {
                        //            'bettyLeagueId' : bettyWorld.id,
                        //            'showdownId' : showdown.id,
                        //            'animDirection' : 'fade'
                        //        });
                        //    }, function (messages) {
                        //        BtMessages.show(messages, null, function () {
                        //            BtNavigate.stateChange(null, 'login');
                        //        })
                        //    }, true);
                        //
                        //}, function (messages) {
                        //    BtMessages.show(messages, null, function () {
                        //        BtNavigate.stateChange(null, 'login');
                        //    })
                        //}, true);
                    } else {
                        //User not found
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
            templateUrl: 'js/pages/bettyleague/bettyleague.html',
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
                },
                seasonScore: function seasonScore(BettyLeagueApi, $q, $stateParams) {
                    var d = $q.defer();
                    BettyLeagueApi.getSeasonScore($stateParams.bettyLeagueId, function (score) {
                        d.resolve(score);
                    }, function (messages) {
                        d.reject(messages)
                    });
                    return d.promise;
                }
            }
        })

        .state('bettyleague.showdown', {
            abstract: true,
            url: '/showdown/:showdownId',
            templateUrl: 'js/pages/bettyleague/showdown/showdown.html',
            controller: 'ShowdownCtrl',
            controllerAs: 'showdownCtrl',
            resolve: {
                showdown: function (ShowdownApi, BtNavigate, $stateParams, $q, BtMessages) {
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
                bet: function (BetApi, BtNavigate, $stateParams, $q, BtMessages) {
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
            templateUrl: 'js/pages/bettyleague/showdown/step0/step0.html',
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
            templateUrl: 'js/pages/bettyleague/showdown/step1/step1.html',
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
    
        .state('bettyleague.showdown.step2'    , {
            url: '/step2/:animDirection',
            params: {animDirection: null},
            templateUrl: 'js/pages/bettyleague/showdown/step2/step2.html',
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
            templateUrl: 'js/pages/bettyleague/showdown/step3/step3.html',
            controller: 'Step3Ctrl',
            controllerAs: 'step3Ctrl',
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

        .state('account', {
            url: '/account/:animDirection',
            templateUrl: 'js/pages/account/account.html',
            controller: 'AccountCtrl',
            controllerAs: 'accountCtrl',
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

        .state('listMatch', {
            url: '/bettyleague/:bettyLeagueId/showdown/:showdownId/listmatch/:animDirection',
            params: {animDirection: null},
            templateUrl: 'js/pages/listMatch/listMatch.html',
            controller: 'ListMatchCtrl',
            controllerAs: 'listMatchCtrl',
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
                showdowns: function (ShowdownApi, $stateParams, $q, BtMessages, BtNavigate) {
                    var deferred = $q.defer();
                    ShowdownApi.getFullRange($stateParams.bettyLeagueId, function (fullrange) {
                        deferred.resolve(fullrange);
                    }, function (messages) {
                        BtMessages.show(messages, null, function () {
                            BtNavigate.stateChange(null, 'login');
                        });
                    });
                    return deferred.promise;

                },
                bets: function (BetApi, $stateParams, $q, BtMessages, BtNavigate) {
                    var deffered = $q.defer();
                    BetApi.getFullRange($stateParams.bettyLeagueId, function (fullrange) {
                        deffered.resolve(fullrange);
                    }, function (messages) {
                        BtMessages.show(messages, null, function () {
                            BtNavigate.stateChange(null, 'login');
                        });
                    })
                    return deffered.promise;
                },
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
    
        .state('ranking', {
            url: '/bettyleague/:bettyLeagueId/showdown/:showdownId/ranking/:animDirection',
            params: {animDirection: null},
            templateUrl: 'js/pages/ranking/ranking.html',
            controller: 'RankingCtrl',
            controllerAs: 'rankingCtrl',
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
                },
                ranking: function (BettyLeagueApi, BtNavigate, $stateParams, $q) {
                    var deferred = $q.defer();
                    BettyLeagueApi.getRanking($stateParams.bettyLeagueId, {
                        'period': 'full_season'
                    }, function (ranking) {
                        deferred.resolve(ranking);
                    }, function (messages) {
                        BtMessages.show(messages, null, function () {
                            BtNavigate.stateChange(null, 'login');
                        })
                    });
                    return deferred.promise;
                }
            }
        })
    
        .state('privateleagues', {
            url: '/privateleagues/:animDirection',
            params: {animDirection: null},
            templateUrl: 'js/pages/privateLeagues/privateLeagues.html',
            controller: 'PrivateLeaguesCtrl',
            controllerAs: 'privateLeaguesCtrl',
            resolve: {
                translations: function ($translate) {
                    return $translate([
                        ]
                    ).then(function (translations) {
                        return translations
                    });
                },
                myBettyLeagues: function (BettyLeagueApi, $q, BtMessages) {
                    var deferred = $q.defer();
                    BettyLeagueApi.getMyBettyLeagues(function (bettyleagues) {
                        deferred.resolve(bettyleagues);
                    }, function (messages) {
                        BtMessages.show(messages)
                    });
                    return deferred.promise;
                },
                animation: function (BtNavigate, $stateParams) {
                    return BtNavigate.anim($stateParams.animDirection);
                }
            }
        })

        .state('createleague', {
            url: '/createLeague/:animDirection',
            params: {animDirection: null},
            templateUrl: 'js/pages/createLeague/createLeague.html',
            controller: 'CreateLeagueCtrl',
            controllerAs: 'createLeagueCtrl',
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
                }
            }
        })

        .state('joinleague', {
            url: '/joinLeague/:animDirection',
            params: {animDirection: null},
            templateUrl: 'js/pages/joinLeague/joinLeague.html',
            controller: 'JoinLeagueCtrl',
            controllerAs: 'joinLeagueCtrl',
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
                }
            }
        })

        .state('home', {
            url: '/home/:animDirection',
            params: {animDirection: null},
            templateUrl: 'js/pages/home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'homeCtrl',
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
                }
            }
        })

    ;

    $urlRouterProvider.otherwise('/landing');
}]);
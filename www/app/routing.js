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
                routeDispatcher: function ($q, BtLocalStorage, $state, BtNavigate, ShowdownApi) {
                    var deferred = $q.defer();
                    var localUser =  BtLocalStorage.getObject('User');

                    //User found
                    if (localUser !== {}) {
                        //ShowdownApi.getFullRange();
                        BtNavigate.stateChange('goTop', 'bettyleague.showdown.step', {
                            'bettyLeagueId' : 'world',
                            'showdownId' : '2',
                            'stepId' : '1'
                        });
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
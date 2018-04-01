betty2App.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    //USER
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
            controller: 'SigninCtrl',
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
            url: '/landing/:connected:int',
            templateUrl: 'app/pages/landing/landing.html',
            controller: 'LandingCtrl',
            resolve: {
                routeDispatcher: function ($q, $stateParams, BtLocalStorage, UserApi) {
                    var deferred = $q.defer();
                    var connected = $stateParams.connected;
                    var localUser =  BtLocalStorage.getObject('User');

                    //User found
                    if (localUser !== {}) {
                        //LogIn
                        UserApi.login({
                            username: localUser.username,
                            password: localUser.password
                        })

                    } else {

                    }




                    return deferred.promise;

                }
            }
        })


    $urlRouterProvider.otherwise('/landing');
});
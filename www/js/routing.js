betty2App.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        //USER
        .state('login', {
            url: '/login',
            templateUrl: 'pages/login/login.html',
            controller: 'LoginCtrl'
        })

        .state('signin', {
            url: '/signin',
            templateUrl: 'views/userLogin/signin.html',
            controller: 'SigninCtrl'
        })

        .state('leagues', {
            url: '/leagues',
            templateUrl: 'views/league/choose-league.html',
            controller: 'ChooseLigueCtrl'
        })

    $urlRouterProvider.otherwise('/login');
});
betty2App.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        //USER
        .state('login', {
            url: '/login',
            templateUrl: 'app/pages/login/login.html',
            controller: 'LoginCtrl'
        })

        .state('signin', {
            url: '/signin',
            templateUrl: 'app/pages/signin/signin.html',
            controller: 'SigninCtrl'
        })


    $urlRouterProvider.otherwise('/login');
});
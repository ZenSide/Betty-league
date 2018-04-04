betty2App.controller('ParentCtrl', function ($scope, $rootScope) {
    var parentCtrl = this;

    $rootScope.fbCredentials = {};

    $rootScope.viewAnimClass = 'goTop';
    $rootScope.showMessages = false;
    $rootScope.messages = [];
    $rootScope.showFormMessages = false;
    $rootScope.activeinputs = "";


    $scope.parentParams = {};
    $scope.parentParams.withHeadLogo = false;


    parentCtrl.footerStatus = {
        leftBt : {
            btShow : false,
        },
        middleBt : {
            btShow : false,
        },
        rightBt : {
            btShow : false,
        }
    }
});
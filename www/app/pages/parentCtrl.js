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
            active : false,
            ico : "",
            position: "left",
            size: "tiny",
            label:"",
            focus : false,
            disabled: false,
            submitform:false,
            action:function(){
            }
        },
        middleBt : {
            active : false,
            ico : "",
            position: "middle",
            size: "tiny",
            label:"",
            focus : false,
            disabled: false,
            submitform:false,
            action:function(){
            }
        },
        rightBt : {
            active : false,
            ico : "",
            position: "right",
            size: "tiny",
            label:"",
            focus : false,
            disabled: false,
            submitform:false,
            action:function(){
            }
        }
    }
});
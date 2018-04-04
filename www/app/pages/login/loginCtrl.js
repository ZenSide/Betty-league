betty2App.controller('LoginCtrl', function ($rootScope, UserApi,BtMessages,BtNavigate,$scope,translations) {

    $scope.parentParams.withHeadLogo = true;

    // Login
    $scope.user = {
        username:'',
        password:''
    };

    $scope.fieldsNames = [
        'btEmail',
        'btPassword'
    ];

    $scope.loginBtn = {
        content: translations['LOGIN.FOOTER.LOG']
    };
    $scope.submitForm = function(form){
        if(form.$valid){
            UserApi.login($scope.user);
        }
        else{
            BtMessages.showFormMessages(form,$scope.fieldsNames);
        }
    };

    //FB Connect
    $scope.fbBtn = {
        content:translations['LOGIN.FOOTER.FB']
    };

    $scope.fbConnect = function () {
        UserApi.fbLogin()
    };

    //footer actions
    $scope.parentCtrl.footerStatus = {
        leftBt : {
            active : true,
            ico : "fas fa-unlock",
            position: "left",
            size: "medium",
            label:translations['LOGIN.FOOTER.MDP'],
            focus : false,
            disabled: false,
            action:function(){
                BtNavigate.stateChange('goRight','login');
            }
        },
        middleBt : {
            active : true,
            ico : "icon-bty-ico-join",
            position: "middle",
            size: "medium",
            label:translations['LOGIN.FOOTER.SIGN'],
            focus : false,
            disabled: false,
            action:function(){
                BtNavigate.stateChange('goLeft','signin');
            }
        },
        rightBt : {
            active : false
        }
    }
});
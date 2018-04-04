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
            btShow : true,
            btPosition: "left",
            btClasses: "bt-action--big",
            btButtonClasses: "bt-action__btn--gold bt-action__btn--disabled",
            btIco : "fas fa-unlock",
            btLabel:translations['LOGIN.FOOTER.MDP'],
            btDisabled: false,
            btSubmitForm: null,
            action:function(){
                BtNavigate.stateChange('goRight','login');
            }
        },
        middleBt : {
            active : false,
        },
        rightBt : {
            active : false
        }
    }

    $scope.parentCtrl.footerStatus = {
        leftBt : {
            btShow : true,
            btPosition: "left",
            btClasses: "bt-action--medium",
            btButtonClasses: "",
            btIco : "fas fa-unlock",
            btLabel:translations['LOGIN.FOOTER.MDP'],
            btDisabled: false,
            btSubmitForm: null,
            action:function(){
                BtNavigate.stateChange('goRight','login');
            }
        },
        middleBt : {
            btShow : true,
            btPosition: "middle",
            btClasses: "bt-action--big",
            btButtonClasses: "",
            btIco : "fab fa-angellist",
            btLabel:translations['LOGIN.FOOTER.SIGN'],
            btDisabled: false,
            btSubmitForm: null,
            action:function(){
                BtNavigate.stateChange('goLeft','signin');
            }
        },
        rightBt : {
            active : false
        }
    }
});
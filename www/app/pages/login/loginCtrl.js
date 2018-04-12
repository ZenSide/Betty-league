betty2App.controller('LoginCtrl', function ($scope, UserApi,BtMessages,BtNavigate,translations,BtLoading) {
    BtLoading.endLoad();
    var loginCtrl = this;

    // Login
    loginCtrl.user = {
        username:'',
        password:''
    };

    loginCtrl.loginBtn = {
        content: translations['LOGIN.FOOTER.LOG']
    };

    var fieldsNames = [
        'btEmail',
        'btPassword'
    ];

    loginCtrl.submitForm = function(form){
        if(form.$valid){
            BtLoading.startLoad();
            UserApi.login(loginCtrl.user, function (messages) {
                BtNavigate.stateChange(null, 'landing');
            }, function (messages) {
                BtLoading.endLoad();
                BtMessages.show(messages, null);
            })
        }
        else{
            BtMessages.showFormMessages(form, fieldsNames);
        }
    };

    //FB Connect
    loginCtrl.fbBtn = {
        content:translations['LOGIN.FOOTER.FB']
    };

    loginCtrl.fbConnect = function () {
        BtLoading.startLoad();
        UserApi.fbLogin(function (messages) {
            BtNavigate.stateChange(null, 'landing');
        }, function (messages) {
            BtLoading.endLoad();
            BtMessages.show(messages, null);
        })
    };

    //parent config

    $scope.parentCtrl.withHeadLogo = true;
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
            btIco : "icon-bty-ico-join",
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
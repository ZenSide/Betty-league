betty2App.controller('PasswordLostCtrl', ['animation', 'BtLoading', 'BtMessages', 'UserApi', 'BtNavigate', '$scope', 'translations',
    function (animation, BtLoading, BtMessages, UserApi, BtNavigate, $scope, translations) {
    BtLoading.endLoad();
    var passwordLostCtrl = this;

    //parent config
    var withHeadLogo = true;
    var footerStatus = {
        leftBt : {
            btShow : true,
            btPosition: "left",
            btClasses: "bt-action--medium",
            btButtonClasses: "",
            btIco : "fas fa-arrow-left",
            btLabel: null,
            btDisabled: false,
            btSubmitForm: null,
            action:function(){
                BtNavigate.stateChange('goRight','login', {
                    'animDirection' : 'left'
                });
            }
        },
        middleBt : {
            btShow : false,
        },
        rightBt : {
            active : false
        }
    };
    animation.promise.then(function () {
        $scope.parentCtrl.withHeadLogo = withHeadLogo;
        $scope.parentCtrl.footerStatus = footerStatus;
    });

    passwordLostCtrl.passwordLost = {
        email:'',
    };

    var fieldsNames = [
        'btUsername',
        'btEmail',
        'btPlainPassword',
        'btConfirmPassword',
        'btPseudo'
    ];

    passwordLostCtrl.submitBtn = {
        'content' : translations['SIGNIN.PLACEHOLDERS.PASSWORDLOST']
    };

    var preventTwice = false;


    passwordLostCtrl.submitForm = function(form){
        if (preventTwice) {
            preventTwice = false;
            return;
        }
        preventTwice = true;
        if(form.$valid){
            //form message handling
              BtLoading.startLoad();
              UserApi.passwordLost(passwordLostCtrl.passwordLost, function (messages) {
                preventTwice = false;
                BtLoading.endLoad();
                BtMessages.show(messages, null);
                passwordLostCtrl.passwordLost = {
                  email:'',
                };
              }, function (messages) {
                preventTwice = false;
                BtLoading.endLoad();
                  BtMessages.show(messages, null);
              })
        }
        else{
            preventTwice = false;
            BtMessages.showFormMessages(form, fieldsNames);
        }
    };
}]);

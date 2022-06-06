betty2App.controller('SigninCtrl', ['animation', 'BtLoading', 'BtMessages', 'UserApi', 'BtNavigate', '$scope', 'translations',
    function (animation, BtLoading, BtMessages, UserApi, BtNavigate, $scope, translations) {
    BtLoading.endLoad();
    var signinCtrl = this;

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

    // fosuser
    signinCtrl.newUser = {
        email:'',
        plainPassword:'',
        confirmPassword:'',
        pseudo:''
    };

    var fieldsNames = [
        'btUsername',
        'btEmail',
        'btPlainPassword',
        'btConfirmPassword',
        'btPseudo'
    ];

    signinCtrl.submitBtn = {
        'content' : translations['SIGNIN.PLACEHOLDERS.NEXT']
    };

    var preventTwice = false;


    signinCtrl.submitForm = function(form){
        if (preventTwice) {
            preventTwice = false;
            return;
        }
        preventTwice = true;
        if(form.$valid){
            //form message handling
            if(signinCtrl.newUser.plainPassword != signinCtrl.newUser.confirmPassword){
                BtMessages.showFormMessages(form,['btPlainPassword','btConfirmPassword'],null,null,true);
                BtMessages.show([{content:"SIGNIN.MESSAGES.PASSWORDDIFF",context:"alert"}])
            }
            else{
                BtLoading.startLoad();
                UserApi.sign(signinCtrl.newUser, function (messages) {
                    BtMessages.show(messages, null, function () {
                        BtNavigate.stateChange('', 'landing');
                    });
                }, function (messages) {
                    BtLoading.endLoad();
                    BtMessages.show(messages, null);
                })
            }
        }
        else{
            preventTwice = false;
            BtMessages.showFormMessages(form, fieldsNames);
        }
    };
}]);

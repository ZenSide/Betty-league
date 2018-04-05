betty2App.controller('SigninCtrl', function (BtMessages, UserApi, BtNavigate, $timeout, $scope, translations) {

    var signinCtrl = this;

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

    signinCtrl.submitForm = function(form){
        if(form.$valid){
            //form message handling
            if(signinCtrl.newUser.plainPassword != signinCtrl.newUser.confirmPassword){
                BtMessages.showFormMessages(form,['btPlainPassword','btConfirmPassword'],null,null,true);
                BtMessages.show([{content:"SIGNIN.MESSAGES.PASSWORDDIFF",context:"alert"}])
            }
            else{
                UserApi.sign(signinCtrl.newUser);
            }
        }
        else{
            BtMessages.showFormMessages(form, fieldsNames);
        }
    };

    //parent config
    $scope.parentCtrl.withHeadLogo = true;
    $scope.parentCtrl.footerStatus = {
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
                BtNavigate.stateChange('goRight','login');
            }
        },
        middleBt : {
            btShow : false,
        },
        rightBt : {
            active : false
        }
    }
});
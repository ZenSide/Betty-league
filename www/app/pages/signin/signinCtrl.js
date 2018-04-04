betty2App.controller('SigninCtrl', function (BtMessages, UserApi, BtNavigate, $timeout, $scope, translations) {

    $scope.parentParams.withHeadLogo = true;

    // fosuser
    $scope.newUser = {
        email:'',
        plainPassword:'',
        confirmPassword:'',
        pseudo:''
    };

    $scope.fieldsNames = [
        'btUsername',
        'btEmail',
        'btPlainPassword',
        'btConfirmPassword',
        'btPseudo'
    ];

    $scope.submitBtn = {
        'content' : translations['SIGNIN.PLACEHOLDERS.NEXT']
    };

    $scope.submitForm = function(form){
        if(form.$valid){
            //form message handling
            if($scope.newUser.plainPassword != $scope.newUser.confirmPassword){
                BtMessages.showFormMessages(form,['btPlainPassword','btConfirmPassword'],null,null,true);
                BtMessages.show([{content:"SIGNIN.MESSAGES.PASSWORDDIFF",context:"alert"}])
            }
            else{
                UserApi.sign($scope.newUser);
            }
        }
        else{
            BtMessages.showFormMessages(form,$scope.fieldsNames);
        }
    };

    $scope.signInForm = {};

    $scope.parentCtrl.footerStatus = {
        leftBt : {
            active : true,
            ico : "fas fa-arrow-left",
            position: "left",
            size: "tiny",
            context: "blue",
            focus : false,
            disabled: false,
            action:function(){
                BtNavigate.stateChange('goRight','login');
            }
        },
        middleBt : {
            active : false,
        },
        rightBt : {
            active : false,
        }
    };
});
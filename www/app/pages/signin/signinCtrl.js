betty2App.controller('SigninCtrl', function (BtMessages, UserApi, BtNavigate, $timeout, $scope, translations) {

    // fosuser
    $scope.newUser = {
        email:'sdfg@sdfg.sdfg',
        plainPassword:'123',
        confirmPassword:'123'
    };

    $scope.fieldsNames = [
        'btUsername',
        'btEmail',
        'btPlainPassword',
        'btConfirmPassword'
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

    $scope.$parent.withHeadLogo = false;

    $scope.$parent.headerNavStatus = {
        leftBt : {
            active : false,
        },
        rightBt : {
            active : false,
        }
    };
    $scope.$parent.footerStatus = {
        leftBt : {
            active : true,
            ico : "fas fa-arrow-left",
            position: "left",
            size: "tiny",
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
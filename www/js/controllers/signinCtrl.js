betty2App.controller('SigninCtrl', function (BtMessages,UserApi,BtNavigate,$timeout,Restangular,$scope,$translate,$rootScope) {

    // fosuser
    $scope.newUser = {
        pseudo:'sgfqs',
        email:'sdfg@sdfg.sdfg',
        plainPassword:'123',
        confirmPassword:'123'
    };

    $scope.fieldsNames = [
        'btUsername',
        'btEmail',
        'btPlainPassword',
        'btConfirmPassword'
    ]

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

    $translate([
            'LOGIN.FOOTER.LOG'
        ]
    ).then(function (translations) {
        $scope.$parent.headerNavStatus = {
            leftBt : {
                active : false,
            },
            rightBt : {
                active : false,
            }
        }
        $scope.$parent.footerStatus = {
            leftBt : {
                active : true,
                ico : "ion-arrow-left-c",
                position: "left",
                size: "tiny",
                context:"other",
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
                active : true,
                ico : "ion-checkmark-round",
                position: "right",
                size: "huge",
                label:"",
                context:"normal",
                focus : false,
                disabled: false,
                submitform: 'signFormId',
                action:function(){
                }
            }
        }

    });//TRANSLATIONS



})
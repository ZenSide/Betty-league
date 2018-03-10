betty2App.controller('LoginCtrl', function (UserApi,BtMessages,BtNavigate,$scope,$translate) {
    $scope.fieldsNames = [
        'btEmail',
        'btPassword'
    ]

    // fosuser
    $scope.user = {
        email:'',
        password:'',
    };

    $scope.submitForm = function(form){
        if(form.$valid){
            UserApi.login($scope.user);
        }
        else{
            BtMessages.showFormMessages(form,$scope.fieldsNames);
        }
    };

    $scope.signInForm = {};


    $translate([
        'LOGIN.FOOTER.MDP',
        'LOGIN.FOOTER.SIGN'
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
                ico : "ion-lock-combination",
                position: "left",
                size: "tiny",
                label:translations['LOGIN.FOOTER.MDP'],
                context:"other",
                focus : false,
                disabled: false,
                action:function(){
                    BtNavigate.stateChange('goRight','login');
                }
            },
            middleBt : {
                active : true,
                ico : "ion-person-add",
                position: "middle",
                size: "tiny",
                label:translations['LOGIN.FOOTER.SIGN'],
                context:"other",
                focus : false,
                disabled: false,
                action:function(){
                    BtNavigate.stateChange('goLeft','signin');
                }
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
                submitform: 'loginformId',
                action:function(){
                }
            }
        }
    });
});
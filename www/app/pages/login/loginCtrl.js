betty2App.controller('LoginCtrl', function (UserApi,BtMessages,BtNavigate,$scope,$translate) {
    $scope.fieldsNames = [
        'btEmail',
        'btPassword'
    ]

    // fosuser
    $scope.user = {
        email:'',
        password:''
    };

    $scope.submitForm = function(form){
        if(form.$valid){
            UserApi.login($scope.user);
        }
        else{
            BtMessages.showFormMessages(form,$scope.fieldsNames);
        }
    };
    $scope.$parent.withHeadLogo = true;

    $scope.signInForm = {};

    $translate([
        'LOGIN.FOOTER.MDP',
        'LOGIN.FOOTER.SIGN'
        ]
    ).then(function (translations) {
        $scope.$parent.footerStatus = {
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
                size: "big",
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
});
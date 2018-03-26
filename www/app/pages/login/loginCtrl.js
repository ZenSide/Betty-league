betty2App.controller('LoginCtrl', function (UserApi,BtMessages,BtNavigate,$scope,translations) {

    console.log(translations);

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

    $scope.loginBtn = {
        content:translations['LOGIN.FOOTER.LOG'],
        context: 'gold',
        submitform: 'loginformId'
    };

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
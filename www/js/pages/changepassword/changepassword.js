betty2App.controller('ChangePasswordCtrl',
  ['$scope', 'animation', 'BtLoading', 'BtNavigate', 'translations', 'BtMessages', 'UserApi',
    function ($scope, animation, BtLoading, BtNavigate, translations, BtMessages, UserApi) {
	BtLoading.endLoad();

  var changePasswordCtrl = this;

  $scope.parentCtrl.activeHeaderBtns = [false, false, false, false, true];

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
        BtNavigate.stateChange('goRight','account', {
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
    $scope.parentCtrl.withHeadLogo = false;
    $scope.parentCtrl.footerStatus = footerStatus;
  });



  changePasswordCtrl.newUser = {
    plainPassword:'',
    confirmPassword:'',
  };

  var fieldsNames = [
    'btPlainPassword',
    'btConfirmPassword',
  ];

  changePasswordCtrl.submitBtn = {
    'content' : translations['SIGNIN.PLACEHOLDERS.CHANGEPASSWORD']
  };

  var preventTwice = false;


  changePasswordCtrl.submitForm = function(form){
    if (preventTwice) {
      preventTwice = false;
      return;
    }
    preventTwice = true;
    if(form.$valid){
      //form message handling
      if(changePasswordCtrl.newUser.plainPassword !== changePasswordCtrl.newUser.confirmPassword){
        BtMessages.showFormMessages(form,['btPlainPassword','btConfirmPassword'],null,null,true);
        BtMessages.show([{content:"SIGNIN.MESSAGES.PASSWORDDIFF",context:"alert"}])
      }
      else{
        BtLoading.startLoad();
        UserApi.changePassword(changePasswordCtrl.newUser, function (messages) {
          preventTwice = false;
          changePasswordCtrl.newUser = {
            plainPassword:'',
            confirmPassword:'',
          };
          BtLoading.endLoad();
          BtMessages.show(messages, null);
        }, function (messages) {
          preventTwice = false;
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

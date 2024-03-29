betty2App.controller('LoginCtrl', ['animation', '$scope', 'UserApi', 'BtMessages', 'BtNavigate', 'translations', 'BtLoading', function (animation, $scope, UserApi, BtMessages, BtNavigate, translations, BtLoading) {
  BtLoading.endLoad();
  var loginCtrl = this;

  //parent config

  var withHeadLogo = true;
  var footerStatus = {
    leftBt: {
      btShow: false,
      btPosition: "left",
      btClasses: "bt-action--medium",
      btButtonClasses: "",
      btIco: "fas fa-unlock",
      btLabel: translations['LOGIN.FOOTER.MDP'],
      btDisabled: false,
      btSubmitForm: null,
      action: function () {
      }
    },
    middleBt: {
      btShow: true,
      btPosition: "middle",
      btClasses: "bt-action--medium",
      btButtonClasses: "",
      btIco: "icon-bty-ico-join",
      btLabel: translations['LOGIN.FOOTER.SIGN'],
      btDisabled: false,
      btSubmitForm: null,
      action: function () {
        BtNavigate.stateChange('goLeft', 'signin', {
          'animDirection': 'right'
        });
      }
    },
    rightBt: {
      active: false
    }
  };
  animation.promise.then(function () {
    $scope.parentCtrl.withHeadLogo = withHeadLogo;
    $scope.parentCtrl.footerStatus = footerStatus;
    $scope.parentCtrl.withBigLogo = withHeadLogo;
  });

  // Login
  loginCtrl.user = {
    username: '',
    password: ''
  };
  loginCtrl.loginBtn = {
    content: translations['LOGIN.FOOTER.LOG']
  };
  var fieldsNames = [
    'btEmail',
    'btPassword'
  ];
  var preventTwice = false;
  loginCtrl.submitForm = function (form) {
    if (preventTwice) {
      preventTwice = false;
      return;
    }
    preventTwice = true;
    if (form.$valid) {
      BtLoading.startLoad();
      UserApi.login(loginCtrl.user, function (messages) {
        preventTwice = false;
        BtNavigate.stateChange(null, 'landing');
      }, function (messages) {
        preventTwice = false;
        BtLoading.endLoad();
        BtMessages.show(messages, null);
      })
    } else {
      preventTwice = false;
      BtMessages.showFormMessages(form, fieldsNames);
    }
  };

  //FB Connect
  loginCtrl.fbBtn = {
    content: translations['LOGIN.FOOTER.FB'],
    disabled: ionic.Platform.isWebView()
  };

  loginCtrl.fbConnect = function () {
    UserApi.fbLogin(function (messages) {
      BtNavigate.stateChange(null, 'landing');
    }, function (messages) {
      BtLoading.endLoad();
      BtMessages.show(messages, null);
    })
  };

  loginCtrl.lostPswd = function () {
    BtNavigate.stateChange('goLeft', 'passwordlost', {
      'animDirection': 'right'
    });
  }
}]);

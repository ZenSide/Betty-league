// This factory intercepts every request and put token on headers
betty2App
.factory('BtUser', function(UserLocal, $rootScope,BtMessages,BtNavigate,BtLoading, ResourcesFactory) {
    var BtUser = {
        sign : function(newUser){
            BtLoading.startLoad();
            ResourcesFactory.post('/api/users/signin', newUser).then(function () {
                var messages = [
                    {
                        context:'success',
                        content: 'LOGIN.SIGNSUCCESS'
                    }
                ];
                BtMessages.show(messages,null,function(){
                    BtNavigate.stateChange('goRight','login');
                    BtLoading.endLoad();
                });
            }, function (messages) {
                BtMessages.show(messages);
                BtLoading.endLoad();
                return;
            });
        },
        login : function(user){
            BtLoading.startLoad();
            user.logfromfb = false;
            ResourcesFactory.post('/login_api', user, true).then(function (data) {
                UserLocal.setToken(data.token);
                UserLocal.setInfos(data);
                var messages = [
                    {
                        context:'success',
                        content: 'LOGIN.AUTHSUCCESS'
                    }
                ];
                BtMessages.show(messages, null, function(){
                    BtNavigate.stateChange('goTop','leagues');
                    BtLoading.endLoad();
                });
            }, function (messages) {
                BtMessages.show(messages);
                BtLoading.endLoad();
                return;
            });

            //$http({
            //    method: 'POST',
            //    url: window.LOGIN_URL,
            //    headers: {
            //        'Content-Type': 'application/x-www-form-urlencoded'
            //    },
            //    data: service.serializeDate(user)
            //    // with success, we store token to sessionStorage
            //}).success(function(data) {
            //    Auth.connect(data.token); //Update the state of the user in the app
            //    var messages = [
            //        {
            //            context:'success',
            //            content: 'LOGIN.AUTHSUCCESS'
            //        }
            //    ];
            //    BtMessages.show(messages,null,function(){
            //        BtNavigate.stateChange('goTop','leagues');
            //        BtLoading.endLoad();
            //    });
            //}).error(function(res) {
            //    Auth.deco();
            //    if(res.code == 401){
            //        var messages = [
            //            {
            //                context:'alert',
            //                content: 'LOGIN.AUTHFAIL'
            //            }
            //        ];
            //        if (badauthcallback) badauthcallback();
            //        BtMessages.show(messages,2000,function(){
            //            BtLoading.endLoad();
            //        });
            //    }
            //    else{
            //        var messages = [
            //            {
            //                context:'alert',
            //                content:"MESSAGES.GENERALERROR"
            //            }
            //        ];
            //        BtMessages.show(messages);
            //    }
            //});

        },
    };
    return BtUser;
})

.factory('Auth', function(Storage){
    var user = false;

    return{
        connect : function(token){
            user = true;
            if (token) Storage.setToken(token);
        },
        deco : function(){
            user = false;
            Storage.delToken();
        },
        isLoggedIn : function(){
            return user;
        }
    }
})

.factory('Storage',function($window){
    return{
        setToken : function(token){
            $window.sessionStorage.token = token;
        },
        getToken : function(){
            return $window.sessionStorage.token;
        },
        delToken : function(){
            delete $window.sessionStorage.token;
        }
    }
})
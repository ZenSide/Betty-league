// This factory intercepts every request and put token on headers
betty2App.factory('authInterceptor', function($rootScope, $q, $window,Storage,$location,Auth,BtLoading) {
    return {
        request: function (config) {
            config.headers = config.headers || {};

            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + Storage.getToken();
            }
            return config;
        },

        response: function (response) {
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if(rejection.status == 401){
                Auth.deco();
                BtLoading.endLoad();
                $location.path('/login');
            }
            return $q.reject(rejection);
        }
    };
})

.factory('BtUser', function($rootScope,Restangular,BtMessages,BtNavigate,BtLoading,$http,Auth) {
    var service = {
        contactApi : Restangular.all('users'),
        sign : function(newUser){
            BtLoading.startLoad();
            service.contactApi.customPOST(newUser,"signin").then(function () {
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

                newUser = {};
            }, function (response) {
                if(response.data){
                    if(response.data['@type'] == "ConstraintViolationList"){
                        var messages = [];
                        angular.forEach(response.data['violations'], function(value, key) {
                            messages.push(
                                {
                                    context:'alert',
                                    content:value.message
                                }
                            )
                        });
                        BtMessages.show(messages);
                        BtLoading.endLoad();
                        return;
                    }
                }
                var messages = [
                    {
                        context:'alert',
                        content:"MESSAGES.GENERALERROR"
                    }
                ];
                BtMessages.show(messages);
                BtLoading.endLoad();

            });
        },
        login : function(user,badauthcallback){
            BtLoading.startLoad();
            $http({
                method: 'POST',
                url: window.LOGIN_URL,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: service.serializeDate(user)
                // with success, we store token to sessionStorage
            }).success(function(data) {
                Auth.connect(data.token); //Update the state of the user in the app
                var messages = [
                    {
                        context:'success',
                        content: 'LOGIN.AUTHSUCCESS'
                    }
                ];
                BtMessages.show(messages,null,function(){
                    BtNavigate.stateChange('goTop','leagues');
                    BtLoading.endLoad();
                });
            }).error(function(res) {
                Auth.deco();
                if(res.code == 401){
                    var messages = [
                        {
                            context:'alert',
                            content: 'LOGIN.AUTHFAIL'
                        }
                    ];
                    if (badauthcallback) badauthcallback();
                    BtMessages.show(messages,2000,function(){
                        BtLoading.endLoad();
                    });
                }
                else{
                    var messages = [
                        {
                            context:'alert',
                            content:"MESSAGES.GENERALERROR"
                        }
                    ];
                    BtMessages.show(messages);
                }
            });

        },
        serializeDate : function( data ){
            // If this is not an object, defer to native stringification.
            if ( ! angular.isObject( data ) ) {
                return( ( data == null ) ? "" : data.toString() );
            }
            var buffer = [];
            // Serialize each key in the object.
            for ( var name in data ) {
                if ( ! data.hasOwnProperty( name ) ) {
                    continue;
                }
                var value = data[ name ];
                buffer.push(
                    encodeURIComponent( name ) + "=" + encodeURIComponent( ( value == null ) ? "" : value )
                );
            }
            // Serialize the buffer and clean it up for transportation.
            var source = buffer.join( "&" ).replace( /%20/g, "+" );
            return( source );
        }
    };
    return service;
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
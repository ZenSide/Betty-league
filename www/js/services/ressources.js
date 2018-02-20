betty2App.factory('ResourcesFactory', function($q, $http, $rootScope, UserLocal, API_BASE_URL) {

    var ResourcesFactory = {
        errorHandling: function (data, status) {
            var messages = [];
            console.log('status: ' + status);

            if (data && data['@type'] === "ConstraintViolationList") {
                angular.forEach(data['violations'], function(value) {
                    messages.push(
                      {
                          context:'alert',
                          content:value.message
                      }
                    )
                });
            } else {
                messages = [
                    {
                        context:'alert',
                        content:"MESSAGES.GENERALERROR"
                    }
                ];
            }

            return messages;
        },
        basePost: function (url, data, config, resolve, reject) {
            $http.post(API_BASE_URL + url, data, config)
                .success(function (data) {
                    resolve(data);
                }).error(function (data, status) {
                    reject(ResourcesFactory.errorHandling(data, status));
                });
        },

        post: function (url, data, anonimous) {
            return $q(function (resolve, reject) {
                var config = {};
                if (!anonimous) {
                    UserLocal.getToken().then(function (token) {
                        config.headers = {
                            Authorization: 'Bearer ' + token
                        };
                        ResourcesFactory.basePost(url, data, config, resolve, reject);
                    }, function (error) {
                        reject(error);
                    });
                }
                else {
                    ResourcesFactory.basePost(url, data, config, resolve, reject);
                }
            });
        },

        baseGet: function (url, config, resolve, reject) {
            $http.get(API_BASE_URL + url, config)
                .success(function (data) {
                    resolve(data);
                }).error(function (data, status) {
                    reject(ResourcesFactory.errorHandling(data, status));
                });
        },

        get: function (url, params, anonimous) {
            return $q(function (resolve, reject) {
                var config = {
                    'params' : params
                };
                if (!anonimous) {
                    UserLocal.getToken().then(function (token) {
                        config.headers = {
                            Authorization: 'Bearer ' + token
                        };
                        ResourcesFactory.baseGet(url, config, resolve, reject);
                    }, function (error) {
                        reject(error);
                    });
                }
                else {
                    ResourcesFactory.baseGet(url, config, resolve, reject);
                }
            });
        }
    };
    return ResourcesFactory;
});
betty2App.factory('ResourcesFactory', ['$q', '$http', '$rootScope', 'API_BASE_URL', 'BtLocalStorage', 'BtNavigate', function($q, $http, $rootScope, API_BASE_URL, BtLocalStorage, BtNavigate) {

    var ResourcesFactory = {
        errorHandling: function (data, status) {
            var messages = [];
            if (data && data['@type'] === "ConstraintViolationList") {
                angular.forEach(data['violations'], function (value) {
                    messages.push(
                        {
                            context: 'alert',
                            content: value.message
                        }
                    )
                });
            } else if (data && data['hydra:description'] !== undefined) {
                messages = [
                    {
                        context: 'alert',
                        content: data['hydra:description']
                    }
                ]
            } else {
                switch (status) {
                    case 401:
                        BtNavigate.stateChange(null, 'login');
                        messages = [
                            {
                                context:'alert',
                                content:"LOGIN.AUTHFAIL"
                            }
                        ];
                        break;
                    default:
                        messages = [
                            {
                                context:'alert',
                                content:"MESSAGES.GENERALERROR"
                            }
                        ];
                }
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
                var config = {
                    'timeout' : 30000
                };
                if (!anonimous) {
                    var User = BtLocalStorage.getObject('User');
                    config.headers = {
                        Authorization: 'Bearer ' + User.token
                    };
                    ResourcesFactory.basePost(url, data, config, resolve, reject);
                }
                else {
                    ResourcesFactory.basePost(url, data, config, resolve, reject);
                }
            });
        },

        basePut: function (url, data, config, resolve, reject) {
            $http.put(API_BASE_URL + url, data, config)
                .success(function (data) {
                    resolve(data);
                }).error(function (data, status) {
                reject(ResourcesFactory.errorHandling(data, status));
            });
        },

        put: function (url, data, anonimous) {
            return $q(function (resolve, reject) {
                var config = {};
                if (!anonimous) {
                    var User = BtLocalStorage.getObject('User');
                    config.headers = {
                        Authorization: 'Bearer ' + User.token
                    };
                    ResourcesFactory.basePut(url, data, config, resolve, reject);
                }
                else {
                    ResourcesFactory.basePut(url, data, config, resolve, reject);
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
                    'params' : params,
                    'timeout' : 30000
                };
                if (!anonimous) {
                    var User = BtLocalStorage.getObject('User');
                    config.headers = {
                        Authorization: 'Bearer ' + User.token
                    };
                    ResourcesFactory.baseGet(url, config, resolve, reject);
                }
                else {
                    ResourcesFactory.baseGet(url, config, resolve, reject);
                }
            });
        }
    };
    return ResourcesFactory;
}]);
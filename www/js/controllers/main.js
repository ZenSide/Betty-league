betty2App.controller('MainCtrl', function ($timeout,$scope, $http, $window, Restangular) {


        // fosuser user
        $scope.user = {username: 'admin', password: '123456'};

        // var to display login success or related error
        $scope.message = '';

        // In my example, we got contacts and phones
        var contactApi = Restangular.all('contacts');
        var phoneApi = Restangular.all('telephones');

        // This function is launched when page is loaded or after login
        function loadContacts() {
            // get Contacts
            contactApi.getList().then(function (contacts) {
                $scope.contacts = contacts;
                var contact = contacts[0];
                contact.name = 'cacaboubou';
                contact.put();
            });

            // get Phones (throught abstrat CommunicationWays alias moyensComm)
            phoneApi.getList().then(function (phone) {
                $scope.phone = phone;
            });

            // some vars set to default values
            $scope.newContact = {};
            $scope.newPhone = {};
            $scope.contactSuccess = false;
            $scope.phoneSuccess = false;
            $scope.contactErrorTitle = false;
            $scope.contactErrorDescription = false;
            $scope.phoneErrorTitle = false;
            $scope.phoneErrorDescription = false;

            $scope.contactModif = {name:'hop'};

            $scope.specialContact = function(contact,contactModif){
                contact.name = contactModif.name;
                contact.customPUT(contact,"special")
            }

            $scope.filtreContact = function(input)
            {
                contactApi.getList({name:input}).then(function (contacts) {
                    $timeout(function(){
                        $scope.contacts = contacts;
                    })
                });
            }

            // contactForm handling
            $scope.createContact = function (form) {
                contactApi.post($scope.newContact).then(function () {
                    // load contacts & phones when a contact is added
                    loadContacts();

                    // show success message
                    $scope.contactSuccess = true;
                    $scope.contactErrorTitle = false;
                    $scope.contactErrorDescription = false;

                    // re-init contact form
                    $scope.newContact = {};
                    form.$setPristine();

                    // manage error handling
                }, function (response) {
                    $scope.contactSuccess = false;
                    $scope.contactErrorTitle = response.data['hydra:title'];
                    $scope.contactErrorDescription = response.data['hydra:description'];
                });
            };

            // Exactly same thing as above, but for phones
            $scope.createPhone = function (form) {
                phoneApi.post($scope.newPhone).then(function () {
                    loadContacts();

                    $scope.phoneSuccess = true;
                    $scope.phoneErrorTitle = false;
                    $scope.phoneErrorDescription = false;

                    $scope.newPhone = {};
                    form.$setPristine();
                }, function (response) {
                    $scope.phoneSuccess = false;
                    $scope.phoneErrorTitle = response.data['hydra:title'];
                    $scope.phoneErrorDescription = response.data['hydra:description'];
                });
            };
        }

        // if a token exists in sessionStorage, we are authenticated !
        if ($window.sessionStorage.token) {
            $scope.isAuthenticated = true;
            loadContacts();
        }

        // login form management
        $scope.submit = function() {
            // login check url to get token
            $http({
                method: 'POST',
                url: window.LOGIN_URL,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $.param($scope.user)

                // with success, we store token to sessionStorage
            }).success(function(data) {
                $window.sessionStorage.token = data.token;
                $scope.message = 'Successful Authentication!';
                $scope.isAuthenticated = true;

                // ... and we load data
                loadContacts();

                // with error(s), we update message
            }).error(function() {
                $scope.message = 'Error: Invalid credentials';
                delete $window.sessionStorage.token;
                $scope.isAuthenticated = false;
            });
        };

        // logout management
        $scope.logout = function () {
            $scope.message = '';
            $scope.isAuthenticated = false;
            delete $window.sessionStorage.token;
        };

        // This factory intercepts every request and put token on headers
    });
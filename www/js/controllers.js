angular.module('cleverbaby.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('DiaryCtrl', function ($scope, $rootScope, $ionicModal, $firebase) {



    $scope.noData = true;

    $scope.list = $rootScope.fbData;




    /*
    bucketListRef.on('value', function (snapshot) {
        var data = snapshot.val();
        console.log('data',snapshot);
        $scope.list = [];
        $scope.list = data;
        if ($scope.list) {
            if ($scope.list.length == 0) {
                $scope.noData = true;
            } else {
                $scope.noData = false;
            }
        } else {

            $scope.noData = true;
        }


    }); */

    $ionicModal.fromTemplateUrl('templates/newItem.html', function (modal) {
        $scope.newTemplate = modal;
    });
    
    $scope.newTask = function () {
        $scope.newTemplate.show();
    };

    $scope.deleteItem = function (key) {
        $rootScope.show("Please wait... Deleting from List");
        var itemRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        bucketListRef.child(key).remove(function (error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully deleted');
            }
        });
    };
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {})


.controller('SignUpCtrl', [
    '$scope', '$rootScope', '$firebaseAuth', '$window',
    function ($scope, $rootScope, $firebaseAuth, $window) {
        $scope.user = {
            email: "",
            password: ""
        };
        $scope.createUser = function () {
            var email = this.user.email;
            var password = this.user.password;

            if (!email || !password) {
                $rootScope.notify("Please enter valid credentials");
                return false;
            }

            $rootScope.show('Please wait.. Registering');
            return $rootScope.auth.$createUser(email, password)
                .then(function () {
                    // createUser success
                    console.log("createUser success");

                    $rootScope.hide();

                    return $rootScope.auth.$authWithPassword({
                        "email": email,
                        "password": password
                    }).then(function (authData) {
                        console.log("Logged in as:", authData.uid);
                        $rootScope.userEmail = authData.uid;
                        $rootScope.checkSession();
                        $window.location.href = ('#/app/diary');
                    }).catch(function (error) {
                        console.error("Authentication failed:", error);
                    });

                })

            .catch(function (error) {
                // createUser failed
                console.error("Error: ", error);
                $rootScope.hide();
                if (error.code == 'INVALID_EMAIL') {
                    $rootScope.notify('Invalid Email Address');
                } else if (error.code == 'EMAIL_TAKEN') {
                    $rootScope.notify('Email Address already taken');
                } else {
                    $rootScope.notify('Oops something went wrong. Please try again later');
                }
            });


        }
    }
  ])

.controller('SignInCtrl', [
  '$scope', '$rootScope', '$firebaseAuth', '$window',
  function ($scope, $rootScope, $firebaseAuth, $window) {
        // check session
        $rootScope.checkSession();
        $scope.user = {
            email: "",
            password: ""
        };
        $scope.validateUser = function () {
            $rootScope.show('Please wait.. Authenticating');
            var email = this.user.email;
            var password = this.user.password;
            if (!email || !password) {
                $rootScope.notify("Please enter valid credentials");
                return false;
            }

            $rootScope.auth.$authWithPassword({
                email: email,
                password: password
            })
                .then(function (user) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    $rootScope.checkSession();
                    $window.location.href = ('#/app/diary');
                }, function (error) {
                    $rootScope.hide();
                    if (error.code == 'INVALID_EMAIL') {
                        $rootScope.notify('Invalid Email Address');
                    } else if (error.code == 'INVALID_PASSWORD') {
                        $rootScope.notify('Invalid Password');
                    } else if (error.code == 'INVALID_USER') {
                        $rootScope.notify('Invalid User');
                    } else {
                        $rootScope.notify('Oops something went wrong. Please try again later');
                    }
                });
        }
  }
])

.controller('newCtrl', function ($rootScope, $scope, $window, $firebase) {
    $scope.data = {
        item: ""
    };

    $scope.close = function () {
        $scope.modal.hide();
    };

    $scope.createNew = function () {
        var item = this.data.item;

        if (!item) return;

        console.log("itme", item);

        $scope.modal.hide();

        $rootScope.show("Please wait... Creating new");

        var form = {
            item: item,
            isCompleted: false,
            created: Date.now(),
            updated: Date.now()
        };

        $rootScope.fbData.$add(form);


        $rootScope.hide();
    };
});
function escapeEmailAddress(email) {
    if (!email) return false
        // Replace '.' (not allowed in a Firebase key) with ','
    email = email.toLowerCase();
    email = email.replace(/\./g, ',');
    return email.trim();
};

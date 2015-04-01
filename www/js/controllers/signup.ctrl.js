angular.module('cleverbaby.controllers')

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
        };
    }
  ]);

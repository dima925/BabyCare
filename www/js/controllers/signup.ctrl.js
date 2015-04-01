angular.module('cleverbaby.controllers')

.controller('SignUpCtrl', [
    '$scope', '$rootScope', '$firebaseAuth', '$location', 'NotificationService', 'AuthService',
    function ($scope, $rootScope, $firebaseAuth, $location, NotificationService, AuthService) {
        $scope.user = {
            email: "",
            password: ""
        };

        $scope.createWithOAuth = function(type){
            AuthService.authWithOAuthPopup(type).then(function(authData){
                $location.path('app/diary');
            });
        };
        $scope.createUser = function () {
            var email = this.user.email;
            var password = this.user.password;

            if (!email || !password) {
                NotificationService.notify("Please enter valid credentials");
                return false;
            }

            NotificationService.show('Please wait.. Registering');
            return AuthService.createUser(email, password)
                .then(function () {
                    NotificationService.hide();

                    return AuthService.authWithPassword({
                        "email": email,
                        "password": password
                    }).then(function (authData) {
                        console.log("Logged in as:", authData.uid);
                        $rootScope.userEmail = authData.uid;
                        $location.path('/app/diary');
                    }).catch(function (error) {
                        console.error("Authentication failed:", error);
                    });

                })

            .catch(function (error) {
                // createUser failed
                console.error("Error: ", error);
                NotificationService.hide();
                if (error.code == 'INVALID_EMAIL') {
                    NotificationService.notify('Invalid Email Address');
                } else if (error.code == 'EMAIL_TAKEN') {
                    NotificationService.notify('Email Address already taken');
                } else {
                    NotificationService.notify('Oops something went wrong. Please try again later');
                }
            });
        };
    }
  ]);

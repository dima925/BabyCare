angular.module('cleverbaby.controllers')
.controller('SignInCtrl', [
  '$scope', '$rootScope', 'AuthService', '$location', 'NotificationService',
  function ($scope, $rootScope, AuthService, $location, NotificationService) {
        // check session
        $rootScope.checkSession();
        $scope.user = {
            email: "",
            password: ""
        };
        $scope.validateUser = function () {
            NotificationService.show('Please wait.. Authenticating');
            var email = this.user.email;
            var password = this.user.password;
            if (!email || !password) {
                NotificationService.notify("Please enter valid credentials");
                return false;
            }
            AuthService.authWithPassword(this.user).then(function(user){
                //$rootScope.checkSession();
                NotificationService.hide();
                $location.path ('app/diary');
            }, function(error){
                NotificationService.notify('Wrong username or password');
            });
            
            /*note: deactive because get error on .then*/
                /*.then(function (user) {
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
                });*/
        };
  }
]);
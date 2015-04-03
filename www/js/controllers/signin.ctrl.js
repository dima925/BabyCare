angular.module('cleverbaby.controllers')
.controller('SignInCtrl', ['$scope', '$rootScope', 'AuthService', '$location', 'NotificationService', '$translate',
  function ($scope, $rootScope, AuthService, $location, NotificationService, $translate) {
        // check session
        //$rootScope.checkSession();
        $scope.user = {
            email: "",
            password: ""
        };

        $scope.createWithOAuth = function(type){
            AuthService.authWithOAuthPopup(type).then(function(authData){
                $location.path('app/diary');
            });
        };
        
        $scope.validateUser = function () {
            NotificationService.show($translate('celeverbaby.auth.signin.message'));
            var email = this.user.email;
            var password = this.user.password;
            if (!email || !password) {
                NotificationService.notify($translate('celeverbaby.auth.signin.error1'));
                return false;
            }
            AuthService.authWithPassword(this.user).then(function(user){
                //$rootScope.checkSession();
                NotificationService.hide();
                $location.path ('app/diary');
            }, function(error){
                NotificationService.notify($translate('celeverbaby.auth.signin.error2'));
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
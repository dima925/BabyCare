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
                AuthService.signInViaOAuth(type).then(function(data){
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
                AuthService.signInViaEmail(this.user.email, this.user.password).then(function(user){
                    //$rootScope.checkSession();
                    NotificationService.hide();
                    $location.path ('app/diary');
                }, function(error){
                    NotificationService.show(JSON.stringify(error));
                });
            };
        }
    ]);

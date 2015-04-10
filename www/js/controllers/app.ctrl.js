angular.module('cleverbaby.controllers')
.controller('AppCtrl', ['$scope', '$ionicModal', '$timeout',  'AuthService', '$location',
    function ($scope, $ionicModal, $timeout, AuthService, $location) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/menu.html',function(menu){
        $scope.menuModal = menu;
    });
    $scope.menu = function(){
        $scope.menuModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newNursed.html',function(nursed){
        $scope.nursedModal = nursed;
    });
    $scope.newNursed = function(){
        $scope.nursedModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newDiapers.html',function(diaper){
        $scope.diapersModal = diaper;
    });
    $scope.newDiapers = function(){
        $scope.diapersModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newBottle.html',function(bottle){
        $scope.bottleModal = bottle;
    });
    $scope.newBottle = function(){
        $scope.bottleModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newNap.html',function(nap){
        $scope.napModal = nap;
    });
    $scope.newNap = function(){
        $scope.napModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newBaby.html',function(baby){
        $scope.babyModal = baby;
    });
    $scope.newBaby = function(){
        $scope.babyModal.show();
    };
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

    $scope.logout = function () {
        AuthService.logout();
        $location.path('/auth/signin');
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
}]);

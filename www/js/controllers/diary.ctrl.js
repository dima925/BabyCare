angular.module('cleverbaby.controllers')
.controller('DiaryCtrl', ['$scope', '$rootScope', '$ionicModal', 'ActivityService', 'NotificationService', '$translate', 'BabyService', 'AuthService',
    function ($scope, $rootScope, $ionicModal, ActivityService, NotificationService, $translate, BabyService, AuthService) {


    $rootScope.babyId = 1;
    AuthService.signInViaEmail('narekx6@gmail.com', 'asdasd').then(function(){
        BabyService.getAllBabies().then(function(babies){
            console.log(babies);
        });
    });

    $scope.noData = true;

    $ionicModal.fromTemplateUrl('templates/activities/item.html', function (modal) {
        $scope.newTemplate = modal;
    });

    $ionicModal.fromTemplateUrl('templates/activities/choose.html',function(activity){
        $scope.activityModal = activity;
    });
    $scope.newActivity = function(){
        $scope.activityModal.show();
    };
    $scope.newTask = function () {
        $scope.newTemplate.show();
    };
     
    $ionicModal.fromTemplateUrl('templates/modals/dropdown.html',function(dropdown){
        $scope.dropdownModal = dropdown;
    });
    $scope.dropdown = function(){
        $scope.modal.hide();
        $scope.dropdownModal.show();
    };
}]);

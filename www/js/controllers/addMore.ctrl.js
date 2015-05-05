angular.module('cleverbaby.controllers')
.controller('AddMoreCtrl', ['$scope','activityModals', function ($scope, activityModals) {

	$scope.closeModal=function(){
        $scope.modal.hide();
    };
    $scope.openModal = function(type){
        $scope.closeModal();
        activityModals.showModal(type);
    };

        /*
    $ionicModal.fromTemplateUrl('templates/modals/baby.html',function(baby){
        $scope.babyModal = baby;
    });
    $scope.newBaby = function(){
        $scope.modal.hide();
        $scope.babyModal.show();
    };
    */
}]);

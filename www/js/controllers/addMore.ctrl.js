angular.module('cleverbaby.controllers')
.controller('AddMoreCtrl', ['$scope','activityModals', '$rootScope', function ($scope, activityModals, $rootScope) {

	$scope.closeModal=function(){
        $rootScope.activatePlus = false;
        $scope.modal.hide();
    };
    $scope.openModal = function(type){
        $rootScope.hidePlusBtn = true;
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

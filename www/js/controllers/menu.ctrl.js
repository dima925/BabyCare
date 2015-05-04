angular.module('cleverbaby.controllers')
.controller('MenuCtrl', ['$scope','$ionicModal', 'activityModals', function ($scope, $ionicModal, activityModals) {

	$scope.closeModal=function(){
        $scope.modal.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modals/addMore.html',function(addmore){
        $scope.addMoreModal = addmore;
    });
    $scope.addMore = function(){
        $scope.modal.hide();
        $scope.addMoreModal.show();
    };
	$scope.newNursed = function(){
		$scope.modal.hide();
        $scope.nursedModal.show();
    };
    $scope.newDiapers = function(){
    	$scope.modal.hide();
        $scope.diapersModal.show();
    };

    $scope.newBottle = function(){
    	$scope.modal.hide();
        $scope.bottleModal.show();
    };

    $scope.openModal = function(type){
        $scope.closeModal();
        activityModals.showModal(type);
    };
}]);
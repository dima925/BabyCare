angular.module('cleverbaby.controllers')
.controller('MenuCtrl', ['$scope', '$rootScope', '$ionicModal', 'activityModals', function ($scope, $rootScope, $ionicModal, activityModals) {

	$scope.closeModal=function(){
        $scope.modal.hide();
        if ($scope.addMoreModal.isShown()){
            $rootScope.activatePlus = true;
        }else{
            $rootScope.activatePlus = false;
        }
    };

    $ionicModal.fromTemplateUrl('templates/modals/addMore.html',function(addmore){
        $scope.addMoreModal = addmore;
    });
    $scope.addMore = function(){
        //$rootScope.activatePlus = true;
        //$scope.modal.hide();
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
        //$scope.closeModal();
        activityModals.showModal(type);
    };
}]);
angular.module('cleverbaby.controllers')
.controller('MenuCtrl', ['$scope', '$rootScope', '$ionicModal', 'activityModals', '$timeout', function ($scope, $rootScope, $ionicModal, activityModals, $timeout) {

	$scope.closeModal=function(){
		$scope.modal.hide();
       	if ($scope.addMoreModal.isShown()){
           // dont hide the floating-plus-button because we want to keep showing it on the addMoreModal
        } else {
		// start animation from x to + and then hide the button after 200 ms, once https://github.com/driftyco/ionic/issues/2342#issuecomment-70394107 is fixed we can get rid of the hardcoded 200ms and listen for animation finish to hide the button
           $rootScope.animatePlusButton = false;
		   $timeout(function(){ $rootScope.showPlusButton = false }, 200);
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
        $rootScope.hidePlusBtn = true;
        //$scope.closeModal();
        activityModals.showModal(type);
    };
}]);
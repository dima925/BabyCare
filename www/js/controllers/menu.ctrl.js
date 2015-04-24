angular.module('cleverbaby.controllers')
.controller('MenuCtrl', ['$scope','$ionicModal', function ($scope,$ionicModal) {
	$scope.closeModal=function(){
        $scope.modal.hide();
    }
    $ionicModal.fromTemplateUrl('templates/addMore.html',function(addmore){
        $scope.addMoreModal = addmore;
    });
    $scope.addMore = function(){
        $scope.modal.hide();
        $scope.addMoreModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newNursed.html',function(nursed){
        $scope.nursedModal = nursed;
    });
	$scope.newNursed = function(){
		$scope.modal.hide();
        $scope.nursedModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newDiapers.html',function(diaper){
        $scope.diapersModal = diaper;
    });
    $scope.newDiapers = function(){
    	$scope.modal.hide();
        $scope.diapersModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newBottle.html',function(bottle){

        $scope.bottleModal = bottle;
    });
    $scope.newBottle = function(){
    	$scope.modal.hide();
        $scope.bottleModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newNap.html',function(nap){
        $scope.napModal = nap;
    });
    $scope.newNap = function(){
    	$scope.modal.hide();
        $scope.napModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newBaby.html',function(baby){
        $scope.babyModal = baby;
    });
    $scope.newBaby = function(){
    	$scope.modal.hide();
        $scope.babyModal.show();
    };
}])
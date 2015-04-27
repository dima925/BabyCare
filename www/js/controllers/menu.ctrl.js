angular.module('cleverbaby.controllers')
.controller('MenuCtrl', ['$scope','$ionicModal', function ($scope,$ionicModal) {

	$scope.closeModal=function(){
        $scope.modal.hide();
    };

    $ionicModal.fromTemplateUrl('templates/addMore.html',function(addmore){
        $scope.addMoreModal = addmore;
    });
    $scope.addMore = function(){
        $scope.modal.hide();
        $scope.addMoreModal.show();
    };

    $ionicModal.fromTemplateUrl('templates/activities/nursed.html',function(nursed){
        $scope.nursedModal = nursed;
    });
	$scope.newNursed = function(){
		$scope.modal.hide();
        $scope.nursedModal.show();
    };

    $ionicModal.fromTemplateUrl('templates/activities/diapers.html',function(diaper){
        $scope.diapersModal = diaper;
    });
    $scope.newDiapers = function(){
    	$scope.modal.hide();
        $scope.diapersModal.show();
    };

    $ionicModal.fromTemplateUrl('templates/activities/bottle.html',function(bottle){
        $scope.bottleModal = bottle;
    });
    $scope.newBottle = function(){
    	$scope.modal.hide();
        $scope.bottleModal.show();
    };

    $ionicModal.fromTemplateUrl('templates/activities/nap.html', function(nap){
        $scope.napModal = nap;
    });
    $scope.newNap = function(){
    	$scope.modal.hide();
        $scope.napModal.show();
    };
}]);
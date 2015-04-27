angular.module('cleverbaby.controllers')
.controller('DropdownCtrl', ['$scope','$ionicModal', function ($scope,$ionicModal) {
	$ionicModal.fromTemplateUrl('templates/modals/baby.html',function(baby){
        $scope.babyModal = baby;
    });
    $scope.newBaby = function(){
        $scope.modal.hide();
        $scope.babyModal.show();
    };
}])
angular.module('cleverbaby.controllers')
.controller('DropdownCtrl', ['$scope', '$ionicModal', 'BabyService', '$rootScope', '$localStorage',
        function ($scope, $ionicModal, BabyService, $rootScope, $localStorage) {

        $ionicModal.fromTemplateUrl('templates/modals/baby.html', function(babyModal){
            $scope.babyModal = babyModal;
        });

        $scope.newBaby = function(baby){
            $scope.modal.hide();
            $scope.babyModal.edit = baby?true:false;
            $scope.babyModal.baby = baby || BabyService.newBaby();
            $scope.babyModal.show();
        };

        $scope.select = function(baby){
            $rootScope.setBaby(baby);
            $scope.modal.hide();
        };
        $scope.cancel = function(){
            $scope.modal.hide();
        };
}]);

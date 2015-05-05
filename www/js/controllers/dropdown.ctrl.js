angular.module('cleverbaby.controllers')
.controller('DropdownCtrl', ['$scope', '$ionicModal', 'BabyModal', '$rootScope',
        function ($scope, $ionicModal, BabyModal, $rootScope ) {

        $scope.newBaby = function(baby){
            BabyModal.showModal(baby);
        };
        $scope.select = function(baby){
            $rootScope.setBaby(baby);
            $scope.modal.hide();
        };
        $scope.cancel = function(){
            $scope.modal.hide();
        };
}]);

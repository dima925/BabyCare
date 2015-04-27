angular.module('cleverbaby.controllers')
.controller('DropdownCtrl', ['$scope', '$ionicModal', 'BabyService', '$rootScope',
        function ($scope, $ionicModal, BabyService, $rootScope) {

        $scope.$on('auth', function(){
            BabyService.getAllBabies().then(function(babies){
                $scope.babies = babies;
            });
        });

        $scope.$on('babyAdd', function(e, baby){
            $scope.babies.push(baby);
        });

        $scope.$on('babyRemoved', function(e, baby){
            $scope.babies.filter(function(x){
                return x.id != baby.id;
            });
        });

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
            $rootScope.babyId = baby.id;
            $scope.modal.hide();
        };
        $scope.cancel = function(){
            $scope.modal.hide();
        };
}]);

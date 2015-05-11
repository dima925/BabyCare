angular.module('cleverbaby.controllers')
.controller('BabyCtrl', ['$scope','$ionicModal', '$rootScope', 'Image', 'NotificationService', 'BabyService', 
        function ($scope, $ionicModal, $rootScope, Image, NotificationService, BabyService) {

        $scope.cancel = function(){
            $scope.modal.hide();
        };

        $scope.selectCaptureImage = function(sourceType){
            $scope.selectCaptureImageModal.hide();
            Image.captureImage(sourceType).then(function(imageURI) {
                $scope.baby.displayImage = imageURI;
                $scope.$apply();
            }, function(err) {
                // error
            });
        };

        $scope.showSelectCaptureImageModal = function(){
            $scope.selectCaptureImageModal.show();
        };


        $scope.hideSelectCaptureImageModal = function(){
            $scope.selectCaptureImageModal.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modals/selectCaptureImage.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.selectCaptureImageModal = modal;
        });

        $scope.$watch('modal.baby', function(newValue){
            newValue = newValue || {};
            $scope.baby = {
                name: newValue.name || "",
                born: newValue.born ? new Date(newValue.born) : new Date(),
                gender: newValue.gender || "m"
            };
        });

        $scope.save = function(){
            $scope.modal.baby.name = $scope.baby.name;
            $scope.modal.baby.born = $scope.baby.born;
            $scope.modal.baby.gender = $scope.baby.gender;
            $scope.modal.baby.displayImage = $scope.baby.displayImage;
            BabyService.add($scope.modal.baby).then(function(baby){
                $rootScope.$broadcast('babyAdd', baby);
                $scope.modal.hide();
            }, function(err){
                NotificationService.notify(err.data.message);
            });
        };

        $scope.update = function(){
            $scope.modal.baby.name = $scope.baby.name;
            $scope.modal.baby.born = $scope.baby.born;
            $scope.modal.baby.gender = $scope.baby.gender;
            BabyService.edit($scope.modal.baby).then(function(){
                $scope.modal.hide();
            }, function(err){
                NotificationService.notify(err.data.message);
            });
        };

        $scope.delete = function(){
            $scope.modal.baby.$delete().then(function(){
                $rootScope.$broadcast('babyRemoved', $scope.modal.baby);
                $scope.modal.hide();
            });
        };
}]);

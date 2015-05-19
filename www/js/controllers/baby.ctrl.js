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
                $scope.baby.imageType = 'new';
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
        $scope.$watch('modal.x', function(){
            if($scope.modal.baby){
                $scope.baby = {
                    name: $scope.modal.baby.name || "",
                    born: $scope.modal.baby.born ? new Date($scope.modal.baby.born) : new Date(),
                    gender: $scope.modal.baby.gender || "m",
                    displayImage: $scope.modal.baby.displayImage
                };
            }
        });

        $scope.save = function(){
            $scope.modal.baby.name = $scope.baby.name;
            $scope.modal.baby.born = $scope.baby.born;
            $scope.modal.baby.gender = $scope.baby.gender;
            $scope.modal.baby.displayImage = $scope.baby.displayImage;
            $scope.modal.baby.imageType = $scope.baby.imageType;
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
            $scope.modal.baby.displayImage = $scope.baby.displayImage;
            $scope.modal.baby.imageType = $scope.baby.imageType;
            BabyService.edit($scope.modal.baby).then(function(baby){
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

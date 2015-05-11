angular.module('cleverbaby.controllers')
.controller('BabyCtrl', ['$scope','$ionicModal', '$rootScope', 'Image', 'NotificationService', function ($scope, $ionicModal, $rootScope, Image, NotificationService) {

        $scope.cancel = function(){
            $scope.modal.hide();
        };

        /**
         * Function for the ng-click that calls the captureImage service of the cordova plugin
         * @param sourceType - source of image to take
         */
        $scope.selectCaptureImage = function(sourceType){
            $scope.selectCaptureImageModal.hide();
            Image.captureImage(sourceType).then(function(imageURI) {
                $scope.baby.displayImage = imageURI;
                $scope.$apply();
            }, function(err) {
                // error
            });
        };

        /**
         * shows the modal containing the option for selecting an image or take new image in baby edit page
         */
        $scope.showSelectCaptureImageModal = function(){
            $scope.selectCaptureImageModal.show();
        };

        /**
         * hides the modal
         */
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
                born: newValue.born || new Date(),
                gender: newValue.gender || "m",
                displayImage: "img/baby.png"
            };
        });

        $scope.save = function(){
            $scope.modal.baby.name = $scope.baby.name;
            $scope.modal.baby.born = $scope.baby.born;
            $scope.modal.baby.gender = $scope.baby.gender;
            $scope.modal.baby.$save().then(function(baby){
                $rootScope.$broadcast('babyAdd', baby);
                $scope.modal.hide();
            }, function(err){
                NotificationService.notify(err.data.message)
            });
        };

        $scope.update = function(){
            $scope.modal.baby.name = $scope.baby.name;
            $scope.modal.baby.born = $scope.baby.born;
            $scope.modal.baby.gender = $scope.baby.gender;
            $scope.modal.baby.$update().then(function(){
            $scope.modal.hide();
            }, function(err){
                NotificationService.notify(err.data.message)
            });
        };

        $scope.delete = function(){
            $scope.modal.baby.$delete().then(function(){
                $rootScope.$broadcast('babyRemoved', $scope.modal.baby);
                $scope.modal.hide();
            });
        };
}]);

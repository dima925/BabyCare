angular.module('cleverbaby.controllers')
.controller('BabyCtrl', ['$scope','$ionicModal', '$rootScope', 'Image', 'NotificationService', function ($scope, $ionicModal, $rootScope, Image, NotificationService) {

        $scope.cancel = function(){
            $scope.modal.hide();
        };

        $scope.captureImage = function(){
            Image.captureImage().then(function(imageURI) {
                //var image = document.getElementById('myImage');
                //image.src = "data:image/jpeg;base64," + imageData;
                alert(imageURI);
                $scope.baby.displayImage = imageURI;
                $scope.$apply();
            }, function(err) {
                alert(err);
                // error
            });
        };

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

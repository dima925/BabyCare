angular.module('cleverbaby.controllers')
.controller('BabyCtrl', ['$scope','$ionicModal', '$rootScope', 'Image', 'NotificationService', 'BabyService', 'ActivityService',
        function ($scope, $ionicModal, $rootScope, Image, NotificationService, BabyService, ActivityService) {

        $scope.cancel = function(){
            $scope.modal.hide();
        };

		/* hide footer when native keyboard is open, ionic also provides a css class hide-on-keyboard-open but its super slow on lowend android phones, the below is ugly but faster */
		$scope.showFooter = true;

	    window.addEventListener('native.keyboardshow', function() {
			$scope.showFooter = false;
	    });

	    window.addEventListener('native.keyboardhide', function() {
			$scope.showFooter = true;
	    });
		
        $scope.selectCaptureImage = function(sourceType){
//            $scope.selectCaptureImageModal.hide();
            Image.captureImage(sourceType).then(function(imageURI) {
                $scope.baby.displayImage = imageURI;
                $scope.baby.imageType = 'new';
            }, function(err) {
                // error
            });
        };
        
        $scope.captureImageOption = {
            success: function(sourceType){
                $scope.selectCaptureImage(sourceType);
            }
        };
//
//        $scope.showSelectCaptureImageModal = function(){
//            $scope.selectCaptureImageModal.show();
//        };

//
//        $scope.hideSelectCaptureImageModal = function(){
//            $scope.selectCaptureImageModal.hide();
//        };
//
//        $ionicModal.fromTemplateUrl('templates/modals/selectCaptureImage.html', {
//            scope: $scope,
//            animation: 'slide-in-up'
//        }).then(function(modal) {
//            $scope.selectCaptureImageModal = modal;
//        });
        $scope.$watch('modal.x', function(){
            if($scope.modal.baby){
                $scope.baby = {
                    name: $scope.modal.baby.name || "",
                    born: $scope.modal.baby.born ? new Date($scope.modal.baby.born) : new Date(),
                    gender: $scope.modal.baby.gender || "m",
                    weight: $scope.modal.baby.weight || 0,
                    length: $scope.modal.baby.length || 0,
                    head: $scope.modal.baby.head || 0,
                    displayImage: $scope.modal.baby.displayImage
                };
            }
        });

        $scope.save = function(){
            $scope.modal.baby.name = $scope.baby.name;
            $scope.modal.baby.born = $scope.baby.born;
            $scope.modal.baby.gender = $scope.baby.gender;
            $scope.modal.baby.weight = $scope.baby.weight;
            $scope.modal.baby.length = $scope.baby.length;
            $scope.modal.baby.head = $scope.baby.head;
            $scope.modal.baby.displayImage = $scope.baby.displayImage;
            $scope.modal.baby.imageType = $scope.baby.imageType;
            $scope.modal.baby.type = 'growth';
            $scope.modal.baby.media = [];
            $scope.modal.baby.growth_headsize =  $scope.baby.head;
            $scope.modal.baby.growth_height = $scope.baby.length;
            $scope.modal.baby.growth_weight = $scope.baby.weight;
            $scope.modal.baby.time = $scope.baby.born;

            BabyService.add($scope.modal.baby).then(function(baby){
                $rootScope.$broadcast('babyAdd', baby);
                $scope.modal.hide();
            }, function(err){
                NotificationService.notify(err.data.message);
            });

            ActivityService.addActivity($scope.modal.baby, $rootScope.babyId).then(function(activity){
                $rootScope.$broadcast('activityAdd', activity);
            });  
        };

        $scope.update = function(){
            $scope.modal.baby.name = $scope.baby.name;
            $scope.modal.baby.born = $scope.baby.born;
            $scope.modal.baby.gender = $scope.baby.gender;
            $scope.modal.baby.weight = $scope.baby.weight;
            $scope.modal.baby.length = $scope.baby.length;
            $scope.modal.baby.head = $scope.baby.head;
            $scope.modal.baby.displayImage = $scope.baby.displayImage;
            $scope.modal.baby.imageType = $scope.baby.imageType;
            $scope.modal.baby.type = 'growth';
            $scope.modal.baby.media = [];
            $scope.modal.baby.growth_headsize =  $scope.baby.head;
            $scope.modal.baby.growth_height = $scope.baby.length;
            $scope.modal.baby.growth_weight = $scope.baby.weight;
            $scope.modal.baby.time = $scope.baby.born;

            BabyService.edit($scope.modal.baby).then(function(baby){
                $rootScope.$broadcast('babyUpdate', baby);
                $scope.modal.hide();
            }, function(err){
                NotificationService.notify(err.data.message);
            });

            ActivityService.addActivity($scope.modal.baby, $rootScope.babyId).then(function(activity){
                $rootScope.$broadcast('activityAdd', activity);         
            });  
        };

        $scope.delete = function(){
            $scope.modal.baby.$delete().then(function(){
                $rootScope.$broadcast('babyRemoved', $scope.modal.baby);
                $scope.modal.hide();
            });
        };
}]);

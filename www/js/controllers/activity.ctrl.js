angular.module('cleverbaby.controllers')
.controller('activityCtrl', ['$rootScope', '$scope', '$timeout', '$window', 'ActivityService', 'NotificationService', '$ionicModal', 'Image',
    function ($rootScope, $scope, $timeout, $window, ActivityService, NotificationService, $ionicModal, Image) {

        $scope.saveActivity = function(type){

            $scope.modal.data.type = type;
            if($scope.modal.mode == 'add'){
                ActivityService.addActivity($scope.modal.data, $rootScope.babyId).then(function(activity){
                    $rootScope.$broadcast('activityAdd', activity);
                    $scope.modal.hide();
                });
            } else {
                ActivityService.editActivity($scope.modal.data.uuid, $scope.modal.data, $rootScope.babyId).then(function(activity){
                    $rootScope.$broadcast('activityEdit', activity);
                    $scope.modal.hide();
                });
            }
        };

        $scope.manual = true;
        $scope.timer = false;

        $scope.$watch('timer', function (isTimer) {
            $scope.manual = !isTimer;
        });
        $scope.switchtimer = function(){
            $scope.manual = !$scope.manual;
            $scope.timer = !$scope.timer;
        };

		$scope.addNote = function(){
			$ionicModal.fromTemplateUrl('templates/modals/addnote.html', {
				animation: 'slide-in-up',
                name: 'noteModal'
			  }).then(function(modal) {
                $scope.modalAddNote = modal;
                $scope.modalAddNote.comment = $scope.modal.data.comment || "";
				$scope.modalAddNote.show();
			});
		};

        $scope.deleteNote = function(){
            $scope.modal.data.comment = '';
        };

		$scope.closeAddNoteModal = function(){
            $scope.modalAddNote.comment = "";
            $scope.modalAddNote.hide();
		};

        $scope.addPhoto = function(){
            $ionicModal.fromTemplateUrl('templates/modals/addphoto.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modalAddPhoto = modal;
                $scope.modalAddPhoto.name = 'photoModal';
                $scope.modalAddPhoto.show();
            });
        };

        $scope.selectCaptureImage = function(sourceType){
            $scope.modalAddPhoto.hide();
            Image.captureImage(sourceType).then(function(imageURI) {
                $scope.modal.data.media.push({
                    displayImage: imageURI,
                    imageType: 'new'
                });
            }, function(err) {
                // error
            });
        };

        $scope.deletePhoto = function(media){
            media.type = 'del';
        };

        $scope.closeAddPhotoModal = function(){
            $scope.modalAddPhoto.hide();
        };

        $scope.closeActivity = function() {
            $scope.modal.hide();
        };

        $scope.submitActivityCheck = function() {
            $timeout(function() {
                angular.element('.btn-mid').trigger('click');
            }, 0);
        }

        $scope.$on('modal.hidden', function(e, a){
            if($scope.modalAddNote && a.name == 'noteModal'){
                if($scope.modalAddNote.comment !== null){
                    $scope.modal.data.comment = $scope.modalAddNote.comment;
                }
            }
        });

        /**
         * Hides the keyboard when tapping go.
         * @param input
         */
        $scope.hideKeyboard = function(){
            alert(1);
            $(document.activeElement).blur();
            return false;
        };

    }
]);

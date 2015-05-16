angular.module('cleverbaby.controllers')
.controller('activityCtrl', ['$rootScope', '$scope', '$window', 'ActivityService', 'NotificationService', '$ionicModal',
    function ($rootScope, $scope, $window, ActivityService, NotificationService, $ionicModal) {

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

        $scope.switchtimer = function(){
            $scope.manual = !$scope.manual;
            $scope.timer = !$scope.timer;
        };

		$scope.addPhoto = function(){
			$ionicModal.fromTemplateUrl('templates/modals/addphoto.html', {
				scope: $scope,
				animation: 'slide-in-up'
            }).then(function(modal) {
				$scope.modalAddPhoto = modal;
				$scope.modalAddPhoto.show();
			});
		};

        $scope.closeAddPhotoModal = function(){
            $scope.modalAddPhoto.hide();
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

        $scope.closeActivity = function() {
            $scope.modal.hide();
        };

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

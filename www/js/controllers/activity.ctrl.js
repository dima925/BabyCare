angular.module('cleverbaby.controllers')
.controller('activityCtrl', ['$rootScope', '$scope', '$window', 'ActivityService', 'NotificationService', '$ionicModal',
    function ($rootScope, $scope, $window, ActivityService, NotificationService, $ionicModal) {

        var comment;
        var controllerId = Math.random();

        $scope.addActivity = function(type){
            var data;
            if(type == "change"){
                data = {
                    comment: $scope.modal.diaper.comment,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.diaper.time.getTime()/1000),
                    diaper_type: $scope.modal.diaper.diaper_type,
                    amount_size: $scope.modal.diaper.amount_size,
                    color: $scope.modal.diaper.color,
                    texture: $scope.modal.diaper.texture,
                    type: "change"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.diaper.createdAt;
                    data.uuid = $scope.modal.diaper.uuid;
                }
            }
            if(type == "pump"){
                data = {
                    comment: $scope.modal.pump.comment,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.pump.time.getTime()/1000),
                    side: $scope.modal.pump.side,
                    amount: $scope.modal.pump.amount,
                    start_side: $scope.modal.pump.start_side,
                    type: "pump"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.pump.createdAt;
                    data.uuid = $scope.modal.pump.uuid;
                }
            }
            if(type == "play"){
                data = {
                    comment: $scope.modal.play.comment,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.play.time.getTime()/1000),
                    notes: $scope.modal.play.notes,
                    type: "play"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.play.createdAt;
                    data.uuid = $scope.modal.play.uuid;
                }
            }
            if(type == "diary"){
                data = {
                    comment: $scope.modal.diary.comment,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.diary.time.getTime()/1000),
                    notes: $scope.modal.diary.notes,
                    type: "diary"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.diary.createdAt;
                    data.uuid = $scope.modal.diary.uuid;
                }
            }
            if(type == "vaccination"){
                data = {
                    comment: $scope.modal.vaccination.comment,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.vaccination.time.getTime()/1000),
                    vaccination_type: $scope.modal.vaccination.vaccination_type,
                    type: "vaccination"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.vaccination.createdAt;
                    data.uuid = $scope.modal.vaccination.uuid;
                }
            }
            if(type == "growth"){
                data = {
                    comment: $scope.modal.growth.comment,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.growth.time.getTime()),
                    height: $scope.modal.growth.height,
                    weight: $scope.modal.growth.weight,
                    head_size: $scope.modal.growth.head_size,
                    type: "growth"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.growth.createdAt;
                    data.uuid = $scope.modal.growth.uuid;
                }
            }
            if(type == "milestone"){
                data = {
                    comment: $scope.modal.milestone.comment,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.milestone.time.getTime()),
                    milestone_type: $scope.modal.milestone.milestone_type,
                    type: "milestone"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.milestone.createdAt;
                    data.uuid = $scope.modal.milestone.uuid;
                }
            }
            if(type == "sick"){
                data = {
                    comment: $scope.modal.sick.comment,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.sick.time.getTime()/1000),
                    symptom: $scope.modal.sick.symptom,
                    type: "sick"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.sick.createdAt;
                    data.uuid = $scope.modal.sick.uuid;
                }
            }
            if(type == "doctor"){
                data = {
                    comment: $scope.modal.doctor,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.doctor.time.getTime()/1000),
                    doctor: $scope.modal.doctor.doctor || "No Doctor",
                    visit_type: $scope.modal.doctor.visit_type,
                    type: "doctor"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.doctor.createdAt;
                    data.uuid = $scope.modal.doctor.uuid;
                }
            }
            if(type == "bath"){
                data = {
                    comment: $scope.modal.bath.comment,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.bath.time.getTime()/1000),
                    temp: $scope.modal.bath.temp,
                    notes: $scope.modal.bath.notes,
                    type: "bath"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.bath.createdAt;
                    data.uuid = $scope.modal.bath.uuid;
                }
            }
            if(type == "medication"){
                data = {
                    comment: $scope.modal.medication.comment,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.medication.time.getTime()/1000),
                    drug: $scope.modal.medication.drug,
                    amount_given: $scope.modal.medication.amount_given,
                    prescription_interval: $scope.modal.medication.prescription_interval,
                    type: "medication"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.medication.createdAt;
                    data.uuid = $scope.modal.medication.uuid;
                }
            }
            if(type == "temperature"){
                data = {
                    comment: $scope.modal.temperature,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.temperature.time.getTime()/1000),
                    temp: $scope.modal.temperature.temp,
                    reminder: $scope.modal.temperature.reminder,
                    type: "temperature"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.temperature.createdAt;
                    data.uuid = $scope.modal.temperature.uuid;
                }
            }
            if(type == "mood"){
                data = {
                    comment: $scope.modal.mood.comment,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.mood.time.getTime()/1000),
                    mood_type: $scope.modal.mood.mood_type,
                    type: "mood"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.mood.createdAt;
                    data.uuid = $scope.modal.mood.uuid;
                }
            }
            if(type == "bottle"){
                data = {
                    comment: $scope.modal.bottle.comment,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.bottle.time.getTime()/1000),
                    bottle_type: $scope.modal.bottle.bottle_type,
                    amount: $scope.modal.bottle.amount,
                    notes: $scope.modal.bottle.notes,
                    type: "bottle"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.bottle.createdAt;
                    data.uuid = $scope.modal.bottle.uuid;
                }
            }
            if(type == "todo"){
                data = {
                    comment: $scope.modal.todo.comment,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.todo.time.getTime()/1000),
                    notes: $scope.modal.todo.notes,
                    type: "todo"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.todo.createdAt;
                    data.uuid = $scope.modal.todo.uuid;
                }
            }
            if(type == "nurse"){
                data = {
                    comment: $scope.modal.nurse.comment,
                    babies: $rootScope.babyId,
                    time_start: parseInt($scope.modal.nurse.time_start.getTime()/1000),
                    time_left: $scope.modal.nurse.time_left,
                    time_right: $scope.modal.nurse.time_right,
                    time_both: $scope.modal.nurse.time_both,
                    type: "nurse"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.nurse.createdAt;
                    data.uuid = $scope.modal.nurse.uuid;
                }
            }
            if(type == "sleep"){
                data = {
                    comment: $scope.modal.sleep.comment,
                    babies: $rootScope.babyId,
                    time_start: parseInt($scope.modal.sleep.time_start.getTime()/1000),
                    time_end: parseInt($scope.modal.sleep.time_end.getTime()/1000),
                    location: $scope.modal.sleep.location,
                    type: "sleep"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.sleep.createdAt;
                    data.uuid = $scope.modal.sleep.uuid;
                }
            }
            if(type == "solid") {
                data = {
                    comment: $scope.modal.solid.comment,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.solid.time.getTime()/1000),
                    food_type: $scope.modal.solid.food_type,
                    type: "solid"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.solid.createdAt;
                    data.uuid = $scope.modal.solid.uuid;
                }
            }
            if(type == "allergy"){
                data = {
                    comment: $scope.modal.allergy.comment,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.allergy.time.getTime()/1000),
                    source: $scope.modal.allergy.source,
                    reaction: $scope.modal.allergy.reaction,
                    severity: $scope.modal.allergy.severity,
                    type: "allergy"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.allergy.createdAt;
                    data.uuid = $scope.modal.allergy.uuid;
                }
            }
            if(type == "moment"){
                data = {
                    comment: $scope.modal.moment.comment,
                    babies: $rootScope.babyId,
                    time: parseInt($scope.modal.moment.time.getTime()/1000),
                    notes: $scope.modal.moment.notes,
                    type: "moment"
                };
                if($scope.modal.mode == 'edit'){
                    data.createdAt = $scope.modal.moment.createdAt;
                    data.uuid = $scope.modal.moment.uuid;
                }
            }
            if($scope.modal.mode == 'add'){
                ActivityService.addActivity(data).then(function(activity){
                    $rootScope.$broadcast('activityAdd', activity);
                    $scope.modal.hide();
                });
            } else {
                ActivityService.editActivity(data.uuid, data).then(function(activity){
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

		$scope.addNote = function(text){
			$ionicModal.fromTemplateUrl('templates/modals/addnote.html', {
				animation: 'slide-in-up',
                name: 'noteModal'
			  }).then(function(modal) {
                $scope.modalAddNote = modal;
                $scope.modalAddNote.comment = text || "";
				$scope.modalAddNote.show();
			});
		};

        $scope.deleteNote = function(){
            $scope.comment = '';
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
                $scope.comment = ($scope.modalAddNote.comment);
            }
        });
    }
]);

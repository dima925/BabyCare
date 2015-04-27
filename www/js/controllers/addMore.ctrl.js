angular.module('cleverbaby.controllers')
.controller('AddMoreCtrl', ['$scope','$ionicModal', function ($scope,$ionicModal) {
	$scope.closeModal=function(){
        $scope.modal.hide();
    };

        $ionicModal.fromTemplateUrl('templates/activities/diapers.html',function(diaper){
            $scope.diapersModal = diaper;
        });
        $scope.newDiapers = function(){
            $scope.modal.hide();
            $scope.diapersModal.show();
        };

        $ionicModal.fromTemplateUrl('templates/activities/bottle.html',function(bottle){
            $scope.bottleModal = bottle;
        });
        $scope.newBottle = function(){
            $scope.modal.hide();
            $scope.bottleModal.show();
        };

        $ionicModal.fromTemplateUrl('templates/activities/pumping.html',function(pump){
            $scope.pumpModal = pump;
        });
        $scope.newPumping = function(){
            $scope.modal.hide();
            $scope.pumpModal.show();
        };
    $ionicModal.fromTemplateUrl('templates/activities/activity.html',function(activity){
        $scope.addActivityModal = activity;
    });
    $scope.newActivity = function(){
        $scope.modal.hide();
        $scope.addActivityModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/activities/alergy.html',function(alergy){
        $scope.addAlergyModal = alergy;
    });
    $scope.newAlergy = function(){
        $scope.modal.hide();
        $scope.addAlergyModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/activities/bath.html',function(bath){
        $scope.addBathModal = bath;
    });
    $scope.newBaths = function(){
        $scope.modal.hide();
        $scope.addBathModal.show();
    };

        $ionicModal.fromTemplateUrl('templates/activities/diary.html',function(diary){
            $scope.diaryModal = diary;
        });
        $scope.newDiary = function(){
            $scope.modal.hide();
            $scope.diaryModal.show();
        };

        $ionicModal.fromTemplateUrl('templates/activities/todo.html',function(diary){
            $scope.todoModal = diary;
        });
        $scope.newTodo = function(){
            $scope.modal.hide();
            $scope.todoModal.show();
        };

    $ionicModal.fromTemplateUrl('templates/activities/doctor.html',function(doctor){
        $scope.doctorModal = doctor;
    });
    $scope.newDoctor = function(){
        $scope.modal.hide();
        $scope.doctorModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/activities/growth.html',function(growth){
        $scope.growthModal = growth;
    });
    $scope.newGrowth = function(){
        $scope.modal.hide();
        $scope.growthModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/activities/medication.html',function(med){
        $scope.medModal = med;
    });
    $scope.newMedication = function(){
        $scope.modal.hide();
        $scope.medModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/activities/milestone.html',function(mil){
        $scope.milModal = mil;
    });
    $scope.newMilestone = function(){
        $scope.modal.hide();
        $scope.milModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/activities/mood.html',function(mood){
        $scope.moodModal = mood;
    });
    $scope.newMood = function(){
        $scope.modal.hide();
        $scope.moodModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/activities/nursed.html',function(nursed){
        $scope.nursedModal = nursed;
    });
    $scope.newNursed = function(){
        $scope.modal.hide();
        $scope.nursedModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/activities/play.html',function(play){
        $scope.playModal = play;
    });
    $scope.newPlay = function(){
        $scope.modal.hide();
        $scope.playModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/activities/sickness.html',function(sick){
        $scope.sickModal = sick;
    });
    $scope.newSickness = function(){
        $scope.modal.hide();
        $scope.sickModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/activities/nap.html',function(nap){
        $scope.napModal = nap;
    });
    $scope.newNap = function(){
        $scope.modal.hide();
        $scope.napModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/activities/solid.html',function(solid){
        $scope.solidModal = solid;
    });
    $scope.newSolid = function(){
        $scope.modal.hide();
        $scope.solidModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/activities/temp.html',function(temp){
        $scope.tempmodal = temp;
    });
    $scope.newTemp = function(){
        $scope.modal.hide();
        $scope.tempmodal.show();
    };
    $ionicModal.fromTemplateUrl('templates/activities/vaccination.html',function(vac){
        $scope.vacmodal = vac;
    });
    $scope.newVaccinations = function(){
        $scope.modal.hide();
        $scope.vacmodal.show();
    };
        /*
    $ionicModal.fromTemplateUrl('templates/modals/baby.html',function(baby){
        $scope.babyModal = baby;
    });
    $scope.newBaby = function(){
        $scope.modal.hide();
        $scope.babyModal.show();
    };
    */
}]);

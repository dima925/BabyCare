angular.module('cleverbaby.controllers')
.controller('AddMoreCtrl', ['$scope','$ionicModal', function ($scope,$ionicModal) {
	$scope.closeModal=function(){
        $scope.modal.hide();
    }
    $ionicModal.fromTemplateUrl('templates/newActivity.html',function(activity){
        $scope.addActivityModal = activity;
    });
    $scope.newActivity = function(){
        $scope.modal.hide();
        $scope.addActivityModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newAlergy.html',function(alergy){
        $scope.addAlergyModal = alergy;
    });
    $scope.newAlergy = function(){
        $scope.modal.hide();
        $scope.addAlergyModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newBath.html',function(bath){
        $scope.addBathModal = bath;
    });
    $scope.newBaths = function(){
        $scope.modal.hide();
        $scope.addBathModal.show();
    };

    $ionicModal.fromTemplateUrl('templates/newBottle.html',function(bottle){

        $scope.bottleModal = bottle;
    });
    $scope.newBottle = function(){
        $scope.modal.hide();
        $scope.bottleModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newDiapers.html',function(diaper){
        $scope.diapersModal = diaper;
    });
    $scope.newDiapers = function(){
        $scope.modal.hide();
        $scope.diapersModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newDiary.html',function(diary){
        $scope.diaryModal = diary;
    });
    $scope.newDiary = function(){
        $scope.modal.hide();
        $scope.diaryModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newDoctor.html',function(doctor){
        $scope.doctorModal = doctor;
    });
    $scope.newDoctor = function(){
        $scope.modal.hide();
        $scope.doctorModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newGrowth.html',function(growth){
        $scope.growthModal = growth;
    });
    $scope.newGrowth = function(){
        $scope.modal.hide();
        $scope.growthModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newMedication.html',function(med){
        $scope.medModal = med;
    });
    $scope.newMedication = function(){
        $scope.modal.hide();
        $scope.medModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newMilestone.html',function(mil){
        $scope.milModal = mil;
    });
    $scope.newMilestone = function(){
        $scope.modal.hide();
        $scope.milModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newMood.html',function(mood){
        $scope.moodModal = mood;
    });
    $scope.newMood = function(){
        $scope.modal.hide();
        $scope.moodModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newNursed.html',function(nursed){
        $scope.nursedModal = nursed;
    });
    $scope.newNursed = function(){
        $scope.modal.hide();
        $scope.nursedModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newPlay.html',function(play){
        $scope.playModal = play;
    });
    $scope.newPlay = function(){
        $scope.modal.hide();
        $scope.playModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newPumping.html',function(pump){
        $scope.pumpModal = pump;
    });
    $scope.newPumping = function(){
        $scope.modal.hide();
        $scope.pumpModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newSickness.html',function(sick){
        $scope.sickModal = sick;
    });
    $scope.newSickness = function(){
        $scope.modal.hide();
        $scope.sickModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newNap.html',function(nap){
        $scope.napModal = nap;
    });
    $scope.newNap = function(){
        $scope.modal.hide();
        $scope.napModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newSolid.html',function(solid){
        $scope.solidModal = solid;
    });
    $scope.newSolid = function(){
        $scope.modal.hide();
        $scope.solidModal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newTemp.html',function(temp){
        $scope.tempmodal = temp;
    });
    $scope.newTemp = function(){
        $scope.modal.hide();
        $scope.tempmodal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newVaccination.html',function(vac){
        $scope.vacmodal = vac;
    });
    $scope.newVaccinations = function(){
        $scope.modal.hide();
        $scope.vacmodal.show();
    };
    $ionicModal.fromTemplateUrl('templates/newBaby.html',function(baby){
        $scope.babyModal = baby;
    });
    $scope.newBaby = function(){
        $scope.modal.hide();
        $scope.babyModal.show();
    };
}])
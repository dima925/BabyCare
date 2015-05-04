angular
    .module('cleverbaby')
    .service('activityModal', ["$ionicModal", function($ionicModal){

        var exports = {
            modals: {}
        };

        $ionicModal.fromTemplateUrl('templates/activities/diapers.html',function(diaper){
            exports.modals.diapersModal = diaper;
        });

        $ionicModal.fromTemplateUrl('templates/activities/pumping.html',function(pump){
            exports.modals.pumpModal = pump;
        });

        $ionicModal.fromTemplateUrl('templates/activities/bottle.html',function(bottle){
            exports.modals.bottleModal = bottle;
        });

        $ionicModal.fromTemplateUrl('templates/activities/play.html',function(play){
            exports.modals.playModal = play;
        });

        $ionicModal.fromTemplateUrl('templates/activities/diary.html',function(diary){
            exports.modals.diaryModal = diary;
        });

        $ionicModal.fromTemplateUrl('templates/activities/vaccination.html',function(vac){
            exports.modals.vacmodal = vac;
        });

        $ionicModal.fromTemplateUrl('templates/activities/milestone.html',function(mil){
            exports.modals.milModal = mil;
        });

        $ionicModal.fromTemplateUrl('templates/activities/sickness.html',function(sick){
            exports.modals.sickModal = sick;
        });

        $ionicModal.fromTemplateUrl('templates/activities/doctor.html',function(doctor){
            exports.modals.doctorModal = doctor;
        });

        $ionicModal.fromTemplateUrl('templates/activities/bath.html',function(bath){
            exports.modals.addBathModal = bath;
        });

        $ionicModal.fromTemplateUrl('templates/activities/medication.html',function(med){
            exports.modals.medModal = med;
        });

        $ionicModal.fromTemplateUrl('templates/activities/temp.html',function(temp){
            exports.modals.tempmodal = temp;
        });

        $ionicModal.fromTemplateUrl('templates/activities/mood.html',function(mood){
            exports.modals.moodModal = mood;
        });

        $ionicModal.fromTemplateUrl('templates/activities/todo.html',function(diary){
            exports.modals.todoModal = diary;
        });

        $ionicModal.fromTemplateUrl('templates/activities/activity.html',function(activity){
            exports.modals.addActivityModal = activity;
        });

        $ionicModal.fromTemplateUrl('templates/activities/alergy.html',function(alergy){
            exports.modals.addAllergyModal = alergy;
        });

        $ionicModal.fromTemplateUrl('templates/activities/growth.html',function(growth){
            exports.modals.growthModal = growth;
        });

        $ionicModal.fromTemplateUrl('templates/activities/nursed.html',function(nursed){
            exports.modals.nursedModal = nursed;
        });

        $ionicModal.fromTemplateUrl('templates/activities/nap.html',function(nap){
            exports.modals.napModal = nap;
        });
        $scope.newNap = function(){
            $scope.modal.hide();
            $scope.napModal.show();
        };

        $ionicModal.fromTemplateUrl('templates/activities/solid.html',function(solid){
            exports.modals.solidModal = solid;
        });

        exports.showModal = function(type){
            if(type == "change") {
                exports.modals.diapersModal.show();
            } else if(type == "pump") {
                exports.modals.pumpModal.show();
            } else if(type == "play") {
                exports.modals.playModal.show();
            } else if(type == "diary") {
                exports.modals.diaryModal.show();
            } else if(type == "vaccination") {
                exports.modals.vacmodal.show();
            } else if(type == "growth") {
                exports.modals.growthModal.show();
            } else if(type == "milestone") {
                exports.modals.milModal.show();
            } else if(type == "sick") {
                exports.modals.sickModal.show();
            } else if(type == "doctor") {
                exports.modals.doctorModal.show();
            } else if(type == "bath") {
                exports.modals.addBathModal.show();
            } else if(type == "medication") {
                exports.modals.medModal.show();
            } else if(type == "temperature") {
                exports.modals.tempmodal.show();
            } else if(type == "mood") {
                exports.modals.moodModal.show();
            } else if(type == "bottle") {
                exports.modals.bottleModal.show();
            } else if(type == "todo") {
                exports.modals.todoModal.show();
            } else if(type == "alergy") {
                exports.modals.addAllergyModal.show();
            } else if(type == "nurse") {
                exports.modals.nursedModal.show();
            } else if(type == "sleep") {
                exports.modals.napModal.show();
            } else if(type == "solid") {
                exports.modals.solidModal.show()
            }
        };

        return exports;
    }]);
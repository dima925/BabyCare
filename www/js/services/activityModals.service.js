angular
    .module('cleverbaby')
    .service('activityModals', ["$ionicModal", function($ionicModal){

        var exports = {
            modals: {}
        };

        $ionicModal.fromTemplateUrl('templates/activities/nap.html', function(nap){
            exports.modals.napModal = nap;
        });

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

        $ionicModal.fromTemplateUrl('templates/activities/solid.html',function(solid){
            exports.modals.solidModal = solid;
        });

        function initialData(type) {

            var data = {};

            data.change = {
                time: new Date(),
                diaper_type: "Empty",
                amount_size: "Tiny",
                color: "Yellow",
                texture: "Runny",
                media: []
            };

            data.pump = {
                time: new Date(),
                side: "",
                amount: null,
                start_side: "",
                media: []
            };

            data.play = {
                time: new Date(),
                notes: null,
                media: []
            };

            data.diary = {
                time: new Date(),
                notes: null,
                media: []
            };

            data.vaccination = {
                time: new Date(),
                vaccination_type: null,
                media: []
            };

            data.growth = {
                time: new Date(),
                weight: null,
                height: null,
                head: null,
                media: []
            };

            data.milestone = {
                time: new Date(),
                milestone_type: null,
                media: []
            };

            data.sickness = {
                time: new Date(),
                symptom: null,
                media: []
            };

            data.doctor = {
                time: new Date(),
                visit_type: null,
                doctor: null,
                media: []
            };

            data.bath = {
                time: new Date(),
                notes: null,
                temp: null,
                media: []
            };

            data.medication = {
                time: new Date(),
                drug: null,
                amount_given: null,
                prescription_interval: null,
                media: []
            };

            data.temperature = {
                time: new Date(),
                temp: null,
                reminder: null,
                media: []
            };

            data.mood = {
                time: new Date(),
                mood_type: null,
                media: []
            };

            data.bottle = {
                time: new Date(),
                bottle_type: null,
                amount: null,
                notes: null,
                media: []
            };

            data.todo = {
                time: new Date(),
                notes: null,
                media: []
            };

            data.nurse = {
                time: new Date(),
                time_left: null,
                time_right: null,
                time_both: null,
                media: []
            };

            data.sleep = {
                time: new Date(),
                time_slept: null,
                time_end: new Date(),
                location: null,
                media: []
            };

            data.solid = {
                time: new Date(),
                food_type: null,
                media: []
            };

            data.allergy = {
                time: new Date(),
                source: null,
                reaction: null,
                severity: null,
                media: []
            };

            data.moment = {
                time: new Date(),
                notes: null,
                media: []
            };

            return data[type];
        }

        exports.showModal = function(type, showData){

            var x = showData ? angular.copy(showData, x) : initialData(type);

            function showModal(modal){
                modal.mode = showData ? 'edit':'add';
                modal.data = x;
                modal.show();
            }

            if(type == "change") {
                showModal(exports.modals.diapersModal)
            } else if(type == "pump") {
                showModal(exports.modals.pumpModal);
            } else if(type == "play") {
                showModal(exports.modals.playModal);
            } else if(type == "diary") {
                showModal(exports.modals.diaryModal);
            } else if(type == "vaccination") {
                showModal(exports.modals.vacmodal);
            } else if(type == "growth") {
                showModal(exports.modals.growthModal);
            } else if(type == "milestone") {
                showModal(exports.modals.milModal);
            } else if(type == "sick") {
                showModal(exports.modals.sickModal);
            } else if(type == "doctor") {
                showModal(exports.modals.doctorModal);
            } else if(type == "bath") {
                showModal(exports.modals.addBathModal);
            } else if(type == "medication"){
                showModal(exports.modals.medModal);
            } else if(type == "temperature") {
                showModal(exports.modals.tempmodal);
            } else if(type == "mood") {
                showModal(exports.modals.moodModal);
            } else if(type == "bottle") {
                showModal(exports.modals.bottleModal);
            } else if(type == "todo") {
                showModal(exports.modals.todoModal);
            } else if(type == "allergy") {
                showModal(exports.modals.addAllergyModal);
            } else if(type == "nurse") {
                showModal(exports.modals.nursedModal);
            } else if(type == "sleep") {
                showModal(exports.modals.napModal);
            } else if(type == "solid") {
                showModal(exports.modals.solidModal);
            }else if(type == "moment") {
                showModal(exports.modals.addActivityModal);
            }
        };
        return exports;
    }]);

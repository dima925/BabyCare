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

        function initialData() {

            var data = {};

            data.diaper = {
                time: new Date(),
                diaper_type: "Empty",
                amount_size: "Tiny",
                color: "Yellow",
                texture: "Runny"
            };

            data.pump = {
                time: new Date(),
                side: "",
                amount: null,
                start_side: ""
            };

            data.play = {
                time: new Date(),
                notes: null
            };

            data.diary = {
                time: new Date(),
                notes: null
            };

            data.vaccination = {
                time: new Date(),
                vaccination_type: null
            };

            data.growth = {
                time: new Date(),
                weight: null,
                height: null,
                head: null
            };

            data.milestone = {
                time: new Date(),
                milestone_type: null
            };

            data.sickness = {
                time: new Date(),
                symptom: null
            };

            data.doctor = {
                time: new Date(),
                visit_type: null,
                doctor: null
            };

            data.bath = {
                time: new Date(),
                notes: null,
                temp: null
            };

            data.medication = {
                time: new Date(),
                drug: null,
                amount_given: null,
                prescription_interval: null
            };

            data.temperature = {
                time: new Date(),
                temp: null,
                reminder: null
            };

            data.mood = {
                time: new Date(),
                mood_type: null
            };

            data.bottle = {
                time: new Date(),
                bottle_type: null,
                amount: null,
                notes: null
            };

            data.todo = {
                time: new Date(),
                notes: null
            };

            data.nurse = {
                time_start: new Date(),
                time_left: null,
                time_right: null,
                time_both: null
            };

            data.sleep = {
                time_start: new Date(),
                time_slept: null,
                time_end: new Date(),
                location: null
            };

            data.solid = {
                time: new Date(),
                food_type: null
            };

            data.allergy = {
                time: new Date(),
                source: null,
                reaction: null,
                severity: null
            };

            data.moment = {
                time: new Date(),
                notes: null
            };

            return data;
        }

        exports.showModal = function(type, showData){
            var x = initialData();
            if(type == "change") {
                if(showData){
                    x.diaper  = showData;
                }
                exports.modals.diapersModal.mode = showData ? 'edit':'add';
                exports.modals.diapersModal.diaper = x.diaper;
                exports.modals.diapersModal.diaper.time = new Date(exports.modals.diapersModal.diaper.time*1000);
                exports.modals.diapersModal.show();
            } else if(type == "pump") {
                if(showData){
                    x.pump  = showData;
                }
                exports.modals.pumpModal.mode = showData ? 'edit':'add';
                exports.modals.pumpModal.pump = x.pump;
                exports.modals.pumpModal.pump.time = new Date(exports.modals.pumpModal.pump.time*1000);
                exports.modals.pumpModal.show();
            } else if(type == "play") {
                if(showData){
                    x.play  = showData;
                }
                exports.modals.playModal.mode = showData ? 'edit':'add';
                exports.modals.playModal.play = x.play;
                exports.modals.playModal.play.time = new Date(exports.modals.playModal.play.time*1000);
                exports.modals.playModal.show();
            } else if(type == "diary") {
                if(showData){
                    x.diary  = showData;
                }
                exports.modals.diaryModal.mode = showData ? 'edit':'add';
                exports.modals.diaryModal.diary = x.diary;
                exports.modals.diaryModal.diary.time = new Date(exports.modals.diaryModal.diary.time*1000);
                exports.modals.diaryModal.show();
            } else if(type == "vaccination") {
                if(showData){
                    x.vaccination  = showData;
                }
                exports.modals.vacmodal.mode = showData ? 'edit':'add';
                exports.modals.vacmodal.vaccination = x.vaccination;
                exports.modals.vacmodal.vaccination.time = new Date(exports.modals.vacmodal.vaccination.time*1000);
                exports.modals.vacmodal.show();
            } else if(type == "growth") {
                if(showData){
                    x.growth  = showData;
                }
                exports.modals.growthModal.mode = showData ? 'edit':'add';
                exports.modals.growthModal.growth = x.growth;
                exports.modals.growthModal.growth.time = new Date(exports.modals.growthModal.growth.time*1000);
                exports.modals.growthModal.show();
            } else if(type == "milestone") {
                if(showData){
                    x.milestone  = showData;
                }
                exports.modals.milModal.mode = showData ? 'edit':'add';
                exports.modals.milModal.milestone = x.milestone;
                exports.modals.milModal.milestone.time = new Date(exports.modals.milModal.milestone.time*1000);
                exports.modals.milModal.show();
            } else if(type == "sick") {
                if(showData){
                    x.sick  = showData;
                }
                exports.modals.sickModal.mode = showData ? 'edit':'add';
                exports.modals.sickModal.sick = x.sick;
                exports.modals.sickModal.sick.time = new Date(exports.modals.sickModal.sick.time*1000);
                exports.modals.sickModal.show();
            } else if(type == "doctor") {
                if(showData){
                    x.doctor  = showData;
                }
                exports.modals.doctorModal.mode = showData ? 'edit':'add';
                exports.modals.doctorModal.doctor = x.doctor;
                exports.modals.doctorModal.doctor.time = new Date(exports.modals.doctorModal.doctor.time*1000);
                exports.modals.doctorModal.show();
            } else if(type == "bath") {
                if(showData){
                    x.bath  = showData;
                }
                exports.modals.addBathModal.mode = showData ? 'edit':'add';
                exports.modals.addBathModal.bath = x.bath;
                exports.modals.addBathModal.bath.time = new Date(exports.modals.addBathModal.bath.time*1000);
                exports.modals.addBathModal.show();
            } else if(type == "medication") {
                if(showData){
                    x.medication  = showData;
                }
                exports.modals.medModal.mode = showData ? 'edit':'add';
                exports.modals.medModal.medication = x.medication;
                exports.modals.medModal.medication.time = new Date(exports.modals.medModal.medication.time*1000);
                exports.modals.medModal.show();
            } else if(type == "temperature") {
                if(showData){
                    x.temperature  = showData;
                }
                exports.modals.tempmodal.mode = showData ? 'edit':'add';
                exports.modals.tempmodal.temperature = x.temperature;
                exports.modals.tempmodal.temperature.time = new Date(exports.modals.tempmodal.temperature.time*1000);
                exports.modals.tempmodal.show();
            } else if(type == "mood") {
                if(showData){
                    x.mood  = showData;
                }
                exports.modals.moodModal.mode = showData ? 'edit':'add';
                exports.modals.moodModal.mood = x.mood;
                exports.modals.moodModal.mood.time = new Date(exports.modals.moodModal.mood.time*1000);
                exports.modals.moodModal.show();
            } else if(type == "bottle") {
                if(showData){
                    x.bottle  = showData;
                }
                exports.modals.bottleModal.mode = showData ? 'edit':'add';
                exports.modals.bottleModal.bottle = x.bottle;
                exports.modals.bottleModal.bottle.time = new Date(exports.modals.bottleModal.bottle.time*1000);
                exports.modals.bottleModal.show();
            } else if(type == "todo") {
                if(showData){
                    x.todo  = showData;
                }
                exports.modals.todoModal.mode = showData ? 'edit':'add';
                exports.modals.todoModal.todo = x.todo;
                exports.modals.todoModal.todo.time = new Date(exports.modals.todoModal.todo.time*1000);
                exports.modals.todoModal.show();
            } else if(type == "allergy") {
                if(showData){
                    x.allergy  = showData;
                }
                exports.modals.addAllergyModal.mode = showData ? 'edit':'add';
                exports.modals.addAllergyModal.allergy = x.allergy;
                exports.modals.addAllergyModal.allergy.time = new Date(exports.modals.addAllergyModal.allergy.time*1000);
                exports.modals.addAllergyModal.show();
            } else if(type == "nurse") {
                if(showData){
                    x.nurse  = showData;
                }
                exports.modals.nursedModal.mode = showData ? 'edit':'add';
                exports.modals.nursedModal.nurse = x.nurse;
                exports.modals.nursedModal.time_start.time = new Date(exports.modals.nursedModal.nurse.time_start*1000);
                exports.modals.nursedModal.show();
            } else if(type == "sleep") {
                if(showData){
                    x.sleep  = showData;
                }
                exports.modals.napModal.mode = showData ? 'edit':'add';
                exports.modals.napModal.sleep = x.sleep;
                exports.modals.napModal.sleep.time_start = new Date(exports.modals.napModal.sleep.time_start*1000);
                exports.modals.napModal.sleep.time_end = new Date(exports.modals.napModal.sleep.time_end*1000);
                exports.modals.napModal.show();
            } else if(type == "solid") {
                if(showData){
                    x.solid  = showData;
                }
                exports.modals.solidModal.mode = showData ? 'edit':'add';
                exports.modals.solidModal.solid = x.solid;
                exports.modals.solidModal.solid.time = new Date(exports.modals.solidModal.solid.time*1000);
                exports.modals.solidModal.show();
            } else if(type == "sleep") {
                if(showData){
                    x.sleep  = showData;
                }
                exports.modals.napModal.mode = showData ? 'edit':'add';
                exports.modals.napModal.solid.time = x.sleep;
                exports.modals.napModal.solid.time = new Date(exports.modals.napModal.solid.time*1000);
                exports.modals.napModal.show();
            } else if(type == "activity") {
                if(showData){
                    x.activity  = showData;
                }
                exports.modals.addActivityModal.mode = showData ? 'edit':'add';
                exports.modals.addActivityModal.activity = x.activity;
                exports.modals.addActivityModal.activity.time = new Date(exports.modals.addActivityModal.activity.time*1000);
                exports.modals.addActivityModal.show();
            }
        };

        return exports;
    }]);

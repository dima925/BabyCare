angular.module('cleverbaby.controllers')
.controller('activityCtrl', ['$rootScope', '$scope', '$window', 'ActivityService', 'NotificationService',
    function ($rootScope, $scope, $window, ActivityService, NotificationService) {
        function init() {

            $scope.diaper = {
                time: new Date(),
                diaper_type: "Empty",
                amount_size: "Tiny",
                color: "Yellow",
                texture: "Runny"
            };

            $scope.pump = {
                time: new Date(),
                side: "",
                amount: null,
                start_side: ""
            };

            $scope.play = {
                time: new Date(),
                notes: null
            };

            $scope.diary = {
                time: new Date(),
                notes: null
            };

            $scope.vaccination = {
                time: new Date(),
                vaccination_type: null
            };

            $scope.growth = {
                time: new Date(),
                weight: null,
                height: null,
                head: null
            };

            $scope.milestone = {
                time: new Date(),
                milestone_type: null
            };

            $scope.sickness = {
                time: new Date(),
                symptom: null
            };

            $scope.doctor = {
                time: new Date(),
                visit_type: null,
                doctor: null
            };

            $scope.bath = {
                time: new Date(),
                notes: null,
                temp: null
            };

            $scope.medication = {
                time: new Date(),
                drug: null,
                amount_given: null,
                prescription_interval: null
            };

            $scope.temperature = {
                time: new Date(),
                temp: null,
                reminder: null
            };

            $scope.mood = {
                time: new Date(),
                mood_type: null
            };

            $scope.bottle = {
                time: new Date(),
                bottle_type: null,
                amount: null,
                notes: null
            };

            $scope.todo = {
                time: new Date(),
                notes: null
            };

            $scope.nurse = {
                time_start: new Date(),
                time_left: null,
                time_right: null,
                time_both: null
            };

            $scope.sleep = {
                time_start: new Date(),
                time_slept: null,
                time_end: new Date(),
                location: null
            };

            $scope.solid = {
                time: new Date(),
                food_type: null
            };

            $scope.allergy = {
                time: new Date(),
                source: null,
                reaction: null,
                severity: null
            };

            $scope.moment = {
                time: new Date(),
                notes: null
            }
        }
        init();
        $scope.addActivity = function(type){
            var data;
            if(type == "change"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.diaper.time.getTime()/1000),
                    diaper_type: $scope.diaper.diaper_type,
                    amount_size: $scope.diaper.amount_size,
                    color: $scope.diaper.color,
                    texture: $scope.diaper.texture,
                    type: "change"
                };
            }
            if(type == "pump"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.pump.time.getTime()/1000),
                    side: $scope.pump.side,
                    amount: $scope.pump.amount,
                    start_side: $scope.pump.start_side,
                    type: "pump"
                };
            }
            if(type == "play"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.play.time.getTime()/1000),
                    notes: $scope.play.notes,
                    type: "play"
                };
            }
            if(type == "diary"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.diary.time.getTime()/1000),
                    notes: $scope.diary.notes,
                    type: "diary"
                };
            }
            if(type == "vaccination"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.vaccination.time.getTime()/1000),
                    vaccination_type: $scope.vaccination.vaccination_type,
                    type: "vaccination"
                };
            }
            if(type == "growth"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.vaccination.time.getTime()),
                    height: $scope.growth.height,
                    weight: $scope.growth.weight,
                    head_size: $scope.growth.head_size,
                    type: "growth"
                };
            }
            if(type == "milestone"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.milestone.time.getTime()),
                    milestone_type: $scope.milestone.milestone_type,
                    type: "milestone"
                };
            }
            if(type == "sick"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.sickness.time.getTime()/1000),
                    symptom: $scope.sickness.symptom,
                    type: "sick"
                };
            }
            if(type == "doctor"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.doctor.time.getTime()/1000),
                    doctor: $scope.doctor.doctor || "No Doctor",
                    visit_type: $scope.doctor.visit_type,
                    type: "doctor"
                };
            }
            if(type == "bath"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.bath.time.getTime()/1000),
                    temp: $scope.bath.temp,
                    notes: $scope.bath.notes,
                    type: "bath"
                };
            }
            if(type == "medication"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.medication.time.getTime()/1000),
                    drug: $scope.medication.drug,
                    amount_given: $scope.medication.amount_given,
                    prescription_interval: $scope.medication.prescription_interval,
                    type: "medication"
                };
            }
            if(type == "temperature"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.temperature.time.getTime()/1000),
                    temp: $scope.temperature.temp,
                    reminder: $scope.temperature.reminder,
                    type: "temperature"
                };
            }
            if(type == "mood"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.mood.time.getTime()/1000),
                    mood_type: $scope.mood.mood_type,
                    type: "mood"
                };
            }
            if(type == "bottle"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.bottle.time.getTime()/1000),
                    bottle_type: $scope.bottle.bottle_type,
                    amount: $scope.bottle.amount,
                    notes: $scope.bottle.notes,
                    type: "bottle"
                };
            }
            if(type == "todo"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.todo.time.getTime()/1000),
                    notes: $scope.todo.notes,
                    type: "todo"
                }
            }
            if(type == "nurse"){
                data = {
                    babies: $rootScope.babyId,
                    time_start: parseInt($scope.nurse.time_start.getTime()/1000),
                    time_left: $scope.nurse.time_left,
                    time_right: $scope.nurse.time_right,
                    time_both: $scope.nurse.time_both,
                    type: "nurse"
                };
            }
            if(type == "sleep"){
                data = {
                    babies: $rootScope.babyId,
                    time_start: parseInt($scope.sleep.time_start.getTime()/1000),
                    time_end: parseInt($scope.sleep.time_end.getTime()/1000),
                    location: $scope.sleep.location,
                    type: "sleep"
                }
            }
            if(type == "solid") {
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.solid.time.getTime()/1000),
                    food_type: $scope.solid.food_type,
                    type: "solid"
                }
            }
            if(type == "allergy"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.allergy.time.getTime()/1000),
                    source: $scope.allergy.source,
                    reaction: $scope.allergy.reaction,
                    severity: $scope.allergy.severity,
                    type: "allergy"
                }
            }
            if(type == "moment"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.moment.time.getTime()/1000),
                    notes: $scope.moment.notes,
                    type: "moment"
                }
            }

            ActivityService.addActivity(data);
            (function(activity){
                $rootScope.$broadcast('activityAdd', activity);
                $scope.modal.hide();
            })(data);
        };

        $scope.manual = true;
        $scope.timer = false;

        $scope.switchtimer = function(){
            $scope.manual = !$scope.manual;
            $scope.timer = !$scope.timer;
        };

        $scope.closeActivity = function(){
            $scope.modal.hide();
        };

        $scope.$on('modal.hidden', function() {
            init();
        });
    }
]);

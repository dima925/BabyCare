angular.module('cleverbaby.controllers')
.controller('activityCtrl', ['$rootScope', '$scope', '$window', 'ActivityService', 'NotificationService',
    function ($rootScope, $scope, $window, ActivityService, NotificationService) {
        $scope.diaper = {
            time : new Date(),
            diaper_type : "Empty",
            amount_size : "Tiny",
            color : "Yellow",
            texture : "Runny"
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
                console.log()
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.bottle.time.getTime()/1000),
                    bottle_type: $scope.bottle.bottle_type,
                    amount: $scope.bottle.amount,
                    notes: $scope.bottle.notes,
                    type: "bottle"
                };
            }

            ActivityService.addActivity(data).then(function(){
                $scope.modal.hide();
            }, function(err){
                NotificationService.notify(err.data.message || "Network error");
            });
        };

    $scope.manual = true;
    $scope.timer = false;

    $scope.switchtimer = function(manual,timer){
        $scope.manual = manual;
        $scope.timer = timer;
    };
    $scope.closeActivity = function(){
        $scope.modal.hide();
    }
    /*NURSE ACTVITY*/
    $scope.addNurse = function(breast, length, time) {
        $scope.modal.hide();
        var nurse = {
            type: 'nurse',
            breast: breast == undefined ? 'both' : breast,
            length: length == undefined ? 0 : length,
            time: time == undefined ? Date.now() : time,
            created: Date.now(),
            updated: Date.now(),
            created_by : escapeEmailAddress($rootScope.userEmail),
            updated_by : escapeEmailAddress($rootScope.userEmail),
            timeit : true

        };
        babiesService.getbabiesId().then(function(data){
            var babies = data;
            activityService.save(babies,nurse);
        })

    };
    /*END NURSE ACTIVITY*/

    /*NAP ACTIVITY*/
        $scope.addNap = function(time){
            $scope.modal.hide();
            var nap = {
                type : 'sleep',
                start : time == undefined ? Date.now() : time,
                end : time == undefined ? Date.now() : time,
                created : time == undefined ? Date.now() : time,
                updated : time == undefined ? Date.now() : time,
                created_by : escapeEmailAddress($rootScope.userEmail),
                updated_by : escapeEmailAddress($rootScope.userEmail),
                deleted : false
            }
            babiesService.getbabiesId().then(function(data){
                var babies = data;
                activityService.save(babies,nap);
            })
        }
    /*END NAP ACTIVITY*/

}]);

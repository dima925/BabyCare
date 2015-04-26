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
                }
            }
            if(type == "play"){
                data = {
                    babies: $rootScope.babyId,
                    time: parseInt($scope.play.time.getTime()/1000),
                    notes: $scope.play.notes,
                    type: "play"
                }
            }

            ActivityService.addActivity(data).then(function(){
                $scope.modal.hide();
            }, function(err){
                NotificationService.notify(err.data.message)
            });
        };

        /*BOTTLE ACTIVITY*/
        $scope.bottle = {
            time:"1",
            max:"12",
            value:"1"
        };

        $scope.addBottle = function(time){
            $scope.modal.hide();
            var amount = this.bottle.value;
            var bottle = {
                type : "bottle",
                amount : amount,
                created : time == undefined ? Date.now() : time,
                updated : time == undefined ? Date.now() : time,
                created_by : escapeEmailAddress($rootScope.userEmail),
                updated_by : escapeEmailAddress($rootScope.userEmail),
                deleted : false
            };
            babiesService.getbabiesId().then(function(data){
                var babies = data;
                activityService.save(babies,bottle);
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

angular.module('cleverbaby.controllers')
.controller('activityCtrl', ['$rootScope', '$scope', '$window', 'ActivityService', 'NotificationService',
    function ($rootScope, $scope, $window, ActivityService, NotificationService) {

        /*DIAPERS ACTIVITY*/

        $scope.diaper = {
            time : new Date(),
            diaper_type : "Empty",
            amount_size : "Tiny",
            color : "Yellow",
            texture : "Runny"
        };

        $scope.addDiapers = function(){
            ActivityService.addActivity({
                babies: $rootScope.babyId,
                time: parseInt($scope.diaper.time.getTime()/1000),
                diaper_type: $scope.diaper.diaper_type,
                amount_size: $scope.diaper.amount_size,
                color: $scope.diaper.color,
                texture: $scope.diaper.texture,
                type: "change"
            }).then(function(){
                $scope.modal.hide();
            });
        };
        /*END DIAPER ACTIVITY*/


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
        /*END BOTTLE ACTIVITY*/

        /*
        ADD PUMPING
         */
         $scope.pump = {
             time: new Date(),
             side: "",
             amount: null,
             start_side: ""
         };

        $scope.addPump = function(){
            ActivityService.addActivity({
                babies: $rootScope.babyId,
                time: parseInt($scope.pump.time.getTime()/1000),
                side: $scope.pump.side,
                amount: $scope.pump.amount,
                start_side: $scope.pump.start_side,
                type: "pump"
            }).then(function(){
                $scope.modal.hide();
            }, function(err){
                NotificationService.notify(err.data.message)
            });
        };
        /*
        END PUMPING
         */

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

angular.module('cleverbaby.controllers')
/*ACTIVITY CONTROLLER*/
.controller('activityCtrl', ['$rootScope','$scope','$window','$firebase','activityService','babiesService','timerService',
    function ($rootScope,$scope,$window,$firebase,activityService,babiesService,timerService) {
    $scope.manual = true;
    $scope.timer = false;
    $scope.switchtimer = function(manual,timer){
        $scope.manual = manual;
        $scope.timer = timer;
    };
    $scope.setTimer = function(){
       timerService.setTimer();
       $scope.timerr = true;
    };
    $scope.diaper = {
        wet : "",
        solid : ""
    };
    $scope.bottle = {
        min:"1",
        max:"12",
        value:"1"
    }
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

    /*DIAPERS ACTIVITY*/
        $scope.addDiapers = function(size,time){
            $scope.modal.hide();
            var wet = this.diaper.wet;
            var solid = this.diaper.solid;
            var cons = ""
            if(wet == true && solid == true){
                cons = "wet and solid";
            }else if(wet==true && solid == false){
                cons = "wet";
            }else if(wet == false && solid == true){
                cons = "solid";
            }
            var diapers = {
                type : 'diaper',
                consistency : cons,
                size : size,
                created: Date.now(),
                updated: Date.now(),
                time: time == undefined ? Date.now() : time,
                created_by : escapeEmailAddress($rootScope.userEmail),
                updated_by : escapeEmailAddress($rootScope.userEmail)
            };
            babiesService.getbabiesId().then(function(data){
                var babies = data;
                activityService.save(babies,diapers);
            })
            
            
        }
    /*END DIAPER ACTIVITY*/
    /*BOTTLE ACTIVITY*/
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
        }
        babiesService.getbabiesId().then(function(data){
            var babies = data;
            activityService.save(babies,bottle);
        })
    }
    /*END BOTTLE ACTIVITY*/
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
angular.module('cleverbaby.controllers')
    .controller('DiaryCtrl', ['$location', '$scope', '$ionicModal', 'DailytipService', '$ionicSlideBoxDelegate', 'ActivityService', 'BabyModal', '$rootScope', 'network',
        function ($location, $scope, $ionicModal, DailytipService, $ionicSlideBoxDelegate, ActivityService, BabyModal, $rootScope, network) {

            $scope.editBaby = function(){
                BabyModal.showModal($rootScope.baby);
            };

            var start, limit;
            function load(baby){
                $scope.canBeloadedMore = true;
                start = 0;
                limit = 10;
                ActivityService.getAllActivitiesByBabyId(baby.uuid, start, limit).then(function(activities){
                    $scope.activities = activities;
                });
                ActivityService.getTodayCount(baby.uuid).then(function(counts) {
                    $scope.TodayPlay = counts.playCount > 0;
                    $scope.TodayBath = counts.bathCount > 0;
                    $scope.BathCount = counts.bathCount;
                    $scope.PlayCount = counts.playCount;
                    $scope.ChangeCount = counts.changeCount;
                    $scope.NurseCount = counts.nurseCount;
                    $scope.SleepCount = counts.sleepcount;
                });
            }
            if($rootScope.babyId){
                load($rootScope.baby);
            }
            $rootScope.$on('babySelected', function(event, baby){
                load(baby);
            });

            $scope.loadMore = function(){
                loadMore(limit).then(function(){
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                })
            };

            function loadMore(count){
                start+=count;
                return ActivityService.getAllActivitiesByBabyId($rootScope.baby.uuid, start, count).then(function(activities){
                    if(activities.length == 0){
                        $scope.canBeloadedMore = false;
                    }
                    Array.prototype.push.apply($scope.activities, activities);
                    return activities;
                });
            }

            /*
            $scope.addPlay = function(){

                $scope.TodayPlay = true;
                var data = {
                    time: new Date(),
                    type: "play"
                };
                ActivityService.addActivity(data, $rootScope.baby.uuid).then(function(activity){
                    $scope.$broadcast('activityAdd', activity);
                });
            };

            $scope.addBath = function(){

                $scope.TodayBath = true;

                var activity = {
                    time: new Date(),
                    type: "bath"
                };

                ActivityService.addActivity(activity, $rootScope.baby.uuid).then(function(activity){
                    $scope.$broadcast('activityAdd', activity);
                });
            };
            */

            /**
             * Add activity by the checkbox.
             * @param type - type of activity
             */
            $scope.addActivityByType = function(type){
                var requiredScope = 'Today'+ type[0].toUpperCase() + type.substring(1);
                $scope[requiredScope] = true;
                var data = {
                    time: new Date(),
                    type: type
                };
                ActivityService.addActivity(data, $rootScope.baby.uuid).then(function(activity){
                    $scope.$broadcast('activityAdd', activity);
                });
            };

            function isToDay(date){
                return new Date(date).setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
            }

            function getActivityByUUID(uuid){
                for(var i = 0; i<$scope.activities.length; ++i) {
                    if ($scope.activities[i].uuid == uuid) {
                        return i;
                    }
                }
            }

            function increaseTodayStatus(activity){
                if(isToDay(activity.time)){
                    if(activity.type == 'change'){
                        ++$scope.ChangeCount;
                    }
                    if(activity.type == 'nurse'){
                        ++$scope.NurseCount;
                    }
                    if(activity.type == 'bath'){
                        ++$scope.BathCount;
                        $scope.TodayBath = true;
                    }
                    if(activity.type == 'play'){
                        ++$scope.PlayCount;
                        $scope.TodayPlay = true;
                    }
                    if(activity.type == 'sleep'){
                        ++$scope.SleepCount;
                        $scope.TodaySleep = true;
                    }
                }
            }

            function decreaseTodayStatus(activity){
                if(activity.type == 'change'){
                    --$scope.ChangeCount;
                }
                if(activity.type == 'nurse'){
                    --$scope.NurseCount;
                }
                if(activity.type == 'bath'){
                    --$scope.BathCount;
                    $scope.TodayBath = $scope.BathCount>0;
                }
                if(activity.type == 'play'){
                    --$scope.PlayCount;
                    $scope.TodayPlay = $scope.PlayCount>0;
                }
                if(activity.type == 'sleep'){
                    --$scope.SleepCount;
                    $scope.TodaySleep = $scope.SleepCount>0;
                }
            }


            $scope.$on('activityAdd', function(event, activity){
                if($scope.activities.length < limit || activity.time > $scope.activities[$scope.activities.length-1].time){
                    ++start;
                    increaseTodayStatus(activity);
                    refreshActivity(activity, 'add');
                } else {
                    $scope.canBeloadedMore = true;
                }
            });

            $scope.$on('activityEdit', function(event, activity){
                var i = getActivityByUUID(activity.uuid);
                if(isToDay($scope.activities[i].time) && !isToDay(activity.time)){
                    decreaseTodayStatus(activity);
                } else if(!isToDay($scope.activities[i].time) && isToDay(activity.time)){
                    increaseTodayStatus(activity);
                }
                if(activity.time > $scope.activities[$scope.activities.length-1].time || $scope.activities.length<limit){
                    refreshActivity(activity, 'edit', i);
                } else{
                    --start;
                    refreshActivity(activity, 'delete', i);
                    $scope.canBeloadedMore = true;
                }
            });

            function refreshActivity(activity, mode, index){
                var activities = angular.copy($scope.activities);
                function addActivity(activity){
                    for(var i=0; i<activities.length; ++i){
                        if(activity.time>activities[i].time){
                            break;
                        }
                    }
                    var middle = [];
                    Array.prototype.push.apply(middle, activities.slice(0, i));
                    middle.push(activity);
                    Array.prototype.push.apply(middle, activities.slice(i, activities.length));
                    activities = middle;
                }
                function deleteActivity(i){
                    var middle = [];
                    Array.prototype.push.apply(middle, activities.slice(0, i));
                    Array.prototype.push.apply(middle, activities.slice(i+1, activities.length));
                    activities = middle;
                }

                if(mode == 'add'){
                    addActivity(activity);
                }
                if(mode =='delete'){
                    deleteActivity(index);
                }
                if(mode == 'edit'){
                    deleteActivity(index);
                    addActivity(activity);
                }
                $scope.activities = activities;
            }

            $scope.editBaby = function(){
                BabyModal.showModal($rootScope.baby);
            };

            $scope.noData = true;

            $ionicModal.fromTemplateUrl('templates/timeline.html', function (modal) {
                $scope.newTemplate = modal;
            });

            $ionicModal.fromTemplateUrl('templates/activities/choose.html',function(activity){
                $scope.activityModal = activity;
            });

            $scope.newActivity = function(){
                $scope.activityModal.show();
            };

            $scope.newTask = function () {
                $scope.newTemplate.show();
            };

            var showTip = DailytipService.showDailtyTip();

            if(showTip) {
                var activeBaby = {'gender':'m', 'birthday': 1429682270000 };
                DailytipService.getTranslatedTip(activeBaby).then(function(dailyTip){
                    $scope.showTip = true;
                    $scope.dailyTip = dailyTip.text;
                    $scope.clickTip = function() {
                        $location.path(dailyTip.route);
                    };
                });
            }

            /**
             * This function hides the daily tip
             */
            $scope.hideDailyTip = function(){
                $scope.showTip = false;
                DailytipService.saveLastHideDailyTip();
            };

            $scope.$on('$ionicView.enter', function(){
                $ionicSlideBoxDelegate.update();
            });
        }
    ]
);

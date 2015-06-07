angular.module('cleverbaby.controllers')
    .controller('DiaryCtrl', ['$location', '$scope', '$ionicModal', 'DailytipService', '$ionicSlideBoxDelegate', 'ActivityService', 'BabyModal', '$rootScope', 'network', '$interval',
        function ($location, $scope, $ionicModal, DailytipService, $ionicSlideBoxDelegate, ActivityService, BabyModal, $rootScope, network, $interval) {

            $scope.editBaby = function(){
                BabyModal.showModal($rootScope.baby);
            };            

            var start, limit;
            function load(baby){
                $scope.canBeloadedMore = true;
                start = 0;
                limit = 10;
                ActivityService.getAllActivitiesByBabyId(baby.uuid, start, limit, false).then(function(activities){
                    $scope.activities = activities;
                    console.log($scope.activities );
                });
                ActivityService.getTodayCount(baby.uuid).then(function(counts) {
                    $scope.TodayPlay = counts.playCount > 0;
                    $scope.TodayBath = counts.bathCount > 0;
                    $scope.BathCount = counts.bathCount;
                    $scope.PlayCount = counts.playCount;
                    $scope.DiaperCount = counts.diaperCount;
                    $scope.NurseCount = counts.nurseCount;
                    $scope.SleepCount = counts.sleepCount;
                });
            }

            $scope.countdownPromise = null;
            $scope.countdownStartTime = null;
            $scope.babysAge = '';

            $scope.countdownStart = function () {
                if($scope.countdownPromise) {
                    $interval.cancel($scope.countdownPromise);
                }
                $scope.countdownStartTime = moment();
                $scope.countdownPromise = $interval(function () {
                    var now = moment(),
                        passed = now.diff($scope.countdownStartTime, 'minutes', true);

                    // decrementing times
                    if($scope.etaDiaper !== null) {
                        $scope.etaDiaperDynamic = Math.max(Math.round($scope.etaDiaper - passed), 0);
                        $scope.etaDiaperProgress = $scope.etaDiaper == 0 ? 0 : Math.round($scope.etaDiaperDynamic * 100 / $scope.etaDiaper);
                    }
                    
                    if($scope.etaBottle !== null) {
                        $scope.etaBottleDynamic =  Math.max(Math.round($scope.etaBottle - passed), 0);
                        $scope.etaBottleProgress = $scope.etaBottle == 0 ? 0 : Math.round($scope.etaBottleDynamic * 100 / $scope.etaBottle);    
                    }
                }, 60000);
            };

            $scope.countdownStop = function () {
                if($scope.countdownPromise)
                    $interval.cancel($scope.countdownPromise);
            };

            // progress coloring rules
            $scope.getProgressColor = function (value) {
                if(value > 50) {
                    return '#66cc00';
                } else if (value > 0) {
                    return '#ffcc66';
                }
                return '#ff5500' 
            };

            // updates baby birthday on request
            function updateBirth (baby) {
                moment.locale('en');
                var years, months, days;

                // fill baby information
                var born = moment(baby.born),
                    now = moment();
                var ms = now.diff(born, 'milliseconds', true);
                years = Math.floor(moment.duration(ms).asYears());

                var withoutYears = born.add(years, 'years');
                ms = now.diff(withoutYears, 'milliseconds', true);
                months = Math.floor(moment.duration(ms).asMonths());

                var withoutMonths = born.add(months, 'months').add(1, 'days');
                ms = now.diff(withoutMonths, 'milliseconds', true);
                days = Math.floor(moment.duration(ms).asDays());

                var yearText = years <= 0 ? '' : (years == 1 ? '1 year' : years + ' years'),
                    monthText = months <= 0 ? '' : (months == 1 ? '1 month' : months + ' months'),
                    dayText = days <= 0 ? '' : (days == 1 ? '1 day' : days + ' days');
                $scope.babysAge = String(yearText + ' ' + monthText + ' ' + dayText + '').trim();
            }

            function updateAvgTimes (baby) {
                $scope.etaBottle = ActivityService.getActivityEtaByType($rootScope.babyId, 'bottle'); // average
                $scope.etaDiaper = ActivityService.getActivityEtaByType($rootScope.babyId, 'diaper'), // average

                $scope.etaBottleDynamic = $scope.etaBottle !== null ? $scope.etaBottle : 0;
                $scope.etaDiaperDynamic = $scope.etaDiaper !== null ? $scope.etaDiaper : 0;
                
                $scope.etaBottleProgress = $scope.etaBottle !== null ? ($scope.etaBottle > 0 ? 100 : 0) : undefined;
                $scope.etaDiaperProgress = $scope.etaDiaper !== null ? ($scope.etaDiaper > 0 ? 100 : 0) : undefined;

                $scope.countdownStart();
            }

            // general function for UPDATING diary quick data
            function updateActivityQuickData (baby) {
                updateBirth(baby);
                updateAvgTimes(baby);
                
                var lastGrowth = ActivityService.getLastActivityByType($rootScope.babyId, 'growth');
                if(lastGrowth) {
                    $scope.babysWeight = (Number(lastGrowth.growth_weight/1000).toFixed(1)) + ' ' + (lastGrowth.growth_weight_unit || '');
                    $scope.babysHeight = lastGrowth.growth_height + ' ' + (lastGrowth.growth_height_unit || '');
                } else {
                    $scope.babysWeight = 'Please add growth progress';
                    $scope.babysHeight = '';
                }
            }

            if($rootScope.babyId){
                load($rootScope.baby);
                updateActivityQuickData($rootScope.baby);
            }
            $rootScope.$on('babySelected', function(event, baby){
                load(baby);
                updateActivityQuickData(baby);
            });

            $scope.loadMore = function(){
                loadMore(limit).then(function(){
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                })
            };

            function loadMore(count){
                start+=count;
                return ActivityService.getAllActivitiesByBabyId($rootScope.baby.uuid, start, count, false).then(function(activities){
                    if(activities.length == 0){
                        $scope.canBeloadedMore = false;
                    }
                    Array.prototype.push.apply($scope.activities, activities);
                    return activities;
                });
            }

            /**
             * Add activity by the checkbox.
             * @param type - type of activity
             */
            $scope.addActivityByType = function(type){
                var requiredScope = 'Today'+ type[0].toUpperCase() + type.substring(1);
                $scope[requiredScope] = true;
                var data = {
                    time: new Date(),
                    type: type,
                    media: []
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
                    if(activity.type == 'diaper'){
                        ++$scope.DiaperCount;
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
                if(activity.type == 'diaper'){
                    --$scope.DiaperCount;
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
                if(moment().diff(moment(activity.time)) < 0)
                    return;
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

            $scope.$on('babyUpdate', function (event, baby) {
                updateBirth(baby);
            });

            $scope.$on('babyDelete', function (event, baby) {
                updateBirth(baby);
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

                updateActivityQuickData($rootScope.baby);
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

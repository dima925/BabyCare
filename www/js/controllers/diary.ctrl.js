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
                    $scope.ChangeCount = counts.changeCount;
                    $scope.NurseCount = counts.nurseCount;
                });
            }
            if($rootScope.babyId){
                load($rootScope.baby);
            }
            $rootScope.$on('babySelected', function(event, baby){
                load(baby);
            });

            $scope.loadMore = function(){
                start+=limit;
                ActivityService.getAllActivitiesByBabyId($rootScope.baby.uuid, start, limit).then(function(activities){
                    if(activities.length == 0){
                        $scope.canBeloadedMore = false;
                    }
                    Array.prototype.push.apply($scope.activities, activities);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            };

            $scope.addPlay = function(){

                $scope.TodayPlay = true;
                var data = {
                    babies: $rootScope.baby.uuid,
                    time: parseInt(new Date().getTime()/1000),
                    type: "play"
                };
                ActivityService.addActivity(data);

                (function(activity){
                    $scope.$broadcast('activityAdd', activity)
                })(data);

            };

            $scope.addBath = function(){

                $scope.TodayBath = true;

                var activity = {
                    babies: $rootScope.baby.uuid,
                    time: parseInt(new Date().getTime()/1000),
                    type: "bath"
                };

                ActivityService.addActivity(activity);

                (function(activity){
                    $scope.$broadcast('activityAdd', activity);
                })(activity);
            };

            $scope.$on('activityAdd', function(event, activity){
                if(activity.type == 'change'){
                    ++$scope.ChangeCount;
                }
                if(activity.type == 'nurse'){
                    ++$scope.NurseCount;
                }
                $scope.activities.unshift(activity);
            });

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
                //todo temporary activeBaby
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

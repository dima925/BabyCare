angular.module('cleverbaby.controllers')
    .controller('DiaryCtrl', ['$location', '$scope', '$ionicModal', 'DailytipService', '$ionicSlideBoxDelegate', 'ActivityService', 'BabyModal',
        function ($location, $scope, $ionicModal, DailytipService, $ionicSlideBoxDelegate, ActivityService, BabyModal) {

            var start;
            var limit;

            $scope.getNextActivities = function(babyId){
                return ActivityService
                    .getAllActivitiesByBabyId(babyId, start, limit)
                    .then(function(activities){
                        start+=limit;
                        return activities;
                    });
            };
            $scope.$on('babySelected', function(event, baby){
                $scope.canBeloadedMore = true;
                start = 0;
                limit = 20;
                $scope.getNextActivities(baby.id).then(function(activities){
                    $scope.activities = activities;
                    $scope.NurseCount = $scope.nurseCount();
                    $scope.ChangeCount = $scope.changeCount();
                    $scope.TodayBath = $scope.todayBath();
                    $scope.TodayPlay = $scope.todayPlay();
                });
                $scope.loadMore = function(){
                    $scope.getNextActivities($scope.baby.id).then(function(activities){
                        if(activities.length == 0){
                            $scope.canBeloadedMore = false;
                        }
                        Array.prototype.push.apply($scope.activities, activities);
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
                };
                $scope.editBaby = function(){
                    BabyModal.showModal(baby);
                };

                $scope.addPlay = function(){
                    $scope.TodayPlay = true;
                    ActivityService.addActivity({
                        babies: baby.id,
                        time: parseInt(new Date().getTime()/1000),
                        type: "play"
                    }).then(function(activity){
                        $scope.$broadcast('activityAdd', activity)
                    });
                };

                $scope.addBath = function(){
                    $scope.TodayBath = true;
                    ActivityService.addActivity({
                        babies: baby.id,
                        time: parseInt(new Date().getTime()/1000),
                        type: "bath"
                    }).then(function(activity){
                        $scope.$broadcast('activityAdd', activity);
                    });
                };
            });

            $scope.nurseCount = function(){
                return $scope.activities ? $scope.activities.filter(function(activity){
                    return activity.createdAt.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0) && activity.type == 'nurse';
                }).length : 0;
            };

            $scope.changeCount = function(){
                return $scope.activities ? $scope.activities.filter(function(activity){
                    return activity.createdAt.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0) && activity.type == 'change';
                }).length : 0;
            };

            $scope.todayPlay = function(){
                return $scope.activities ? $scope.activities.filter(function(activity){
                    return activity.createdAt.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0) && activity.type == 'play';
                }).length > 0 : false;
            };

            $scope.todayBath = function(){
                return $scope.activities ? $scope.activities.filter(function(activity){
                    return activity.createdAt.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0) && activity.type == 'bath';
                }).length > 0 : false;
            };

            $scope.$on('activityAdd', function(event, activity){
                ++start;
                if(activity.type == 'change'){
                    ++$scope.ChangeCount;
                }
                if(activity.type == 'nurse'){
                    ++$scope.NurseCount;
                }
                $scope.activities.unshift(activity);
            });

            $scope.editBaby = function(){};

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

            $ionicModal.fromTemplateUrl('templates/modals/dropdown.html',function(dropdown){
                $scope.dropdownModal = dropdown;
            });

            $scope.dropdown = function(){
                $scope.modal.hide();
                $scope.dropdownModal.show();
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

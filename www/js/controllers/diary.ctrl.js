angular.module('cleverbaby.controllers')
    .controller('DiaryCtrl', ['$location', '$scope', '$ionicModal', 'DailytipService', '$ionicSlideBoxDelegate', 'ActivityService', 'BabyModal',
        function ($location, $scope, $ionicModal, DailytipService, $ionicSlideBoxDelegate, ActivityService, BabyModal) {

            $scope.$on('babySelected', function(event, baby){
                ActivityService
                    .getAllActivitiesByBabyId(baby.id)
                    .then(function(activities){
                        $scope.activities = activities;
                    });
                $scope.editBaby = function(){
                    BabyModal.showModal(baby);
                };

                $scope.addPlay = function(){
                    ActivityService.addActivity({
                        babies: baby.id,
                        time: parseInt(new Date().getTime()/1000),
                        type: "play"
                    }).then(function(activity){
                        $scope.$broadcast('activityAdd', activity)
                    });
                };

                $scope.addBath = function(){
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
                }).length : '';
            };

            $scope.changeCount = function(){
                return $scope.activities ? $scope.activities.filter(function(activity){
                    return activity.createdAt.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0) && activity.type == 'change';
                }).length : '';
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

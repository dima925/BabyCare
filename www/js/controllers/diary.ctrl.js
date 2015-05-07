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
        }
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
    })
}]);

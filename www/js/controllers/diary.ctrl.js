angular.module('cleverbaby.controllers')
.controller('DiaryCtrl', ['$location', '$scope', '$rootScope', '$ionicModal', 'DailytipService', '$ionicSlideBoxDelegate',
    function ($location, $scope, $rootScope, $ionicModal, DailytipService, $ionicSlideBoxDelegate) {

    $scope.noData = true;
    $ionicModal.fromTemplateUrl('templates/activities/item.html', function (modal) {
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

    $scope.showTip = DailytipService.showDailtyTip();

    if($scope.showTip) {
        //todo temporary activeBaby
        var activeBaby = {'gender':'m', 'birthday': 1429682270000 };
        DailytipService.getTranslatedDailyTip(activeBaby).then(function(dailyTip){
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

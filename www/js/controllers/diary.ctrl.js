angular.module('cleverbaby.controllers')
.controller('DiaryCtrl', ['$scope', '$rootScope', '$ionicModal', '$firebase', 'activityService', 'NotificationService', '$translate',
    function ($scope, $rootScope, $ionicModal, $firebase,activityService, NotificationService, $translate) {



    $scope.noData = true;

    activityService.get(escapeEmailAddress($rootScope.userEmail)).then(function(data){
        $scope.list = data;
        console.log($scope.list);
    });
    

    $ionicModal.fromTemplateUrl('templates/newItem.html', function (modal) {
        $scope.newTemplate = modal;
    });

    $ionicModal.fromTemplateUrl('templates/newChoose.html',function(activity){
        $scope.activityModal = activity;
    });
    $scope.newActivity = function(){
        $scope.activityModal.show();
    };
    $scope.newTask = function () {
        $scope.newTemplate.show();
    };

    $scope.deleteItem = function (key) {
        $rootScope.show($translate('celeverbaby.app.diary.delete.message'));
        var itemRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        bucketListRef.child(key).remove(function (error) {
            if (error) {
                NotificationService.hide();
                NotificationService.notify($translate('celeverbaby.app.diary.delete.error'));
            } else {
                NotificationService.hide();
                NotificationService.notify($translate('celeverbaby.app.diary.delete.success'));
            }
        });
    };
}]);

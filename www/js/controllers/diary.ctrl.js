angular.module('cleverbaby.controllers')
.controller('DiaryCtrl', function ($scope, $rootScope, $ionicModal, $firebase,activityService) {



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
        $rootScope.show("Please wait... Deleting from List");
        var itemRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        bucketListRef.child(key).remove(function (error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully deleted');
            }
        });
    };
});

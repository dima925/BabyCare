angular.module('cleverbaby.controllers')
.controller('newCtrl', function ($rootScope, $scope, $window, $firebase, NotificationService) {
    $scope.data = {
        item: ""
    };

    $scope.close = function () {
        $scope.modal.hide();
    };

    $scope.createNew = function () {
        var item = this.data.item;

        if (!item) return;

        console.log("itme", item);

        $scope.modal.hide();

        NotificationService.show("Please wait... Creating new");

        var form = {
            item: item,
            isCompleted: false,
            created: Date.now(),
            updated: Date.now()
        };

        $rootScope.fbData.$add(form);


        NotificationService.hide();
    };
});

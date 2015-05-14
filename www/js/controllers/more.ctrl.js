angular.module('cleverbaby.controllers')
    .controller('YourAccountCtrl', ['$scope','$timeout', function ($scope, $timeout) {

        $scope.inputDisabled = true;
        /**
         * enables the editing of form
         */
        $scope.activateEdit = function() {
            $scope.inputDisabled = false;
        };
    }]);
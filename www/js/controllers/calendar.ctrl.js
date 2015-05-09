/**
 * Created by Kevin on 07/05/2015.
 */

angular.module('cleverbaby.controllers')
    .controller('CalendarCtrl', ['$scope',
        function ($scope) {
            $scope.eventSources = [];

            /* config object */
            $scope.uiConfig = {
                calendar:{
                    editable: true,
                    header:{
                        left: 'prev',
                        center: 'title',
                        right: 'next'
                    },
                    dayClick: $scope.alertEventOnClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize
                }
            };
        }]);

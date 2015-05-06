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
                    height: 450,
                    editable: true,
                    header:{
                        left: 'month basicWeek basicDay agendaWeek agendaDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    dayClick: $scope.alertEventOnClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize
                }
            };
        }]);

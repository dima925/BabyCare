/**
 * Created by Kevin on 07/05/2015.
 */

angular.module('cleverbaby.controllers')
    .controller('CalendarCtrl', ['$scope', '$rootScope', 'ActivityService', '$timeout',
        function($scope, $rootScope, ActivityService, $timeout) {

            $scope.hasContent = false;
            $scope.selectedDay = '';
            $scope.selectedMonth = '';
            $scope.selectedMonthName = '';
            $scope.selectedYear = '';

            $scope.activities = [];
            $scope.activityCalendar = [];

            $scope.eventSources = [];

            ActivityService.getActivityCalendar($rootScope.baby.uuid).then(function(activityCalendar) {
                $scope.activityCalendar = activityCalendar;
                $scope.refreshCalendar();
            });

            /* event sources array*/
            /*$scope.eventSources = [{
                events: [{
                        title: '',
                        start: '2015-05-04',
                        allDay: true,
                        backgroundColor: 'transparent',
                    }, {
                        title: '',
                        start: '2015-05-13',
                        allDay: true,
                        backgroundColor: 'transparent',
                    }
                    // etc...
                ],
                //color: 'yellow', // an option!
                //textColor: 'yellow' // an option!
            }];*/

            $scope.alertOnEventClick = function() {                
            };

            $scope.alertOnDayClick = function(date) {
                // when user clicks on day
                $scope.selectedDay = date.getDate();
                $scope.selectedMonthName = moment(date).format("MMMM");
                $scope.selectedMonth = date.getMonth();
                $scope.selectedYear = date.getFullYear();
                
                start = 0;
                limit = 100;
                ActivityService.getActivitiesByDate($rootScope.baby.uuid, date, start, limit).then(function(activities) {
                    $scope.activities = activities;
                    $scope.hasContent = true;
                });
            };

            $scope.eventRender = function(event, element, view) {
            };

            $scope.refreshCalendar = function() {
                $('#calendar').fullCalendar('render');
            };

            /* config object */
            $scope.uiConfig = {
                calendar: {
                    editable: true,
                    header: {
                        left: 'prev',
                        center: 'title',
                        right: 'next'
                    },
                    dayClick: $scope.alertOnDayClick,
                    eventClick: $scope.alertOnEventClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize,
                    eventRender: $scope.eventRender,
                    dayRender: function(date, cell) {
                        if ($scope.activityCalendar.indexOf(date.getTime()) !== -1) {
                            $(cell).addClass('calendar-highlight-circle');
                        }
                    }
                }
            };


        }
    ]);

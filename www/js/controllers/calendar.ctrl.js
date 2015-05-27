/**
 * Created by Kevin on 07/05/2015.
 */

angular.module('cleverbaby.controllers')
    .controller('CalendarCtrl', ['$scope', '$rootScope', 'ActivityService',
        function($scope, $rootScope, ActivityService) {

            $scope.hasContent = false;
            $scope.selectedDay = '';
            $scope.selectedMonth = '';
            $scope.selectedYear = '';

            $scope.activities = [];
            
            $scope.eventSources = [];

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            start = 0;
            limit = 10;
            ActivityService.getAllActivitiesByBabyId($rootScope.baby.uuid, start, limit).then(function(activities){
                $scope.activities = activities;
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
                if(date.getMonth() == m && date.getDate() == d) {
                    $scope.hasContent = true;
                    $scope.selectedDay = d;
                    $scope.selectedMonth = m;
                    $scope.selectedYear = y;

                } else {
                    $scope.hasContent = false;
                }
            };

            $scope.eventRender = function(event, element, view) {
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
                        if(date.getMonth() == m && date.getDate() == d) {
                            $(cell).addClass('calendar-highlight-circle');
                        }
                    }
                }
            };


        }
    ]);

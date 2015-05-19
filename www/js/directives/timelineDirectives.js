angular.module('cleverbaby.directives')
    .directive('cbTimeLineChart', ['ActivityService', '$timeout', '$ionicModal', '$rootScope', function (ActivityService, $timeout, $ionicModal, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'templates/elements/timeline-chart.html',
            link: function (scope, element) {

                ActivityService.getAllActivitiesByBabyId($rootScope.babyId, 0, 10).then(function(activities){
                    console.log(activities);

                    var dateToday = moment(new Date()).format("MM-DD-YYYY");
                    var dateYesterday = moment(new Date()).subtract(1, 'days').format("MM-DD-YYYY");

                    function dateToString(date){
                        var formatDate = moment(new Date(date)).format("MM-DD-YYYY");
                        if(formatDate == dateToday){
                            return "Today";
                        }else if(formatDate == dateYesterday){
                            return "Yesterday";
                        }else{
                            var month = moment(new Date(date)).format("MMMM");
                            var day = moment(new Date(date)).format("Do");

                            return day + " " + month
                        }
                    };

                    var unorderedDate = {};

                    //group by date the activities
                    angular.forEach(activities, function(value, index){
                        var valueDateStart = moment(value.time).format("MM-DD-YYYY");
                        var valueDateEnd = moment(value.time_end).format("MM-DD-YYYY");
                        if(unorderedDate[valueDateEnd]){
                            unorderedDate[valueDateEnd].activities.unshift(value);
                        }else{
                            unorderedDate[valueDateEnd]
                            var dateObjectStructure = {
                                'activities': [value],
                                'dateString': dateToString(value.time_end)
                            }
                            unorderedDate[valueDateEnd] = dateObjectStructure;
                        }
                    });

                    //1440minutes in one day
                    //get percentage of 1minute in 1440 minutes
                    // (332/1440) * durationMinute = fillPx
                    //(fillpx / 332) x 100
                    var timelineIonContentWidth = angular.element('.timeline-ion-content').css('width').replace('px',''); //332px sample
                    var timeSlotWidth = angular.element('.timeline-grid li').css('width').replace('px',''); // 3hrs is 44px sample
                    var percentageOfMinute = (1/1440) *100;

                    function calculateDurationPercentage(startTime, endTime){
                        var startTime = moment.duration(startTime);
                        var valueDateEnd = moment.duration(endTime);
                        var durationMinute = valueDateEnd.subtract(startTime).asMinutes(); //
                        var durationPercentage = (332/1440) * durationMinute;
                        var fillPercentage = (durationPercentage/ 332) * 100;

                        return fillPercentage;
                    }

                    function getFillPercentages(activity){

                        var fillAray = [];
                        var finalFillAray = [];

                        angular.forEach(activity, function(activity, index){
                            fillAray.push({'percentage': calculateDurationPercentage(activity.time, activity.time_end), 'type': activity.type, 'startTime': activity.time, 'endTime': activity.time_end});
                        });

                        angular.forEach(fillAray, function(activity, index) {
                            var activityDate = moment(activity.startTime);

                            if(index == 0){
                                var startTime = moment(activity.startTime).set({'hour': 6, 'second': 00, 'minute': 00});

                                if(activityDate >= startTime){
                                    finalFillAray.push({'percentage': calculateDurationPercentage(startTime, activityDate), 'type': '', 'startTime': startTime, 'endTime': activityDate});
                                }

                            }else{
                                var lastTimeEnd = fillAray[index - 1].endTime;
                                var betweenFillPercentage = calculateDurationPercentage(lastTimeEnd, activityDate);
                                if(betweenFillPercentage != 0){
                                    finalFillAray.push({'percentage': betweenFillPercentage, 'type': '', 'startTime': lastTimeEnd, 'endTime': activityDate});
                                }
                            }

                            finalFillAray.push(activity);
                        });
                        return finalFillAray;
                    }

                    //create the fill percentage
                    angular.forEach(unorderedDate, function(dateArrayActivity, index){
                        dateArrayActivity.fill = getFillPercentages(dateArrayActivity.activities);
                    });

                    scope.orderedDateFinal = unorderedDate;
                    console.log(scope.orderedDateFinal);
                });
            }
        }
    }]);
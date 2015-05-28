angular.module('cleverbaby.directives')
    .directive('cbTimeLineChart', ['ActivityService', '$timeout', '$ionicModal', '$rootScope', function (ActivityService, $timeout, $ionicModal, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'templates/elements/timeline-chart.html',
            link: function (scope, element) {

                ActivityService.getAllActivitiesByBabyId($rootScope.babyId, 0, 100).then(function(activities){

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
                        
                        if(unorderedDate[valueDateStart]){
                            unorderedDate[valueDateStart].activities.unshift(value);
                        }else{
                            var dateObjectStructure = {
                                'activities': [value],
                                'dateString': dateToString(valueDateStart)
                            }
                            unorderedDate[valueDateStart] = dateObjectStructure;
                        }
                    });

                    //1440minutes in one day
                    //get percentage of 1minute in 1440 minutes
                    // (332/1440) * durationMinute = fillPx
                    //(fillpx / 332) x 100
                    var timelineIonContentWidth = parseInt(screen.width); //332px sample

                    //parseInt(angular.element('.ul.timeline-grid li').css('width').substring(0, this.length - 1));
                    /****** IMPORTANT ul.timeline-grid, the right width for this is required currently its 144.8% ******/

                    var widthPerBlockPercentage = 144.8 / 100;
                    var widthOfBlockCon = widthPerBlockPercentage * timelineIonContentWidth;



                    function calculateDurationPercentage(startTime, endTime){
                        var startTime = moment.duration(startTime);
                        var valueDateEnd = moment.duration(endTime);
                        var durationMinute = valueDateEnd.subtract(startTime).asMinutes(); //
                        var durationPercentage = (widthOfBlockCon/1440) * durationMinute;
                        var fillPercentage = (durationPercentage/ widthOfBlockCon) * 100;

                        return fillPercentage;
                    }

                    /**
                     * calculates
                     * @param activityStartTime - date of activity
                     * @returns (int) the margin left percentage
                     */
                    function calculateMarginLeftPercentage(activityStartTime) {
                        //8 blocks in one grid
                        //widthOfBlockCon / 8
                        //3hours per block
                        /*
                            eg. starttime is 9am
                            9am - 6am = 3hrs
                            //one block is 3 hrs gap so divide by 3
                            (3 / 3) * lengthPerBlank
                         */

                        var startTime = moment(activityStartTime).set({'hour': 6, 'second': 00, 'minute': 00});
                        var lengthPerBlank = widthOfBlockCon / 8;

                        startTime = moment.duration(startTime);
                        var valueDateEnd = moment.duration(activityStartTime);
                        var durationHours = valueDateEnd.subtract(startTime).asHours();

                        var marginLeftPercentage = (durationHours / 3) * lengthPerBlank;
                        return marginLeftPercentage;
                    }

                    function getFillPercentages(activity){

                        var fillAray = [];
                        var finalFillAray = [];

                        angular.forEach(activity, function(activity, index){
                            var timeEnd;
                            if(activity.type == "sleep"){
                                timeEnd = moment(activity.sleep_timeend);
                            }else{
                                timeEnd = angular.isDefined(activity.time_end) ? moment(activity.time_end) : moment(activity.time).add(10, 'm');

                            }
                            fillAray.push({'marginLeft': calculateMarginLeftPercentage(activity.time), 'percentage': calculateDurationPercentage(activity.time, timeEnd), 'type': activity.type, 'startTime': activity.time, 'endTime': timeEnd});
                        });

                        //this part is to get the blank percentage on the timeline

                        /*
                        angular.forEach(fillAray, function(activity, index) {
                            var activityDate = moment(activity.startTime);

                            //this is to set the start time to 6:00am for the first array
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
                        */
                        return fillAray;
                    }

                    scope.orderedDateFinal = [];

                    //create the fill percentage && rearrange latest to oldest
                    angular.forEach(unorderedDate, function(dateArrayActivity, index){
                        dateArrayActivity.fill = getFillPercentages(dateArrayActivity.activities)
                        scope.orderedDateFinal.push(dateArrayActivity);
                    });
                    scope.orderedDateFinal.reverse();

                    console.log(scope.orderedDateFinal);

                });
            }
        }
    }]);
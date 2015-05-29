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

                        var midnight = moment(value.time).set({'hour': 00, 'second': 00, 'minute': 00});
                        var morning = moment(value.time).set({'hour': 6, 'second': 00, 'minute': 00});

                        if( moment(value.time) >= midnight && moment(value.time) <= morning ){
                            valueDateStart = moment(value.time).subtract(1, 'days').format("MM-DD-YYYY");
                        }

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

                    /****** IMPORTANT ul.timeline-grid, the right width for this is required currently its 144.8% ******/

                    var widthPerBlockPercentage = 144.8 / 100;
                    var widthOfBlockCon = (widthPerBlockPercentage * timelineIonContentWidth) + 8; //because there is a -6 margin left on its css

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
                        var startTime = moment(activityStartTime).set({'hour': 6, 'second': 00, 'minute': 00});;
                        var lengthPerBlank = widthOfBlockCon / 8;


                        var valueDateEnd = moment(activityStartTime);

                        var midnight = moment(activityStartTime).set({'hour': 00, 'second': 00, 'minute': 00});
                        var morning = moment(activityStartTime).set({'hour': 6, 'second': 00, 'minute': 00});
                        if( moment(activityStartTime) >= midnight && moment(activityStartTime) <= morning ) {
                            startTime = moment(startTime).subtract(1, 'days');
                        }

                        var duration = moment.duration(valueDateEnd.diff(startTime));

                        var durationHours = duration.asHours();
                        var marginLeftPercentage = (durationHours / 3) * lengthPerBlank;
                        return marginLeftPercentage;
                    }

                    function getFillPercentages(activity){
                        var fillAray = [];

                        angular.forEach(activity, function(activity, index){
                            var timeEnd;
                            if(activity.type == "sleep"){
                                timeEnd = moment(activity.sleep_timeend);
                            }else{
                                timeEnd = angular.isDefined(activity.time_end) ? moment(activity.time_end) : moment(activity.time).add(10, 'm');

                            }
                            fillAray.push({'marginLeft': calculateMarginLeftPercentage(activity.time), 'percentage': calculateDurationPercentage(activity.time, timeEnd), 'type': activity.type, 'startTime': activity.time, 'endTime': timeEnd});
                        });

                        return fillAray;
                    }

                    scope.orderedDateFinal = [];

                    //create the fill percentage && rearrange latest to oldest
                    angular.forEach(unorderedDate, function(dateArrayActivity, index){
                        dateArrayActivity.fill = getFillPercentages(dateArrayActivity.activities)
                        scope.orderedDateFinal.push(dateArrayActivity);
                    });

                    console.log(scope.orderedDateFinal);
                });
            }
        }
    }]);
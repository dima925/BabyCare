angular
    .module('cleverbaby.helpers')
    .factory("TrendDataChart", ["$rootScope", function($rootScope){

        function getFirstAndLastDay(date, dateType){
            if(dateType == 'weekly') {
                var firstDay = moment(date).day(0);
                var lastDay = moment(date).day(6);
            } else {
                var firstDay = moment(date).date(1);
                var lastDay = moment(firstDay).endOf('month');
            }

            return{
                'firstDay': firstDay,
                'lastDay': lastDay
            }
        }

        /**
         * Change the fromDate and toDate, Sunday to Monday
         * @date - date
         * @dateType - weekly or monthly //true is weekly, false is monthly
         */
        function generateFromToDateText(date, dateType){
            var firstAndLastDay = getFirstAndLastDay(date, dateType)
            var from = moment(firstAndLastDay.firstDay).format("Do") + " " + moment(firstAndLastDay.firstDay).format("MMMM");
            var to = moment(firstAndLastDay.lastDay).format("Do") + " " + moment(firstAndLastDay.lastDay).format("MMMM");
            return from + " - " + to;
        }

        /**
         * creates the options required by the plugin.
         */
        function createOptions(xAxisLabel, yAxisLabel, tickValues) {
            return {
                chart: {
                    type: 'discreteBarChart',
                    height: 350,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 55
                    },
                    x: function(d){return d.label;},
                    y: function(d){return d.value;},
                    showValues: true,
                    valueFormat: function(d){
                        return d3.format(',.0f')(d);
                    },
                    transitionDuration: 500,
                    xAxis: {
                        tickValues: tickValues,
                        axisLabel: xAxisLabel
                    },
                    yAxis: {
                        axisLabel: yAxisLabel,
                        axisLabelDistance: 30
                    }
                }
            };
        }

        var activityTypeFiltersCalculation = {};
        activityTypeFiltersCalculation.sleep = function (dataActivityType) {
            var sleepHours = {};
            angular.forEach(dataActivityType, function(sleep, index){
                var startTimeKey = moment(sleep.time).format("MM-DD-YYYY");
                var valueDateStart = moment.duration(sleep.time);
                var valueDateEnd = moment.duration(sleep.time_end);
                if(sleepHours[startTimeKey]){
                    sleepHours[startTimeKey].total += valueDateEnd.subtract(valueDateStart).asHours(); //
                }else{
                    sleepHours[startTimeKey] = {
                        'total': valueDateEnd.subtract(valueDateStart).asHours()
                    }
                }
            })
            return sleepHours;
        }

        /**
         * Creates the required data for the plugin
         * @date - date to use to get the desired entries
         * @dataActivityType - array containing the activities
         * @periodType - weekly or monthly
         */
        function generateData(date, dataType, dataActivityType, periodType){

            var acitivityDataValues = [];
            var dataType = dataType;
            var sortedDataActivityType = activityTypeFiltersCalculation[dataType](dataActivityType);

            if(periodType == 'weekly'){
                var labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                for(var x = 0; x <= 6; x++){
                    var datePeriodFormatted = moment(date).day(x).format("MM-DD-YYYY");
                    var totalValue = angular.isObject(sortedDataActivityType[datePeriodFormatted]) ? sortedDataActivityType[datePeriodFormatted].total : 0;
                    acitivityDataValues.push({
                        "label":  labels[x],
                        "value": totalValue
                    });
                }
            }else{
                var firstDay = moment(date).date(1);
                var lastDay = moment(firstDay).endOf('month').date();
                for(var x = 1; x <= lastDay; x++){
                    var datePeriodFormatted = moment(date).day(x).format("MM-DD-YYYY");
                    var label = " ";
                    if(x % 5 == 0 && x != 1){
                        label = x;
                    }
                    var totalValue = angular.isObject(sortedDataActivityType[datePeriodFormatted]) ? sortedDataActivityType[datePeriodFormatted].total : 0;
                    acitivityDataValues.push({
                        "label":  label,
                        "value": totalValue
                    });
                }
            }
            return [
                {
                    key: "Cumulative Return",
                    values: acitivityDataValues
                }
            ];
        }

        /**
         * Generates the average details info displayed below of the graph
         */
        function generateAverageInfo(){

        }

        return{
            generateData: generateData,
            createOptions: createOptions,
            generateFromToDateText: generateFromToDateText,
            getFirstAndLastDay: getFirstAndLastDay
        }
    }]);
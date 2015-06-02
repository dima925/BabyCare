angular
    .module('cleverbaby.helpers')
    .factory("TrendDataChart", ["$rootScope", function($rootScope){

        function getFirstAndLastDay(date, dateType){
            var firstDay;
            var lastDay
            if(dateType == 'weekly') {
                 firstDay = moment(date).day(0);
                 lastDay = moment(date).day(6);
            } else {
                 firstDay = moment(date).date(1);
                 lastDay = moment(firstDay).endOf('month');
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
        function createOptions(showXAxis, rightAlignYAxis, xAxisLabel, yAxisLabel, tickValues) {
            return {
                chart: {
                    type: 'discreteBarChart',
                    height: 150,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 55
                    },
                    x: function(d){return d.label;},
                    y: function(d){return d.value;},
                    stacked: true,
                    showValues: false,
                    reduceXTicks: false,
                    reduceYTicks: false,
                    valueFormat: function(d){
                        return d3.format(',.1f')(d);
                    },
                    transitionDuration: 500,
                    yAxis:{
                        showMaxMin: false
                    },
                    xAxis: {
                        tickValues: tickValues,
                        axisLabel: xAxisLabel
                    },
                    showYAxis: true,
                    showXAxis: showXAxis,
                    showControls: false,
                    showLegend: false,
                    rightAlignYAxis: rightAlignYAxis
                }
            };
        }

        var activityTypeFiltersCalculation = {};
        activityTypeFiltersCalculation.sleep = function (dataActivityType) {
            var sleepHours = {};
            angular.forEach(dataActivityType, function(sleep, index){
                var startTimeKey = moment(sleep.time).format("MM-DD-YYYY");
                var valueDateStart = moment(sleep.time);
                var valueDateEnd = moment(sleep.sleep_timeend);
                var valueTimeDifference = moment.duration(valueDateEnd.diff(valueDateStart)).asHours();
                if(sleepHours[startTimeKey]){
                    sleepHours[startTimeKey].totalTop += valueTimeDifference; //
                    sleepHours[startTimeKey].totalBot += 1;
                }else{
                    sleepHours[startTimeKey] = {
                        'totalTop': valueTimeDifference,
                        'totalBot': 1
                    }
                }
            })
            return sleepHours;
        };
        activityTypeFiltersCalculation.diaper = function (dataActivityType) {
            var diaperWetDirty = {};
            angular.forEach(dataActivityType, function(diaper, index){
                var startTimeKey = moment(diaper.time).format("MM-DD-YYYY");
                var valueDateStart = moment.duration(diaper.time);
                if(diaper.type != "Empty"){
                    var wetOrDity = diaper.diaper_type == "Wet" ? "totalTop" : "totalBot"

                    if(diaperWetDirty[startTimeKey]){
                        var total = diaperWetDirty[startTimeKey][wetOrDity]
                        diaperWetDirty[startTimeKey][wetOrDity] = diaper.type == "Wet" ? total + 1 : total + 1;
                    }else{
                        diaperWetDirty[startTimeKey] = {'totalTop': 0, 'totalBot': 0};
                        diaperWetDirty[startTimeKey][wetOrDity] = diaper.type == "Wet" ? 1 : 1;
                    }
                }
            })
            return diaperWetDirty;
        }
        activityTypeFiltersCalculation.pump = function (dataActivityType) {
            var botTopTotalObj = {};
            angular.forEach(dataActivityType, function(entry, index){
                var startTimeKey = moment(entry.time).format("MM-DD-YYYY");
                var pumpSide = entry.pump_side;
                var pumpAmount = entry.pump_amount;

                if(!botTopTotalObj[startTimeKey]){
                    botTopTotalObj[startTimeKey] = {'totalTop': 0, 'totalBot': 0};
                }

                if(pumpSide == "both"){
                    botTopTotalObj[startTimeKey]['totalTop'] += pumpAmount;
                    botTopTotalObj[startTimeKey]['totalBot'] += pumpAmount;
                }else{
                    var topOrBot = pumpSide == 'left' ? 'totalTop' : 'totalBot';
                    botTopTotalObj[startTimeKey][topOrBot] += pumpAmount;
                }

            });

            return botTopTotalObj;
        }

        /**
         * Provides the data in the Average Section on trend, for calculating the average result of current week/month and last week/month.
         * @param date - current date
         * @param dataType - datatype to filter
         * @param dataActivityType - array containing the data of data type
         * @param periodType - weekly or monthly
         */
        function calculateAverageData(date, dataType, dataActivityType, periodType) {

            function getAverage(periodData) {
                var totalVal = 0;
                angular.forEach(periodData, function(dayValue, index){
                    totalVal =  totalVal + Math.abs(dayValue.value);
                });

                return totalVal / periodData.length;
            }

            var previousPeriodDate = moment(date).subtract(1, periodType == 'weekly' ? 'w' : 'M');
            var currentDateGenerateData = generateData(date, dataType, dataActivityType, periodType);
            var prevPeriodDateGenerateData = generateData(previousPeriodDate, dataType, dataActivityType, periodType);

            return {
                'topAverage': getAverage(currentDateGenerateData.top[0].values),
                'topAverageLastPeriod': getAverage(prevPeriodDateGenerateData.top[0].values),
                'botAverage': getAverage(currentDateGenerateData.bot[0].values),
                'botAverageLastPeriod': getAverage(prevPeriodDateGenerateData.bot[0].values)
            }
        }

        /**
         * Creates the required data for the plugin
         * @date - date to use to get the desired entries
         * @dataActivityType - array containing the activities
         * @periodType - weekly or monthly
         */
        function generateData(date, dataType, dataActivityType, periodType){

            var acitivityDataValuesTop = [];
            var acitivityDataValuesBot = [];
            var dataType = dataType;
            var sortedDataActivityType = activityTypeFiltersCalculation[dataType](dataActivityType);

            console.log(sortedDataActivityType);

            if(periodType == 'weekly'){
                var labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                for(var x = 0; x <= 6; x++){
                    var datePeriodFormatted = moment(date).day(x).format("MM-DD-YYYY");
                    var totalValueTop = angular.isObject(sortedDataActivityType[datePeriodFormatted]) ? sortedDataActivityType[datePeriodFormatted].totalTop : 0;
                    var totalValueBot = angular.isObject(sortedDataActivityType[datePeriodFormatted]) ? sortedDataActivityType[datePeriodFormatted].totalBot : 0;
                    acitivityDataValuesTop.push({
                        "label":  labels[x],
                        "value": totalValueTop
                    });
                    acitivityDataValuesBot.push({
                        "label":  labels[x],
                        "value": totalValueBot
                    });
                }
            }else{
                var firstDay = moment(date).date(1);
                var lastDay = moment(firstDay).endOf('month').date();
                for(var x = 1; x <= lastDay; x++){
                    var datePeriodFormatted = moment(date).day(x).format("MM-DD-YYYY");
                    var label = x;
                    var totalValueTop = angular.isObject(sortedDataActivityType[datePeriodFormatted]) ? sortedDataActivityType[datePeriodFormatted].totalTop : 0;
                    var totalValueBot = angular.isObject(sortedDataActivityType[datePeriodFormatted]) ? sortedDataActivityType[datePeriodFormatted].totalBot : 0;
                    acitivityDataValuesTop.push({
                        "label":  label,
                        "value": totalValueTop
                    });
                    acitivityDataValuesBot.push({
                        "label": label,
                        "value": totalValueBot
                    });
                }
            }
            acitivityDataValuesBot.reverse();
            return {
                'top': [{
                    'key': "Top",
                    'values': acitivityDataValuesTop
                }],
                'bot': [{
                    'key': "Bot",
                    'values': acitivityDataValuesBot
                }]
            }
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
            getFirstAndLastDay: getFirstAndLastDay,
            calculateAverageData: calculateAverageData
        }
    }]);
angular
    .module('cleverbaby.helpers')
    .factory("TrendDataChart", ["$rootScope", function($rootScope){


        function whoData(){
            var whoLength = {
                'boys':{
                    'length':{
                        '13weeks':[
                            '46.3 47.9 49.9 51.8 53.4',
                            '47.5 49.1 51.1 53.1 54.7',
                            '48.8 50.4 52.3 54.3 55.9',
                            '49.8 51.4 53.4 55.4 57.0',
                            '50.7 52.4 54.4 56.4 58.0',
                            '51.7 53.3 55.3 57.4 59.0',
                            '52.5 54.2 56.2 58.3 59.9',
                            '53.4 55.0 57.1 59.1 60.8',
                            '54.1 55.8 57.9 60.0 61.6',
                            '54.9 56.6 58.7 60.7 62.4',
                            '55.6 57.3 59.4 61.5 63.2',
                            '56.3 58.0 60.1 62.2 63.9',
                            '56.9 58.7 60.8 62.9 64.6',
                            '57.6 59.3 61.4 63.5 65.2'
                        ],

                        'to2years': [
                            '46.3 47.9 49.9 51.8 53.4',
                            '51.1 52.7 54.7 56.7 58.4',
                            '54.7 56.4 58.4 60.5 62.2',
                            '57.6 59.3 61.4 63.5 65.3',
                            '60.0 61.7 63.9 66.0 67.8',
                            '61.9 63.7 65.9 68.1 69.9',
                            '63.6 65.4 67.6 69.8 71.6',
                            '65.1 66.9 69.2 71.4 73.2',
                            '66.5 68.3 70.6 72.9 74.7',
                            '67.7 69.6 72.0 74.3 76.2',
                            '69.0 70.9 73.3 75.6 77.6',
                            '70.2 72.1 74.5 77.0 78.9',
                            '71.3 73.3 75.7 78.2 80.2',
                            '72.4 74.4 76.9 79.4 81.5',
                            '73.4 75.5 78.0 80.6 82.7',
                            '74.4 76.5 79.1 81.8 83.9',
                            '75.4 77.5 80.2 82.9 85.1',
                            '76.3 78.5 81.2 84.0 86.2',
                            '77.2 79.5 82.3 85.1 87.3',
                            '78.1 80.4 83.2 86.1 88.4',
                            '78.9 81.3 84.2 87.1 89.5',
                            '79.7 82.2 85.1 88.1 90.5',
                            '80.5 83.0 86.0 89.1 91.6',
                            '81.3 83.8 86.9 90.0 92.6',
                            '82.1 84.6 87.8 91.0 93.6 '
                        ],

                        '2to5years':[
                            '81.4 83.9 87.1 90.3 92.9',
                            '82.1 84.7 88.0 91.2 93.8',
                            '82.8 85.5 88.8 92.1 94.8',
                            '83.5 86.3 89.6 93.0 95.7',
                            '84.2 87.0 90.4 93.8 96.6',
                            '84.9 87.7 91.2 94.7 97.5',
                            '85.5 88.4 91.9 95.5 98.3',
                            '86.2 89.1 92.7 96.2 99.2',
                            '86.8 89.7 93.4 97.0 100.0',
                            '87.4 90.4 94.1 97.8 100.8',
                            '88.0 91.0 94.8 98.5 101.5',
                            '88.5 91.6 95.4 99.2 102.3',
                            '89.1 92.2 96.1 99.9 103.1',
                            '89.7 92.8 96.7 100.6 103.8',
                            '90.2 93.4 97.4 101.3 104.5',
                            '90.8 94.0 98.0 102.0 105.2',
                            '91.3 94.6 98.6 102.7 105.9',
                            '91.9 95.2 99.2 103.3 106.6',
                            '92.4 95.7 99.9 104.0 107.3',
                            '92.9 96.3 100.4 104.6 108.0',
                            '93.4 96.8 101.0 105.2 108.6',
                            '93.9 97.4 101.6 105.8 109.3',
                            '94.4 97.9 102.2 106.5 109.9',
                            '94.9 98.5 102.8 107.1 110.6',
                            '95.4 99.0 103.3 107.7 111.2',
                            '95.9 99.5 103.9 108.3 111.8',
                            '96.4 100.0 104.4 108.9 112.5',
                            '96.9 100.5 105.0 109.5 113.1 '
                        ]
                    }
                },
                'girls':{
                        'length':{
                            '13weeks':[
                                '45.6 47.2 49.1 51.1 52.7',
                                '46.8 48.4 50.3 52.3 53.9',
                                '47.9 49.5 51.5 53.5 55.1',
                                '48.8 50.5 52.5 54.5 56.1',
                                '49.7 51.4 53.4 55.4 57.0',
                                '50.5 52.2 54.2 56.3 57.9',
                                '51.3 53.0 55.1 57.1 58.8',
                                '52.1 53.8 55.8 57.9 59.6',
                                '52.8 54.5 56.6 58.7 60.4',
                                '53.4 55.2 57.3 59.4 61.1',
                                '54.1 55.8 57.9 60.1 61.8',
                                '54.7 56.4 58.6 60.7 62.5',
                                '55.3 57.0 59.2 61.4 63.1',
                                '55.8 57.6 59.8 62.0 63.7',
                            ],

                            'to2years': [
                                '45.6 47.2 49.1 51.1 52.7',
                                '50.0 51.7 53.7 55.7 57.4',
                                '53.2 55.0 57.1 59.2 60.9',
                                '55.8 57.6 59.8 62.0 63.8',
                                '58.0 59.8 62.1 64.3 66.2',
                                '59.9 61.7 64.0 66.3 68.2',
                                '61.5 63.4 65.7 68.1 70.0',
                                '62.9 64.9 67.3 69.7 71.6',
                                '64.3 66.3 68.7 71.2 73.2',
                                '65.6 67.6 70.1 72.6 74.7',
                                '66.8 68.9 71.5 74.0 76.1',
                                '68.0 70.2 72.8 75.4 77.5',
                                '69.2 71.3 74.0 76.7 78.9',
                                '70.3 72.5 75.2 77.9 80.2',
                                '71.3 73.6 76.4 79.2 81.4',
                                '72.4 74.7 77.5 80.3 82.7',
                                '73.3 75.7 78.6 81.5 83.9',
                                '74.3 76.7 79.7 82.6 85.0',
                                '75.2 77.7 80.7 83.7 86.2',
                                '76.2 78.7 81.7 84.8 87.3',
                                '77.0 79.6 82.7 85.8 88.4',
                                '77.9 80.5 83.7 86.8 89.4',
                                '78.7 81.4 84.6 87.8 90.5',
                                '79.6 82.2 85.5 88.8 91.5',
                                '80.3 83.1 86.4 89.8 92.5'
                            ],

                            '2to5years':[
                                '79.6 82.4 85.7 89.1 91.8',
                                '80.4 83.2 86.6 90.0 92.8',
                                '81.2 84.0 87.4 90.9 93.7',
                                '81.9 84.8 88.3 91.8 94.6',
                                '82.6 85.5 89.1 92.7 95.6',
                                '83.4 86.3 89.9 93.5 96.4',
                                '84.0 87.0 90.7 94.3 97.3',
                                '31 84.7 87.7 91.4 95.2 98.2',
                                '85.4 88.4 92.2 95.9 99.0',
                                '86.0 89.1 92.9 96.7 99.8',
                                '86.7 89.8 93.6 97.5 100.6',
                                '87.3 90.5 94.4 98.3 101.4',
                                '87.9 91.1 95.1 99.0 102.2',
                                '88.5 91.7 95.7 99.7 103.0',
                                '89.1 92.4 96.4 100.5 103.7',
                                '89.7 93.0 97.1 101.2 104.5',
                                '90.3 93.6 97.7 101.9 105.2',
                                '90.8 94.2 98.4 102.6 106.0',
                                '91.4 94.8 99.0 103.3 106.7',
                                '92.0 95.4 99.7 103.9 107.4',
                                '92.5 96.0 100.3 104.6 108.1',
                                '93.0 96.6 100.9 105.3 108.8',
                                '93.6 97.2 101.5 105.9 109.5',
                                '94.1 97.7 102.1 106.6 110.2',
                                '94.6 98.3 102.7 107.2 110.8',
                                '95.1 98.8 103.3 107.8 111.5',
                                '95.7 99.4 103.9 108.4 112.1',
                                '96.2 99.9 104.5 109.1 112.8',
                                '96.7 100.4 105.0 109.7 113.4',
                                '97.2 101.0 105.6 110.3 114.1',
                                '97.6 101.5 106.2 110.9 114.7',
                                '98.1 102.0 106.7 111.5 115.3',
                                '98.6 102.5 107.3 112.1 116.0',
                                '99.1 103.0 107.8 112.6 116.6',
                                '99.6 103.5 108.4 113.2 117.2',
                                '100.0 104.0 108.9 113.8 117.8',
                                '100.5 104.5 109.4 114.4 118.4'
                            ]
                        }
                }

            }
        }


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
        };
        activityTypeFiltersCalculation.bottle = function (dataActivityType) {
            console.log(dataActivityType);
            var botTopTotalObj = {};
            angular.forEach(dataActivityType, function(entry, index){
                var startTimeKey = moment(entry.time).format("MM-DD-YYYY");

                if(entry.type == 'nurse' || (entry.type == 'bottle' && entry.bottle_type == 'formula'))
                    if(!botTopTotalObj[startTimeKey]){
                        botTopTotalObj[startTimeKey] = {'totalTop': 0, 'totalBot': 0};
                    }

                    if(entry.type == 'bottle'){
                        var bottleType = entry.bottle_type;
                        var bottleAmount = entry.bottle_amount;
                        if(bottleType == 'formula')
                            botTopTotalObj[startTimeKey]['totalTop'] += bottleAmount;
                    }else{
                        var nurseTimeLeft = angular.isUndefined(entry.nurse_timeleft) ? 0 : entry.nurse_timeleft;
                        var nurseTimeRight = angular.isUndefined(entry.nurse_timeright) ? 0 : entry.nurse_timeright;
                        var nurseTimeBoth = angular.isUndefined(entry.nurse_timeboth) ? 0 : entry.nurse_timeboth;
                        var nurseTotal = nurseTimeLeft + nurseTimeRight + nurseTimeBoth

                        botTopTotalObj[startTimeKey]['totalBot'] += nurseTotal;
                    }
            });

            return botTopTotalObj;
        };
        activityTypeFiltersCalculation.growth = function (dataActivityType) {
            console.log(dataActivityType);
            var botTopTotalObj = {};
            angular.forEach(dataActivityType, function(entry, index){
                var startTimeKey = moment(entry.time).format("MM-DD-YYYY");
                    if(!botTopTotalObj[startTimeKey]){
                        botTopTotalObj[startTimeKey] = {'weight': 0,
                            'height': 0,
                            'headCircumference': 0,
                            'bmi': 0
                        };
                    }

                    var growthHeadsize = entry.growth_headsize;
                    var growthHeight = entry.growth_height;
                    var growthWeight = entry.growth_weight;

                    var heightInMs = growthHeight / 10;
                    var bmi = parseFloat((growthWeight/(heightInMs * heightInMs)).toFixed(2)); //parseFloat(average.toFixed(2));

                    botTopTotalObj[startTimeKey]['weight'] = growthWeight;
                    botTopTotalObj[startTimeKey]['height'] = growthHeight;
                    botTopTotalObj[startTimeKey]['headCircumference'] = growthHeadsize;
                    botTopTotalObj[startTimeKey]['bmi'] = bmi;
            });

            return botTopTotalObj;
        };

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
                var average = totalVal / periodData.length;
                return parseFloat(average.toFixed(2));
            }

            var previousPeriodDate = moment(date).subtract(1, periodType == 'weekly' ? 'w' : 'M');
            var currentDateGenerateData = generateData(date, dataType, dataActivityType, periodType);
            var prevPeriodDateGenerateData = generateData(previousPeriodDate, dataType, dataActivityType, periodType);

            var topAverage = getAverage(currentDateGenerateData.top[0].values);

            return {
                'topAverage': getAverage(currentDateGenerateData.top[0].values),
                'topAverageLastPeriod': getAverage(prevPeriodDateGenerateData.top[0].values),
                'botAverage': getAverage(currentDateGenerateData.bot[0].values),
                'botAverageLastPeriod': getAverage(prevPeriodDateGenerateData.bot[0].values)
            }
        }


        /**
         * Creates the required data for the plugin ** LINE GRAPH FORMAT GROWTH TREND**
         * @date - date to use to get the desired entries
         * @dataActivityType - array containing the activities
         * @periodType - weekly or monthly
         */
        function generateDataGrowth(date, dataType, dataActivityType, periodType, babyBorn){

            function addActivity(datePeriodFormatted, xNumber, label){
                var weight = angular.isObject(sortedDataActivityType[datePeriodFormatted]) ? sortedDataActivityType[datePeriodFormatted].weight : 0;
                var height = angular.isObject(sortedDataActivityType[datePeriodFormatted]) ? sortedDataActivityType[datePeriodFormatted].height : 0;
                var headCircumference = angular.isObject(sortedDataActivityType[datePeriodFormatted]) ? sortedDataActivityType[datePeriodFormatted].headCircumference : 0;
                var bmi = angular.isObject(sortedDataActivityType[datePeriodFormatted]) ? sortedDataActivityType[datePeriodFormatted].bmi : 0;

                activityData.weight.push({x: xNumber, y: weight, label:label, date: datePeriodFormatted});
                activityData.height.push({x: xNumber, y: height, label:label, date: datePeriodFormatted});
                activityData.headCircumference.push({x: xNumber, y: headCircumference, label:label, date: datePeriodFormatted});
                activityData.bmi.push({x: xNumber, y: bmi, label:label, date: datePeriodFormatted});
            }

            var dataType = dataType;
            var sortedDataActivityType = activityTypeFiltersCalculation[dataType](dataActivityType);
            var activityData = {
                'weight':[],
                'height':[],
                'headCircumference': [],
                'bmi': []
            };

            console.log(sortedDataActivityType);

            if(periodType == 'weekly'){
                //var labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                for(var x = 7; x >= 1; x--){
                    var datePeriod = moment(date).subtract(x, 'd');
                    var datePeriodFormatted = moment(datePeriod).format("MM-DD-YYYY");
                    var dateLabel = moment(datePeriod).format("ddd");
                    addActivity(datePeriodFormatted, 7-x, dateLabel);
                }
            }else if(periodType == 'monthly'){
                var firstDay = moment(date).date(1);
                var lastDay = moment(firstDay).endOf('month').date();
                for(var x = 1; x <= lastDay; x++){
                    var datePeriodFormatted = moment(date).day(x).format("MM-DD-YYYY");
                    var label = x;
                    addActivity(datePeriodFormatted, x-1, label);
                }
            }else if(periodType == '3month'){
                var firstDateOfCurrentMonth = moment(date).set('date', 1);
                var done = false
                var twoMonthsAgo = moment(firstDateOfCurrentMonth).subtract(1, 'M');
                var threeMonthsAgo = moment(firstDateOfCurrentMonth).subtract(2, 'M');

                var arrayWeek = [7, 14, 21, 28];
                var arrayMonths = [threeMonthsAgo, twoMonthsAgo, firstDateOfCurrentMonth];
                var indexX = 0;

                angular.forEach(arrayMonths, function(month, index){
                   angular.forEach(arrayWeek, function(week, index2){
                       var date = moment(month).add(week, 'd');
                       var done = false;
                       var subtractVal = 0;
                       while(!done){
                           date = moment(date).subtract(subtractVal, 'd');
                           var datePeriodFormatted = moment(date).format("MM-DD-YYYY");
                           var dateLabel;
                           var monthLabel = moment(date).format("MMM");

                           switch(index2) {
                               case 0:
                                   dateLabel = monthLabel + " " + '1st';
                                   break;
                               case 1:
                                   dateLabel = '2nd';
                                   break;
                               case 2:
                                   dateLabel = '3rd';
                                   break;
                               case 3:
                                   dateLabel = '4th';
                                   break;
                           }

                           if(angular.isObject(sortedDataActivityType[datePeriodFormatted]) || subtractVal == 6){
                               done = true;
                               addActivity(datePeriodFormatted, indexX, dateLabel);
                               indexX++;
                           }

                           subtractVal++;
                       }
                   })
                });
            }else if(periodType == 'all'){
                var babyBornMoment = moment(babyBorn)
                var currentMoment = moment();
                var valueMonthsDifference = parseInt(moment.duration(currentMoment.diff(babyBornMoment)).asMonths());

                var indexX = 0;

                for(x = 0; x <= valueMonthsDifference+2; x++){
                    var toDate = moment(babyBorn).add(x+1, 'M');
                    var fromDate = moment(toDate).subtract(1, 'M');
                    var fromDateSubtractedFormatted = moment(fromDate).format("MM-DD-YYYY");
                    var done = false;

                    while(!done){
                        toDate = moment(toDate).subtract(1, 'd');
                        var toDateSubtractedFormatted = moment(toDate).format("MM-DD-YYYY");

                        if(angular.isObject(sortedDataActivityType[toDateSubtractedFormatted]) || toDateSubtractedFormatted == fromDateSubtractedFormatted){
                            done = true;
                            addActivity(toDateSubtractedFormatted, indexX, x);
                            indexX++;
                        }
                    }
                }
            }
            return activityData;
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
            calculateAverageData: calculateAverageData,
            generateDataGrowth: generateDataGrowth
        }
    }]);
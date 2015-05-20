angular.module('cleverbaby.controllers')

.controller('ChartCtrl', ['$scope','$timeout', function ($scope, $timeout) {

    /*
	$scope.labels = ["0 Month", "1 Month", "2 Month", "3 Month", "4 Month", "5 Month", "6 Month"];
	$scope.series = ['3%', '15%', '50%', '85%', '97%'];
	$scope.data = [
	[2.5, 3.4, 4.4, 5.1, 5.6, 6.1, 6.4],
	[2.9, 3.9, 4.9, 5.6, 6.2, 6.7, 7.1],
	[3.3, 4.5, 5.6, 6.4, 7, 7.5, 7.9],
	[3.9, 5.1, 6.3, 7.2, 7.9, 8.4, 8.9],
	[4.3, 5.7, 7, 7.9, 8.6, 9.2, 9.7]
	];
	$scope.onClick = function (points, evt) {
	console.log(points, evt);
	};

    $scope.trendTemplate = 'templates/trends/growth.html';
    */

    $scope.options = {
        chart: {
            type: 'lineChart',
            height: 200,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            useInteractiveGuideline: true,
            dispatch: {
                stateChange: function(e){ console.log("stateChange"); },
                changeState: function(e){ console.log("changeState"); },
                tooltipShow: function(e){ console.log("tooltipShow"); },
                tooltipHide: function(e){ console.log("tooltipHide"); }
            },
            xAxis: {
                tickValues: [0, 1, 2, 3, 4, 5, 6],
                axisLabel: 'Month'
            },
            yAxis: {
                axisLabel: 'Quantity',
                tickFormat: function(d){
                    return d3.format('.0f')(d);
                },
                axisLabelDistance: 50
            },
            callback: function(chart){
                console.log("!!! lineChart callback !!!");
            }
        }
    };


     var data = [
            [2.5, 3.4, 4.4, 5.1, 5.6, 6.1, 6.4],
            [2.9, 3.9, 4.9, 5.6, 6.2, 6.7, 7.1],
            [3.3, 4.5, 5.6, 6.4, 7, 7.5, 7.9],
            [3.9, 5.1, 6.3, 7.2, 7.9, 8.4, 8.9],
            [4.3, 5.7, 7, 7.9, 8.6, 9.2, 9.7]
        ];

    function readyData(){
        $scope.data = [];

        for(var i = 0; i < data.length; i++) {

            var datarow = {
                "key" : i,
                "values" : []
            };
            for(var z = 0; z < data[i].length; z++) {
                datarow.values.push(
                    {x: z, y: data[i][z]}
                );
            }
            $scope.data.push(datarow);
        }
    }

    readyData();

    $scope.config = {
        visible: true, // default: true
        extended: false, // default: false
        disabled: false, // default: false
        autorefresh: true, // default: true
        refreshDataOnly: false // default: false
    };

    $scope.activeActivityType = "growth";
    $scope.trendTemplate = 'templates/trends/'+$scope.activeActivityType+'.html';

    $scope.changeActivityType = function(activityType){
        $scope.activeActivityType = activityType;
        $scope.trendTemplate = 'templates/trends/'+activityType+'.html';
    }

}]).controller('SleepCtrl', ['$scope', function ($scope) {

        $scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
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
                    return d3.format(',.4f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 30
                }
            }
        };

        $scope.discreteChartData = [
            {
                key: "Cumulative Return",
                values: [
                    {
                        "label" : "A" ,
                        "value" : -29.765957771107
                    } ,
                    {
                        "label" : "B" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "C" ,
                        "value" : 32.807804682612
                    } ,
                    {
                        "label" : "D" ,
                        "value" : 196.45946739256
                    } ,
                    {
                        "label" : "E" ,
                        "value" : 0.19434030906893
                    } ,
                    {
                        "label" : "F" ,
                        "value" : -98.079782601442
                    } ,
                    {
                        "label" : "G" ,
                        "value" : -13.925743130903
                    } ,
                    {
                        "label" : "H" ,
                        "value" : -5.1387322875705
                    }
                ]
            }
        ];



}]).controller('TrendCtrl', ['$filter', '$scope', '$rootScope', 'ActivityService', function ($filter, $scope, $rootScope, ActivityService) {

        var activeDate = moment();

        /**
         * Toggle data by weekly or Monthly
         * @dateType - fase is monthly, true is weekly
         */
        $scope.toggleDurationType = function(dateTypeBoolean){
            if($scope.weekly != dateTypeBoolean){
                $scope.weekly = dateTypeBoolean;
                generateFromToDateText(activeDate, $scope.weekly);
            }
        };

        /**
         * Change the fromDate and toDate, Sunday to Monday
         * @date - date
         * @dateType - weekly or monthly //true is weekly, false is monthly
         */
        function generateFromToDateText(date, dateType){
            //activeDate = date;
            if(dateType) {
                var firstDay = moment(date).day(0);
                var lastDay = moment(date).day(6);
            } else {
                var firstDay = moment(date).date(1);
                var lastDay = moment(firstDay).endOf('month');
            }
            activeDate = firstDay;
            var from = moment(firstDay).format("Do") + " " + moment(firstDay).format("MMMM");
            var to = moment(lastDay).format("Do") + " " + moment(lastDay).format("MMMM");
            $scope.fromToDateText = from + " - " + to;
        }

        /**
         * creates the options required by the plugin.
         */
        function createOptions(xAxisLabel, yAxisLabel, tickValues) {
            $scope.options = {
                chart: {
                    type: 'discreteBarChart',
                    height: 450,
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
                        return d3.format(',.4f')(d);
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
         */
        function generateData(date, dataActivityType, isWeekly){

            var acitivityDataValues = [];
            var dataType = dataActivityType[0].type;
            var sortedDataActivityType = activityTypeFiltersCalculation[dataType](dataActivityType);

            if(isWeekly){
                var firstDay = moment(date).day(0);
                var lastDay = moment(date).day(6);
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
                    var label = "";
                    if(5 % x == 0){
                        label = x;
                    }
                    var totalValue = angular.isObject(sortedDataActivityType[datePeriodFormatted]) ? sortedDataActivityType[datePeriodFormatted].total : 0;
                    acitivityDataValues.push({
                        "label":  label,
                        "value": totalValue
                    });
                }
            }

            $scope.discreteChartData = [
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

        $scope.config = {
            visible: true, // default: true
            extended: false, // default: false
            disabled: false, // default: false
            autorefresh: true, // default: true
            refreshDataOnly: false // default: false
        };

        /**
         * generate and filter next period Infos
         */
        $scope.nextPeriod = function(){
            generateFromToDateText(moment(activeDate).add(1, 'days'), $scope.weekly);
        }

        /**
         * generate and filter prev period Infos
         */
        $scope.prevPeriod = function(){
            generateFromToDateText(moment(activeDate).subtract(1, 'days'), $scope.weekly);
        }

        $scope.weekly = true;
        generateFromToDateText(activeDate, $scope.weekly); //generate of date today

        ActivityService.getAllActivitiesByBabyId($rootScope.babyId, 0, 1000).then(function(activities){
            var trendInfoObj = {};
            trendInfoObj.sleep = $filter('filter')(activities, {'type': 'sleep'});
            trendInfoObj.pumping = $filter('filter')(activities, {'type': 'pumping'});
            trendInfoObj.diaper = $filter('filter')(activities, {'type': 'diaper'});
            trendInfoObj.feeding = $filter('filter')(activities, {'type': 'feeding'});

            generateData(activeDate, trendInfoObj[$scope.activeActivityType], $scope.weekly);
        });

}]);
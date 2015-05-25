angular.module('cleverbaby.controllers')

.controller('ChartCtrl', ['$filter', '$rootScope', '$scope', 'ActivityService', 'TrendDataChart', function ($filter, $rootScope, $scope, ActivityService, TrendDataChart) {

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

    var activeDate = moment();

    $scope.createGraph = function (activeDate, periodType){
        //angular.element('.with-3d').html('');
        $scope.discreteOptions = TrendDataChart.createOptions();
        $scope.discreteChartData = TrendDataChart.generateData(activeDate, $scope.activeActivityType,  $scope.trendInfoObj[$scope.activeActivityType], periodType);
    }

    $scope.activeActivityType = "growth";
    $scope.trendTemplate = 'templates/trends/'+$scope.activeActivityType+'.html';

    $scope.changeActivityType = function(activityType){
        $scope.activeActivityType = activityType;
        if(activityType == 'growth') {
            $scope.trendTemplate = 'templates/trends/growth.html';
        }else{
            $scope.trendTemplate = 'templates/trends/mainTrend.html';
            $scope.trendAverageTemplate = 'templates/trends/'+$scope.activeActivityType+'.html';
            $scope.createGraph(activeDate, 'weekly');
        }
    }


    /*************************************************************************************/

    ActivityService.getAllActivitiesByBabyId($rootScope.babyId, 0, 1000).then(function(activities){
        $scope.trendInfoObj = {};
        $scope.trendInfoObj.sleep = $filter('filter')(activities, {'type': 'sleep'});
        $scope.trendInfoObj.pumping = $filter('filter')(activities, {'type': 'pumping'});
        $scope.trendInfoObj.diaper = $filter('filter')(activities, {'type': 'diaper'});
        $scope.trendInfoObj.feeding = $filter('filter')(activities, {'type': 'feeding'});
    });

}]).controller('SleepCtrl', ['$scope', function ($scope) {


}]).controller('TrendCtrl', ['$filter', '$scope', 'TrendDataChart', function ($filter, $scope, TrendDataChart) {

        var activeDate;

        /**
         * changing period type 'monthly' or 'weekly'
         */
        $scope.$watch('periodType', function(newValue, oldValue){
            if(newValue != oldValue){
                $scope.fromToDateText = TrendDataChart.generateFromToDateText(activeDate, $scope.periodType);
                $scope.createGraph(activeDate, $scope.periodType);
            }
        });

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
            var firstAndLastDay = TrendDataChart.getFirstAndLastDay(activeDate, $scope.periodType);
            activeDate = moment(firstAndLastDay.lastDay).add(1, 'd');
            $scope.fromToDateText = TrendDataChart.generateFromToDateText(activeDate, $scope.periodType);
            $scope.createGraph(activeDate, $scope.periodType);
        }

        /**
         * generate and filter prev period Infos
         */
        $scope.prevPeriod = function(){
            var firstAndLastDay = TrendDataChart.getFirstAndLastDay(activeDate, $scope.periodType);
            activeDate = moment(firstAndLastDay.firstDay).subtract(1, 'd');
            $scope.fromToDateText = TrendDataChart.generateFromToDateText(activeDate, $scope.periodType);
            $scope.createGraph(activeDate, $scope.periodType);
        }

        $scope.periodType = 'weekly';
        $scope.fromToDateText = TrendDataChart.generateFromToDateText(activeDate, $scope.periodType); //generate of date today

}]);
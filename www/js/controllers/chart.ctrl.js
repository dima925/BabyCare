angular.module('cleverbaby.controllers')

.controller('ChartCtrl', ['$filter', '$timeout', '$rootScope', '$scope', 'ActivityService', 'TrendDataChart', function ($filter, $timeout, $rootScope, $scope, ActivityService, TrendDataChart) {

    $scope.config = {
        visible: true, // default: true
        extended: false, // default: false
        disabled: false, // default: false
        autorefresh: true, // default: true
        refreshDataOnly: false // default: false
    };

    $scope.createGraph = function (activeDate, periodType){
        //angular.element('.with-3d').html('');
        $scope.discreteOptionsTop = TrendDataChart.createOptions(true, false);
        $scope.discreteOptionsBot = TrendDataChart.createOptions(false, true);
        var generateDate = TrendDataChart.generateData(activeDate, $scope.activeActivityType,  $scope.trendInfoObj[$scope.activeActivityType], periodType);
        $scope.discreteChartDataTop = generateDate.top;
        $scope.discreteChartDataBot = generateDate.bot;
        $scope.averageDataResult = TrendDataChart.calculateAverageData(activeDate, $scope.activeActivityType,  $scope.trendInfoObj[$scope.activeActivityType], periodType);

        $timeout(function(){
            angular.element('.bottom-nvd3-chart .tick text').attr('x', -20);
            if(periodType == "monthly"){
                var x = angular.element('.nv-x .nv-axis .tick text');
                angular.forEach(x, function(value, key){
                    var textKey = key + 1;
                    if(textKey % 5 != 0)
                        if(key != 0)
                            x[key].innerHTML = " ";
                })
            }
        }, 500);
    };

    $scope.createGrowthGraph = function (activeDate, growthType, periodType) {
        var generateDate = TrendDataChart.generateDataGrowth(activeDate, 'growth',  $scope.trendInfoObj['growth'], periodType);

        $scope.data = [{'values': generateDate[growthType]}];
        console.log($scope.data);
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
                reduceXTicks: false,
                reduceYTicks: false,
                showControls: false,
                showLegend: false,
                valueFormat: function(d){
                    return d3.format(',.1f')(d);
                },
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis:{
                    tickFormat: function(d) {
                        var label = $scope.data[0].values[d].label;
                        return label;
                    }
                }
            }
        };
    };

    $scope.activeActivityType = "growth";
    $scope.trendTemplate = 'templates/trends/'+$scope.activeActivityType+'.html';

    $scope.changeActivityType = function(activityType){
        $scope.activeActivityType = activityType;
        if(activityType == 'growth') {
            $scope.trendTemplate = 'templates/trends/growth.html';
            $scope.createGrowthGraph(activeDate, $scope.growthType, $scope.periodTypeGrowth);
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
        $scope.trendInfoObj.pump = $filter('filter')(activities, {'type': 'pump'});
        $scope.trendInfoObj.diaper = $filter('filter')(activities, {'type': 'diaper'});
        $scope.trendInfoObj.bottle = $filter('filter')(activities, {'type': 'bottle'});
        $scope.trendInfoObj.growth = $filter('filter')(activities, {'type': 'growth'});
        var nurse = $filter('filter')(activities, {'type': 'nurse'});
        console.log($scope.trendInfoObj.growth);
        angular.forEach(nurse, function(obj, index){
            $scope.trendInfoObj.bottle.push(obj);
        });
        $scope.changeActivityType($scope.activeActivityType);
    });

    var activeDate = moment();

    $scope.periodTypeGrowth = 'weekly';
    $scope.growthType = 'weight';

}]).controller('GrowthCtrl', ['$filter', '$scope', 'TrendDataChart', function ($filter, $scope, TrendDataChart) {

    var activeDate;

    $scope.$watch('periodTypeGrowth', function(newValue, oldValue){
        if(newValue != oldValue){
            $scope.createGrowthGraph(activeDate, $scope.growthType, $scope.periodTypeGrowth);
        }
    });

    $scope.$watch('growthType', function(newValue, oldValue){
        if(newValue != oldValue){
            $scope.createGrowthGraph(activeDate, $scope.growthType, $scope.periodTypeGrowth);

            switch($scope.growthType){
                case 'weight':
                    $scope.growthTypeTitle = "Weight";
                    break;
                case 'height':
                    $scope.growthTypeTitle  = "Height";
                    break;
                case 'headCircumference':
                    $scope.growthTypeTitle  = "Head Circumference";
                    break;
                case 'bmi':
                    $scope.growthTypeTitle  = "BMI";
                    break;
            }
        }
    });


}])
.controller('TrendCtrl', ['$filter', '$scope', 'TrendDataChart', function ($filter, $scope, TrendDataChart) {

        var activeDate;

        $scope.axisLabel = {
            'sleep':{
                'topLabel': "Sleep hours (per day)",
                'botLabel': "Sleep Times (per day)"
            },
            'bottle':{
                'topLabel': "Formula (oz or ml per day)",
                'botLabel': "Breastfeeding (hours)"
            },
            'diaper':{
                'topLabel': "Wet (times changed)",
                'botLabel': "Dirty (times changed)"
            },
            'pump':{
                'topLabel': "Left (oz or ml per day)",
                'botLabel': "Right (oz or ml per day)"
            }
        };

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
        $scope.fromToDateText = TrendDataChart.generateFromToDateText(activeDate, $scope.periodType);

}]);
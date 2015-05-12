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

    $scope.data = [
                    {
                        "key" : "A" ,
                        "values" : [{x: 0, y: 5}, {x: 1, y: 5}, {x: 2, y: 4}, {x: 3, y: 6}, {x: 4, y: 8}]
                    } ,
                    {
                        "key" : "B" ,
                        "values" : [{x: 0, y: 3}, {x: 1, y: 3}, {x: 2, y: 7}, {x: 3, y: 9}, {x: 4, y: 0}]
                    } ,
                    {
                        "key" : "C" ,
                        "values" : [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 8}, {x: 3, y: 3}, {x: 4, y: 1}]
                    } ,
                    {
                        "key" : "D" ,
                        "values" : [{x: 0, y: 1}, {x: 1, y: 4}, {x: 2, y: 6}, {x: 3, y: 7}, {x: 4, y: 5}]
                    }
                ];

    /*
    function sinAndCos() {
        var sin = [],sin2 = [],
            cos = [];

        //Data is represented as an array of {x,y} pairs.
        for (var i = 0; i < 100; i++) {
            sin.push({x: i, y: Math.sin(i/10)});
            sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
            cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
        }

        //Line chart data should be sent as an array of series objects.
        return [
            {
                values: sin,      //values - represents the array of {x,y} data points
                key: 'Sine Wave' //key  - the name of the series.
            },
            {
                values: cos,
                key: 'Cosine Wave'
            },
            {
                values: sin2,
                key: 'Another sine wave',
     //area - set to true if you want this line to turn into a filled area chart.
            }
        ];
    };
    */

    $scope.trendTemplate = 'templates/trends/growth.html';

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

        $scope.config = {
            visible: true, // default: true
            extended: false, // default: false
            disabled: false, // default: false
            autorefresh: true, // default: true
            refreshDataOnly: false // default: false
        };

}]).controller('PumpingCtrl', ['$scope', function ($scope) {



    }]);
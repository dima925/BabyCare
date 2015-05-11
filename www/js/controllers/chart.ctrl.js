angular.module('cleverbaby.controllers')

.controller('ChartCtrl', ['$scope','$timeout', function ($scope, $timeout) {
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

        var chart1 = {};
        chart1.type = "ColumnChart";
        chart1.cssStyle = "height:200px; width:300px;";
        chart1.data = {"cols": [
            {id: "month", label: "Month", type: "string"},
            {id: "laptop-id", label: "Laptop", type: "number"},
            {id: "desktop-id", label: "Desktop", type: "number"},
            {id: "server-id", label: "Server", type: "number"},
            {id: "cost-id", label: "Shipping", type: "number"}
        ], "rows": [
            {c: [
                {v: "January"},
                {v: 19, f: "42 items"},
                {v: 12, f: "Ony 12 items"},
                {v: 7, f: "7 servers"},
                {v: 4}
            ]},
            {c: [
                {v: "February"},
                {v: 13},
                {v: 1, f: "1 unit (Out of stock this month)"},
                {v: 12},
                {v: 2}
            ]},
            {c: [
                {v: "March"},
                {v: -10},
                {v: 0},
                {v: 11},
                {v: 6}

            ]}
        ]};

        chart1.options = {
            "title": "Sales per month",
            "isStacked": "true",
            "fill": 20,
            "displayExactValues": true,
            "vAxis": {
                "title": "Sales unit", "gridlines": {"count": 6}
            },
            "hAxis": {
                "title": "Date"
            }
        };

        chart1.formatters = {};

        $scope.chart = chart1;


    }]);
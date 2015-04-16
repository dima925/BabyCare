angular.module('cleverbaby.controllers')

.controller('ChartCtrl', ['$scope','$timeout', function ($scope,$timeout) {
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
}]);
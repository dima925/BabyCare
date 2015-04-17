angular.module('cleverbaby.controllers')
.controller('BabyCtrl', ['$scope', function ($scope) {
	$scope.cancel = function(){
		$scope.modal.hide();
	}
}])
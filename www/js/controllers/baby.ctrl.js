angular.module('cleverbaby.controllers')
.controller('BabyCtrl', ['$scope', function ($scope) {
	

	$scope.cancel = function(){
		$scope.modal.hide();
	}
	$scope.saveBaby = function(){
		var birtday = this.addbaby.birtday;
		var name = this.addbaby.name;
		var gender = this.addbaby.gender;
		var baby = {
			birtday : birtday,
			name : name,
			gender: gender
		};
		console.log(baby);
	}
}])
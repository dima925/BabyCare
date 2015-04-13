angular.module('cleverbaby.services')
.service('timerService', ['$rootScope',
	function ($rootScope) {
		var time;
	    function start(){
	        $rootScope.$broadcast('timer-start');
       		$rootScope.timerRunning = true;
	    }
	    function getTimer(){
	    	return time;
	    }

	    return{
	    	
	    	setTimer  : start,
	    	getTimer : getTimer
	    };
}])
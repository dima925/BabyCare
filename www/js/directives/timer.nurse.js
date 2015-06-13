angular.module('cleverbaby.directives')
    .directive('timerNurse', ['ActivityService', '$timeout', '$interval', '$rootScope', function (ActivityService, $timeout, $interval, $rootScope) {

    	var texts = {
    		'buttonLeft': ['Start Left', 'END LEFT'],
    		'buttonRight': ['Start Right', 'END RIGHT']
    	};

    	var timerEventDataTemplate = {
    		'type': 'nurse',
    		'backPropagation': false,
    		'direction': false,
    		'command': '', // start, stop
    		'isRunning': false,
    		'isShown': false,
    		'params': {} // other parameters
    	};

        return {
            restrict: 'E',
            scope: {
                'isShown': '=',
            },
            templateUrl: 'templates/elements/timer-nurse.html',
            link: function (scope, element) {
            	// private
            	var intervalId = null,
            		intervalStart = null;
            	
            	// public
            	scope.isShown = false;
            	scope.inProgress = 'none';
            	scope.timeLeft = 0;
            	scope.timeRight = 0;
            	scope.timeBoth = 0;

            	// fomatted values
            	scope.timeLeftF = 0;
            	scope.timeRightF = 0;
            	scope.timeBothF = 0;

            	// button texts (future updates happens depending progress)
            	scope.leftButton = texts.buttonLeft[0];
            	scope.rightButton = texts.buttonRight[0];
            	

            	function refresher() {
            		if(scope.inProgress == 'none')
            			return;
            		if(scope.inProgress == 'left')
            			scope.timeLeft++;
            		if(scope.inProgress == 'right')
            			scope.timeRight++;
            	}

            	function formatTime(t) {
            		var d = moment.duration(t, 'seconds'),
            			s = d.seconds(),
            			m = d.minutes();

        			var st = String(s),
        				mt = String(m);

            		if(s === 0) st = '00';
            		else if(s < 10) st = '0' + String(s);

            		if(m === 0) mt = '00';
            		else if(m < 10) mt = '0' + String(m);

            		return mt + ':' + st;
            	}

            	scope.open = function () {
            		var data = angular.copy(timerEventDataTemplate);
            		data.isShown = true;
            		$rootScope.$broadcast('timerEvent', data);
            	};

            	scope.close = function () {
            		console.log('timer close');
            		scope.isShown = false;
            		// broadcast about close
            	};

            	scope.hide = function () {
            		console.log('timer hide'); // question if on close we need to stop or not 
            	};

            	scope.left = function () {
            		console.log('timer left press');
            		
            		if(scope.inProgress == 'left') {
            			// stop left
            			scope.stop();
            			return;
            		}

            		if(scope.inProgress == 'right') {
            			// stop right
            		}

            		scope.inProgress = 'left';
            		scope.start();
            	}

            	scope.right = function () {
            		console.log('timer right press');

            		if(scope.inProgress == 'right') {
            			// stop right
            			scope.stop();
            			return;
            		}

            		if(scope.inProgress == 'left') {
            			// stop left
            		}

            		scope.inProgress = 'right';
            		scope.start();
            	};

            	scope.start = function () {
            		if(intervalId)
            			$interval.cancel(intervalId);
            		intervalStart = moment();
            		scope.isShown = true;
            		intervalId = $interval(refresher, 1000);
            	};

            	scope.stop = function () {
            		if(intervalId)
            			$interval.cancel(intervalId);
            		scope.inProgress = 'none';
            	};

            	$rootScope.$on('timerEvent', function (event, data) {
            		if(data.backPropagation)
            			return;

            		if(angular.isDefined(data.command) && data.command) {
            			switch(data.command) {
            				case 'start-left':
            					scope.left();
            					break;
        					case 'start-right':
        						scope.right();
        						break; 
            			}
            			return;
            		}

            	});

            	scope.$watch('timeLeft', function (tl) {
            		if(angular.isUndefined(tl))
            			return;
            		if(isNaN(tl))
            			return;
            		scope.timeLeftF = formatTime(tl);
            		scope.timeBoth = Number(tl) + Number(scope.timeRight);
            	});

            	scope.$watch('timeRight', function (tr) {
            		if(angular.isUndefined(tr))
            			return;
            		if(isNaN(tr))
            			return;
            		scope.timeRightF = formatTime(tr);
            		scope.timeBoth = Number(scope.timeLeft) + Number(tr);
            	});

            	scope.$watch('timeBoth', function (tb) {
            		if(angular.isUndefined(tb))
            			return;
            		if(isNaN(tb))
            			return;
            		scope.timeBothF = formatTime(tb);
            	});

            	scope.$watch('inProgress', function (progress) {
            		if(angular.isUndefined(progress) || progress == 'none') {
            			// progress NONE
            			scope.leftButton = texts.buttonLeft[0];
            			scope.rightButton = texts.buttonRight[0];
            		} else if(progress == 'left') {
            			// button texts
            			scope.leftButton = texts.buttonLeft[1];
        				scope.rightButton = texts.buttonRight[0];
            		} else if(progress == 'right') {
            			// button texts
            			scope.leftButton = texts.buttonLeft[0];
        				scope.rightButton = texts.buttonRight[1];
            		}
            	});

            	scope.$on('$destroy', function handleDestroyEvent() {
            		scope.stop();
            	});
            }
        };
    }]);
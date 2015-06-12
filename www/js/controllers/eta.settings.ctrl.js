angular.module('cleverbaby.controllers')
    .controller('EtaSettingsCtrl', ['$scope', '$ionicModal', '$rootScope', '$localStorage', 'ActivityService',
        function($scope, $ionicModal, $rootScope, $localStorage, ActivityService) {
        	
            $scope.cancel = function() {
                $scope.etaSettingsModal.hide().then(function () {
                	$scope.calculateEtaTimes();
                });
            };

            var unwatch = null;

            // Execute action on show modal
			$scope.$on('modal.shown', function() {
				$scope.eta_fixed_duration = -1;

	            if($scope.etaSettingsModal.mode == 'feed') {
	            	var feedMins = ActivityService.getActivityEtaByType($rootScope.babyId, 'feed');

	            	$scope.modalEtaTime = moment.duration(feedMins, 'minutes').humanize();

	            	if($localStorage.settings && $localStorage.settings.eta && $localStorage.settings.eta.feed && !isNaN($localStorage.settings.eta.feed) && $localStorage.settings.eta.feed > 0) {
	            		$scope.etaSettingsModal.eta_fixed_duration = $localStorage.settings.eta.feed;
	            	}
	            } else {
	            	var diaperMins = ActivityService.getActivityEtaByType($rootScope.babyId, 'diaper');
	            	
	            	$scope.modalEtaTime = moment.duration(diaperMins, 'minutes').humanize();

	            	if($localStorage.settings && $localStorage.settings.eta && $localStorage.settings.eta.diaper && !isNaN($localStorage.settings.eta.diaper) && $localStorage.settings.eta.diaper > 0) {
	            		$scope.etaSettingsModal.eta_fixed_duration = $localStorage.settings.eta.diaper;
	            	}
	            }

	            unwatch = $scope.$watch('etaSettingsModal.eta_fixed_duration', function (value) {
	            	if(typeof value == 'undefined')
	            		value = -1;

	            	if(!$localStorage.settings)
	            		$localStorage.settings = {};

	            	if(!$localStorage.settings.eta)
	            		$localStorage.settings.eta = {};

	            	if($scope.etaSettingsModal.mode == 'feed') {
	            		$localStorage.settings.eta.feed = value;
	            	} else {
	            		$localStorage.settings.eta.diaper = value;
	            	}
	            });
			});

			// Execute action on hide modal
			$scope.$on('modal.hidden', function() {
				if(unwatch) {
					unwatch();
					unwatch = null;
				}
			});
        }
    ]);

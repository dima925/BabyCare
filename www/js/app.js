// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('cleverbaby', [
    'ionic',
    'pascalprecht.translate',
    'cleverbaby.controllers',
    'angular-svg-round-progress',
    'cleverbaby.data',
    'cleverbaby.services',
    'cleverbaby.helpers',
    'ngCordova',
    'timer',
    'chart.js',
    'ngStorage',
    'ui.calendar',
    'nvd3',
    'googlechart'
])

.run(function ($ionicPlatform, $rootScope, AuthService, $timeout, $ionicModal, $location, $cordovaLocalNotification, timerService, BabyService, $localStorage, $cordovaSplashscreen, $http) {

    $ionicPlatform.ready(function () {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        $rootScope.setBaby = function (baby){
            $rootScope.baby = baby;
            $rootScope.babyId = baby.uuid;
            $localStorage.babyId = baby.uuid;
            $rootScope.$broadcast('babySelected', baby);
        };

        AuthService.setup().then(function(babies){
            if($localStorage.babyId){
                for (var i in babies){
                    if(babies.hasOwnProperty(i)){
                        if(babies[i].uuid == $localStorage.babyId){
                            $rootScope.setBaby(babies[i]);
                            break;
                        }
                    }
                }
            }

            if(!$rootScope.babyId){
                $rootScope.setBaby(babies[0])
            }

            $rootScope.$broadcast('auth');
        });

        $rootScope.timers = timerService;

        $ionicModal.fromTemplateUrl('templates/activities/choose.html', {
            scope: $rootScope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $rootScope.newmodal = modal;
        });

        $rootScope.openNewModal = function () {
            $rootScope.newmodal.show();
        };
        $rootScope.closeNewModal = function () {
            $rootScope.newmodal.hide();
        };

        $rootScope.$on('$destroy', function () {
            $rootScope.newmodal.remove();
        });
        // Execute action on hide modal
        $rootScope.$on('modal.hidden', function (modal) {
            // Execute action
        });

        // Execute action on remove modal
        $rootScope.$on('modal.removed', function (modal) {
            // Execute action
        });


		// hide the splashscreen
		// only call .hide() if we are running inside cordova (webview), otherwise desktop chrome throws an error
		if (ionic.Platform.isWebView()) $cordovaSplashscreen.hide();

	});

})
.config(["$translateProvider", "$ionicConfigProvider",
    function($translateProvider, $ionicConfigProvider){
    $ionicConfigProvider.tabs.style('standard');
    $ionicConfigProvider.tabs.position('bottom');
    $translateProvider.preferredLanguage('en');
    $translateProvider.useStaticFilesLoader({
        'prefix': 'languages/',
        'suffix': '.json'
    });
}]);
function escapeEmailAddress(email) {
    if (!email) return false;
    // Replace '.' (not allowed in a Firebase key) with ','
    email = email.toLowerCase();
    email = email.replace(/\./g, ',');
    return email.trim();
}

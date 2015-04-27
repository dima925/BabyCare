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
    'ngCordova',
    'timer',
    'chart.js',
    'ngStorage'
])

.run(function ($ionicPlatform, $rootScope, AuthService, $timeout, $ionicModal, $location, $cordovaLocalNotification,timerService) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        AuthService.setup().then(function(){
        });

        $rootScope.userEmail = null;
        $rootScope.logout = function () {
            AuthService.logout();
        };
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
}]).config(["$httpProvider", function ($httpProvider) {
    $httpProvider.defaults.transformResponse.push(function(responseData){
        convertDates(responseData);
        return responseData;
    });
}]);
var convertDates = function(input) {
    for(var key in input) {
        if (!input.hasOwnProperty(key)) continue;

        if (typeof input[key] === "object") {
            convertDates(input[key]);
        } else {
            if (typeof input[key] === "string" &&  /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/.test(input[key])) {
                input[key] = new Date(input[key]);
            }
        }
    }
};

function escapeEmailAddress(email) {
    if (!email) return false;
        // Replace '.' (not allowed in a Firebase key) with ','
    email = email.toLowerCase();
    email = email.replace(/\./g, ',');
    return email.trim();
}

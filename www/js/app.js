// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('cleverbaby', ['ionic', 'firebase', 'cleverbaby.controllers','angular-svg-round-progress', 'cleverbaby.data','cleverbaby.services'])

.run(function ($ionicPlatform, $rootScope, AuthService, $timeout, $ionicModal, $firebase, $location) {
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

        $rootScope.userEmail = null;
        $rootScope.logout = function () {
            AuthService.logout();
            $rootScope.checkSession();
        };

        $rootScope.checkSession = function () {
            console.log(AuthService.isLoggedIn(), "logged in");
            if (AuthService.isLoggedIn()) {
                $rootScope.userEmail = AuthService.userEmail();
                OfflineFirebase.restore();
                var bucketListRef = $firebase(new OfflineFirebase('https://cleverbaby.firebaseio.com/' + escapeEmailAddress($rootScope.userEmail)));
                $rootScope.fbData = bucketListRef.$asArray();
                $location.path('app/diary');
            } else{
                $location.path ('app/signin');
                $rootScope.userEmail = null;
            }
        };

        $rootScope.checkSession();

        /*get babies data
        babies = new Firebase('https://cleverbaby.firebaseio.com/babies/');
        
        function addToIndex(id) {
            $rootScope.babyId = babies.child(id).set(true);
        }
        console.log($rootScope.babyId);
        /*babies.on('value',function(snap){
            snap.forEach(function(item){
                $rootScope.bab = item.key();
                console.log($rootScope.bab);
            })
        });
        /*end get babies data*/

        $ionicModal.fromTemplateUrl('templates/newChoose.html', {
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

        //Cleanup the modal when we're done with it!
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
});

function escapeEmailAddress(email) {
    if (!email) return false;
        // Replace '.' (not allowed in a Firebase key) with ','
    email = email.toLowerCase();
    email = email.replace(/\./g, ',');
    return email.trim();
}
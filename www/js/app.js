// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('cleverbaby', ['ionic', 'firebase', 'cleverbaby.controllers','angular-svg-round-progress', 'cleverbaby.networking','cleverbaby.services'])

.run(function ($ionicPlatform, $rootScope, AuthService, $window, $ionicLoading, $timeout, $ionicModal, $firebase) {
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

        $rootScope.show = function (text) {
            $rootScope.loading = $ionicLoading.show({
                template: text ? text : 'Loading..',
                showBackdrop: true,
                delay: 0
            });
        };

        $rootScope.hide = function () {
            $ionicLoading.hide();
        };

        $rootScope.notify = function (text) {
            $rootScope.show(text);
            $window.setTimeout(function () {
                $rootScope.hide();
            }, 1999);
        };

        $rootScope.logout = function () {
            AuthService.logout();
            $rootScope.checkSession();
        };

        $rootScope.checkSession = function () {
            console.log(AuthService.isLoggedIn());
            if (!AuthService.isLoggedIn()) {
                $window.location.href = '#/auth/signin';
                $rootScope.userEmail = null;
                $window.location.href = '#/auth/signin';
            } else{
                $rootScope.userEmail = AuthService.userEmail();
                console.log("firebase url", $rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
                OfflineFirebase.restore();
                var bucketListRef = $firebase(new OfflineFirebase('https://cleverbaby.firebaseio.com/' + escapeEmailAddress($rootScope.userEmail)));
                $rootScope.fbData = bucketListRef.$asArray();
                $window.location.href = ('#/app/diary');
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
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: "/search",
        views: {
            'menuContent': {
                templateUrl: "templates/search.html"
            }
        }
    })

    .state('app.browse', {
        url: "/browse",
        views: {
            'menuContent': {
                templateUrl: "templates/browse.html"
            }
        }
    })
        .state('app.diary', {
            url: "/diary",
            views: {
                'menuContent': {
                    templateUrl: "templates/diary.html",
                    controller: 'DiaryCtrl'
                }
            }
        })

    .state('app.single', {
        url: "/playlists/:playlistId",
        views: {
            'menuContent': {
                templateUrl: "templates/playlist.html",
                controller: 'PlaylistCtrl'
            }
        }
    })


    .state('auth', {
        url: "/auth",
        abstract: true,
        templateUrl: "templates/auth.html"
    })
        .state('auth.signin', {
            url: '/signin',
            views: {
                'auth-signin': {
                    templateUrl: 'templates/auth-signin.html',
                    controller: 'SignInCtrl'
                }
            }
        })
        .state('auth.signup', {
            url: '/signup',
            views: {
                'auth-signup': {
                    templateUrl: 'templates/auth-signup.html',
                    controller: 'SignUpCtrl'
                }
            }
        })


    ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/diary');
});

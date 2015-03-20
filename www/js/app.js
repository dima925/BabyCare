// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('cleverbaby', ['ionic', 'firebase', 'cleverbaby.controllers'])

.run(function ($ionicPlatform, $rootScope, $firebaseAuth, $firebase, $window, $ionicLoading, $timeout, $ionicModal) {
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
        $rootScope.baseUrl = 'https://cleverbaby.firebaseio.com/';
        
        var authRef = new Firebase($rootScope.baseUrl);
        $rootScope.auth = $firebaseAuth(authRef);

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
            $rootScope.auth.$logout();
            $rootScope.checkSession();
        };

        $rootScope.checkSession = function () {
            var auth = $rootScope.auth.$getAuth();


            if (auth == null) {
                // no user session exists
                // $rootScope.userEmail = null;
                $window.location.href = '#/auth/signin';
                return;
            }

            if (auth.uid) {
                // user authenticated with Firebase
                $rootScope.userEmail = auth.uid;
                console.log("firebase url", $rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
                OfflineFirebase.restore();
                var bucketListRef = $firebase(new OfflineFirebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail)));
                $rootScope.fbData = bucketListRef.$asArray();
                $window.location.href = ('#/app/diary');
            } else {
                // user is logged out
                $rootScope.userEmail = null;
                $window.location.href = '#/auth/signin';
            }

        }
        $rootScope.checkSession();

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


        $rootScope.addNurse = function(breast, length, time) {
            $rootScope.newmodal.hide();
            var data = {
                type: 'nurse',
                breast: breast == undefined ? 'both' : breast,
                length: length == undefined ? 0 : length,
                time: time == undefined ? Date.now() : time,
                created: Date.now(),
                updated: Date.now()
            }
            $rootScope.fbData.$add(data);
        }


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

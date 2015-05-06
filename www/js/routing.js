angular.module('cleverbaby')
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/app.html",
        controller: 'AppCtrl'
    })

    .state('app.calendar', {
        url: "/calendar",
        views: {
            'calendar': {
                templateUrl: "templates/calendar.html",
                controller: 'CalendarCtrl'
            }
        }
    })

    .state('app.browse', {
        url: "/browse",
        views: {
            'browse': {
                templateUrl: "templates/browse.html"
            }
        }
    })
    .state('app.diary', {
        url: "/diary",
        views: {
            'home': {
                templateUrl: "templates/diary.html",
                controller: 'DiaryCtrl'
            }
        }
    })
    .state('app.chart', {
        url: "/chart",
        views: {
            'chart': {
                templateUrl: "templates/chart.html",
                controller: 'ChartCtrl'
            }
        }
    })
    .state('app.single', {
        url: "/playlists/:playlistId",
        views: {
            'playlist': {
                templateUrl: "templates/playlist.html",
                controller: 'PlaylistCtrl'
            }
        }
    })
    .state('app.more', {
       url: "/more",
       views: {
           'more': {
               templateUrl: "templates/more.html"
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
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/diary');
});

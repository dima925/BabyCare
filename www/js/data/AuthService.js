/**
 * Created by narek on 3/25/15.
 */
angular.module('cleverbaby.data')
    .factory('AuthService', ['$q', '$cordovaOauth', 'dataConfig', 'network', '$localStorage', '$rootScope',
        function ($q, $cordovaOauth, dataConfig, network, $localStorage, $rootScope){

            var currentUser = null;
            var authService = {};

            authService.setup = function(){
                network.setAuth($localStorage.token);
                return network.get({
                    url: '/auth'
                }).success(function(data){
                    setAuth(data);
                    return data;
                })
            };
            authService.signOut = function(){
                currentUser = null;
                return network.delete('/auth');
            };

            authService.signIn = function(credentials) {
                return network.post({
                    url: '/auth',
                    data: credentials
                }).success(function(data){
                    setAuth(data);
                    return data;
                });
            };
            authService.signInViaEmail = function(credentials){
                credentials.provider = "email";
                return authService.signIn(credentials);
            };
            authService.signInViaOAuth = function(type, token){
                return authService.signIn({
                    token: token,
                    provider: type
                });
            };
            authService.signInAnonymously = function(){
                return authService.signIn({
                    provider: 'anonymous'
                });
            };
            authService.signUp = function(credentials){
                return  network.post({
                        url: '/users',
                        data: credentials
                    }).success(function(data){
                        setAuth(data);
                        return data;
                    });
            };

            function setAuth(data){
                $rootScope.$broadcast('auth', data);
                $localStorage.token = data.token;
                network.setAuth(data.token);
                currentUser = data.user;
            }

            return {
                signOut: function(){
                    return authService.signOut();
                },
                signInViaEmail: function(email, password){
                    return authService.signInViaEmail({
                        email: email,
                        password: password
                    });
                },
                isLoggedIn: function(){
                    return currentUser != null;
                },
                createUser: function(name, email, password){
                    return authService.signUp({
                        name: name,
                        email: email,
                        password: password
                    });
                },
                signInViaOAuth: function(type){
                    if(type=='facebook'){
                        return $cordovaOauth
                            .facebook(dataConfig.facebookId, ['public_profile'])
                            .then(function(result){
                             return authService.signInViaOAuth('facebook', result.access_token);
                        });
                    } else if(type == 'google'){
                        return $cordovaOauth
                            .google(dataConfig.googleId, ['profile'])
                            .then(function(result){
                             return authService.signInViaOAuth('google', result.access_token);
                        });
                    }
                },
                signInAnonymously: function () {
                    return authService.signInAnonymously();
                },
                setup: function(){
                    return authService.setup();
                }
            };
        }
    ]);

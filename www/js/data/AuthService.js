/**
 * Created by narek on 3/25/15.
 */
angular.module('cleverbaby.data')
    .factory('AuthService', ['$q', '$cordovaOauth', 'dataConfig', 'network',
        function ($q, $cordovaOauth, dataConfig, network){

            var currentUser = null;
            var authService = {};

            authService.getUser = function () {
                var deferred = $q.defer();
                network.get('/auth').then(deferred.resolve, function(error){
                });
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
                    network.access_token = data.token;
                    currentUser = data.user;
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
                return $q(function(resolve, reject){
                    network.post({
                        url: '/users',
                        data: credentials
                    }).success(function(data){
                        network.access_token = data.token;
                        currentUser = data.user;
                        resolve(data);
                    }).error(reject);
                });

            };

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
                getUser: function(){
                    return authService.getUser();
                },
                createUser: function(name, email, password){
                    return authService.signUp({
                        name: name,
                        email: email,
                        password: password
                    });
                },
                signInViaOAuth: function(type){
                    var deferred = $q.defer();
                    if(type=='facebook'){
                        $cordovaOauth.facebook(dataConfig.facebookId, ['public_profile']).then(function(result){
                            authService
                                .signInViaOAuth('facebook', result.access_token)
                                .then(deferred.resolve, deferred.reject);
                        }, deferred.reject);
                    } else if(type == 'google'){
                        $cordovaOauth.google(dataConfig.googleId, ['profile']).then(function(result){
                            authService
                                .signInViaOAuth('google', result.access_token)
                                .then(deferred.resolve, deferred.reject);
                            deferred.resolve(result);
                        }, deferred.reject);
                    }
                    return deferred.promise
                },
                signInAnonymously: function () {
                    return authService.signInAnonymously();
                }
            };
        }
    ]);

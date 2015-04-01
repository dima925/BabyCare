/**
 * Created by narek on 3/25/15.
 */
angular.module('cleverbaby.data')
.service('AuthService', ['$firebaseAuth', 'firebaseConfig', '$q',
    function ($firebaseAuth, firebaseConfig, $q){
    var authRef = new OfflineFirebase(firebaseConfig.baseUrl);
    var authService = $firebaseAuth(authRef);
    var userData = null;
    return {
        logout: function(){
            return authService.$unauth();
        },
        authWithPassword: function(credentials){
            return authService.$authWithPassword({
                email: credentials.email,
                password: credentials.password
            });
        },
        isLoggedIn: function(){
            var auth = authService.$getAuth();
            return  auth!== null && auth.uid;
        },
        userEmail: function(){
            var auth = authService.$getAuth();
            return  auth.uid;
        },
        createUser: function(email, password){
            return authService.$createUser(email, password);
        },
        authWithOAuthPopup: function(type){
            return authService.$authWithOAuthPopup(type);
        },
        authAnonymously: function(){
            return authService.$authAnonymously();
        }
    };

}]);
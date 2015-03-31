/**
 * Created by narek on 3/25/15.
 */
angular.module('cleverbaby.networking')
.service('AuthService', ['$firebaseAuth', 'firebaseConfig', function ($firebaseAuth, firebaseConfig){
    var authRef = new OfflineFirebase(firebaseConfig.baseUrl);
    var authService = $firebaseAuth(authRef);
    return {
        logout: function(){
            authService.$logout();
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
        }
        
    }

}]);
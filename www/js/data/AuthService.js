/**
 * Created by narek on 3/25/15.
 */
angular.module('cleverbaby.data')
.factory('AuthService', ['$firebaseAuth', 'firebaseConfig', '$q', 'GroupService',
    function ($firebaseAuth, firebaseConfig, $q, GroupService){
    var authRef = new Firebase(firebaseConfig.baseUrl);
    var authService = $firebaseAuth(authRef);
    var anonymousUserId = null;

    authService.$onAuth(function(authData){
      if (authData) {
        var userRef = authRef.child('users').child(authData.uid);
        if(authData.provider == "anonymous"){
            userRef.set({
                'provider': 'anonymous'
            });
            anonymousUserId = authData.uid;
        } else{
            userRef.once('value', function(snapshot){
                var userValue = snapshot.val();
                var groupId;
                if(userValue === null){
                    groupId = GroupService.createGroup(authData);
                    userRef.set({
                        'group': groupId,
                        'provider': authData.provider
                    });
                } else{
                    groupId = userValue.group;
                }
                if(anonymousUserId){
                    GroupService.addMember(groupId, anonymousUserId);
                }
            });
        }
      } else {
        authAnonymously().then(function(){
        });
      }
    });
    function authAnonymously(){
        return authService.$authAnonymously();
    }
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
        uid: function(){
            var auth = authService.$getAuth();
            return  auth.uid;
        },
        createUser: function(email, password){
            return authService.$createUser(email, password);
        },
        authWithOAuthPopup: function(type){
            return authService.$authWithOAuthPopup(type);
        },
        authAnonymously: authAnonymously
    };


}]);
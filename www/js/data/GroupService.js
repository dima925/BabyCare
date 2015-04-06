angular.module('cleverbaby.data')
	.factory('GroupService', ['firebaseConfig', '$q',
		function(firebaseConfig, $q){

		var authRef = new Firebase(firebaseConfig.baseUrl);

		return {
			createGroup: function(authData){
				var x = {};
				x[authData.uid] = true;
                var groupRef = authRef.child('accountGroups').push({
                    'users': x,
                    'creator': authData.uid
                });
                return groupRef.key();
			},
			addMember: function(groupId, userId){
				var x = {};
				x[userId] = strong;
                authRef.child('accountGroups').child(groupId).child('users').update(x);
                authRef.child('users').child(userId).update({
                	'group': groupId
                });
			},
			inviteMember: function(groupId, userId){
				var x = {};
				x[userId] = false;
                authRef.child('accountGroups').child(groupId).child('users').update(x);
			},
			confirmMember: function(groupId, userId){
                authRef.child('users').child(userId).update({
                	'group': groupId
                });
			},
			'groupOfUser': function(userId){
				authRef.child('users').child(userId).child('group').once("value", function(snapshot){
					return snapshot.val();
				});
			}
		};
	}]);
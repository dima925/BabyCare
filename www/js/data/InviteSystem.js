angular.module('cleverbaby.data')
	.factory('InviteSystem', ['GroupService', 'AuthService', '$q', function(GroupService, AuthService, $q){
		"use strict";
		var serviceRef = new Firebase(firebaseConfig.baseUrl);

		function addInvite(userId, groupId){
			serviceRef.child('invites').child(userId).push({
				'creator': AuthService.uid(userId),
				'group': groupId,
				'response': 0
			});
		}

		return {
			inviteUser: function(userId){
				return $q(function(resolve, reject){
					try{
						var groupId = GroupService.groupOfUser(AuthService.uid());
						GroupService.inviteMember(groupId, userId);
						addInvite(userId, groupId);
						if(resolve){
							resolve();
						}
					} catch(e){
						if(reject){
							reject();
						}
					}
				});
			},
			acceptInvite: function(userId){
				return $q(function(resolve, reject){
					try{
						GroupService.addMember(AuthService.uid(), userId);
						if(resolve){
							resolve();
						}
					} catch(e){
						if(reject){
							reject();
						}
					}
				});
			}, 
		};

	}]);
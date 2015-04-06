angular.module('cleverbaby.data')
.factory('BabyService', ['$q', '$firebase', 'firebaseConfig', function($q, $firebase, firebaseConfig){
    return function(userId){
            var activityRef = new Firebase(firebaseConfig.baseUrl)
                .child('activities')
                .orderByChild('baby')
                .equalTo(babyId);
            var fireMessage = $firebase(activityRef.startAt().limit(10));
            return {
                inviteMemberToBaby: function(babyId, role){
                    return $q(function(resolve, reject){
                        babyRef
                            .child('babies')
                            .child(babyId)
                            .child('users')
                            .child(userId)
                            .set(role);

                        babyRef
                            .child('users')
                            .child(userId)
                            .child('babies')
                            .child(babyId)
                            .set(true);
                    });
                },
                childAdded: function childAdded(cb) {
                    fireMessage.$on('child_added', function(data) {
                        var val = data.snapshot.value;
                        cb.call(this, data.snapshot.value);
                    }, function(err) {
                        console.log(err);
                    });
                },
                add: function addActivity(baby) {
                    return fireMessage.$add(baby);
                },
                off: function turnActivitiesOff() {
                    fireMessage.$off();
                }
            };
        }
}]);
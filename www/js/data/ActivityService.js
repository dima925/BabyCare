angular.module('celeverbaby.data')
.factory('ActivityService',  ['$q', '$firebase', 'firebaseConfig', function($q, $firebase, firebaseConfig){
    return function(babyId){
        var activityRef = new Firebase(firebaseConfig.baseUrl)
            .child('activities')
            .orderByChild('baby')
            .equalTo(babyId);
        var fireMessage = $firebase(activityRef.startAt().limit(10));
        return {
            childAdded: function childAdded(cb) {
                fireMessage.$on('child_added', function(data) {
                    var val = data.snapshot.value;
                    cb.call(this, val);
                }, function(err) {
                    console.log(err);
                });
            },
            add: function addActivity(activity) {
                return fireMessage.$add(activity);
            },
            off: function turnActivitiesOff() {
                fireMessage.$off();
            },
            pageNext: function pageNext(name, numberOfItems) {
                var deferred = $q.defer();
                var activities = [];
                var pageActivityRef = activityRef
                    .startAt(null, name)
                    .limit(numberOfItems);

                $firebase(pageActivityRef).$on('loaded', function(data) {
                    var keys = Object.keys(data);
                    angular.forEach(keys, function(key) {
                        var item = data[key];
                        activities.push(item);
                    });
                    deferred.resolve(activities);
                });

                return deferred.promise;
            }
        };
    }
}]);
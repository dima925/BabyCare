angular.module('cleverbaby.data')
.factory('ActivityService',  ['network', '$resource', function(network, $resource){
    var activityResource = $resource(network.makeUrl('/activities/:id'), {
        id: '@id'
    });
    return {
        addActivity: function(data){
            return activityResource.save(data).$promise;
        },
        getAllActivitiesByBabyId: function(babyId, start, limit){
            return activityResource.query({
                babyId: babyId,
                start: start,
                limit: limit
            }).$promise;
        }
    };
}]);

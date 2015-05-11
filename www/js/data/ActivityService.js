angular.module('cleverbaby.data')
.factory('ActivityService',  ['network', '$localStorage', '$q', function(network, $localStorage, $q){

    function generetaeUniqueKey(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    function generateUniqueId(id){
        return id + '-' + new Date().getTime() + '-' + generetaeUniqueKey();
    }

    return {
        addActivity: function(data){
            return $q(function(resolve, reject){
                data.uuid = generateUniqueId($localStorage.user.id);
                data.createdAt = new Date();
                $localStorage.activities[data.babies].unshift(data);
                network.post({
                    data: data,
                    url: '/activities'
                });
                resolve();
            });
        },
        getTodayCount: function(babyId){
            return $q(function(resolve, reject){
                var count = {
                    nurseCount: 0,
                    changeCount: 0,
                    bathCount: 0,
                    playCount: 0
                };
                $localStorage.activities[babyId].forEach(function(activity){
                    /**
                     * checking for today
                     */
                    if( new Date(activity.createdAt).setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0) ){
                        if(activity.type == "nurse"){
                            ++count.nurseCount;
                        } else if(activity.type == "play"){
                            ++count.playCount;
                        } else if(activity.type == "bath"){
                            ++count.bathCount;
                        } else if(activity.type == "change"){
                            ++count.changeCount;
                        }
                    }
                });
                resolve(count);
            });
        },
        getAllActivitiesByBabyId: function(babyId, start, limit){
            return $q(function(resolve, reject){
                resolve($localStorage.activities[babyId].slice(start, start+limit));
            });
        },
        setActivities: function(babyId, activities){
            return $q(function(resolve, reject){
                if(!$localStorage.activities){
                    $localStorage.activities = {};
                }
                $localStorage.activities[babyId] = activities;
                resolve(activities);
            });
        }
    };
}]);

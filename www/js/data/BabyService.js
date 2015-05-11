angular.module('cleverbaby.data')
    .factory('BabyService', ['network', '$q', 'ActivityService', '$localStorage', function(network, $q, ActivityService, $localStorage) {

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
            getAllBabiesFromServer: function(include){
                return network.get({
                    url: '/babies',
                    params: {
                        include: include
                    }
                }, true).then(function(response){
                    return response.data;
                });
            },
            fetchBabies: function(){
                return this.getAllBabiesFromServer('activities').then(function(babies){
                    $localStorage.babies = {};
                    return $q.all(babies.map(function(baby){
                        return ActivityService.setActivities(baby.uuid, baby.activities).then(function(){
                            delete baby.activities;
                            $localStorage.babies[baby.uuid] = baby;
                            return baby;
                        });
                    }));
                });
            },
            getAllBabies: function () {
                return $localStorage.babies;
            },
            newBaby: function(data) {
                return {
                }
            },
            add: function(data){
                return $q(function(resolve, reject){
                    data.createdAt = new Date();
                    data.uuid = generateUniqueId($localStorage.user.id);
                    network.post({
                        url: '/babies',
                        data: data
                    });
                    $localStorage.babies[data.uuid] = data;
                    ActivityService.setActivities(data.uuid, []).then(function(){
                        resolve(data);
                    });
                });
            },
            edit: function(data){

                return $q(function(resolve, reject){
                    network.put({
                        url: '/babies/' + data.uuid,
                        data: data
                    });
                    $localStorage.babies[data.uuid] = data;
                    resolve(data);
                });
            }
        };
    }]);

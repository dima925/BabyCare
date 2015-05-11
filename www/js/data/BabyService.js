angular.module('cleverbaby.data')
    .factory('BabyService', ['network', '$q', 'ActivityService', '$localStorage', '$window', '$cordovaFile',
        function(network, $q, ActivityService, $localStorage, $window, $cordovaFile) {

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

        function handleFile(baby){
            return $q(function(resolve, reject){

                alert('file');
                if(baby.displayImage){
                    $window.resolveLocalFileSystemURL(baby.displayImage, function(fileEntry){
                        $window.resolveLocalFileSystemURL(cordova.file.dataDirectory+'/babies', function(dirEntry){
                            fileEntry.moveTo(dirEntry, baby.uuid, function(newFileEntry){
                                baby.displayImage = newFileEntry.nativeURL;
                                try{
                                    network.upload('/babies/'+ baby.uuid + '/media', newFileEntry.nativeURL);   
                                } catch(e){
                                    alert(e);
                                }
                                resolve();
                            }, function(err){
                                reject(err);
                            });

                        }, function(err){
                            reject(err);
                        });
                    }, function(err){
                        reject(err);
                    });
                } else{
                    resolve();
                }
            });
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

                    var promises = babies.map(function(baby){
                        return ActivityService.setActivities(baby.uuid, baby.activities).then(function(){
                            delete baby.activities;
                            $localStorage.babies[baby.uuid] = baby;
                            return baby;
                        });
                    });

                    promises.unshift($cordovaFile.createDir(cordova.file.dataDirectory, "babies", false));
                    promises.unshift($cordovaFile.createDir(cordova.file.dataDirectory, "activities", false));

                    return $q.all(promises);
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
                    $q.all([
                        handleFile(data),
                        ActivityService.setActivities(data.uuid, [])
                    ]).then(function(){
                        $localStorage.babies[data.uuid] = data;
                        resolve(data);
                    }, function(){
                        reject();
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

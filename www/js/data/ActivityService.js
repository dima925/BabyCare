angular.module('cleverbaby.data')
    .factory('ActivityService',  ['network', '$localStorage', '$q', '$window', '$sce', function(network, $localStorage, $q, $window, $sce){

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

        function filter(data){
            var newData;
            if(data.type == "diaper"){
                newData = {
                    comment: data.comment,
                    time: data.time,
                    diaper_type: data.diaper_type,
                    diaper_color: data.diaper_color,
                    diaper_texture: data.diaper_texture,
                    diaper_amount: data.diaper_amount,
                    diaper_brand: data.diaper_brand,
                    diaper_leaked: data.diaper_leaked,
                    type: "diaper"
                }
            }
            if(data.type == "pump"){
                newData = {
                    note: data.note,
                    time: data.time,
                    pump_side: data.pump_side,
                    pump_amount: data.pump_amount,
                    pump_startside: data.pump_startside,
                    pump_bottlelabel: data.pump_bottlelabel,
                    type: "pump"
                }
            }
            if(data.type == "play"){
                newData = {
                    comment: data.note,
                    time: data.time,
                    play_comment: data.play_comment,
                    play_location: data.play_location,
                    type: "play"
                }
            }
            if(data.type == "diary"){
                newData = {
                    note: data.note,
                    time: data.time,
                    diary_desc: data.diary_desc,
                    type: "diary"
                }
            }
            if(data.type == "vaccination"){
                newData = {
                    note: data.note,
                    time: data.time,
                    vaccination_type: data.vaccination_type,
                    type: "vaccination"
                }
            }
            if(data.type == "growth"){
                newData = {
                    note: data.note,
                    time: data.time,
                    growth_height: data.growth_height,
                    growth_weight: data.growth_weight,
                    growth_headsize: data.growth_headsize,
                    type: "growth"
                }
            }
            if(data.type == "milestone"){
                newData = {
                    comment: data.comment,
                    time: data.time,
                    milestone_type: data.milestone_type,
                    type: "milestone"
                }
            }
            if(data.type == "sick"){
                newData = {
                    note: data.note,
                    time: data.time,
                    sick_symptom: data.sick_symptom,
                    type: "sick"
                }
            }
            if(data.type == "doctor"){
                newData = {
                    note: data.note,
                    time: data.time,
                    doctor_type: data.doctor_type,
                    doctor_name: data.doctor_name || "No Doctor",
                    type: "doctor"
                }
            }
            if(data.type == "bath"){
                newData = {
                    note: data.note,
                    time: data.time,
                    bath_comment: data.bath_comment,
                    bath_temp: data.bath_temp,
                    type: "bath"
                }
            }
            if(data.type == "medication"){
                newData = {
                    note: data.note,
                    time: data.time,
                    medication_drug: data.medication_drug,
                    medication_drugdesc: data.medication_drugdesc,
                    medication_amountgiven: data.medication_amountgiven,
                    medication_prescriptionamount: data.medication_prescriptionamount,
                    medication_prescriptionunit: data.medication_prescriptionunit,
                    medication_prescriptioninterval: data.medication_prescriptioninterval,
                    type: "medication"
                }
            }
            if(data.type == "temperature"){
                newData = {
                    note: data.note,
                    time: data.time,
                    temperature_reminder: data.temperature_reminder,
                    temperature_temp: data.temperature_temp,
                    type: "temperature"
                }
            }
            if(data.type == "mood"){
                newData = {
                    note: data.note,
                    time: data.time,
                    mood_type: data.mood_type,
                    type: "mood"
                }
            }
            if(data.type == "bottle"){
                newData = {
                    note: data.note,
                    time: data.time,
                    bottle_type: data.bottle_type,
                    bottle_amount: data.bottle_amount,
                    bottle_comment: data.bottle_comment,
                    type: "bottle"
                }
            }
            if(data.type == "todo"){
                newData = {
                    note: data.note,
                    time: data.time,
                    todo_desc: data.todo_desc,
                    type: "todo"
                }
            }
            if(data.type == "nurse"){
                newData = {
                    note: data.note,
                    time: data.time,
                    nurse_timeleft: data.nurse_timeleft,
                    nurse_timeright: data.nurse_timeright,
                    nurse_timeboth: data.nurse_timeboth,
                    nurse_comment: data.nurse_comment,
                    type: "nurse"
                }
            }
            if(data.type == "sleep"){
                newData = {
                    note: data.note,
                    time: data.time,
                    sleep_location: data.sleep_location,
                    sleep_timeend: data.sleep_timeend,
                    sleep_comment: data.sleep_comment,
                    type: "sleep"
                }
            }
            if(data.type == "solid") {
                newData = {
                    note: data.note,
                    time: data.time,
                    solid_foodtype: data.solid_foodtype,
                    type: "solid"
                }
            }
            if(data.type == "allergy"){
                newData = {
                    note: data.note,
                    time: data.time,
                    allergy_source: data.allergy_source,
                    allergy_reaction: data.allergy_reaction,
                    allergy_severity: data.allergy_severity,
                    type: "allergy"
                }
            }
            if(data.type == "moment"){
                newData = {
                    note: data.note,
                    time: data.time,
                    moment_desc: data.moment_desc,
                    moment_daily: data.moment_daily,
                    type: "moment"
                }
            }
            return newData;
        }



        function handleFile(activityUUID, image){
            return $q(function(resolve, reject){
                if(image.imageType == 'new'){
                    $window.resolveLocalFileSystemURL(image.displayImage, function(fileEntry){
                        $window.resolveLocalFileSystemURL(cordova.file.dataDirectory+'/activities', function(dirEntry){
                            fileEntry.moveTo(dirEntry, image.uuid, function(newFileEntry){
                                image.displayImage = $sce.trustAsResourceUrl(newFileEntry.nativeURL) + '?'+Math.random();
                                delete image.imageType;
                                network.upload('/activities/'+ activityUUID + '/media', newFileEntry.nativeURL, generateUniqueId($localStorage.user.id));
                                resolve(image);
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
            addActivity: function(data, babies){
                return $q(function(resolve, reject){

                    var medias = data.media;
                    data = filter(data);
                    data.uuid = generateUniqueId($localStorage.user.id);
                    data.babies = babies;

                    network.post({
                        data: data,
                        url: '/activities'
                    });

                    var promises = [];

                    medias.filter(function(x){
                        return x.imageType == 'new';
                    });

                    medias.forEach(function(media){
                        media.uuid = generateUniqueId($localStorage.user.id);
                    });

                    $q.all(medias.map(function(media){
                        return handleFile(data.uuid, media);
                    })).then(function(){
                        data.media = medias;

                        for(var i=0; i<$localStorage.activities[data.babies].length; ++i){
                            if(data.time>$localStorage.activities[data.babies][i].time){
                                break;
                            }
                        }

                        var middle = [];
                        Array.prototype.push.apply(middle, $localStorage.activities[data.babies].slice(0, i));
                        middle.push(data);
                        Array.prototype.push.apply(middle, $localStorage.activities[data.babies].slice(i, $localStorage.activities[data.babies].length));
                        $localStorage.activities[data.babies] = middle;

                        resolve(data);
                    })
                });
            },
            editActivity: function(uuid, data, babies){
                return $q(function(resolve, reject){

                    var medias = data.media;

                    data = filter(data);
                    data.uuid = uuid;
                    data.babies = babies;

                    network.put({
                        data: data,
                        url: '/activities/'+uuid
                    });


                    var promises = [];

                    medias.forEach(function(media){
                        if(media.imageType == 'new')
                            media.uuid = generateUniqueId($localStorage.user.id);
                    });

                    medias.filter(function(media){
                        if(media.uuid && media.imageType == 'del'){
                            network.delete('/activities/'+data.uuid+'/media/'+media.uuid);
                        }
                        if(media.imageType == 'del'){
                            return false;
                        }
                        return true;
                    });

                    $q.all(medias.map(function(media){

                        if(media.imageType == 'new'){
                            return handleFile(data.uuid, media);
                        } else{
                            return  $q.when();
                        }

                    })).then(function(){
                        data.media = medias;

                        for(var i=0; i<$localStorage.activities[data.babies].length; ++i){
                            if(data.time>$localStorage.activities[data.babies][i].time){
                                break;
                            }
                        }

                        var middle = [];
                        Array.prototype.push.apply(middle, $localStorage.activities[data.babies].slice(0, i));
                        middle.push(data);
                        Array.prototype.push.apply(middle, $localStorage.activities[data.babies].slice(i, $localStorage.activities[data.babies].length));
                        $localStorage.activities[data.babies] = middle;

                        resolve(data);
                    })



                    for(var index = 0; index<$localStorage.activities[data.babies].length; ++index){
                        if($localStorage.activities[data.babies].hasOwnProperty(index)){
                            if($localStorage.activities[data.babies][index].uuid == data.uuid){
                                break;
                            }
                        }
                    }

                    var middle = [];
                    Array.prototype.push.apply(middle, $localStorage.activities[data.babies].slice(0, index));
                    Array.prototype.push.apply(middle, $localStorage.activities[data.babies].slice(index+1, $localStorage.activities[data.babies].length));
                    var activities = middle;

                    for(var i=0; i<activities.length; ++i){
                        if(data.time>activities[i].time){
                            break;
                        }
                    }

                    middle = [];
                    Array.prototype.push.apply(middle, activities.slice(0, i));
                    middle.push(data);
                    Array.prototype.push.apply(middle, activities.slice(i, activities.length));
                    $localStorage.activities[data.babies] = middle;
                    resolve(data);
                });
            },
            getTodayCount: function(babyId){
                return $q(function(resolve, reject){
                    var count = {
                        nurseCount: 0,
                        diaperCount: 0,
                        bathCount: 0,
                        playCount: 0,
                        sleepCount: 0
                    };
                    $localStorage.activities[babyId].forEach(function(activity){
                        /**
                         * checking for today
                         */
                        if( new Date(activity.time).setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0) ){
                            if(activity.type == "nurse"){
                                ++count.nurseCount;
                            } else if(activity.type == "play"){
                                ++count.playCount;
                            } else if(activity.type == "bath"){
                                ++count.bathCount;
                            } else if(activity.type == "diaper"){
                                ++count.diaperCount;
                            } else if(activity.type == "sleep"){
                                ++count.sleepCount;
                            }
                        }
                    });
                    resolve(count);
                });
            },
            getAllActivitiesByBabyId: function(babyId, start, limit){
                return $q(function(resolve, reject){
                    console.log($localStorage.activities);
                    console.log(babyId);
                    console.log($localStorage.activities[babyId]);
                    resolve($localStorage.activities[babyId].slice(start, start+limit).map(function(x){
                        x.time = new Date(x.time);
                        return x;
                    }));
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

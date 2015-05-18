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

    function filter(data){
        var newData;
        if(data.type == "change"){
            newData = {
                comment: data.comment,
                time: data.time,
                diaper_type: data.diaper_type,
                amount_size: data.amount_size,
                color: data.color,
                texture: data.texture,
                type: "change"
            }
        }
        if(data.type == "pump"){
            newData = {
                comment: data.comment,
                time: data.time,
                side: data.side,
                amount: data.amount,
                start_side: data.start_side,
                type: "pump"
            }
        }
        if(data.type == "play"){
            newData = {
                comment: data.comment,
                time: data.time,
                notes: data.notes,
                type: "play"
            }
        }
        if(data.type == "diary"){
            newData = {
                comment: data.comment,
                time: data.time,
                notes: data.notes,
                type: "diary"
            }
        }
        if(data.type == "vaccination"){
            newData = {
                comment: data.comment,
                time: data.time,
                vaccination_type: data.vaccination_type,
                type: "vaccination"
            }
        }
        if(data.type == "growth"){
            newData = {
                comment: data.comment,
                time: data.time,
                height: data.height,
                weight: data.weight,
                head_size: data.head_size,
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
                comment: data.comment,
                time: data.time,
                symptom: data.symptom,
                type: "sick"
            }
        }
        if(data.type == "doctor"){
            newData = {
                comment: data.doctor,
                time: data.time,
                doctor: data.doctor || "No Doctor",
                visit_type: data.visit_type,
                type: "doctor"
            }
        }
        if(data.type == "bath"){
            newData = {
                comment: data.comment,
                time: data.time,
                temp: data.temp,
                notes: data.notes,
                type: "bath"
            }
        }
        if(data.type == "medication"){
            newData = {
                comment: data.comment,
                time: data.time,
                drug: data.drug,
                amount_given: data.amount_given,
                prescription_interval: data.prescription_interval,
                type: "medication"
            }
        }
        if(data.type == "temperature"){
            newData = {
                comment: data.comment,
                time: data.time,
                temp: data.temp,
                reminder: data.reminder,
                type: "temperature"
            }
        }
        if(data.type == "mood"){
            newData = {
                comment: data.comment,
                time: data.time,
                mood_type: data.mood_type,
                type: "mood"
            }
        }
        if(data.type == "bottle"){
            newData = {
                comment: data.comment,
                time: data.time,
                bottle_type: data.bottle_type,
                amount: data.amount,
                notes: data.notes,
                type: "bottle"
            }
        }
        if(data.type == "todo"){
            newData = {
                comment: data.comment,
                time: data.time,
                notes: data.notes,
                type: "todo"
            }
        }
        if(data.type == "nurse"){
            newData = {
                comment: data.comment,
                time: data.time,
                time_left: data.time_left,
                time_right: data.time_right,
                time_both: data.time_both,
                type: "nurse"
            }
        }
        if(data.type == "sleep"){
            newData = {
                comment: data.comment,
                time: data.time,
                time_end: data.time_end,
                location: data.location,
                type: "sleep"
            }
        }
        if(data.type == "solid") {
            newData = {
                comment: data.comment,
                time: data.time,
                food_type: data.food_type,
                type: "solid"
            }
        }
        if(data.type == "allergy"){
            newData = {
                comment: data.comment,
                time: data.time,
                source: data.source,
                reaction: data.reaction,
                severity: data.severity,
                type: "allergy"
            }
        }
        if(data.type == "moment"){
            newData = {
                comment: data.comment,
                time: data.time,
                notes: data.notes,
                type: "moment"
            }
        }
        return newData;
    }

    return {
        addActivity: function(data, babies){
            return $q(function(resolve, reject){

                data = filter(data);
                data.uuid = generateUniqueId($localStorage.user.id);
                data.babies = babies;

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

                network.post({
                    data: data,
                    url: '/activities'
                });
                resolve(data);
            });
        },
        editActivity: function(uuid, data, babies){
            return $q(function(resolve, reject){

                data = filter(data);
                data.uuid = uuid;
                data.babies = babies;

                network.put({
                    data: data,
                    url: '/activities/'+uuid
                });

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
                    changeCount: 0,
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
                        } else if(activity.type == "change"){
                            ++count.changeCount;
                        }
                        else if(activity.type == "sleep"){
                            ++count.sleepCount;
                        }
                    }
                });
                resolve(count);
            });
        },
        getAllActivitiesByBabyId: function(babyId, start, limit){
            return $q(function(resolve, reject){
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

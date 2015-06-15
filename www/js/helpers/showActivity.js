angular
    .module('cleverbaby.helpers')
    .filter('showActivity', function(){
        return function(activity){
            var str = "";

            if(activity.type == 'nurse'){
                if(activity.nurse_timeleft){
                    var l = Number(activity.nurse_timeleft),
                        m = (l - l % 60) / 60,
                        s = l % 60;
                    str += "Left " + (m > 0 ? m + "m " : '') + (s > 0 ? s + "s" : '') + ', ';
                }
                if(activity.nurse_timeright){
                    var r = Number(activity.nurse_timeright),
                        m = (r - r % 60) / 60,
                        s = activity.nurse_timeright % 60;
                    str += "Right " + (m > 0 ? m + "m " : '') + (s > 0 ? s + "s" : '') + ', ';
                }
            }

            if(activity.type == 'bottle'){
                str += "Fed" + " " + (activity.bottle_amount ? activity.bottle_amount + (activity.bottle_amount_unit ? activity.bottle_amount_unit : '') : "")
                + " " + (activity.bottle_type || "");
            }

            if(activity.type == 'diaper'){
                str += (activity.diaper_type || "");
            }

            if(activity.type == 'solid'){
                if(activity.solid_foodtype){
                    str += "Ate " + activity.solid_foodtype;
                }
            }

            if(activity.type == 'pump'){
                if(activity.pump_side){
                    str += activity.pump_side + " ";
                }
                if(activity.pump_amount){
                    str += activity.pump_amount+"oz";
                }
            }

            if(activity.type == 'todo'){
                if(activity.todo_desc){
                    str += activity.todo_desc;
                }
            }

            if(activity.type == 'mood'){
                if(activity.mood_type){
                    str += activity.mood_type;
                }
            }

            if(activity.type == 'play'){
                if(activity.play_comment){
                    str += activity.play_comment;
                }
            }

            if(activity.type == 'bath'){
                if(activity.bath_comment){
                    str += activity.bath_comment;
                } else{
                    str += "Had a bath";
                }
            }

            if(activity.type == 'medication'){
                if(activity.medication_drug){
                    str += "Took ";
                    if(activity.medication_amountgiven){
                        str+=activity.medication_amountgiven+" ";
                    }
                    str += activity.medication_drug;
                }
            }

            if(activity.type == 'diary'){
                if(activity.diary_desc){
                    str += activity.diary_desc;
                }
            }

            if(activity.type == 'milestone'){
                if(activity.milestone_type){
                    str += activity.milestone_type;
                }
            }

            if(activity.type == 'sick'){
                if(activity.sick_symptom){
                    str += activity.sick_symptom;
                }
            }

            if(activity.type == 'doctor'){
                if(activity.doctor_type){
                    str += activity.doctor_type;
                }
            }

            if(activity.type == 'vaccination'){
                if(activity.vaccination_type){
                    str += activity.vaccination_type;
                }
            }

            if(activity.type == 'growth'){
                if(activity.growth_weight){
                    str += activity.growth_weight;
                }
                if(activity.growth_height){
                    str += activity.growth_height;
                }
            }

            if(activity.type == 'sleep'){
                if(activity.sleep_timeslept){
                    str+="Slept for "+activity.sleep_timeslept;
                }
            }

            if(activity.type == 'temperature'){
                if(activity.temperature_temp){
                    str+=activity.temperature_temp+"c";
                }
            }

            if(activity.type == 'allergy'){
                if(activity.source){
                    if( activity.allergy_severity ){
                        str += activity.allergy_severity + " reaction to ";
                    } else{
                        str += "Reaction to";
                    }
                    str += activity.allergy_source;
                }
            }

            if(activity.type == 'moment'){
                if(activity.moment_desc){
                    str += activity.moment_desc;
                }
            }
            return str;
        }
    });

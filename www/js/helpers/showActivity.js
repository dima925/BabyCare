angular
    .module('cleverbaby.helpers')
    .filter('showActivity', function(){
        return function(activity){
            var str = "";

            if(activity.type == 'nurse'){
                if(activity.time_left){
                    str += "Left " + activity.time_left + "m ";
                }
                if(activity.time_right){
                    str += "Right " + activity.time_right + "m";
                }
            }

            if(activity.type == 'bottle'){
                str += "Fed" + " " + (activity.amount? activity.amount + "oz" : "")
                + " " + (activity.bottle_type || "");
            }

            if(activity.type == 'change'){
                str += (activity.diaper_type || "");
            }

            if(activity.type == 'solid'){
                if(activity.food_type){
                    str += "Ate " + activity.food_type;
                }
            }

            if(activity.type == 'pump'){
                if(activity.side){
                    str += activity.side + " ";
                }
                if(activity.amount){
                    str += activity.amount+"oz";
                }
            }

            if(activity.type == 'todo'){
                if(activity.notes){
                    str += activity.notes;
                }
            }

            if(activity.type == 'mood'){
                if(activity.mood_type){
                    str += activity.mood_type;
                }
            }

            if(activity.type == 'play'){
                if(activity.notes){
                    str += activity.notes;
                }
            }

            if(activity.type == 'bath'){
                if(activity.notes){
                    str += activity.notes;
                } else{
                    str += "Had a bath";
                }
            }

            if(activity.type == 'medication'){
                if(activity.drug){
                    str += "Took ";
                    if(activity.amount_given){
                        str+=activity.amount_given+" ";
                    }
                    str += activity.drug;
                }
            }

            if(activity.type == 'diary'){
                if(activity.notes){
                    str += activity.notes;
                }
            }

            if(activity.type == 'milestone'){
                if(activity.milestone_type){
                    str += activity.milestone_type;
                }
            }

            if(activity.type == 'sick'){
                if(activity.symptom){
                    str += activity.symptom;
                }
            }

            if(activity.type == 'doctor'){
                if(activity.visit_type){
                    str += activity.visit_type;
                }
            }

            if(activity.type == 'vaccination'){
                if(activity.vaccination_type){
                    str += activity.vaccination_type;
                }
            }

            if(activity.type == 'growth'){
                if(activity.weight){
                    str += activity.weight;
                }
                if(activity.height){
                    str += activity.height;
                }
            }

            if(activity.type == 'sleep'){
                if(activity.time_slept){
                    str+="Slept for "+activity.time_slept;
                }
            }

            if(activity.type == 'temperature'){
                if(activity.temp){
                    str+=activity.temp+"c";
                }
            }

            if(activity.type == 'allergy'){
                if(activity.source){
                    if( activity.severity ){
                        str += activity.severity + " reaction to ";
                    } else{
                        str += "Reaction to";
                    }
                    str += activity.source;
                }
            }

            if(activity.type == 'moment'){
                if(activity.notes){
                    str += activity.notes;
                }
            }
            return str;
        }
    });

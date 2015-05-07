angular
    .module('cleverbaby.helpers')
    .filter('showActivity', function(){
        var table = {
            'bottle': 'bottle',
            'pump': 'pumping',
            'solid': 'solid',
            'change': 'diapers',
            'sleep': 'sleep',
            'milestone': 'milestone',
            'growth': 'growth',
            'bath': 'bath',
            'play': 'play',
            'doctor': 'doctor',
            'sick': 'sickness',
            'temperature': 'temp',
            'medication': 'medication',
            'vaccination': 'vaccination',
            'allergy': 'alergy',
            'mood': 'mood',
            'moment': 'activity',
            'diary': 'diary',
            'todo': 'todo'
        };
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
            return str;
        }
    });

angular
    .module('cleverbaby.helpers')
    .filter('classOfActivity', function(){
        var table = {
            'nurse': 'nurse',
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
        return function(x){
            return table[x] || "";
        }
    });
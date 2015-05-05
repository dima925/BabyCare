angular
    .module('cleverbaby.helpers')
    .filter('footOfActivity', function(){
        var table = {
            'nurse': 'nurse-foot',
            'bottle': 'bottle-foot',
            'pump': 'pumping-foot',
            'solid': 'solid-foot',
            'change': 'diaper-foot',
            'sleep': 'sleep-foot',
            'milestone': 'milestone-foot',
            'growth': 'growth-foot',
            'bath': 'bath-foot',
            'play': 'play-foot',
            'doctor': 'doctor-foot',
            'sick': 'sickness-foot',
            'temperature': 'temp-foot',
            'medication': 'medication-foot',
            'vaccination': 'vaccination-foot',
            'allergy': 'alergy-foot',
            'mood': 'mood-foot',
            'moment': 'activity-foot',
            'diary': 'diary-foot',
            'todo': 'todo-foot'
        };
        return function(x){
            return table[x] || "";
        }
    });
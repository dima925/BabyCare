angular
    .module('cleverbaby.helpers')
    .directive('background', function(){
        return function(scope, element, attrs){
            scope.$watch(attrs.background, function(url){
                element.css({
                    'background-image': 'url(' + url +')'
                });
            });
        };
    })
    .filter('babyImage', function(){
        return function(x){
            if(typeof cordova == 'undefined'){
                return 'img/baby.png'
            }
            return x || 'img/baby.png';
        }
    });
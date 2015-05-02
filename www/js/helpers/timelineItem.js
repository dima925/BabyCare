angular
    .module('cleverbaby.helpers')
    .directive('timelineDate', function($interval) {
        return function($scope, element, attrs) {
            $scope.$watch(attrs.timelineDate, function(value){
                element.text(moment(value, 'X').fromNow());
                $interval(function(){
                    element.text(moment(++value, 'X').fromNow());
                }, 10000);
            });
        }
    });
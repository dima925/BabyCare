angular
    .module('cleverbaby.helpers')
    .directive('timelineItem', function($interval) {
        return {
            compile: function compile(temaplateElement, templateAttrs) {
                return {
                    pre: function (scope, element, attrs) {
                    },
                    post: function(scope, element, attrs) {
                    }
                }
            },
            priority: 0,
            terminal:false,
            templateUrl: 'templates/timelineItem.html',
            replace: false,
            transclude: false,
            restrict: 'E',
            scope: {
                activity: '='
            },
            controller: function ($scope, $element, $attrs, $transclude, activityModals) {
                $scope.openModal = function(data){
                    activityModals.showModal(data.type, data);
                }
            }

        }
    })
    .directive('timelineDate', function($interval) {
        return function($scope, element, attrs) {
            $scope.$watch(attrs.timelineDate, function(value){
                value =  new Date(value).getTime()/1000;
                element.text(moment(value, 'X').fromNow());
                $interval(function(){
                    element.text(moment(++value, 'X').fromNow());
                }, 10000);
            });
        }
    });

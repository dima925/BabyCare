angular.module('cleverbaby.directives')
    .directive('choosePhoto', ['$ionicActionSheet', function ($ionicActionSheet) {
        return {
            restrict: 'A',
            scope: {
                options: '=choosePhoto'
            },
            controller: function($scope){
                var defaultOptions = {};
                for (var k in defaultOptions){
                    if(typeof ($scope.option[k]) === 'undefined'){
                        $scope.options[k] = defaultOptions[k];
                    }
                }
                $scope.select = function () {
                    $ionicActionSheet.show({
                        buttons:[
                            {text:'<i class="icon ion ion-images"></i>Photo Library'},
                            {text:'<i class="icon ion ion-ios-camera"></i>Take Photo'}
                        ],
                        cancelText:'Cancel',
                        cancel: function(){},
                        buttonClicked:function(index){
                            var selectedType = 'CAMERA';
                            if(index == 0) selectedType = 'SAVEDPHOTOALBUM';
                            $scope.options.success(selectedType);
                            return true;
                        }
                    });
                    return true;
                }                
            },
            link: function ($scope, element) {
                var clickHandler = function(){
                    $scope.select();
                }
                element.unbind('click').bind('click', clickHandler);
            }
        }
    }]);
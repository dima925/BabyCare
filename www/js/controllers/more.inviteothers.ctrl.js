angular.module('cleverbaby.controllers')
    .controller('MoreInviteOthersCtrl', ['$scope', '$localStorage', '$state', '$stateParams', '$rootScope',
        function($scope, $localStorage, $state, $stateParams, $rootScope) {

            $scope.babies = $localStorage.babies;

            $scope.invite = function(type){
                $state.go('app.inviteothers2', {
                    uuid: $scope.selectedBaby.uuid,
                    type: type
                });
            };

            $scope.changeSelectedBaby = function (selectedBaby) {
                $scope.selectedBaby = selectedBaby;
            };

            //$rootScope.allowInviteOthers = $rootScope.allowInviteOthers ? $rootScope.allowInviteOthers : false;
            var firstIndexAchieved = false;
            angular.forEach($scope.babies, function(baby, index){
                if(!firstIndexAchieved){
                    $scope.selectedBaby = baby;
                    firstIndexAchieved = true;
                }
            });
            /*
            $scope.hasBaby = $stateParams.uuid ? true : false;

            if($scope.hasBaby){
                $scope.selectedBaby = $scope.babies[$stateParams.uuid];
                $scope.selectedBabyBday = moment($scope.selectedBaby.birthday).format("Do MMMM YYYY")
                $scope.selectedBabyPin = Math.floor(Math.random() * moment($scope.selectedBaby.birthday));
            }else{
                //todo workaround to get the first index of the object

            }*/
        }
    ]);
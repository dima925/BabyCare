angular.module('cleverbaby.controllers')
    .controller('MoreInviteOthersCtrl', ['$scope', '$localStorage', '$state', '$stateParams', '$rootScope',
        function($scope, $localStorage, $state, $stateParams, $rootScope) {

            $scope.babies = $localStorage.babies;

            $scope.invite = function(allowInviteOthers){
                $rootScope.allowInviteOthers = allowInviteOthers;
                $state.go('app.inviteothers2', { uuid: $scope.selectedBaby.uuid });
            };

            $scope.changeSelectedBaby = function (selectedBaby) {
                $scope.selectedBaby = selectedBaby;
            }

            $rootScope.allowInviteOthers = $rootScope.allowInviteOthers ? $rootScope.allowInviteOthers : false;

            $scope.hasBaby = $stateParams.uuid ? true : false;

            if($scope.hasBaby){
                $scope.selectedBaby = $scope.babies[$stateParams.uuid];
                $scope.selectedBabyBday = moment($scope.selectedBaby.birthday).format("Do MMMM YYYY")
                $scope.selectedBabyPin = Math.floor(Math.random() * moment($scope.selectedBaby.birthday));
            }else{
                //todo workaround to get the first index of the object
                var firstIndexAchieved = false;
                angular.forEach($scope.babies, function(baby, index){
                    if(!firstIndexAchieved){
                        $scope.selectedBaby = baby;
                        firstIndexAchieved = true;
                    }
                })
            }
        }
    ]);

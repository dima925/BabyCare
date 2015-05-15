angular.module('cleverbaby.controllers')
    .controller('MoreCtrl', ['$scope', '$timeout', '$state', '$cordovaSocialSharing', '$cordovaFacebook', '$ionicModal',
        function($scope, $timeout, $state, $cordovaSocialSharing, $cordovaFacebook, $ionicModal) {
            //todo temporary data
            $scope.data = {name: "Roger"};

            var originalData = angular.toJson($scope.data, true);

            $scope.inputDisabled = true;
            /**
             * enables the editing of form
             */
            $scope.activateEdit = function() {
                $scope.inputDisabled = false;
                originalData = angular.toJson($scope.data, true);
            };

            $scope.cancelEdit = function() {
                $scope.inputDisabled = true;
                $scope.data = angular.fromJson(originalData);
            };

            $scope.saveEdit = function() {
                $scope.inputDisabled = true;
            };


            $scope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams){
                    $scope.inputDisabled = true;
                })

            $scope.go = function(state, params) {
                $state.go(state, params);
            };

            $scope.tellFriend = function() {
                var message = '',
                    subject = '',
                    file = '',
                    link = '';

                $cordovaSocialSharing
                    .share(message, subject, file, link) // Share via native share sheet
                    .then(function(result) {
                        // Success!
                    }, function(err) {
                        // An error occured. Show a message to the user
                    });
            };

            $scope.likeUs = function() {
                // some service call here
                $cordovaFacebook.login(["public_profile"])
                    .then(function(success) {

                        /*
                    Open Graph
                    $cordovaFacebook.api("me", ["public_profile"])
                    .then(function(success) {
                        // success
                    }, function(error) {
                        // error
                    });
                */
                        var options = {
                            method: "feed",
                            link: "http://example.com",
                            caption: "Such caption, very feed."
                        };
                        $cordovaFacebook.showDialog(options)
                            .then(function(success) {
                                // success
                            }, function(error) {
                                // error
                            });

                    }, function(error) {
                        // error
                    });
            };

            $ionicModal.fromTemplateUrl('/templates/more/rateus-like.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modalRateusLike = modal;
            });

            $ionicModal.fromTemplateUrl('/templates/more/rateus-rate.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modalRateusRate = modal;
            });

            $ionicModal.fromTemplateUrl('/templates/more/rateus-feedback.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modalRateusFeedback = modal;
            });

            $scope.rateUs = function () {
                $scope.modalRateusLike.show();
            }
        }
    ]);

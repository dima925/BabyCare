angular.module('cleverbaby.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('DiaryCtrl', function ($scope, $rootScope, $ionicModal, $firebase) {



    $scope.noData = true;

    $scope.list = $rootScope.fbData;

    $ionicModal.fromTemplateUrl('templates/newItem.html', function (modal) {
        $scope.newTemplate = modal;
    });

    $ionicModal.fromTemplateUrl('templates/newChoose.html',function(activity){
        $scope.activityModal = activity;
    })
    $scope.newActivity = function(){
        $scope.activityModal.show();
    }
    $scope.newTask = function () {
        $scope.newTemplate.show();
    };

    $scope.deleteItem = function (key) {
        $rootScope.show("Please wait... Deleting from List");
        var itemRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        bucketListRef.child(key).remove(function (error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully deleted');
            }
        });
    };
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {})


.controller('SignUpCtrl', [
    '$scope', '$rootScope', '$firebaseAuth', '$window',
    function ($scope, $rootScope, $firebaseAuth, $window) {
        $scope.user = {
            email: "",
            password: ""
        };
        $scope.createUser = function () {
            var email = this.user.email;
            var password = this.user.password;

            if (!email || !password) {
                $rootScope.notify("Please enter valid credentials");
                return false;
            }

            $rootScope.show('Please wait.. Registering');
            return $rootScope.auth.$createUser(email, password)
                .then(function () {
                    // createUser success
                    console.log("createUser success");

                    $rootScope.hide();

                    return $rootScope.auth.$authWithPassword({
                        "email": email,
                        "password": password
                    }).then(function (authData) {
                        console.log("Logged in as:", authData.uid);
                        $rootScope.userEmail = authData.uid;
                        $rootScope.checkSession();
                        $window.location.href = ('#/app/diary');
                    }).catch(function (error) {
                        console.error("Authentication failed:", error);
                    });

                })

            .catch(function (error) {
                // createUser failed
                console.error("Error: ", error);
                $rootScope.hide();
                if (error.code == 'INVALID_EMAIL') {
                    $rootScope.notify('Invalid Email Address');
                } else if (error.code == 'EMAIL_TAKEN') {
                    $rootScope.notify('Email Address already taken');
                } else {
                    $rootScope.notify('Oops something went wrong. Please try again later');
                }
            });


        }
    }
  ])

.controller('SignInCtrl', [
  '$scope', '$rootScope', 'AuthService', '$window',
  function ($scope, $rootScope, AuthService, $window) {
        // check session
        $rootScope.checkSession();
        $scope.user = {
            email: "",
            password: ""
        };
        $scope.validateUser = function () {
            $rootScope.show('Please wait.. Authenticating');
            var email = this.user.email;
            var password = this.user.password;
            if (!email || !password) {
                $rootScope.notify("Please enter valid credentials");
                return false;
            }
            AuthService.authWithPassword(this.user);
            $rootScope.checkSession();
            $window.location.href = ('#/app/diary');
            
            /*note: deactive because get error on .then*/
                /*.then(function (user) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    $rootScope.checkSession();
                    $window.location.href = ('#/app/diary');
                }, function (error) {
                    $rootScope.hide();
                    if (error.code == 'INVALID_EMAIL') {
                        $rootScope.notify('Invalid Email Address');
                    } else if (error.code == 'INVALID_PASSWORD') {
                        $rootScope.notify('Invalid Password');
                    } else if (error.code == 'INVALID_USER') {
                        $rootScope.notify('Invalid User');
                    } else {
                        $rootScope.notify('Oops something went wrong. Please try again later');
                    }
                });*/
        }
  }
])

.controller('newCtrl', function ($rootScope, $scope, $window, $firebase) {
    $scope.data = {
        item: ""
    };

    $scope.close = function () {
        $scope.modal.hide();
    };

    $scope.createNew = function () {
        var item = this.data.item;

        if (!item) return;

        console.log("itme", item);

        $scope.modal.hide();

        $rootScope.show("Please wait... Creating new");

        var form = {
            item: item,
            isCompleted: false,
            created: Date.now(),
            updated: Date.now()
        };

        $rootScope.fbData.$add(form);


        $rootScope.hide();
    };
})
.controller('activityCtrl', function ($rootScope,$scope,$window,$firebase,activityService,babiesService) {
    $scope.diaper = {
        wet : "",
        solid : ""
    };
    $scope.bottle = {
        min:"1",
        max:"12",
        value:"1"
    }
    $scope.closeActivity = function(){
        $scope.modal.hide();
    }
    /*NURSE ACTVITY*/
    $scope.addNurse = function(breast, length, time) {
        $scope.modal.hide();
        var nurse = {
            type: 'nurse',
            breast: breast == undefined ? 'both' : breast,
            length: length == undefined ? 0 : length,
            time: time == undefined ? Date.now() : time,
            created: Date.now(),
            updated: Date.now(),
            created_by : escapeEmailAddress($rootScope.userEmail),
            updated_by : escapeEmailAddress($rootScope.userEmail),
            timeit : true

        };
        babiesService.getbabiesId().then(function(data){
            var babies = data;
            activityService.save(babies,nurse);
        })
        
    }
    /*END NURSE ACTIVITY*/

    /*DIAPERS ACTIVITY*/
        $scope.addDiapers = function(size,time){
            $scope.modal.hide();
            var wet = this.diaper.wet;
            var solid = this.diaper.solid;
            var cons = ""
            if(wet == true && solid == true){
                cons = "wet and solid";
            }else if(wet==true && solid == false){
                cons = "wet";
            }else if(wet == false && solid == true){
                cons = "solid";
            }
            var diapers = {
                type : 'diaper',
                consistency : cons,
                size : size,
                created: Date.now(),
                updated: Date.now(),
                time: time == undefined ? Date.now() : time,
                created_by : escapeEmailAddress($rootScope.userEmail),
                updated_by : escapeEmailAddress($rootScope.userEmail)
            };
            babiesService.getbabiesId().then(function(data){
                var babies = data;
                activityService.save(babies,diapers);
            })
            
            
        }
    /*END DIAPER ACTIVITY*/
    /*BOTTLE ACTIVITY*/
    $scope.addBottle = function(time){
        $scope.modal.hide();
        var amount = this.bottle.value;
        var bottle = {
            type : "bottle",
            amount : amount,
            created : time == undefined ? Date.now() : time,
            updated : time == undefined ? Date.now() : time,
            created_by : escapeEmailAddress($rootScope.userEmail),
            updated_by : escapeEmailAddress($rootScope.userEmail),
            deleted : false
        }
        babiesService.getbabiesId().then(function(data){
            var babies = data;
            activityService.save(babies,bottle);
        })
    }
    /*END BOTTLE ACTIVITY*/
    /*NAP ACTIVITY*/
        $scope.addNap = function(time){
            $scope.modal.hide();
            var nap = {
                type : 'sleep',
                start : time == undefined ? Date.now() : time,
                end : time == undefined ? Date.now() : time,
                created : time == undefined ? Date.now() : time,
                updated : time == undefined ? Date.now() : time,
                created_by : escapeEmailAddress($rootScope.userEmail),
                updated_by : escapeEmailAddress($rootScope.userEmail),
                deleted : false
            }
            babiesService.getbabiesId().then(function(data){
                var babies = data;
                activityService.save(babies,nap);
            })
        }
    /*END NAP ACTIVITY*/
    
})
function escapeEmailAddress(email) {
    if (!email) return false
        // Replace '.' (not allowed in a Firebase key) with ','
    email = email.toLowerCase();
    email = email.replace(/\./g, ',');
    return email.trim();
};

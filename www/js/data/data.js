angular
    .module('cleverbaby.data', ['ngResource'])
    .constant( 'firebaseConfig',{
        baseUrl: 'https://cleverbaby.firebaseio.com/'
    })
    .constant('dataConfig', {
        //baseUrl: 'http://localhost:3000',
        baseUrl: 'https://arcane-anchorage-7139.herokuapp.com',
        apiVersion: 'v1',
        googleId: '692197579389-1tr4luact0pjjce4r47egob64bgoac51.apps.googleusercontent.com',
        facebookId: '1575754259375108'
    }).factory('network', ['$http', 'dataConfig', '$localStorage', '$interval', function($http, dataConfig, $localStorage, $interval){

        if(!$localStorage.queue) $localStorage.queue = [];

        var isSync = false;

        function makeUrl(url){
            return dataConfig.baseUrl + '/' + dataConfig.apiVersion + url;
        }

        function request(options, now){
            options.url = makeUrl(options.url);
            options.headers = {
                auth_token: $localStorage.token
            };
            if(!now)
                $localStorage.queue.push(options);
            else
                return $http(options);
        }

        function sync(force){
            if(isSync && !force) return;
            isSync = true;
            var options = $localStorage.queue[0];
            if(!options) {
                isSync = false;
                return;
            }
            return $http(options).then(function(response){
                $localStorage.queue.shift();
                return sync(true);
            }, function(err){
                if(err.status == 0){
                    isSync = false;
                } else {
                    return sync();
                }
            });
        }

        $interval(function(){
            sync();
        }, 5000);

        return {
            request: request,
            makeUrl: makeUrl,
            get: function(options, now){
                options.method = 'GET';
                return request(options, now);
            },
            post: function(options, now){
                options.method = 'POST';
                return request(options, now);
            },
            put: function(options, now){
                options.method = 'PUT';
                return request(options, now);
            },
            remove: function(options, now){
                options.method = 'DELETE';
                return request(options, now);
            },
            sync: sync
        };
    }]);

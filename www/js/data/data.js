angular
    .module('cleverbaby.data', ['firebase'])
    .constant( 'firebaseConfig',{
        baseUrl: 'https://cleverbaby.firebaseio.com/'
    })
    .constant('dataConfig', {
        baseUrl: 'http://arcane-anchorage-7139.herokuapp.com',
        apiVersion: 'v1',
        googleId: '692197579389-1tr4luact0pjjce4r47egob64bgoac51.apps.googleusercontent.com',
        facebookId: '1575754259375108'
    }).factory('network', ['$http', 'dataConfig', function($http, dataConfig){
        function makeUrl(url){
            return dataConfig.baseUrl + '/' + dataConfig.apiVersion + url;
        }
        return {
            get: function(options){
                return $http.get(makeUrl(options.url));
            },
            post: function(options){
                return $http.post(makeUrl(options.url), options.data);
            },
            put: function(options){
                return $http.put(makeUrl(options.url), options.data);
            },
            delete: function(options){
                return $http.delete(makeUrl(options.url));
            }
        };
    }]);

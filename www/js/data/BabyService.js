angular.module('cleverbaby.data')
    .factory('BabyService', ['network', '$q', '$resource', function(network, $q, $resource) {
        var babyResource = $resource(network.makeUrl('/babies/:id'),{
            id: '@id'
        });
        return {
            getAllBabies: function () {
                return babyResource.query().$promise;
            }
        };
    }]);
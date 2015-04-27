angular.module('cleverbaby.data')
    .factory('BabyService', ['network', '$q', '$resource', function(network, $q, $resource) {
        var babyResource = $resource(network.makeUrl('/babies/:id'),{
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });
        return {
            getAllBabies: function () {
                return babyResource.query().$promise;
            },
            newBaby: function(data) {
                data = data = {};
                data.born = data.born || new Date();
                return new babyResource(data);
            }
        };
    }]);

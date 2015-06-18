angular.module('cleverbaby')
    .service('ConvertunitService', ["$ionicLoading", "$timeout", "$localStorage", function($ionicLoading, $timeout, $localStorage) {

    	// sturcture
    	// area -> unit -> { normalize, parse}
    	var serviceObject = {};

    	serviceObject.weight = {};
    	serviceObject.weight.kg = {
    		'normalize': function (valueInt, valueFlt) {
                // to grams * 100
                return (valueInt * 1000 + valueFlt * 100) * 100;
            },
            'parse': function (normValue) {
                // back from grams * 100
                var grams = normValue / 100;
                return {
                    valueInt: (grams - (grams % 1000)) / 1000,
                    valueFlt: (grams % 1000) / 100
                }
            }
    	};
    	serviceObject.weight.lb = {
    		'normalize': function (valueInt, valueFlt) {
                // to grams * 100
                // 1lb = 453.59 grams (rounded to 453.60)
                return Number(((Number(valueInt) + Number('0.' + valueFlt)) * 45360).toFixed(0))
            },
            'parse': function (normValue) {
                // back from grams * 100
                var lb = normValue / 45360;
                return {
                    valueInt: lb - lb % 1,
                    valueFlt: Number(lb % 1).toFixed(1) * 10
                };
            }
    	};


    	return serviceObject;
    }]);
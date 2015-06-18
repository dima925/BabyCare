angular.module('cleverbaby')
    .service('ConvertunitService', ["$ionicLoading", "$timeout", "$localStorage", function($ionicLoading, $timeout, $localStorage) {

    	// sturcture
    	// area -> unit -> { normalize, parse}
    	var serviceObject = {};
    	var normalizer = 1000;

    	// WEIGHT
    	serviceObject.weight = {};
    	serviceObject.weight.kg = {
    		'normalize': function (valueInt, valueFlt) {
                // to grams * normalizer
                return (valueInt * 1000 + valueFlt * 10) * normalizer;
            },
            'parse': function (normValue) {
                // back from grams * normalizer
                var grams = normValue / normalizer;
                return {
                    valueInt: (grams - (grams % 1000)) / 1000,
                    valueFlt: (grams % 1000) / 10
                }
            }
    	};
    	serviceObject.weight.lb = {
    		'normalize': function (valueInt, valueFlt) {
                // to grams * normalizer
                // 1lb = 453.59 grams (rounded to 453.60)
                return Number(((Number(valueInt) + Number('0.' + valueFlt)) * 453.6 * normalizer).toFixed(0))
            },
            'parse': function (normValue) {
                // back from grams * normalizer
                var lb = normValue / (453.6 * normalizer);
                return {
                    valueInt: (lb - (lb % 1)),
                    valueFlt: Number(lb % 1).toFixed(2) * 100
                };
            }
    	};

    	serviceObject.height = {};
    	serviceObject.height.cm = {
    		'normalize': function (valueInt, valueFlt) {
                // to mm * normalizer
                return (Number(valueInt) + Number('0.' + valueFlt)) * normalizer;
            },
            'parse': function (normValue) {
                // back from mm * 100
                var mm = normValue / normalizer;
                return {
                    valueInt: (mm - (mm % 1)),
                    valueFlt: Number(mm % 10).toFixed(1) * 10
                }
            }
    	};
    	serviceObject.height.inch = {
    		'normalize': function (valueInt, valueFlt) {
                // to mm * normalizer
                // 1 inch = 25.4 mm
                return Number(((Number(valueInt) + Number('0.' + valueFlt)) * 25.4 * normalizer).toFixed(0))
            },
            'parse': function (normValue) {
                // back from mm * normalizer
                var mm = normValue / (25.4 * normalizer);
                return {
                    valueInt: (mm - (mm % 1)),
                    valueFlt: Number(mm % 1).toFixed(1) * 10
                };
            }
    	}
		
		// Volume is one scroller selection
    	serviceObject.volume = {};
    	serviceObject.volume.ml = {
    		'normalize': function (value) {
                // to ml * normalizer
                return value * normalizer;
            },
            'parse': function (normValue) {
                // back from ml * normalizer
                var v = normValue / normalizer;
                return v;
            }
    	};
    	serviceObject.volume.oz = {
    		'normalize': function (value) {
                // to ml * normalizer
                return value * 29.6 * normalizer;
            },
            'parse': function (normValue) {
                // back from ml * normalizer
                var v = normValue / (29.6 * normalizer),
                	aprx = v.toFixed(1);

            	// allow 0.5 precision
            	var vInt = aprx - aprx % 1,
            		vFlt = (aprx % 1) * 10;

        		if(0 < vFlt && vFlt < 5)
        			vFlt = 0;
        		else if(5 < vFlt && vFlt < 10) {
        			vFlt = 0;
        			vInt ++;
        		}

                return (Number(vInt) + Number('0.' + valueFlt));
            }
    	};

    	serviceObject.temperature = {};
    	serviceObject.temperature.c = {
    		'normalize': function (valueInt, valueFlt) {
    			// to F * normalizer
    			return ((Number(valueInt) + Number('0.' + valueFlt)) * 1.8 + 32) * normalizer;
    		},
    		'parse': function (normValue) {
    			// back from C * normalizer
    			var val = normValue / normalizer,
    				c = (val - 32) / 1.8;
				return {
					valueInt: (c - c % 1),
					valueFlt: Number(c % 1).toFixed(1) * 10
				}
    		}
    	};
    	serviceObject.temperature.f = {
    		'normalize': function (valueInt, valueFlt) {
    			// multiply normalizer
    			return (Number(valueInt) + Number('0.' + valueFlt)) * normalizer;
    		},
    		'parse': function (normValue) {
    			// back from normalizer
                var f = normValue / normalizer;
                return {
                    valueInt: (f - (f % 1)),
                    valueFlt: Number(f % 1).toFixed(1) * 10
                }
    		}
    	}

    	return serviceObject;
    }]);
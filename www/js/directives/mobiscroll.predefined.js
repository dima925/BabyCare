/*

"notes": "None|Burped|BurpedAndSpitUp|SpitUp",

// Bottle
"bottle_type": "formula|breastmilk|milk|water|juice",

// Pumped
"side": "left|right|both",
"start_side": "left|right",

// Solid Feed
"food_type": "cereal|mash|others",

// Sleep
"location: bassinet,bed,crib,stroller,swing,withmommy,carseat,other,User Defined"

//Milestone
"milestone_type": "firstsmile|firstwalk", // this will be along list, need to structure better

// Bath
"notes": "bubblebath|shower",

// Playtime
"notes": "tummytime|crawling|crusing|storytime|tvtime|others",
"location": "ourbed|outdoors|others",

//Doctor
type of appointment: Checkup, Sick Visit, Therapy, Vaccine, Follow Up, User Defined

// Sick
symptom: Fever, Cough, User Defined

// Allergy
source: Egg, Fish, Milk, Peanut, Shellfish, Soybean, Tree Nut, Wheat, User Defined
reaction: Safe, Rash, Not Sure, User Defined
severity: None, Mild, Moderate, Severe, Very Severe

// Mood
type: Sad, Ok, Happy, User Defined*/

var MODE_LIST = "list",
	MODE_URL = "url",
	MODE_PREDEFINED = "predefined";

angular.module('cleverbaby.directives')
    .directive('mobiscrollPredefined', ['$timeout', '$sce', function($timeout, $sce) {

    	var predefinedData = {
    		'bottle_type': [{
    			'value': 'formula',
    			'text': 'Formula',
    		}, {
    			'value': 'breastmilk',
    			'text': 'Breastmilk',
    		}, {
    			'value': 'milk',
    			'text': 'Milk',
    		}, {
    			'value': 'water',
    			'text': 'Water',
    		}, {
    			'value': 'juice',
    			'text': 'Juice',
    		}]
    	};

        return {
            restrict: 'EA',
            scope: {
                'mobiscrollModel': '=',
                'mobiscrollMode': '@',
                'mobiscrollList': '=',
                'mobiscrollUrl': '=',
                'mobiscrollPredefined': '@' 
            },
            template: function(element, attrs) {
                var usrClasses = angular.isDefined(attrs['class-child']) ? attrs['class-child'] : '';
                var usrStyles = angular.isDefined(attrs['style-child']) ? attrs['style-child'] : '';

                return '<input type="text" class="mobiscroll-input ' + usrClasses + '" style="' + usrStyles + '" readonly="readonly"/>';
            },
            link: function(scope, element, attrs) {

            	var mode = angular.isDefined(scope.mobiscrollMode) ? scope.mobiscrollMode : MODE_PREDEFINED,
            		data = {};
        		
            	if(mode == MODE_PREDEFINED) {
            		// get data from source
            		var cat = scope.mobiscrollPredefined ? scope.mobiscrollPredefined : 'bottle_type';
            		data = predefinedData[cat] ? predefinedData[cat] : {};
            	} else if(mode == MODE_URL) {
            		// get data from source
            	} else if(mode == MODE_LIST) {
            		// get data from source
            		// set watch on data changes
            	}

            	var jInput = $(element).find('.mobiscroll-input')

            	jInput.mobiscroll().select({
                    theme: 'ios',
                    display: 'bottom',
                    minWidth: 200,
                    label: '',
                    data: data,
                    onSelect: function(valueText, inst) {
                    }
                });

        		jInput.on('change', function (event) {
    				// update model
    				scope.mobiscrollModel = jInput.val();
    				scope.$apply();
        		});

            	scope.$watch('mobiscrollModel', function (newModel, oldModel) {
            		// external change occured
            		jInput.mobiscroll('setVal', newModel, true, false);
            	});

            	if(angular.isUndefined(scope.mobiscrollModel)) {
					scope.mobiscrollModel = data[0].value;
        		}
            }
        };
    }]);

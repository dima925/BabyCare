angular.module('cleverbaby.directives')
    .directive('mobiscrollWeight', ['$timeout', '$sce', 'MeasureunitService', '$localStorage',
        function($timeout, $sce, MeasureunitService, $localStorage) {

            return {
                restrict: 'A',
                scope: {
                    'mobiscrollModelValue': '=',
                    'mobiscrollModelUnit': '=',
                    'mobiscrollId': '@',
                    'mobiscrollMode': '@',
                },
                template: function(element, attrs) {
                    var usrClasses = angular.isDefined(attrs['class-child']) ? attrs['class-child'] : '',
                        usrStyles = angular.isDefined(attrs['style-child']) ? attrs['style-child'] : '',
                        usrPlaceholder = angular.isDefined(attrs['placeholder']) ? attrs['placeholder'] : '';

                    return '<input type="text" class="mobiscroll-input ' + usrClasses + '" style="' + usrStyles + ' background-color: transparent;" placeholder="' + usrPlaceholder + '" readonly="readonly" /><input type="text" class="mobiscroll-hidden" readonly="readonly" />';
                },

                link: function(scope, element, attrs) {

                    var jInput = $(element).find('.mobiscroll-input'),
                        jHidden = $(element).find('.mobiscroll-hidden'),
                        mode = angular.isDefined(scope.mobiscrollMode) ? scope.mobiscrollMode : 'volume',
                        cat = angular.isDefined(attrs['cat']) ? attrs['cat'] : 0,  // ml or L
                        measure = MeasureunitService.getSettings()[mode],
                        units = measure.units[cat],
                        systemUnit = measure.units[cat][measure.value],
                        isApple = ionic.Platform.isWebView() && (ionic.Platform.isIPad() || ionic.Platform.isIOS());

                    function getRange (min, max, step) {
                        var list = [];
                        for (var v = min; v <= max; v += step)
                            list.push(v);
                        return list;
                    }

                    function getFriendlyValue (value) {
                        var valObj = {};
                        if (typeof value == 'string') {
                            if (value == '')
                                return "";
                            valObj = JSON.parse(value);
                        }
                        return valObj.valueInt + '.' + valObj.valueFlt + ' ' + valObj.unit;
                    }

                    function getLastInputValueInt () {
                        if( typeof $localStorage.inputHistory == 'undefined' ||
                            typeof $localStorage.inputHistory[mode] == 'undefined' ||
                            typeof $localStorage.inputHistory[mode]['mb_' + scope.mobiscrollId] == 'undefined' ||
                            typeof $localStorage.inputHistory[mode]['mb_' + scope.mobiscrollId].valueInt == 'undefined')
                            return null;
                        return $localStorage.inputHistory[mode]['mb_' + scope.mobiscrollId].valueInt;
                    }

                    function getLastInputValueFlt () {
                        if( typeof $localStorage.inputHistory == 'undefined' ||
                            typeof $localStorage.inputHistory[mode] == 'undefined' ||
                            typeof $localStorage.inputHistory[mode]['mb_' + scope.mobiscrollId] == 'undefined' ||
                            typeof $localStorage.inputHistory[mode]['mb_' + scope.mobiscrollId].valueFlt == 'undefined')
                            return null;
                        return $localStorage.inputHistory[mode]['mb_' + scope.mobiscrollId].valueFlt;
                    }

                    function getLastInputUnit () {
                        if( typeof $localStorage.inputHistory == 'undefined' ||
                            typeof $localStorage.inputHistory[mode] == 'undefined' ||
                            typeof $localStorage.inputHistory[mode]['mb_' + scope.mobiscrollId] == 'undefined' ||
                            typeof $localStorage.inputHistory[mode]['mb_' + scope.mobiscrollId].unit == 'undefined')
                            return null;
                        return $localStorage.inputHistory[mode]['mb_' + scope.mobiscrollId].unit;
                    }

                    function setLastInput (valueInt, valueFlt, unit) {
                        if(!$localStorage.inputHistory)
                            $localStorage.inputHistory = {};
                        if(!$localStorage.inputHistory[mode])
                            $localStorage.inputHistory[mode] = {};

                        $localStorage.inputHistory[mode]['mb_' + scope.mobiscrollId] = {
                            valueInt: valueInt,
                            valueFlt: valueFlt,
                            unit: unit
                        }
                    }

                    function getDefaults () {
                        var lastValInt = getLastInputValueInt(),
                            lastValFlt = getLastInputValueFlt(),
                            lastUnit = getLastInputUnit();

                        var valObj = {
                            valueInt: lastValInt ? lastValInt : 0,
                            valueFlt: lastValFlt ? lastValFlt : 0,
                            unit: lastUnit ? lastUnit : systemUnit
                        }
                        return valObj;
                    }

                    var defSetup = {
                        'weight': {
                            'kg': {
                                'intRange': getRange(1, 30, 1),
                                'fltRange': getRange(0, 9, 1),
                            },
                            'lb': {
                                'intRange': getRange(1, 70, 1),
                                'fltRange': getRange(0, 9, 1),
                            },
                        }
                    }

                    var prevUnit = '',
                        wheel = [
                            [{
                                label: '',
                                values: defSetup[mode][getDefaults().unit].intRange
                            }, {
                                label: '',
                                values: defSetup[mode][getDefaults().unit].fltRange
                            }, {
                                label: 'Unit',
                                values: units
                            }]
                        ];

                    jHidden.mobiscroll().scroller({
                        theme: isApple ? 'ios' : 'android-holo-light',
                        display: 'bottom',
                        wheels: wheel,
                        headerText: '',
                        validate: function(html, index, time, dir, inst) {
                            var currUnit = inst._tempWheelArray[2];
                            if (typeof currUnit == 'undefined')
                                currUnit = getDefaults().unit;

                            if (index == 2 && currUnit != prevUnit) {
                                decs = defSetup[mode][currUnit].intRange;
                                flts = defSetup[mode][currUnit].fltRange;

                                wheel[0][0].values = decs;
                                wheel[0][1].values = flts;

                                inst.settings.wheels = wheel;
                                inst.changeWheel([0, 1]);
                                prevUnit = currUnit;
                            }
                        },
                        parseValue: function(val) {
                            if (val !== '') {
                                var valObj = JSON.parse(val);
                                if ((typeof valObj === "object") && (valObj !== null)) {
                                    return [valObj['valueInt'], valObj['valueFlt'], valObj['unit']];
                                }
                            }
                            return [getDefaults().valueInt, getDefaults().valueFlt, getDefaults().unit];
                        },
                        formatValue: function(data) {
                            var valObj = {
                                'valueInt': data[0],
                                'valueFlt': data[1],
                                'unit': data[2],
                            };
                            return JSON.stringify(valObj);
                        },
                        onSelect: function(valueText, inst) {
                            if(valueText == '')
                                return;

                            var valObj = JSON.parse(valueText);
                            setLastInput(valObj.valueInt, valObj.valueFlt, valObj.unit)
                        }
                    });
    
                    scope.currentObj = {
                        valueInt: null,
                        valueFlt: null,
                        unit: null
                    };

                    // redirect clicks
                    jInput.click(function() {
                        jHidden.trigger('click');
                    });

                    // update interface changes > update visible input & ng-model
                    jHidden.on('change', function(event) {
                        jInput.val(getFriendlyValue(event.target.value));

                        if (event.target.value && event.target.value !== '') {
                            var valObj = JSON.parse(event.target.value);

                            $timeout(function () {
                                scope.mobiscrollModelValue = valObj.valueInt * 1000 + valObj.valueFlt * 100;
                                scope.mobiscrollModelUnit = valObj.unit;    
                            });
                        }
                    });

                    // model changes > update visible and mobi
                    scope.$watch('mobiscrollModelValue', function(newValue, oldValue) {
                        if (typeof newValue == 'undefined') {
                            newValue = getDefaults().value;
                        }

                        if (newValue === oldValue)
                            return;

                        var valObj = {
                            valueInt: (newValue - (newValue % 1000)) / 1000,
                            valueFlt: Number((newValue % 1000) / 100).toFixed(),
                            unit: scope.currentObj.unit ? scope.currentObj.unit : getDefaults().unit
                        };

                        jHidden.mobiscroll('setVal', JSON.stringify(valObj), true, true);
                    });

                    // model changes > update visible and mobi
                    scope.$watch('mobiscrollModelUnit', function(newUnit, oldUnit) {
                        if (typeof newUnit == 'undefined') {
                            newUnit = getDefaults().unit;
                        }

                        if (newUnit == oldUnit)
                            return;

                        var valObj = {
                            valueInt: scope.currentObj.valueInt? scope.currentObj.valueInt : getDefaults().valueInt,
                            valueFlt: scope.currentObj.valueFlt? scope.currentObj.valueFlt : getDefaults().valueFlt,
                            unit: newUnit
                        };

                        jHidden.mobiscroll('setVal', JSON.stringify(valObj), true, true);
                    });
                }
            }
        }
    ]);

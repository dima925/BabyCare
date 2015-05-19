angular.module('cleverbaby.directives')
    .directive('mobiscrollDatetime', ['$timeout', '$sce', function($timeout, $sce) {

        return {
            restrict: 'EA',
            require: "?ngModel",
            scope: {
                'mobiscrollModel': '=',
            },
            template: function(element, attrs) {
                var usrClasses = angular.isDefined(attrs['class-child']) ? attrs['class-child'] : '';
                var usrStyles = angular.isDefined(attrs['style-child']) ? attrs['style-child'] : '';

                // WebView for in browser testing
                var isApple = ionic.Platform.isWebView() && (ionic.Platform.isIPad() || ionic.Platform.isIOS());

                if (isApple)
                    return '<input type="datetime-local" ng-model="appleDateModel" class="mobiscroll-input ' + usrClasses + '" style="' + usrStyles + '" />';

                // if android
                return '<input type="text" class="mobiscroll-input ' + usrClasses + '" style="' + usrStyles + ' background-color: transparent;" readonly="readonly" /><input type="hidden" class="mobiscroll-hidden" readonly="readonly" />';
            },

            link: function(scope, element, attrs, ngModel) {

            	// APPLE 
                var isApple = ionic.Platform.isWebView() && (ionic.Platform.isIPad() || ionic.Platform.isIOS());
                if (isApple) {

                    jDateLocal = $(element).find('.mobiscroll-input');

                    // user change
                    scope.$watch('appleDateModel', function (newDateTime, oldDatetime) {
                        scope.mobiscrollModel = newDateTime;
                    });

                    // model change
                    scope.$watch('mobiscrollModel', function (newDateTime, oldDatetime) {
                        if(typeof newDateTime == 'undefined')
                            newDateTime = new Date();
                        scope.appleDateModel = newDateTime;
                    });
                    return;
                }

                // ANDROID

                // format calendar date-time
                moment.locale('en', {
                    calendar: {
                        lastDay: '[Yesterday at] LT ',
                        sameDay: '[Today at] LT',
                        nextDay: '[Tomorrow at] LT',
                        lastWeek: '[last] dddd [at] LT',
                        nextWeek: 'dddd [at] LT',
                        sameElse: 'LLL'
                    }
                });

                moment.locale('en');

                // init mobiscroll
                $(element).find('.mobiscroll-hidden').mobiscroll().datetime({
                    theme: 'ios', // Specify theme like: theme: 'ios' or omit setting to use default 
                    mode: 'scroller', // Specify scroller mode like: mode: 'mixed' or omit setting to use default 
                    display: 'bottom', // Specify display mode like: display: 'bottom' or omit setting to use default 
                    lang: 'en', // Specify language like: lang: 'pl' or omit setting to use default
                });

                // redirect clicks
                $(element).find('.mobiscroll-input').click(function() {
                    $(element).find('.mobiscroll-hidden').trigger('click');
                })

                // model changes > update visible & mobi
                scope.$watch('mobiscrollModel', function (newDateTime, oldDatetime) {
                    if(typeof newDateTime == 'undefined')
                        newDateTime = new Date();
                    
                    $(element).find('.mobiscroll-input').val(moment(newDateTime).calendar());
                    $(element).find('.mobiscroll-hidden').mobiscroll('setVal', newDateTime, true, false);
                });

                // interface changes > update visible input & ng-model
                $(element).find('.mobiscroll-hidden').on('change', function(event) {
                    
                    $(element).find('.mobiscroll-input').val(moment(event.target.value, "MM/DD/YYYY hh:mm A").calendar());
                    scope.$apply(function () {
                        scope.mobiscrollModel = moment(event.target.value, "MM/DD/YYYY hh:mm A").toDate();    
                    });
                });
            }
        }
    }]);

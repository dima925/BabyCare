angular.module('cleverbaby.directives')
    .directive('mobiscrollDatetime', ['$timeout', '$sce', function($timeout, $sce) {

        return {
            restrict: 'EA',
            require: "?ngModel",
            template: function(element, attrs) {
                var usrClasses = angular.isDefined(attrs['class-child']) ? attrs['class-child'] : '';
                var usrStyles = angular.isDefined(attrs['style-child']) ? attrs['style-child'] : '';

                // WebView for in browser testing
                var isApple = ionic.Platform.isWebView() && (ionic.Platform.isIPad() || ionic.Platform.isIOS());

                if (isApple)
                    return '<input type="datetime-local" ng-model="' + attrs['ngModel'] + '" class="mobiscroll-input ' + usrClasses + '" style="' + usrStyles + '" />';

                // if android
                return '<input type="text" class="mobiscroll-input ' + usrClasses + '" style="' + usrStyles + ' background-color: transparent;" readonly="readonly" /><input type="hidden" class="mobiscroll-hidden" readonly="readonly" />';
            },

            link: function(scope, element, attrs, ngModel) {

            	// APPLE 
                var isApple = ionic.Platform.isWebView() && (ionic.Platform.isIPad() || ionic.Platform.isIOS());
                if (isApple) {
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

                // redirect clicks
                $(element).find('.mobiscroll-input').click(function() {
                    $(element).find('.mobiscroll-hidden').trigger('click');
                })

                // init mobiscroll
                $(element).find('.mobiscroll-hidden').mobiscroll().datetime({
                    theme: 'ios', // Specify theme like: theme: 'ios' or omit setting to use default 
                    mode: 'scroller', // Specify scroller mode like: mode: 'mixed' or omit setting to use default 
                    display: 'bottom', // Specify display mode like: display: 'bottom' or omit setting to use default 
                    lang: 'en', // Specify language like: lang: 'pl' or omit setting to use default
                });

                // update interface changes > update visible input & ng-model
                $(element).find('.mobiscroll-hidden').on('change', function(event) {

                    $(element).find('.mobiscroll-input').val(moment(event.target.value).calendar());

                    if (ngModel)
                        ngModel.$setViewValue(moment(event.target.value).format('DD/MM/YYYY  hh:mm A'));
                });

                if (!ngModel) return; // do nothing if no ng-model

                // init value
                $(element).find('.mobiscroll-input').val(moment().calendar());
                $(element).find('.mobiscroll-hidden').val(moment().calendar());

                // ng-model changes > update mobiscroll
                ngModel.$render = function() {
                    var newDateTime = $sce.getTrustedHtml(ngModel.$viewValue || '');
                    $(element).find('.mobiscroll-input').val(moment(newDateTime, 'DD/MM/YYYY  hh:mm A').calendar());
                    $(element).find('.mobiscroll-hidden').mobiscroll('setVal', new Date(moment(newDateTime, 'DD/MM/YYYY  hh:mm A').valueOf()), true, false);
                };

                // init ng-model value
                ngModel.$setViewValue(moment().format('DD/MM/YYYY  hh:mm A'));

            }
        }
    }]);

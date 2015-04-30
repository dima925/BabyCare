/**
 * Created by Kevin on 29/04/2015.
 */

angular.module('cleverbaby.data')
    .factory('DailytipService', ['$filter', '$http', '$localStorage', '$q', '$translate', function($filter, $http, $localStorage, $q, $translate) {
        /**
         * Returns the json file
         * This is also used for the dynamic changing of the language used
         * @param language - eg. 'fr', 'en', 'dn'
         * @returns {*|Object|promise} the json data of translated word(s)
         */
        function getTranslatedDataDailyTip(language) {
            return $http.get('languages/dailytips/' + language + '.json', {
                cache: true
            });
        }

        /**
         * Returns a random picked from the dailytips json file basing on the current childs age and gender
         * not the same from the last daily tip
         */
        function getTranslatedDailyTip(activeBaby) {
            var deferred = $q.defer();
            getTranslatedDataDailyTip(getActiveLanguage())
                .then(function(result) {
                    var dailyTips = $filter('filter')(result.data, function(value, index){
                        var matchGender = value.gender == activeBaby.gender || value.gender == 'a';
                        var babyAgeDays = moment(new Date()).diff(moment(activeBaby.birthday), 'days');
                        if(value.fromAge <= babyAgeDays && value.toAge >= babyAgeDays){
                          return matchGender;
                        }
                    });

                    var validDailyTip;
                    var lastDailyTip = getLastDailyTip();
                    if(!lastDailyTip) {
                        validDailyTip = dailyTips[0];
                    }else{
                        var x = true;
                        while(x){
                            var randomnumber = Math.floor(Math.random() * ((dailyTips.length - 1) - 0 + 1)) + 0;
                            if (dailyTips[randomnumber] != lastDailyTip){
                                validDailyTip = dailyTips[randomnumber];
                                x = false;
                            }
                        }
                    }
                    saveCurrentDailyTip(validDailyTip);
                    deferred.resolve(validDailyTip)
                }).
                catch(function (error) {
                   deferred.reject(error);
                });
            return deferred.promise;
        }

        function getLastDailyTip() {
            return $localStorage.lastDailyTip;
        }

        function saveCurrentDailyTip(dailyTip) {
            $localStorage.lastDailyTip = dailyTip;
        }

        /**
         * Gets the language used by the app.
         * @returns {String} Something like 'fr', 'en', ...
         */
        function getActiveLanguage() {
            return $translate.use();
        }

        /**
         * Saves time of daily tip was hidden.
         */
        function saveLastHideDailyTip() {
            $localStorage.lastHideDailyTip = parseInt(moment(new Date()).format("x"));
        }

        /**
         * Computes the last time the daily tip was hidden, if more than 0 the dailytips is to be shown again
         * @returns {boolean}
         */
        function showDailtyTip() {
            if(!$localStorage.lastHideDailyTip){
                return true;
            }
            moment.locale('en');
            var now = moment(new Date());
            var lastHideDailyTip = moment($localStorage.lastHideDailyTip);
            var dayDifference = now.diff(lastHideDailyTip, 'days'); // "a day ago"
            return dayDifference > 0;
        }

        return {
            getTranslatedDailyTip: getTranslatedDailyTip,
            saveLastHideDailyTip: saveLastHideDailyTip,
            showDailtyTip: showDailtyTip
        }
    }]);

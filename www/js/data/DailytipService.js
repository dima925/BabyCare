/**
 * Created by Kevin on 29/04/2015.
 */

angular.module('cleverbaby.data')
    .factory('DailytipService', ['$http', '$localStorage', '$q', '$translate', function($http, $localStorage, $q, $translate) {
        /**
         * Returns the json file
         * This is also used for the dynamic changing of the language used
         * @param language - eg. 'fr', 'en', 'dn'
         * @returns {*|Object|promise} the json data of translated word(s)
         */
        function getTranslatedDataDailyTip(language) {
            return $http.get('languages/dailytip/' + language + '.json', {
                cache: true
            });
        }

        /**
         * Returns a random picked from the dailytip json file basing on the current childs age and gender
         * not the same from the last daily tip
         */
        function getTranslatedDailyTip(activeBaby) {
            var deferred = $q.defer();
            var dailyTips = [];

            getTranslatedDataDailyTip(getActiveLanguage())
                .then(function(result) {
                    dailyTips = result.data;
                    //getLastDailyTip();
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
         * Computes the last time the daily tip was hidden, if more than 0 the dailytip is to be shown again
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

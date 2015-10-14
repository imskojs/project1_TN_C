// Input
// vm.openingHours = [{start: "07:00", end: "20:20"}, ..., {start: "08:00", end: "18:00"} ]

// Usage
// div{vm.openingHours | groupByOpeningHours}

// Output
// ["월~목 07:00 ~ 20:20", "금~토 08:00 ~ 16:00", "일요일 휴무"]

(function () {
    'use strict';

    angular.module('app')
        .filter('newlines', newlines);

    newlines.$inject = [];

    function newlines(_) {
        return function (text) {

            if (text) {
                return text.replace(/\n/g, '<br>');
            }
            else
                return '';
        };
    }

})();

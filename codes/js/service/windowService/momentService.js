(function() {
    'use strict';

    angular.module('app')
        .factory('moment', moment);

    moment.$inject = ['$window'];

    function moment($window) {

        if ($window.moment) {
            return $window.moment;
        }
        return;
    }
})();

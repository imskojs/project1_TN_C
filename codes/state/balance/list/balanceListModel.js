(function() {
    'use strict';
    angular.module('app')
        .factory('BalanceListModel', BalanceListModel);

    function BalanceListModel() {

        var model = {
            current: {}
        };
        return model;
    }
})();

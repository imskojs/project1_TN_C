(function() {
    'use strict';

    angular.module('app')
        .controller('BalanceListController', BalanceListController);

    BalanceListController.$inject = ['BalanceListModel'];

    function BalanceListController(BalanceListModel) {

        var BalanceList = this;

        BalanceList.places = BalanceListModel.places;

    }

})();
(function() {
    'use strict';

    myApp
        .controller('BalanceListController', BalanceListController);

    BalanceListController.$inject = ['BalanceListModel'];

    function BalanceListController(BalanceListModel) {

        var BalanceList = this;

        BalanceList.places = BalanceListModel.places;

    }

})();

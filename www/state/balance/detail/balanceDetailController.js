(function() {
    'use strict';

    myApp
        .controller('BalanceDetailController', BalanceDetailController);

    BalanceDetailController.$inject = ['BalanceDetailModel'];

    function BalanceDetailController(BalanceDetailModel) {

        var BalanceDetail = this;
        BalanceDetail.Model = BalanceDetailModel;

    }

})();

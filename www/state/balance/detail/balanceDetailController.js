(function() {
    'use strict';

    angular.module('app')
        .controller('BalanceDetailController', BalanceDetailController);

    BalanceDetailController.$inject = ['BalanceDetailModel'];

    function BalanceDetailController(BalanceDetailModel) {

        var BalanceDetail = this;
        BalanceDetail.Model = BalanceDetailModel;

    }

})();
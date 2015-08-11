(function() {
    'use strict';
    angular.module('app')
        .controller('BalanceController', BalanceController)

    BalanceController.$inject = ['BalanceModel'];

    function BalanceController(BalanceModel) {

        var Balance = this;
        Balance.Model = BalanceModel;


        //------------------------
        //  IMPLEMENTATIONS
        //------------------------
    }
})();

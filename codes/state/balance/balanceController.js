(function () {
    'use strict';
    angular.module('app')
        .controller('BalanceController', BalanceController);

    BalanceController.$inject = ['BalanceService', 'Message'];

    function BalanceController(BalanceService, Message) {

        //------------------------
        //  Initialisation
        //------------------------

        var Balance = this;
        getMyRoyaltyPoints();

        //------------------------
        //  Interface
        //------------------------

        Balance.getMyRoyaltyPoints = getMyRoyaltyPoints;


        //------------------------
        //  Implementation
        //------------------------


        function getMyRoyaltyPoints() {
            Message.loading.default();

            var balancePromise = BalanceService.getMyRoyaltyPoints();

            balancePromise.then(function (data) {
                Balance.balanceList = data.royaltyPoints;

                Message.loading.hide();
            });

            balancePromise.catch(function (data) {
                console.log(data);
                Message.loading.hide();
                Message.popUp.alert.default(
                    '네일샵 적립금 알림',
                    data.message
                );
            });

        }


    }
})();

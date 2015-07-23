myApp
    .controller('BalanceListController', [

        'BalanceListModel',

        function(BalanceListModel) {

            var BalanceList = this;

            BalanceList.places = BalanceListModel.places;

        }
    ]);

(function() {
    'use strict';

    angular.module('app')
        .controller('BalanceDetailController', BalanceDetailController);

    BalanceDetailController.$inject = ['BalanceDetailModel', '$stateParams', 'AuthService', '$scope'];

    function BalanceDetailController(BalanceDetailModel, $stateParams, AuthService, $scope) {

        var BalanceDetail = this;
        BalanceDetail.Model = BalanceDetailModel;
        BalanceDetail.placeName = null;
        BalanceDetail.points = null;
        BalanceDetail.username = AuthService.getUser().username;

        $scope.$on('$ionicView.beforeEnter', function() {
            BalanceDetail.placeName = $stateParams.placeName;
            BalanceDetail.points = $stateParams.points;
            console.log(AuthService.getUser());
        });
        //------------------------
        //  IMPLEMENTATIONS;
        //------------------------

    }

})();

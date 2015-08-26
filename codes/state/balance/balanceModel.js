(function () {
    'use strict';

    angular.module('app')
        .service('BalanceService', BalanceService);

    BalanceService.$inject = ['$http', '$q', 'governorUrl'];

    function BalanceService($http, $q, governorUrl) {

        this.getMyRoyaltyPoints = getMyRoyaltyPoints;

        function getMyRoyaltyPoints() {

            var deferred = $q.defer();

            $http({
                url: governorUrl + '/royaltyPoint/list/mine',
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);
                });

            return deferred.promise;

        }
    }
})();

(function() {
    'use strict';

    angular.module('app')
        .controller('BalanceListController', BalanceListController);

    BalanceListController.$inject = ['BalanceListModel', 'RoyaltyPoints', 'Places', '$scope', '$state', '$q', '_'];

    function BalanceListController(BalanceListModel, RoyaltyPoints, Places, $scope, $state, $q, _) {

        var BalanceList = this;
        BalanceList.Model = BalanceListModel;

        BalanceList.goToHandler = goToHandler;

        $scope.$on('$ionicView.beforeEnter', doBeforeEnter);


        //------------------------
        //  IMPLEMENTATIONS
        //------------------------
        function getMyBalanceList() {
            return RoyaltyPoints.getMyRoyaltyPoints({
                    category: 'NAIL-ROYALTYPOINT'
                }).$promise
                .then(function success(royaltyWrapper) {
                    console.log(royaltyWrapper);
                    var promisesBulk = findByIdsInArray(royaltyWrapper.royaltyPoints);
                    promisesBulk
                        .then(function success(arrayOfPlaces) {
                            console.log(arrayOfPlaces);
                            var royaltyPoints = _.pluck(royaltyWrapper.royaltyPoints, 'points');
                            var names = _.pluck(arrayOfPlaces, 'name');
                            var addresses = _.pluck(arrayOfPlaces, 'address');
                            var photoUrls = _.pluck(_.pluck(_.pluck(arrayOfPlaces, 'photos'), '0'), 'url');
                            var arrayOfResults = [];
                            for (var i = 0; i < royaltyPoints.length; i++) {
                                var result = {};
                                result.name = names[i];
                                result.royaltyPoints = royaltyPoints[i];
                                result.address = addresses[i];
                                result.url = photoUrls[i];
                                arrayOfResults.push(result);
                            }
                            BalanceListModel.current.royaltyPointObjs = arrayOfResults;
                            console.log(arrayOfResults);
                        }, function err(arrayOfErrors) {
                            console.log(arrayOfErrors);
                        });
                }, function err(error) {
                    console.log(error);
                });
        }

        function findByIdsInArray(arrayOfObjects) {
            var arrayOfIds = _.pluck(arrayOfObjects, 'place');
            var arrayOfPromises = _.map(arrayOfIds, function(id) {
                return Places.findById({
                    id: id,
                    populates: 'photos'
                }).$promise;
            });
            var promisesBulkToResolve = $q.all(arrayOfPromises);

            return promisesBulkToResolve;
        }

        function goToHandler(state, params) {
            return $state.go(state, params);
        }

        function doBeforeEnter() {
            getMyBalanceList();
        }

    } //END
})();

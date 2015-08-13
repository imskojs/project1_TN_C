(function() {
    'use strict';

    angular.module('app')
        .controller('FavoriteController', FavoriteController);

    FavoriteController.$inject = ['FavoriteModel', '$scope', '$state'];

    function FavoriteController(FavoriteModel, $scope, $state) {
        var Favorite = this;
        Favorite.Model = FavoriteModel;

        $scope.$on('$ionicView.loaded', function() {
            Favorite.goToDetailHandler = function(place) {
                $state.go('main.detail', {
                    id: place.id
                });
            };
        });

        $scope.$on('$ionicView.beforeEnter', function() {
            FavoriteModel.placeList = angular.fromJson(localStorage.getItem('NAIL_SAVED_PLACES'));
        });
    }

})();
(function() {
    'use strict';

    angular.module('app')
        .controller('FavoriteController', FavoriteController);

    FavoriteController.$inject = ['FavoriteModel', '$scope', '$state', 'localStorage'];

    function FavoriteController(FavoriteModel, $scope, $state, localStorage) {
        var Favorite = this;
        Favorite.Model = FavoriteModel;
        Favorite.goToDetailHandler = goToDetailHandler;

        $scope.$on('$ionicView.beforeEnter', doBeforeEnter);

        //------------------------
        //  IMPLEMENTATIONS
        //------------------------

        function goToDetailHandler(place) {
            $state.go('main.detail', {
                id: place.id
            });
        }

        function doBeforeEnter() {
            FavoriteModel.placeList = angular.fromJson(localStorage.getItem('NAIL_SAVED_PLACES'));
        }

    }
})();

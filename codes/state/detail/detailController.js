(function() {
    'use strict';

    angular.module('app')
        .controller('DetailController', DetailController);

    DetailController.$inject = [
        'DetailModel', '$stateParams', '$scope', 'Message', 'Places',
        '$ionicSlideBoxDelegate', '$state', 'Favorite', '$filter', 'moment'
    ];

    function DetailController(DetailModel, $stateParams, $scope, Message, Places,
        $ionicSlideBoxDelegate, $state, Favorite, $filter, moment
    ) {
        var filterByTag = $filter('filterByTag');

        var Detail = this;
        Detail.Model = DetailModel;
        // Detail.date will update as user picks the date.
        Detail.date = moment();
        Detail.isFavorite = Favorite.isFavorite.bind(null, 'NAIL_SAVED_PLACES');
        Detail.interiorPhotos = [];
        Detail.portFolioPhotos = [];
        Detail.toggleSavePlace = Favorite.saveToFavorite.bind(null, 'NAIL_SAVED_PLACES', Detail, DetailModel);

        $scope.$on('$ionicView.beforeEnter', function() {
            loadPlace();
            loadPortfolioPhotos();
        });
        //------------------------
        //  IMPLEMENTATIONS
        //------------------------
        function loadPlace() {
            Message.loading.default();

            return Places.findById({
                    id: $stateParams.id,
                    populates: 'photos,products,bookings'
                }).$promise
                .then(function success(place) {
                    DetailModel.current = place;
                    console.log('this');
                    console.log(place);
                    Detail.interiorPhotos = filterByTag(DetailModel.current.photos, 'INTERIOR');
                    // Detail.portFolioPhotos = filterByTag(DetailModel.current.photos, 'PORTFOLIO');

                    Message.loading.hide();
                    $ionicSlideBoxDelegate.update();

                }, function error(err) {
                    console.log(err);
                    Message.popUp.alert.default(
                        '네일샵정보 알림',
                        '요청하신 네일샵은 더이상 존재하지 않습니다.'
                    );
                });
        }

        function loadPortfolioPhotos() {
            return Places.getPlacePhotos({
                    id: $stateParams.id,
                    tags: 'PORTFOLIO'
                }).$promise
                .then(function success(photos) {
                    console.log('thisthisthis');
                    console.log(photos);
                }, function err(error) {
                    console.log(error);
                });
        }

    }
})();

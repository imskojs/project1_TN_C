(function() {
    'use strict';

    angular.module('app')
        .controller('DetailController', DetailController);

    DetailController.$inject = [
        'DetailModel', '$stateParams', '$scope', 'Message', 'Places',
        '$ionicSlideBoxDelegate', '$state', 'Favorite', '$filter'
    ]

    function DetailController(DetailModel, $stateParams, $scope, Message, Places,
        $ionicSlideBoxDelegate, $state, Favorite, $filter
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
        });
        //------------------------
        //  IMPLEMENTATIONS
        //------------------------
        function loadPlace() {
            Message.loading.default();

            Places.findById({
                id: $stateParams.id,
                populates: 'photos,products,bookings'
            }).$promise
                .then(function success(place) {
                    DetailModel.current = place;
                    console.log(place);
                    Detail.interiorPhotos = filterByTag(DetailModel.current.photos, 'INTERIOR');
                    Detail.portFolioPhotos = filterByTag(DetailModel.current.photos, 'PORTFOLIO');

                    Message.loading.hide();
                    $ionicSlideBoxDelegate.update();

                }, function error(err) {
                    Message.popUp.alert.default(
                        '네일샵정보 알림',
                        '요청하신 네일샵은 더이상 존재하지 않습니다.'
                    );
                });
        }

    }
})();

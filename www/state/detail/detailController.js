myApp
    .controller('DetailController', [

        'DetailModel', '$stateParams', '$scope', 'Message', 'Places',
        '$ionicSlideBoxDelegate',


        function(DetailModel, $stateParams, $scope, Message, Places,
            $ionicSlideBoxDelegate
        ) {
            var Detail = this;
            Detail.Model = DetailModel;

            $scope.$on('$ionicView.beforeEnter', function() {
                Message.loading.default();

                Places.findById({
                    id: $stateParams.id
                }).$promise
                    .then(function success(place) {
                        DetailModel.currentPlace = place;
                        Message.loading.hide();
                        console.log(DetailModel.currentPlace);
                        $ionicSlideBoxDelegate.update();

                    }, function error(err) {
                        Message.popUp.alert(
                            '네일샵정보 알림',
                            '요청하신 네일샵은 더이상 존재하지 않습니다.'
                        )
                    })
            });



            //==========================================================================
            //              DATE PICKER
            //==========================================================================
            // DatePicker's UTChours is set to 3 when date object is obtained
            Detail.date = new Date().setUTCHours(3);

            // Got from datepicker.bootstrap
            // Detail.dater = DetailModel.selectedDate;







            //==========================================================================
            //              HELPER FUNCTIONS
            //==========================================================================

            // function errorHandler() {
            //     $ionicLoading.hide();
            //     $ionicPopup.alert({
            //         title: '서버와 연결 실패',
            //         template: '인터넷을 켜주시기 바랍니다.'
            //     }).then(function(res) {
            //         $ionicHistory.goBack();
            //     });
            // }

            // function getPhotosByType(photos) {
            //     var results = [];
            //     photos.forEach(function(photo, i, photos) {
            //         if (photo.resource_type === 'portfolio') {
            //             results.push(photo);
            //         }
            //     });
            //     console.log(results);
            //     return results;
            // }

            // DetailModel.queryById($stateParams.id)
            //     .then(function success(response) {

            //         angular.copy(response, DetailModel.currentPlace);

            //         Detail.currentPlace = DetailModel.currentPlace;

            //         Message.loading.hide();

            //         Detail.currentPlace.portfolioPhotos =
            //             getPhotosByType(Detail.currentPlace.photos);

            //         console.log(Detail.currentPlace.portfolioPhotos);

            //     }, function error(err) {
            //         errorHandler();
            //     });
        }
    ]);

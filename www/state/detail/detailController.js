myApp
    .controller('DetailController', [

        'DetailModel', '$stateParams', '$scope', '$ionicLoading',
        '$ionicPopup', '$ionicHistory', '$filter',

        function(DetailModel, $stateParams, $scope, $ionicLoading,
            $ionicPopup, $ionicHistory, $filter
        ) {
            var Detail = this;


            $scope.$on('$ionicView.enter', function() {

                $ionicLoading.show({
                    template: '네일샵 가져오는중...'
                });

                DetailModel.queryById($stateParams.id)
                    .then(function success(response) {

                        angular.copy(response, DetailModel.currentPlace);

                        Detail.currentPlace = DetailModel.currentPlace;

                        $ionicLoading.hide();

                        Detail.currentPlace.portfolioPhotos =
                            getPhotosByType(Detail.currentPlace.photos);

                        console.log(Detail.currentPlace.portfolioPhotos);

                    }, function error(err) {
                        errorHandler();
                    });
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

            function errorHandler() {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: '서버와 연결 실패',
                    template: '인터넷을 켜주시기 바랍니다.'
                }).then(function(res) {
                    $ionicHistory.goBack();
                });
            }

            function getPhotosByType(photos) {
                var results = [];
                photos.forEach(function(photo, i, photos) {
                    if (photo.resource_type === 'portfolio') {
                        results.push(photo);
                    }
                });
                console.log(results);
                return results;
            }
        }
    ]);

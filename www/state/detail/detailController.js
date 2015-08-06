myApp
    .controller('DetailController', [

        'DetailModel', '$stateParams', '$scope', 'Message', 'Places',
        '$ionicSlideBoxDelegate', '$state',


        function(DetailModel, $stateParams, $scope, Message, Places,
            $ionicSlideBoxDelegate, $state
        ) {
            var Detail = this;
            Detail.Model = DetailModel;

            $scope.$on('$ionicView.beforeEnter', function() {
                Message.loading.default();

                Places.findById({
                    id: $stateParams.id,
                    populates: 'photos,products,bookings'
                }).$promise
                    .then(function success(place) {
                        DetailModel.currentPlace = place;
                        Message.loading.hide();
                        // console.log(DetailModel.currentPlace);
                        $ionicSlideBoxDelegate.update();
                        console.log('this is detail');
                        console.log(place);

                    }, function error(err) {
                        Message.popUp.alert.default(
                            '네일샵정보 알림',
                            '요청하신 네일샵은 더이상 존재하지 않습니다.'
                        )
                    })
            });

            Detail.goBackHandler = function() {
                $state.go('main.daumMap');
            }


            //==========================================================================
            //              DATE PICKER
            //==========================================================================
            // Detail.date will update as user pick the date.
            Detail.date = moment();

            // Got from datepicker.bootstrap
            // Detail.dater = DetailModel.selectedDate;







        }
    ]);

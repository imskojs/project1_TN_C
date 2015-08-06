myApp
    .controller('DetailController', [

        'DetailModel', '$stateParams', '$scope', 'Message', 'Places',
        '$ionicSlideBoxDelegate', '$state',


        function(DetailModel, $stateParams, $scope, Message, Places,
            $ionicSlideBoxDelegate, $state
        ) {
            var Detail = this;
            Detail.Model = DetailModel;


            Detail.toggleSavePlace = function() {
                // get NAIL_SAVED_PLACES from localStorage
                var placesString = localStorage.getItem('NAIL_SAVED_PLACES');
                // make it object using angular.fromJson
                var placesArray = angular.fromJson(placesString);
                // if null create array
                if (!Array.isArray(placesArray)) {
                    placesArray = [];
                }
                // check whether place already exist
                for (var i = 0; i < placesArray.length; i++) {
                    var place = placesArray[i];
                    console.log(place.id);
                    console.log($stateParams.id);
                    // if exists delete savedplace
                    if (place.id === $stateParams.id) {
                        placesArray.splice(i, 1);
                        placesString = angular.toJson(placesArray);
                        localStorage.setItem('NAIL_SAVED_PLACES', placesString);
                        // style star
                        Detail.styleStar = false;
                        Message.popUp.alert.default('담아두기 알림', '담아두기에서 삭제되었습니다.');
                        return false;
                    }
                }
                // if not save current places necessary attributes(savedList)
                var currentPlace = DetailModel.currentPlace;
                var placeToSave = {
                    id: currentPlace.id,
                    photos: [{
                        url: currentPlace.photos[0] && currentPlace.photos[0].url
                    }],
                    name: currentPlace.name,
                    location: {
                        coordinates: currentPlace.location.coordinates
                    },
                    address: currentPlace.address
                };
                placesArray.push(placeToSave);
                // convert to json, save toNAIL_SAVED_PLACES
                placesString = angular.toJson(placesArray);
                localStorage.setItem('NAIL_SAVED_PLACES', placesString);
                // style right button star icon to indicate saved sate
                Detail.styleStar = true;
                Message.popUp.alert.default('담아두기 알림', '포스트를 담아두었습니다.');
            };



            $scope.$on('$ionicView.beforeEnter', function() {
                Message.loading.default();

                Places.findById({
                    id: $stateParams.id,
                    populates: 'photos,products,bookings'
                }).$promise
                    .then(function success(place) {
                        DetailModel.currentPlace = place;
                        Message.loading.hide();
                        $ionicSlideBoxDelegate.update();

                        var savedPlaces = angular.fromJson(localStorage.getItem('NAIL_SAVED_PLACES'));
                        angular.forEach(savedPlaces, function(savedPlace, i, self) {
                            if (savedPlace.id === DetailModel.currentPlace.id) {
                                Detail.styleStar = true;
                            }
                        });

                        console.log(place);


                    }, function error(err) {
                        Message.popUp.alert.default(
                            '네일샵정보 알림',
                            '요청하신 네일샵은 더이상 존재하지 않습니다.'
                        );
                    });
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

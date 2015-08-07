myApp
    .directive('daumMap', [

        'DaumMapModel', 'Places', 'Bookings', '$state', '$cordovaGeolocation', 'Message', '$q',

        function(DaumMapModel, Places, Bookings, $state, $cordovaGeolocation, Message, $q) {
            return {
                scope: {
                    markerSrc: '@',
                    markerClickedSrc: '@',
                    markerWidth: '@',
                    markerHeight: '@',
                },
                compile: function(element, attr) {
                    //==========================================================================
                    //              Global Map Property
                    //==========================================================================
                    // Initiate map
                    var DOM = element[0];
                    var mapOptions = {
                        center: new daum.maps.LatLng(37.5, 127),
                        level: 4,
                        draggable: true
                    };
                    daum.maps.disableHD();
                    var map = new daum.maps.Map(DOM, mapOptions);
                    // place service
                    var ps = new daum.maps.services.Places();
                    // ==========================================================================
                    //              HELPER FUNCTIONS
                    // ==========================================================================
                    // filter query
                    function filterPlaces(places, rangeMinutes) {
                        var currentHour = moment().get('hour');
                        var currentMinute = moment().get('minute');
                        if (currentMinute <= 30) {
                            var currentMoment = moment().set({
                                minutes: 29
                            });
                        } else {
                            var currentMoment = moment().set({
                                minutes: 59
                            });
                        }
                        var arrayOfIds = _.pluck(places, 'id');
                        var arrayOfPromises = _.map(arrayOfIds, function(id, i, self) {
                            return Bookings.getBookingsDateBetween({
                                placeId: id,
                                from: currentMoment.toDate().getTime(),
                                to: currentMoment.add(rangeMinutes, 'minutes').toDate().getTime()
                            }).$promise
                        });
                        return $q.all(arrayOfPromises)
                            .then(function success(arrayOfBookingsWrapper) {
                                angular.forEach(arrayOfBookingsWrapper, function(bookingsWrapper, i, self) {
                                    var bookingsArray = bookingsWrapper.bookings;
                                    var bookingsMomentArray = _.map(bookingsArray, function(booking) {
                                        return moment(booking.datetime);
                                    });
                                    // interval = 30
                                    var numberOfSlots = rangeMinutes / 30;
                                    // TODO: check booking beginning, duration, and employee to figure out..
                                    var saturatingNumber = numberOfSlots * places[i].employee;
                                    //remove places;
                                    if (bookingsArray.length >= saturatingNumber) {
                                        places.splice(i, 1, null);
                                    }
                                });
                                for (var i = places.length - 1; i >= 0; i--) {
                                    if (places[i] == null) {
                                        places.splice(i, 1);
                                    }
                                };
                                return places

                            }, function err(arrayOfErrors) {
                                console.log(arrayOfErrors);
                            });
                    }

                    function processPin(markerImg, markerClickedImg, scope) {

                        angular.forEach(DaumMapModel.places, function(place, i, self) {
                            //place = {location:{type:'Point', coordinates:[126.10101, 27.101010]}, ...}
                            var placeLongitude = place.location.coordinates[0];
                            var placeLatitude = place.location.coordinates[1];
                            // set marker
                            var position = new daum.maps.LatLng(placeLatitude, placeLongitude);
                            var marker = new daum.maps.Marker({
                                map: map,
                                position: position,
                                // used as to link to place info
                                title: String(i),
                                image: markerImg,
                                clickable: true
                            })
                            daum.maps.event.addListener(marker, 'click', function() {
                                var marker = this;
                                scope.$apply(function() {
                                    // on click: differentiate clicked image;
                                    angular.forEach(DaumMapModel.markers, function(otherMarker, i, self) {
                                        otherMarker.setImage(markerImg);
                                    });
                                    marker.setImage(markerClickedImg);
                                    // on click: show modal which will be filled with place info
                                    // modal references DaumMapModel.selectedPlace to fill in the info
                                    var index = Number(marker.getTitle());
                                    Message.loading.default();

                                    Places.findById({
                                        id: DaumMapModel.places[index].id,
                                        populates: 'photos'
                                    }).$promise
                                        .then(function success(data) {
                                            Message.loading.hide();
                                            DaumMapModel.selectedPlace = data;
                                            console.log(DaumMapModel.selectedPlace)
                                            DaumMapModel.modal.show();
                                        }, function err(error) {
                                            Message.loading.hide();
                                            Message.popUp.alert.default();

                                        });
                                    // DaumMapModel.selectedPlace = DaumMapModel.places[index];
                                });
                            });
                            // Save converted place with click event added.
                            DaumMapModel.markers.push(marker);
                        });
                    }
                    // Draw Markers after query
                    var drawMarkers = function(currentCenter, markerImg, markerClickedImg, scope) {
                        // Reset previous markers;
                        angular.forEach(DaumMapModel.markers, function(marker, i, self) {
                            marker.setMap(null);
                        });
                        DaumMapModel.markers = [];

                        // Request server for places;
                        Places.getPlacesWithin({
                            latitude: currentCenter.latitude,
                            longitude: currentCenter.longitude,
                            distance: currentCenter.distance || 5000,
                            limit: currentCenter.limit || 50
                            // eager: false
                        }).$promise
                            .then(function success(placesWrapper) {

                                if (true) {

                                    filterPlaces(placesWrapper.places, 60)
                                        .then(function success(places) {
                                            DaumMapModel.places = places
                                            processPin(markerImg, markerClickedImg, scope);
                                        }, function err(error) {
                                            console.log(error);
                                        });

                                } else {
                                    DaumMapModel.places = placesWrapper.places;
                                    processPin(markerImg, markerClickedImg, scope);
                                }

                            }, function error(err) {
                                console.log(err);
                            });
                    };

                    //==========================================================================
                    //              Find Current location and search nearby
                    //==========================================================================
                    DaumMapModel.findMeThenSearchNearBy = function() {
                        Message.loading.default();
                        $cordovaGeolocation.getCurrentPosition()
                            .then(function success(position) {

                                if (position.coords == null) {
                                    Message.loading.hide();
                                    Message.popUp.alert.default({
                                        title: '위치 공유가 꺼져있습니다.',
                                        template: '위치 공유가 켜주세요.'
                                    })
                                    return false;
                                }
                                var result = {
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude
                                };

                                var currentCenter = DaumMapModel.currentPosition = result

                                map.setCenter(new daum.maps.LatLng(
                                    DaumMapModel.currentPosition.latitude,
                                    DaumMapModel.currentPosition.longitude
                                ));

                                // No longer needed as when map's center is moved it will draw.
                                // drawMarkers(currentCenter);
                                Message.loading.hide();
                            }, function error(err) {});
                    };
                    //==========================================================================
                    //              Find specific location with value and search nearby
                    //==========================================================================
                    DaumMapModel.searchLocationNearBy = function(value) {
                        Message.loading.default();
                        if (!value) {
                            Message.loading.hide();
                            Message.popUp.alert.default('검색하기 알림', '장소 값을 넣어서 다시 검색해주세요');
                            return false;
                        }
                        ps.keywordSearch(value, function(status, data, pagination) {

                            // if no search result, notify and exit.
                            if (data.places[0] === undefined) {
                                Message.loading.hide();
                                Message.popUp.alert.default(
                                    '요청하신 장소가 없습니다',
                                    '다시검색해주세요'
                                );
                                return false;
                            }
                            console.log(status);

                            // move to center of searched result.
                            map.panTo(new daum.maps.LatLng(
                                data.places[0].latitude,
                                data.places[0].longitude
                            ));
                            var currentCenter = {
                                latitude: data.places[0].latitude,
                                longitude: data.places[0].longitude
                            };

                            // No longer needed as when map's center is moved it will draw.
                            // drawMarkers(currentCenter);

                            Message.loading.hide();
                        }, function(err) {
                            console.log(err);
                        });
                    };
                    return function(scope, element, attr) {
                        // Marker style properties.
                        var markerSize = new daum.maps.Size(scope.markerWidth, scope.markerHeight);
                        var markerImg = new daum.maps.MarkerImage(scope.markerSrc, markerSize);
                        var markerClickedImg = new daum.maps.MarkerImage(scope.markerClickedSrc, markerSize);
                        map.relayout();
                        DaumMapModel.domMap = map;
                        // ------------------------
                        //  Search when moved
                        // ------------------------

                        daum.maps.event.addListener(map, 'idle', function() {

                            var currentCenter = {
                                longitude: map.getCenter().getLng(),
                                latitude: map.getCenter().getLat()
                            }

                            angular.extend(currentCenter, {
                                distance: 2000,
                                limit: 20
                            });

                            console.log(currentCenter);
                            drawMarkers(currentCenter, markerImg, markerClickedImg, scope);

                        });
                    };
                }
            };
        }
    ]);

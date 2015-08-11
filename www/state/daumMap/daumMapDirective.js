myApp
    .directive('daumMap', [

        'DaumMapModel', 'Places', 'Bookings', '$state', '$cordovaGeolocation', 'Message', '$q',
        '$stateParams',

        function(DaumMapModel, Places, Bookings, $state, $cordovaGeolocation, Message, $q, $stateParams) {
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
                    var interval = 30;
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

                        var currentMoment = setCurrentMoment();

                        var arrayOfIds = _.pluck(places, 'id');

                        var arrayOfPromises = _.map(arrayOfIds, function(id, i, self) {
                            return Bookings.getBookingsDateBetween({
                                placeId: id,
                                from: currentMoment.clone().set({
                                    hour: 0,
                                    minute: 0,
                                    second: 0
                                }).toDate().getTime(),
                                to: currentMoment.clone().set({
                                    hour: 23,
                                    minute: 59,
                                    second: 59
                                }).toDate().getTime()
                            }).$promise
                        });

                        return $q.all(arrayOfPromises)
                            .then(function success(arrayOfBookingsWrapper) {

                                var availabilities = checkAvailableSlots(places, arrayOfBookingsWrapper, interval, currentMoment, rangeMinutes);

                                if (availabilities.length === 0) {
                                    return [];
                                }
                                for (var i = places.length - 1; i >= 0; i--) {
                                    if (availabilities[i] === 'unavailable') {
                                        places.splice(i, 1);
                                    }
                                };

                                return places

                            }, function err(arrayOfErrors) {
                                console.log(arrayOfErrors);
                            });
                    }

                    function setCurrentMoment() {
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
                        return currentMoment;
                    }

                    function checkAvailableSlots(places, arrayOfBookingsWrapper, interval, currentMoment, rangeMinutes) {
                        var todayInt = currentMoment.clone().get('day');

                        var closingMomentsForToday = [];
                        angular.forEach(places, function(place, i) {
                            console.log(place);
                            var endHourArray = place.openingHours[todayInt].end.split(':')
                            var hours = endHourArray[0];
                            var minutes = endHourArray[1];
                            var closingMoment = moment().set({
                                hour: hours,
                                minutes: minutes
                            });
                            if (place.openingHours[todayInt].start === place.openingHours[todayInt].end) {
                                places.splice(i, 1, null)
                                arrayOfBookingsWrapper.splice(i, 1, null);
                            } else if (currentMoment.isAfter(closingMoment)) {
                                places.splice(i, 1, null);
                                arrayOfBookingsWrapper.splice(i, 1, null);
                            } else {
                                closingMomentsForToday.push(closingMoment);
                            }
                        })
                        for (var i = places.length - 1; i >= 0; i--) {
                            if (places[i] === null) {
                                places.splice(i, 1);
                                arrayOfBookingsWrapper.splice(i, 1);
                            }
                        };
                        if (places.length === 0) {
                            Message.popUp.alert.default('바로검색 알림', '지금은 검색주위의 샵들이 모두 닫았습니다, 내일 이용해주시거나, 다른지역을 검색해주세요')
                            return [];
                        }



                        var arrayOfBookings = _.map(arrayOfBookingsWrapper, function(bookingsWrapper) {
                            return bookingsWrapper.bookings;
                        });
                        console.log('arrayOfBookings');
                        console.log(arrayOfBookings);
                        var employees = _.map(places, function(place) {
                            return place.employee
                        })
                        var arrayOfDurations = _.map(arrayOfBookings, function(bookings) {
                            return _.map(bookings, function(booking) {
                                return booking.products[0].product.duration
                            })
                        })
                        var arrayOfBookingsMoment = []; // [ [newbooking, newbooking,... ], []]
                        for (var i = 0; i < arrayOfDurations.length; i++) {
                            var resultArray_i = []; // inner [] of resultArray = [ [], [], ... ]
                            var bookings = arrayOfBookings[i];
                            var durations = arrayOfDurations[i];
                            var place = places[i];
                            console.log('place');
                            console.log(place);
                            for (var j = 0; j < durations.length; j++) {
                                var booking = bookings[i];
                                var datetime = booking.datetime
                                var bookingMoment = moment(datetime);
                                var duration = durations[i];
                                var closingMoment = closingMomentsForToday[i];
                                if (bookingMoment.isBetween(currentMoment.clone(), currentMoment.clone().add(rangeMinutes, 'minutes')) &&
                                    bookingMoment.isBefore(closingMoment.clone())) {
                                    resultArray_i.push(bookingMoment);
                                }
                                var slotsTaken = Math.ceil(duration / interval);
                                for (var k = 0; k < slotsTaken; k++) {
                                    var minutesToAdd = interval * (k + 1);
                                    var trailingBookingMoment = bookingMoment.clone().add(minutesToAdd, 'minutes');
                                    if (trailingBookingMoment.isBetween(currentMoment.clone(), currentMoment.clone().add(rangeMinutes, 'minutes')) &&
                                        trailingBookingMoment.isBefore(closingMoment.clone())) {
                                        resultArray_i.push(trailingBookingMoment);
                                    }
                                }
                            }
                            arrayOfBookingsMoment.push(resultArray_i);
                        }
                        console.log('arrayOfBookingsMoment');
                        console.log(arrayOfBookingsMoment);


                        var arrayOfTimeStrings = [];
                        for (var i = 0; i < arrayOfBookingsMoment.length; i++) {
                            var bookingsMoment = arrayOfBookingsMoment[i];
                            console.log(bookingsMoment);
                            var timeStrings = _.map(bookingsMoment, function(bookingMoment) {
                                var hours = bookingMoment.get('hours');
                                var minutes = bookingMoment.get('minutes')
                                var timeString = String(hours) + ':' + String(minutes);
                                return timeString;
                            });
                            if (timeStrings.length === 0) {
                                timeStrings = ['available']
                            }
                            arrayOfTimeStrings.push(timeStrings);
                        }
                        console.log('arrayOfTimeStrings');
                        console.log(arrayOfTimeStrings);

                        var arrayOfGroupedTimeStrings = [];
                        angular.forEach(arrayOfTimeStrings, function(timeStrings) {
                            var groupedTimeStrings = _.groupBy(timeStrings, function(timeString) {
                                return timeString;
                            })
                            arrayOfGroupedTimeStrings.push(groupedTimeStrings);
                        })
                        console.log('arrayOfGroupedTimeStrings');
                        console.log(arrayOfGroupedTimeStrings);

                        var availabilities = [];
                        for (var i = 0; i < arrayOfGroupedTimeStrings.length; i++) {
                            var availabilityFlag = false;
                            var place = places[i];
                            for (var key in arrayOfGroupedTimeStrings[i]) {
                                if (arrayOfGroupedTimeStrings[i][key].length < place.employee || key === 'available') {
                                    availabilities.push('available')
                                    availabilityFlag = true;
                                    break
                                }
                            }
                            if (availabilityFlag === false) {
                                availabilities.push('unavailable');
                            }
                        }
                        console.log('availabilities');
                        console.log(availabilities);
                        return availabilities;
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
                        }).$promise
                            .then(function success(placesWrapper) {

                                if ($stateParams.from === 'quick') {

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
                                Message.loading.hide();

                            }, function error(err) {
                                console.log(err);
                            });
                    };

                    //==========================================================================
                    //              Find Current location and search nearby
                    //==========================================================================
                    DaumMapModel.findMeThenSearchNearBy = function() {
                        Message.loading.default();
                        $cordovaGeolocation.getCurrentPosition({
                            maximumAge: 3000,
                            timeout: 5000
                        })
                            .then(function success(position) {

                                if (position.coords == null) {
                                    Message.loading.hide();
                                    Message.popUp.alert.default(
                                        '위치 공유가 꺼져있습니다.',
                                        '위치 공유가 켜주세요.'
                                    )
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
                            }, function error(err) {
                                console.log(err);
                                Message.loading.hide();
                                Message.popUp.alert.default(
                                    '위치 공유가 꺼져있습니다.',
                                    '위치 공유가 켜주세요.'
                                )
                            });
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
                            console.log(err);
                            Message.loading.hide();
                            Message.popUp.alert.default({
                                title: '위치 공유가 꺼져있습니다.',
                                template: '위치 공유가 켜주세요.'
                            })
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

                            Message.loading.default();
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

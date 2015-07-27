myApp
    .directive('daumMap', [

        'DaumMapModel', 'Places', '$state', '$cordovaGeolocation', 'Message',

        function(DaumMapModel, Places, $state, $cordovaGeolocation, Message) {
            return {
                scope: {
                    markerSrc: '@',
                    markerClickedSrc: '@',
                    markerWidth: '@',
                    markerHeight: '@',
                },
                link: function(scope, element, attr) {
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
                    var map = new daum.maps.Map(DOM, mapOptions);
                    // place service
                    var ps = new daum.maps.services.Places();
                    // Marker style properties.
                    var markerSize = new daum.maps.Size(scope.markerWidth, scope.markerHeight);
                    var markerImg = new daum.maps.MarkerImage(scope.markerSrc, markerSize);
                    var markerClickedImg = new daum.maps.MarkerImage(scope.markerClickedSrc, markerSize);
                    // ==========================================================================
                    //              HELPER FUNCTIONS
                    // ==========================================================================
                    // Draw Markers after query
                    var drawMarkers = function(currentCenter) {
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
                            limit: currentCenter.limit || 50,
                            eager: true
                        }).$promise
                            .then(function success(placesWrapper) {
                                // placesWrapper = {places:[], more: true};
                                DaumMapModel.places = placesWrapper.places;
                                console.log(placesWrapper);
                                // console.log(DaumMapModel.places);
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
                                        // add click event
                                    daum.maps.event.addListener(marker, 'click', function() {
                                        var marker = this;
                                        scope.$apply(function() {
                                            // on click: differentiate clicked image;
                                            angular.forEach(DaumMapModel.markers, function(otherMarker, i, self) {
                                                otherMarker.setImage(markerImg);
                                            });
                                            marker.setImage(markerClickedImg);
                                            // on click: show modal which will be filled with place info
                                            DaumMapModel.modal.show();
                                            // modal references DaumMapModel.selectedPlace to fill in the info
                                            var index = Number(marker.getTitle());
                                            DaumMapModel.selectedPlace = DaumMapModel.places[index];
                                            console.log(DaumMapModel.selectedPlace)
                                        });
                                    });
                                    // Save converted place with click event added.
                                    DaumMapModel.markers.push(marker);
                                });
                            }, function error(err) {
                                console.log(err);
                            });
                    };

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
                        drawMarkers(currentCenter)

                    });

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
                }
            };
        }
    ]);

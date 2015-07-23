myApp
    .directive('daumMap', [

        'DaumMapModel', '$ionicLoading', '$state', '$ionicPopup',

        function(DaumMapModel, $ionicLoading, $state, $ionicPopup) {
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
                        center: new daum.maps.LatLng(37.5691469, 126.978647),
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
                    //==========================================================================
                    //              HELPER FUNCTIONS
                    //==========================================================================
                    // Calc nearby locations within a category function
                    var calcNearBy = function(lat, lng, category) {
                        var minLat = lat - 0.3;
                        var maxLat = lat + 0.3;
                        var minLng = lng - 0.6;
                        var maxLng = lng + 0.6;
                        var params = {
                            category: category,
                            minLat: minLat,
                            maxLat: maxLat,
                            minLng: minLng,
                            maxLng: maxLng
                        };
                        return params;
                    };
                    // Draw Markers after query
                    var drawMarkers = function(searchParams) {
                        // Reset previous markers;
                        angular.forEach(DaumMapModel.markers, function(marker, i, self) {
                            marker.setMap(null);
                        });
                        DaumMapModel.markers = []

                        // Request server for places;
                        DaumMapModel.queryNearBy(searchParams)
                            .then(function success(response) {
                                // Save and draw nearby places with category
                                angular.copy(response.places, DaumMapModel.places);
                                angular.forEach(DaumMapModel.places, function(place, i, self) {
                                    var position = new daum.maps.LatLng(place.latitude, place.longitude);
                                    var marker = new daum.maps.Marker({
                                        map: map,
                                        position: position,
                                        // title is used to get place with index from places array.
                                        title: String(i),
                                        image: markerImg,
                                        clickable: true
                                    });
                                    daum.maps.event.addListener(marker, 'click', function() {
                                        // marker we are adding listener to.
                                        var marker = this;

                                        scope.$apply(function() {
                                            // change rest img to unselected.
                                            angular.forEach(DaumMapModel.markers, function(otherMarker, i, self) {
                                                otherMarker.setImage(markerImg);
                                            });
                                            // change this marker to selected.
                                            marker.setImage(markerClickedImg);
                                            // show modal for clicked marker
                                            DaumMapModel.modal.show();
                                            // load content based on location of the array
                                            var index = Number(marker.getTitle());
                                            angular.copy(DaumMapModel.places[index], DaumMapModel.selectedPlace);
                                        });
                                    });
                                    // Save converted place with click event added.
                                    DaumMapModel.markers.push(marker);
                                });
                            }, function error(err) {
                                console.log(err);
                            });
                    };

                    //------------------------
                    //  Search when moved
                    //------------------------

                    daum.maps.event.addListener(map, 'idle', function() {
                        var center = map.getCenter();
                        var level = map.getLevel();
                        if (level > 6) {
                            map.setLevel(6);
                        }
                        console.log(center.getLng(), center.getLat());
                        console.log(level);


                        // if level is <4 then
                        // 0.02 limit 20

                        // if level is >4 then
                        //0.05 limit 50
                    })





                    //==========================================================================
                    //              Find Current location and search nearby
                    //==========================================================================
                    DaumMapModel.findMeThenSearchNearBy = function() {
                        $ionicLoading.show({
                            template: '<ion-spinner></ion-spinner>'
                        })
                        navigator.geolocation.getCurrentPosition(function(position) {

                            if (position.coords == null) {
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: '위치 공유가 꺼져있습니다.',
                                    template: '위치 공유가 켜주세요.'
                                })
                                return false;
                            }
                            var result = {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            };
                            console.log(result);

                            angular.copy(result, DaumMapModel.currentPosition);

                            map.setCenter(new daum.maps.LatLng(
                                DaumMapModel.currentPosition.latitude,
                                DaumMapModel.currentPosition.longitude
                            ));

                            var searchParams = calcNearBy(
                                DaumMapModel.currentPosition.latitude,
                                DaumMapModel.currentPosition.longitude,
                                DaumMapModel.category
                            );

                            drawMarkers(searchParams);
                            $ionicLoading.hide();
                        });
                    };
                    //==========================================================================
                    //              Find specific location with value and search nearby
                    //==========================================================================
                    DaumMapModel.searchLocationNearBy = function(value) {
                        $ionicLoading.show({
                            template: '<ion-spinner></ion-spinner>'
                        });
                        ps.keywordSearch(value, function(status, data, pagination) {
                            // Center the map to the first result of the search
                            var category = DaumMapModel.category;

                            if (data.places[0] === undefined) {
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: '요청하신 장소가 없습니다',
                                    template: '다시검색해주세요'
                                })
                                return false;
                            }
                            map.panTo(new daum.maps.LatLng(
                                data.places[0].latitude,
                                data.places[0].longitude
                            ));
                            var searchParams = calcNearBy(
                                data.places[0].latitude,
                                data.places[0].longitude,
                                category
                            );
                            drawMarkers(searchParams);
                            $ionicLoading.hide();
                        });
                    };
                }
            };

        }
    ]);

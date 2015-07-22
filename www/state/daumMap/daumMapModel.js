myApp
    .factory('DaumMapModel', [

        '$http', '$q', 'governorUrl',

        function($http, $q, governorUrl) {
            var DaumMapModel = {
                // need to specify category for search
                category: 'shop', // only one category hence fixed
                currentPosition: {
                    latitude: 'FLOAT',
                    longitude: 'FLOAT'
                },
                markers: [],
                places: [],
                selectedPlace: {
                    // response.places[n] selected from DaumMapDirective
                },
                modal: {
                    //Defined in DaumMapController
                },
                findMeThenSearchNearBy: function() {
                    //Defined in DaumMapDirective
                },
                searchLocationNearBy: function() {
                    //Defined in DaumMapDirective
                },
                //==========================================================================
                //              Server
                //==========================================================================
                // searchParams = {
                //     category: 'shop',
                //     minLat: FLOAT,
                //     maxLat: FLOAT,
                //     minLng: FLOAT,
                //     maxLng: FLOAT
                // }
                queryNearBy: function(searchParams) {

                    var MOCK = true;

                    if (!MOCK) {

                        var deferred = $q.defer();
                        $http({
                            url: governorUrl + '/club/Near',
                            method: 'GET',
                            params: searchParams,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .success(function(data) {
                                deferred.resolve(data);
                            })
                            .error(function(data) {
                                deferred.reject(data);
                            });

                        return deferred.promise;

                    }
                    //// MOCK START ///
                    else {
                        var deferred = $q.defer();
                        var response = {
                            places: [{
                                id: 0,
                                name: '네일샵 101',
                                category: 'shop',
                                photos: [{
                                    url: ''
                                }, {
                                    url: ''
                                }, {
                                    url: ''
                                }],
                                phone: 010010010,
                                address: '강남구 101-101',
                                latitude: 37.5691469,
                                longitude: 126.978647,
                                description: '네일샵에 오신것을 환영합니다 101'

                            }, {
                                id: 1,
                                name: '네일샵 202',
                                category: 'shop',
                                photos: [{
                                    url: ''
                                }, {
                                    url: ''
                                }, {
                                    url: ''
                                }],
                                phone: 010010010,
                                address: '강남구 101-101',
                                latitude: 37.4857489,
                                longitude: 126.9941898,
                                description: '네일샵에 오신것을 환영합니다 202'
                            }, {
                                name: '네일샵 103',
                                latitude: 37.5057489,
                                longitude: 127.1941898
                            }, {
                                name: '네일샵 104',
                                latitude: 37.2857489,
                                longitude: 126.7941898
                            }]
                        }
                        deferred.resolve(response);
                        return deferred.promise;
                    }
                    ///// MOCK END ////
                }

            };

            return DaumMapModel;
        }
    ])

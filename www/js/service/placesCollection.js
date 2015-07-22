myApp
    .factory('Places', [

        '$resource', 'governorUrl', '$cordovaFileTransfer',

        function($resource, governorUrl, $cordovaFileTransfer) {

            var placeUrl = governorUrl + '/place' + '/:list' + '/:mine' +
                '/:within' + '/:image';

            var params = {
                list: '@list',
                mine: '@mine',
                within: '@within',
                image: '@image',
            };

            var actions = {
                getPlaces: {
                    method: 'GET',
                    params: {
                        list: 'list'
                    }
                },
                getMyPlaces: {
                    method: 'GET',
                    params: {
                        list: 'list',
                        mine: 'mine'
                    }
                },
                getPlaceWithin: {
                    method: 'GET',
                    params: {
                        list: 'list',
                        within: 'within'
                    }
                },
                findById: {
                    method: 'GET'
                },
                createPlace: {
                    method: 'POST'
                },
                createPlaceWithImage: {
                    method: 'POST',
                    params: {
                        image: 'image'
                    }
                },
                updatePlace: {
                    method: 'PUT'
                },
                updatePlaceWithImage: {
                    method: 'PUT',
                    params: {
                        image: 'image'
                    }
                },
                removePlace: {
                    method: 'DELETE'
                }
            };

            var Places = $resource(placeUrl, params, actions);

            //------------------------
            //  CUSTOM NON-HTTP METHODS
            //------------------------
            Places.createPlaceWithImage = function(parameters, place) {
                angular.extend(place, parameters);
                var filePath = place.file;
                delete place.file;
                var options = {
                    params: place,
                    chunkedMode: false
                };
                return {
                    '$promise': $cordovaFileTransfer.upload(governorUrl + '/place/image', filePath, options)
                };
            };

            Places.updatePlaceWithImage = function(parameters, place) {
                angular.extend(place, parameters);
                var filePath = place.file;
                delete place.file;
                var options = {
                    params: place,
                    chunkedMode: false,
                    httpMethod: 'PUT'
                };
                return {
                    '$promise': $cordovaFileTransfer.upload(governorUrl + '/place/image', filePath, options)
                };

            }
            return Places;
        }
    ]);

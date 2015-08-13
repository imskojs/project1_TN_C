(function() {
    'use strict';
    angular.module('app')
        .factory('DaumMapModel', [

            '$http', '$q', 'governorUrl',

            function($http, $q, governorUrl) {
                var DaumMapModel = {
                    // need to specify category for search
                    category: 'NAIL-PLACE', // only one category hence fixed
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
                };

                return DaumMapModel;
            }

        ])
})();
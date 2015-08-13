(function() {
    'use strict';
    angular.module('app')
        .factory('CancelModel', CancelModel);

    // CancelModel.$inject = [];

    function CancelModel() {
        var data = {
            current: {
                bookings: [{
                    datetime: new Date(),
                    products: [{
                        product: {
                            name: '우늘 네일'
                        },
                        amount: 1
                    }],
                    place: {
                        name: 'place1'
                    },
                    status: 'CANCELLED'
                }, {
                    datetime: new Date(),
                    products: [{
                        product: {
                            name: '오늘 네일 2'
                        },
                        amount: 1
                    }],
                    place: {
                        name: 'place2'
                    },
                    status: 'PROCESSING'
                }]
            }
        };

        return data;


        //------------------------
        //  IMPLEMENTATIONS
        //------------------------
    }

})();
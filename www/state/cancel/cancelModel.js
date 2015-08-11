(function() {
    'use strict';
    myApp
        .factory('CancelModel', CancelModel);

    CancelModel.$inject = ['$stateParams'];

    function CancelModel($stateParams) {
        var data = {
            current: {
                bookings: [{
                    datetime: new Date(),
                    order: [{
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
                    order: [{
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

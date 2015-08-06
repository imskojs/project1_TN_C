myApp

.factory('Bookings', [

    '$resource', 'governorUrl', '$cordovaFileTransfer',

    function($resource, governorUrl, $cordovaFileTransfer) {

        var bookingUrl = governorUrl + '/booking' + '/:list' +
            '/:image' + '/:mine';

        var params = {
            list: '@list',
            image: '@image',
            mine: '@mine'
        };

        var actions = {
            getBookings: {
                method: 'GET',
                params: {
                    list: 'list'
                }
            },
            getMyBookings: {
                method: 'GET',
                params: {
                    list: 'list',
                    mine: 'mine'
                }
            },

            findById: {
                method: 'GET'
            },
            createBooking: {
                method: 'POST'
            },
            updateBooking: {
                method: 'PUT'
            },
            removeBooking: {
                method: 'DELETE'
            }
        };

        var Bookings = $resource(bookingUrl, params, actions);

        //------------------------
        //  CUSTOM NON-HTTP METHODS
        //------------------------
        Bookings.createBookingWithImage = function(parameters, booking) {
            angular.extend(booking, parameters);
            var filePath = booking.file;
            delete booking.file;
            var options = {
                params: booking,
                chunkedMode: false
            };
            return {
                '$promise': $cordovaFileTransfer.upload(governorUrl + '/booking/image', filePath, options)
            };
        };

        Bookings.updateBookingWithImage = function(parameters, booking) {
            angular.extend(booking, parameters);
            var filePath = booking.file;
            delete booking.file;
            var options = {
                params: booking,
                chunkedMode: false,
                httpMethod: 'PUT'
            };
            return {
                '$promise': $cordovaFileTransfer.upload(governorUrl + '/booking/image', filePath, options)
            };

        }

        return Bookings;
    }
]);

// Booking.get({
//     list: 'list',
//     category: 'SHOW-POST'
// }).$promise
//     .then(function success() {}, function err() {})

// Bookings.createBookingWithImage({}, bookingWithFile).$promise
//     .then(function success() {}, function error() {}, function progress(progress) {})

// require id in bookingWithFile sails' req.param('id') not only look at url params but
//also looks at the body of req, it is a sails spcific feature.
// Bookings.createBookingWithImage({}, bookingWithFile).$promise
//     .then(function success() {}, function error() {}, function progress(progress) {})

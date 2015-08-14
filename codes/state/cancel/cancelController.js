(function() {
    'use strict';

    angular.module('app')
        .controller('CancelController', CancelController);

    CancelController.$inject = ['CancelModel', 'Bookings', 'Message', '$scope', 'moment', '$http', 'governorUrl'];

    function CancelController(CancelModel, Bookings, Message, $scope, moment, $http, governorUrl) {

        var Cancel = this;
        Cancel.Model = CancelModel;

        Cancel.cancelHandler = updateStatus.bind(null, 'CANCELED');
        Cancel.isCanceledOrDone = isCanceledOrDone;
        Cancel.isDone = isDone;

        $scope.$on('$ionicView.beforeEnter', function() {
            getMyBookings();
        });
        //------------------------
        //  IMPLEMENTATIONS
        //------------------------
        function getMyBookings() {

            // return Bookings.getBookings({
            return Bookings.getMyBookings({
                    // placeId: "55caf72b3bd8fa7854f8e112",
                    from: moment().clone().subtract(1, 'years').toDate().getTime(),
                    to: moment().clone().add(1, 'years').toDate().getTime(),
                }).$promise
                .then(function success(bookingsWrapper) {
                    console.log(bookingsWrapper);
                    CancelModel.current.bookings = bookingsWrapper.bookings;
                }, function err(error) {
                    Message.popUp.alert.default('인터넷이 꺼져있습니다', '인터넷을 연결해주세요.');
                    console.log(error);
                });
        }

        function updateStatus(statusString, booking) {
            booking.status = statusString;
            console.log(booking);





            $http({
                url: governorUrl + '/booking',
                method: 'PUT',
                data: booking
            })
                .success(function(data) {
                    console.log(data);
                    Message.loading.hide();
                    Message.popUp.alert.default('예약취소 알림', '예약이 취소 되었습니다.');

                })
                .error(function(error) {
                    console.log(error);

                    Message.loading.hide();
                });









            // return Bookings.updateBooking({}, booking).$promise
            //     .then(function success(data) {
            //         console.log(data);
            //         Message.popUp.alert.default('예약취소 알림', '예약이 취소 되었습니다.');
            //         // Array.prototype.splice.call(CancelModel.current.bookings, index, 1);

            //     }, function err(error) {
            //         console.log(error);

            //     });
        }


        function isCanceledOrDone(booking) {
            if (booking.status === 'CANCELED' || booking.status === 'DONE') {
                return true;
            } else {
                return false;
            }
        }

        function isDone(booking) {
            return booking.status === 'DONE' ? 'done' : 'not-done';
        }
    } // Factory END

})();

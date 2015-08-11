(function() {
    'use strict';

    myApp
        .controller('CancelController', CancelController);

    CancelController.$inject = ['CancelModel', 'Bookings', 'Message', '$scope'];

    function CancelController(CancelModel, Bookings, Message, $scope) {

        var Cancel = this;
        Cancel.Model = CancelModel;

        Cancel.cancelHandler = updateStatus.bind(null, 'CACNCELLED');
        Cancel.isNotCancelled = isNotCancelled;

        $scope.$on('$ionicView.beforeEnter', function() {
            // getMyBookings();
        })


        //------------------------
        //  IMPLEMENTATIONS
        //------------------------
        function getMyBookings() {
            return Bookings.getMyBookings({
                    from: moment().clone().subtract(2, 'hours').toDate().getTime(),
                    to: moment().clone().add(1, 'years').toDate().getTime(),
                }).$promise
                .then(function success(bookingsWrapper) {
                    CancelModel.current.bookings = bookingsWrapper.bookings;
                }, function err(error) {
                    Message.popUp.alert.default('인터넷이 꺼져있습니다', '인터넷을 연결해주세요.');
                    console.log(error);
                });
        }

        function updateStatus(statusString, id, index) {
            return Bookings.updateBooking({
                    id: id
                }, {
                    status: statusString
                }).$promise
                .then(function success(data) {
                    Message.popUp.alert.default('예약취소 알림', '예약이 취소 되었습니다.');
                    Array.prototype.splice.call(CancelModel.current.bookings, index, 1);

                }, function err(error) {

                });
        }

        function isNotCancelled(booking) {
            return booking.status !== 'CANCELLED';
        }
    } // Factory END

})();

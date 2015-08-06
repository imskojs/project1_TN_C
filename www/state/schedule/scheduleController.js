myApp
    .controller('ScheduleController', [

        'DetailModel', 'ScheduleModel', 'Places', 'Bookings', 'Message',
        '$scope', '$ionicModal', '$q', '$stateParams',

        function(DetailModel, ScheduleModel, Places, Bookings, Message,
            $scope, $ionicModal, $q, $stateParams) {

            var Schedule = this;
            Schedule.Model = ScheduleModel;


            Schedule.selectSlotHandler = function(reserveSlot) {
                ScheduleModel.selectedSlot = reserveSlot;
                Schedule.modal.show();

                ScheduleModel.form.datetime = reserveSlot.toDate();

                console.log(reserveSlot);
            };
            Schedule.isSelectedSlot = function(reserveSlot) {
                var selectedHourString = ScheduleModel.selectedSlot.get && ScheduleModel.selectedSlot.get('hour');
                var selectedMinuteString = ScheduleModel.selectedSlot.get && ScheduleModel.selectedSlot.get('minute');
                var selectedTimeString = selectedHourString + ':' + selectedMinuteString;

                var reserveSlotHourString = reserveSlot.get && reserveSlot.get('hour');
                var reserveSlotMinuteString = reserveSlot.get && reserveSlot.get('minute');
                var reserveSlotTimeString = reserveSlotHourString + ':' + reserveSlotMinuteString;

                return selectedTimeString === reserveSlotTimeString;
            };

            Schedule.selectProductHandler = function(product) {
                ScheduleModel.form.products = [product];
            };
            Schedule.isSelectedProduct = function(product) {
                return ((ScheduleModel.form.products && ScheduleModel.form.products[0].id) === product.id);
            }

            Schedule.closeModalHandler = function() {
                angular.copy({}, ScheduleModel.form);
                Schedule.modal.hide();
            }
            Schedule.bookingHandler = function() {
                ScheduleModel.form.place = $stateParams.id;
            }


            $scope.$on('$ionicView.beforeEnter', function() {

                // get currentPlace from DetailModel.
                // Generate reservation slots.
                var openingHours = DetailModel.currentPlace.openingHours
                ScheduleModel.viewSlots = generateReserveMomentSlots($stateParams.selectedDate, openingHours, 30, true);

                var begDate = moment($stateParams.selectedDate)
                    .toDate()
                    .getTime();

                var endDate = moment($stateParams.selectedDate).add(1, 'days')
                    .toDate()
                    .getTime();

                Bookings.getBookings({
                    placeId: $stateParams.id,
                    newerThan: begDate,
                    olderThan: endDate
                }).$promise
                    .then(function success(data) {
                        var viewSlots = ScheduleModel.viewSlots;
                        var bookings = ScheduleModel.bookings = data;
                        var employee = DetailModel.currentPlace.employee;
                        var interval = 30;
                        // If employee =< number of bookings within given time

                        // Given time;
                        angular.forEach(bookings, function(booking, i, self) {
                            // get beginning time(inclusive) and end time(exclusive)
                            var begBookingMoment = moment.utc(booking.datetime).local()
                                .add(1, 'seconds');
                            var duration = booking.products[0].duration;
                            var endBookingMoment = begBookingMoment
                                .add(Number(duration), 'minutes')
                                .subtract(1, 'seconds');
                            // if begTime is gte begTimeSlot
                            for (var i = 0; i < viewSlots.length - 1; i++) {
                                if (begBookingMoment.isBetween(viewSlots[i], viewSlots[i + 1])) {
                                    var numberOfSlotsTaken = Math.ceil(duration / interval)
                                    for (var j = 0; j < numberOfSlotsTaken; j++) {
                                        if (!viewSlots[i + j].bookingCount) {
                                            viewSlots[i + j].bookingCount = 1;
                                        } else {
                                            viewSlots[i + j].bookingCount += 1;
                                        }
                                    }
                                    break;
                                }
                            }
                        })
                        // add bookingCount + 1 to that time slot
                        // if endTime is lt begTimeSlot
                        // add bookingCount + 1 to timeSlot before that.
                        // set un-available
                        // else set available









                    }, function err(error) {
                        console.log(error);
                    });
            });

            $scope.$on('$ionicView.afterEnter', function() {
                // Set Modal
                $ionicModal.fromTemplateUrl('state/schedule/reserveModal.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                })
                    .then(function(modal) {
                        Schedule.modal = modal;
                    });
            });


            //------------------------
            // HELPER FUNCTIONS
            //------------------------

            function generateReserveMomentSlots(selectedDateString, openingHoursArray, interval, ableToBookAtEndTimeBool) {
                // get day of reservedDate, in UTC+9
                var reserveMoment = moment(selectedDateString).set({
                    hour: 0,
                    minute: 0,
                    second: 0
                });
                // get day of selected date
                var dayOfWeek = reserveMoment.day();
                // Get opening hours of that day
                //{start: '07:00', end: '20:00'}
                var hoursObj = openingHoursArray[dayOfWeek];

                // Convert strings to date object.
                var startTimeArray = hoursObj.start.split(':');
                var endTimeArray = hoursObj.end.split(':');

                var startHour = startTimeArray[0];
                var startMinute = startTimeArray[1];
                var endHour = endTimeArray[0];
                var endMinute = endTimeArray[1];

                var startInMinutes = Number(startHour) * 60 + Number(startMinute)
                var endInMinutes = ableToBookAtEndTimeBool ? Number(endHour) * 60 + Number(endMinute) + interval :
                    Number(endHour) * 60 + Number(endMinute)

                var arrayOfSlotsInMinutes = _.range(startInMinutes, endInMinutes, interval)

                var arrayOfSlotsInMoment = [];
                angular.forEach(arrayOfSlotsInMinutes, function(minutes, i, self) {
                    var reserveMomentCopy = reserveMoment.clone();
                    var slot = reserveMomentCopy.set({
                        minute: minutes,
                        second: 0
                    })
                    arrayOfSlotsInMoment.push(slot);
                })
                // console.log(arrayOfSlotsInMoment);
                return arrayOfSlotsInMoment;
            }

            // get schedules of the currentPlace
            // populate status of generated intervals of time slots
            // if unavailable disable popup click, style unavailable
            // if available style available attach on-click event.




            Schedule.doReserve = function() {

                // Validation
                if (ScheduleModel.form.products[0] == null) {
                    return reserveErrorHelper('서비스란');
                } else if (ScheduleModel.form.userKoreanName == null) {
                    return reserveErrorHelper('이름란');
                } else if (ScheduleModel.form.userPhoneNumber == null) {
                    return reserveErrorHelper('연락처란');
                }
                Message.loading.default();

                // Request shop by id
                Places.findById({
                    id: $stateParams.id
                })
                // Update DetailModel.currentPlace
                .then(function success(response) {
                    Message.loading.hide();
                    DetailModel.currentPlace = response;
                    // Find a object that matches clicked time
                    for (var i = 0; i < DetailModel.currentPlace.schedules.length; i++) {
                        var bookDateObj = DetailModel.currentPlace.schedules[i];
                        if (Schedule.reserveModel.date == bookDateObj.date) {
                            // if employee > bookedServices.length
                            if (DetailModel.currentPlace.employee > bookDateObj.bookedServices.length) {
                                // update bookedServices array in the server.
                                ScheduleModel.updateSchedule(Schedule.selectedService, {
                                    id: DetailModel.currentPlace.id,
                                    time: Schedule.reserveModel.time
                                })
                                // if update was successful;
                                .then(function success(response) {
                                    // update bookedServices array in currentPlace
                                    bookDateObj.bookedServices.push(Schedule.selectedService)
                                    console.log(DetailModel.currentPlace);
                                    // close modal
                                    closeModal(Schedule.modal);
                                }, function err(error) {
                                    // else something went wrong message.
                                    console.dir(error);
                                    console.log('Someone just tookt that place')
                                    // close modal
                                    closeModal(Schedule.modal);
                                })
                            }
                        }
                    }
                }, function err(error) {
                    // else send someone just took that place error message.
                    console.dir(error);
                    console.log('Server down.')
                    // close modal
                    closeModal(Schedule.modal);
                })
            };



            //==========================================================================
            //              On AfterEnter.
            //==========================================================================

            //==========================================================================
            //              Check reserve inputs
            //==========================================================================
            function reserveErrorHelper(korean) {
                Message.popUp.alert.default(
                    korean + '이 비었습니다.',
                    korean + '을 입력/골라 주세요.'
                )
            }

            function closeModal(modal) {
                Schedule.selectedService.realname = null;
                Schedule.selectedService.userPhone = null;
                modal.hide();
            }




        }
    ]);

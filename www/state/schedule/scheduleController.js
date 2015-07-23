myApp
    .controller('ScheduleController', [

        'DetailModel', 'ScheduleModel', '$ionicLoading',
        '$scope', '$ionicModal', '$ionicPopup', '$q',

        function(DetailModel, ScheduleModel, $ionicLoading,
            $scope, $ionicModal, $ionicPopup, $q) {

            var Schedule = this;
            //==========================================================================
            //              List View
            //==========================================================================
            var UserModel = {
                username: 'TODO'
            }

            var hours = DetailModel.currentPlace.hours;
            var viewSlots = _.range(hours[0], hours[1], 0.5);
            var schedules = DetailModel.selectedDate.schedules;
            var viewSlots = _.map(viewSlots, function(hour, i, viewSlots) {
                    var obj = {};
                    // hour intervum
                    obj.hour = hour;
                    schedules.forEach(function(objVal, i, schedules) {
                        if (objVal.time == hour) {
                            // booked time
                            obj.time = objVal.time;
                            obj.fullyBooked = objVal.fullyBooked;
                        }
                    })
                    //obj = {hour, time, fullyBooked}
                    return obj;
                })
                // [{hour, time, fullyBooked}]
            Schedule.viewSlots = viewSlots;
            Schedule.reserveModel = {};
            Schedule.itemHandler = function(itemObj) {
                Schedule.reserveModel.time = itemObj.hour;
                Schedule.reserveModel.services = DetailModel.currentPlace.services;
                Schedule.reserveModel.username = UserModel.username;
                Schedule.reserveModel.id = DetailModel.currentPlace.id;
                Schedule.modal.show();
            };

            // Schedule.reserveModel = {
            //     time: Schedule.clickedTime,
            //     services: DetailModel.currentPlace.services,
            //     username: UserModel.username
            // };

            Schedule.selectedService = {
                name: null,
                price: null,
                duration: null,
                username: null,
                // user input to check
                realname: null,
                userPhone: null
            };

            Schedule.doReserve = function() {

                Schedule.selectedService.username = UserModel.username;
                console.log(Schedule.selectedService)

                // Validation
                if (Schedule.selectedService.duration == null) {
                    return reserveErrorHelper('서비스란');
                } else if (Schedule.selectedService.realname == null) {
                    return reserveErrorHelper('이름란');
                } else if (Schedule.selectedService.userPhone == null) {
                    return reserveErrorHelper('연락처란');
                }

                // Request shop by id
                ScheduleModel.queryById({
                    id: DetailModel.currentPlace.id
                })
                // Update DetailModel.currentPlace
                .then(function success(response) {
                    angular.copy(response, DetailModel.currentPlace);
                    console.log(DetailModel.currentPlace);
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
            $scope.$on('$ionicView.afterEnter', function() {
                // Set Modal
                $ionicModal.fromTemplateUrl('state/schedule/reserveModal.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                })
                    .then(function(modal) {
                        Schedule.modal = modal;
                    })
            });

            //==========================================================================
            //              Check reserve inputs
            //==========================================================================
            function reserveErrorHelper(korean) {
                $ionicPopup.alert({
                    title: korean + '이 비었습니다.',
                    template: korean + '을 입력해주세요.'
                });
            }

            function closeModal(modal) {
                Schedule.selectedService.realname = null;
                Schedule.selectedService.userPhone = null;
                modal.hide();
            }




        }
    ])

(function () {
  'use strict';
  angular.module('app')
    .controller('ScheduleController', ScheduleController);

  ScheduleController.$inject = ['DetailModel', 'ScheduleModel', 'Places', 'Bookings', 'Message',
    '$scope', '$ionicModal', '$q', '$stateParams', '$http', 'governorUrl', 'moment', '_'
  ];

  function ScheduleController(DetailModel, ScheduleModel, Places, Bookings, Message,
                              $scope, $ionicModal, $q, $stateParams, $http, governorUrl, moment, _) {

    var interval = 30;

    var Schedule = this;
    Schedule.Model = ScheduleModel;

    ScheduleModel.current = DetailModel.current;

    Schedule.selectSlotHandler = selectSlotHandler;
    Schedule.isSelectedSlot = isSelectedSlot;
    Schedule.isAvailableSlot = isAvailableSlot;
    //Modal scope logic
    Schedule.selectProductHandler = selectProductHandler;
    Schedule.isSelectedProduct = isSelectedProduct;
    Schedule.closeModalHandler = closeModalHandler;
    Schedule.bookingHandler = bookingHandler;

    $scope.$on('$ionicView.beforeEnter', doBeforeEnter);
    $scope.$on('$ionicView.afterEnter', doAfterEnter);


    //------------------------
    //  IMPLEMENTATIONS
    //------------------------
    function selectSlotHandler(reserveSlot, index) {

      if (!Schedule.isAvailableSlot(reserveSlot))
        return;


      ScheduleModel.selectedSlot = reserveSlot;
      ScheduleModel.selectedIndex = index;
      if (reserveSlot.bookingCount >= DetailModel.current.employee) {
        Message.popUp.alert.default(
          '예약불가 알림',
          '예약이 꽉 차있는 시간입니다.'
        );
        return false;
      }
      Schedule.modal.show();
      ScheduleModel.form.datetime = reserveSlot.toDate();
    }

    function isSelectedSlot(reserveSlot) {
      var selectedHourString = ScheduleModel.selectedSlot.get && ScheduleModel.selectedSlot.get('hour');
      var selectedMinuteString = ScheduleModel.selectedSlot.get && ScheduleModel.selectedSlot.get('minute');
      var selectedTimeString = selectedHourString + ':' + selectedMinuteString;
      var reserveSlotHourString = reserveSlot.get && reserveSlot.get('hour');
      var reserveSlotMinuteString = reserveSlot.get && reserveSlot.get('minute');
      var reserveSlotTimeString = reserveSlotHourString + ':' + reserveSlotMinuteString;
      return selectedTimeString === reserveSlotTimeString;
    }

    function isAvailableSlot(reserveSlot) {

      if (reserveSlot.isBefore(moment())) {
        return false;
      } else if (reserveSlot.bookingCount != null && DetailModel.current.employee != null) {
        return Number(DetailModel.current.employee) > reserveSlot.bookingCount;
      } else {
        return true;
      }
    }

    //------------------------
    // LOGIC INSIDE BOOKING MODAL
    //------------------------
    function selectProductHandler(product) {
      ScheduleModel.form.products = [{
        product: product
      }];
    }

    function isSelectedProduct(product) {
      return ((ScheduleModel.form.products && ScheduleModel.form.products[0] && ScheduleModel.form.products[0].product.id) === product.id);
    }

    function closeModalHandler() {
      Bookings.getBookingsDateBetween({
        placeId: $stateParams.id,
        from: moment($stateParams.selectedDate).clone().toDate().getTime(),
        to: moment($stateParams.selectedDate).clone().add(1, 'days').toDate().getTime()
      }).$promise
        .then(function success(data) {
          // update viewSlots
          ScheduleModel.viewSlots = generateReserveMomentSlots($stateParams.selectedDate, DetailModel.current.openingHours, 30, false);
          updateSlotsWithBookings(data);
          angular.copy({}, ScheduleModel.form);
          Schedule.modal.hide();
        });
    }

    function bookingHandler() {
      ScheduleModel.form.place = $stateParams.id;
      ScheduleModel.form.category = 'NAIL-BOOKING';

      // Validation
      if (!ScheduleModel.form.products || ScheduleModel.form.products.length === 0) {
        Message.loading.hide();
        Message.popUp.alert.default(
          '예약 불가 안내',
          '서비스를 선택해주세요.'
        ).then(function (response) {
          console.log(response);
          //Schedule.closeModalHandler();
        });
        return;
      }

      if (ScheduleModel.form.products[0] == null) {
        return reserveErrorHelper('서비스란');
      } else if (ScheduleModel.form.userKoreanName == null) {
        return reserveErrorHelper('이름란');
      } else if (ScheduleModel.form.userPhoneNumber == null) {
        return reserveErrorHelper('연락처란');
      }

      Message.loading.default();

      Bookings.getBookingsDateBetween({
        placeId: $stateParams.id,
        from: moment($stateParams.selectedDate).clone().toDate().getTime(),
        to: moment($stateParams.selectedDate).clone().add(1, 'days').toDate().getTime()
      }).$promise
        .then(function success(data) {
          ScheduleModel.viewSlots = generateReserveMomentSlots($stateParams.selectedDate, DetailModel.current.openingHours, 30, false);
          updateSlotsWithBookings(data);
          var selectedSlotIsBookable = isSelectedSlotBookable();
          if (selectedSlotIsBookable) {
            makeBooking();
          }
        }, function err(error) {
          console.log(error);
        });
    }

    function doBeforeEnter() {
      var openingHours = DetailModel.current.openingHours;
      ScheduleModel.viewSlots = generateReserveMomentSlots($stateParams.selectedDate, openingHours, 30, false);
      Bookings.getBookingsDateBetween({
        placeId: $stateParams.id,
        from: moment($stateParams.selectedDate).clone().toDate().getTime(),
        to: moment($stateParams.selectedDate).clone().add(1, 'days').toDate().getTime()
      }).$promise
        .then(function success(bookingsWrapper) {
          console.log(bookingsWrapper);
          updateSlotsWithBookings(bookingsWrapper);
        }, function err(error) {
          console.log(error);
        });
    }

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

      var startInMinutes = Number(startHour) * 60 + Number(startMinute);
      var endInMinutes = ableToBookAtEndTimeBool ? Number(endHour) * 60 + Number(endMinute) + interval :
      Number(endHour) * 60 + Number(endMinute);

      var arrayOfSlotsInMinutes = _.range(startInMinutes, endInMinutes, interval);

      var arrayOfSlotsInMoment = [];
      angular.forEach(arrayOfSlotsInMinutes, function (minutes) {
        var reserveMomentCopy = reserveMoment.clone();
        var slot = reserveMomentCopy.set({
          minute: minutes,
          second: 0
        });
        arrayOfSlotsInMoment.push(slot);
      });
      // console.log(arrayOfSlotsInMoment);
      return arrayOfSlotsInMoment;
    }

    function updateSlotsWithBookings(bookingsWrapper) {
      var viewSlots = ScheduleModel.viewSlots;
      var bookings = ScheduleModel.bookings = bookingsWrapper.bookings;
      // var employee = DetailModel.current.employee;
      // var interval = 30;

      angular.forEach(bookings, function (booking) {
        // get beginning time(inclusive)
        var begBookingMoment = moment.utc(booking.datetime).local()
          .add(1, 'seconds');
        var duration = booking.products[0].product && booking.products[0].product.duration;
        // if begTime is between reserveSlot
        // for each viewslots
        var viewSlotEnd = '';
        for (var i = 0; i < viewSlots.length; i++) {
          if (i < viewSlots.length - 1) {
            viewSlotEnd = viewSlots[i + 1];
            // if index is the last one.
          } else if (i === viewSlots.length - 1) {
            viewSlotEnd = viewSlots[i].clone().add(interval, 'minutes');
          }

          // if beginning of booking time is between reserveSlot
          if (begBookingMoment.isBetween(viewSlots[i], viewSlotEnd) && booking.status !== 'CANCELED') {
            // get number of slots to increament booking count;
            var numberOfSlotsTaken = Math.ceil(Number(duration) / Number(interval));
            // increment affected slots bookingCount;
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
      });
    }

    function doAfterEnter() {
      // Set Modal
      $ionicModal.fromTemplateUrl('state/schedule/reserveModal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        })
        .then(function (modal) {
          Schedule.modal = modal;
        });
    }

    function isSelectedSlotBookable() {
      var index = ScheduleModel.selectedIndex;
      if (!ScheduleModel.form.products[0].product) {
        Message.loading.hide();
        Message.popUp.alert.default(
          '예약 불가 안내',
          '현재 예약시스템을 준비 중인 샵입니다.'
        ).then(function (response) {
          console.log(response);
          Schedule.closeModalHandler();
        });
        return false;
      }
      var duration = ScheduleModel.form.products[0].product.duration;
      var numberOfSlots = Math.ceil(duration / interval);
      for (var i = index; i < index + numberOfSlots; i++) {
        // service crashes with other times
        var bookingCounts = ScheduleModel.viewSlots[i].bookingCount ? ScheduleModel.viewSlots[i].bookingCount : 0;
        if (bookingCounts >= Number(DetailModel.current.employee)) {
          Message.loading.hide();
          Message.popUp.alert.default(
            '예약 불가 안내',
            '고르신 서비스의 시간이 다음 예약시간과 겹치게 되어 예약이 불가합니다.'
          );
          return false;
        }
        // service goes out of business hours
        if (index + numberOfSlots > ScheduleModel.viewSlots.length) {
          Message.loading.hide();
          Message.popUp.alert.default(
            '예약 불가 안내',
            '고르신 서비스의 마무리시간이 영업 종료시간을 넘기어 예약이 불가합니다.'
          );
          return false;
        }
      }
      return true;
    }

    function makeBooking() {

      if (!Array.isArray(Schedule.Model.form.products) || Schedule.Model.form.products.length === 0) {
        Message.loading.hide();
        Message.popUp.alert.default(
          '부킹가능한 상품이 없습니다.',
          '부킹가능한 상품을 준비 중입니다.'
        ).then(function (response) {
          console.log(response);
          Schedule.closeModalHandler();
        });
        return;
      }

      return Bookings.requestBooking({}, Schedule.Model.form).$promise
        .then(function success(data) {
          Message.loading.hide();
          Message.popUp.alert.default(
            '예약 완료 알림',
            '예약이 완료 되었습니다.'
          ).then(function (response) {
            console.log(response);
            Schedule.closeModalHandler();
          });
          console.log(data);
        }, function err(error) {
          Message.loading.hide();
          console.log(error);
        });
    }


    //==========================================================================
    //              Check reserve inputs
    //==========================================================================
    function reserveErrorHelper(korean) {
      Message.popUp.alert.default(
        korean + '이 비었습니다.',
        korean + '을 입력/골라 주세요.'
      );
    }


  }


})();

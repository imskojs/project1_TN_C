(function() {
    'use strict';
    angular.module('app')
        .factory('ScheduleModel', ScheduleModel);

    function ScheduleModel() {

        var model = {
            current: {
                openingHours: [{
                    start: '00:00',
                    end: '00:00'
                }, {
                    start: '07:00',
                    end: '20:00'
                }, {
                    start: '07:00',
                    end: '20:00'
                }, {
                    start: '07:00',
                    end: '20:00'
                }, {
                    start: '07:00',
                    end: '20:00'
                }, {
                    start: '09:00',
                    end: '22:00'
                }, {
                    start: '09:00',
                    end: '22:00'
                }]
            },
            selectedSlot: {
                //moment object
            },
            viewSlots: ['moment', 'moment', 'moment'],
            bookings: [{
                datetime: 'datetime',
                products: [{
                    duration: "30"
                }]
            }],

            form: {
                products: [''],
                userKoreanName: null,
                userPhoneNumber: null,
                datetime: new Date(),
                place: 'placeId',
                category: 'NAIL-BOOKING'
            }

        };

        return model;

    }


})();

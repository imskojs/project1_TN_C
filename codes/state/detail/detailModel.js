(function () {
    'use strict';
    angular.module('app')
        .factory('DetailModel', DetailModel);

    DetailModel.$inject = ['$q', '$state', '$stateParams', 'moment', 'Message'];

    function DetailModel($q, $state, $stateParams, moment, Message) {

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
            selectedDate: {
                // dt from datepickeruibootstrap
                current: 'BOOL',
                customClass: 'STRING',
                date: 'DATE',
                disabled: 'BOOL',
            },
            //Coupled with ui-BootStrap.datePicker and
            //DetailModel.selectedDate
            dayClickHandler: function (dt) {

                var currentDate = moment();

                if (currentDate.date() > dt.date.getDate())
                    return;

                if (!this.current.products || this.current.products.length == 0) {
                    Message.loading.hide();
                    Message.popUp.alert.default(
                        '예약 불가 안내',
                        '현재 예약시스템을 준비 중인 샵입니다.'
                    ).then(function (response) {
                            console.log(response);
                        });
                    return;
                }

                var currentDate = new moment();
                currentDate.hour(0);
                if (currentDate > dt.date)
                    return;


                // copies selected date then do below;
                var shopId = $stateParams.id;
                console.log(shopId);

                // dt.date = 2015-08-04
                var selectedDate = moment(dt.date);

                $state.go('main.schedule', {
                    id: shopId,
                    selectedDate: selectedDate.format('YYYY-MM-DD')
                });
            },


        };


        return model;

    }


})();

(function() {
    'use strict';
    myApp
        .factory('DetailModel', DetailModel);

    DetailModel.$inject = ['$q', '$state', '$stateParams'];

    function DetailModel($q, $state, $stateParams) {

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
            dayClickHandler: function(dt) {
                // copies selected date then do below;
                var shopId = $stateParams.id;
                console.log(shopId);

                // selectedDate = 2015-08-04
                var selectedDate = moment(dt.date)

                // var bookings = DetailModel.currentPlace.bookings;

                // Parameters needed to requery a shop detail
                //as things might have changed since shop details.
                $state.go('main.schedule', {
                    id: shopId,
                    selectedDate: selectedDate.format('YYYY-MM-DD')
                })
            },

        };


        return model;

    }


})();

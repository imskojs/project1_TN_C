myApp
    .factory('DetailModel', [

        '$q', '$state', '$stateParams',

        function($q, $state, $stateParams) {

            var DetailModel = {

                currentPlace: {
                    // shop properties from response of queryById
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
                    var shopId = $stateParams.id;
                    //TODO: setUTCHours(0)
                    var selectedDay = moment.utc(dt.date)
                        .set({
                            hour: 0,
                            minute: 0,
                            second: 0
                        })
                        .format('YYYY-MM-DD')
                    var bookings = DetailModel.currentPlace.bookings;

                    // Parameters needed to requery a shop detail
                    //as things might have changed since shop details.
                    $state.go('main.schedule', {
                        id: shopId,
                        dateTime: moment.utc(selectedDay)
                    })
                },

            };


            return DetailModel;

        }
    ]);

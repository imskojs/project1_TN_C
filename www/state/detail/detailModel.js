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









                //==========================================================================
                //              SERVER
                //==========================================================================
                // idParams = {
                //     id: INTEGER  or whatever...
                // }
                queryById: function(idParams) {

                    var MOCK = true;

                    if (!MOCK) {

                        var deferred = $q.defer();
                        $http({
                            url: governorUrl + '/place',
                            method: 'GET',
                            params: idParams,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .success(function(data) {
                                deferred.resolve(data);
                            })
                            .error(function(data) {
                                deferred.reject(data);
                            });

                        return deferred.promise;
                    }
                    //// MOCK START ///
                    else {
                        var deferred = $q.defer();

                        var response = {
                            id: 0,
                            category: 'shop',
                            employee: 3,

                            name: '네일샵 101',
                            photos: [{
                                url: 'img/800/02_main/main01.png',
                                resource_type: 'portfolio'
                            }, {
                                url: 'img/800/02_main/main02.png',
                                resource_type: 'portfolio'
                            }, {
                                url: 'img/800/02_main/main03.png',
                                resource_type: 'portfolio'
                            }],
                            hours: [10, 21],
                            phone: '010010010',
                            address: '강남구 101-101',
                            services: [{
                                name: '기본',
                                price: 15000,
                                duration: 0.5
                            }, {
                                name: '젤 원컬러',
                                price: 17000,
                                duration: 1.5
                            }, {
                                name: '젤 투컬러',
                                price: 20000,
                                duration: 2
                            }],
                            bookings: [{
                                dateTime: new Date(),
                                products: [{
                                    name: '기본',
                                    price: 14000,
                                    duration: 1.5
                                }],
                                duration: 1.5
                            }],


                            latitude: 37.5691469,
                            longitude: 126.978647,
                            description: '네일샵에 오신것을 환영합니다 101'
                        };

                        deferred.resolve(response);
                        return deferred.promise;
                    } /// MOCK END ////
                } /// queryById END ///
            };


            return DetailModel;

        }
    ]);

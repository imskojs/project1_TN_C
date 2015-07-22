myApp
.factory('ScheduleModel', [

'$q',

function ($q){
    
    var ScheduleModel = {
//==========================================================================
//              Server update schedule array
//==========================================================================
            // bookObj= {
            //     name: '원톤 베이직',
            //     price: 19000,
            //     duration: 2.5,
            //     username: '개나리',
            //     realname: '홍길동',
            //     userPhone: 01011112222
            // };
            // 
            // params = {id: 1, time: 12.5};
        updateSchedule: function (bookObj, params){

            var MOCK = true;

            if (!MOCK) {

                var deferred = $q.defer();
                $http({
                    url:  governorUrl + '/place',
                    method: 'POST',
                    data: bookObj,
                    params: params,
                    headers: {'Content-Type': 'application/json'}
                })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

                return deferred.promise;

            } 
            //// MOCK START ///
            else {
                var deferred = $q.defer();
                var response = {





                }
                deferred.resolve(response);
                return deferred.promise;
            }/// MOCK END ////
        },/// updateSchedule END ///


        // idParams = {
        //     id: INTEGER  or whatever...
        // }
        queryById: function (idParams){

            var MOCK = true;

            if (!MOCK) {

                var deferred = $q.defer();
                $http({
                    url:  governorUrl + '/place',
                    method: 'GET',
                    params: idParams,
                    headers: {'Content-Type': 'application/json'}
                })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
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
                    employee: 4,

                    name: '네일샵 101',
                    photos: [
                        {url: 'img/800/02_main/main01.png'},
                        {url: 'img/800/02_main/main02.png'},
                        {url: 'img/800/02_main/main03.png'}
                    ],
                    hours: [10, 21],
                    phone: '010010010',
                    address: '강남구 101-101',
                    services: [
                        {
                            name: '기본',
                            price: 15000,
                            duration: 0.5
                        },
                        {
                            name: '젤 원컬러',
                            price: 17000,
                            duration: 1.5
                        },
                        {
                            name: '젤 투컬러',
                            price: 20000,
                            duration: 2 
                        }
                    ],
                    schedules: [
                        {
                         date: new Date(),
                         slots: [
                              {
                                   time: 12.5,
                                   fullyBooked: true, //if > employee true,
                                   bookedServices: [
                                        {
                                           name: '원톤 베이직',
                                           price: 19000,
                                           duration: 1.5,
                                           username: 'user101',
                                           start: true,
                                           end: false
                                        },
                                        {
                                           name: '투톤 베이직',
                                           price: 21000,
                                           duration: 2,
                                           username: 'user202',
                                           start: false,
                                           end: false
                                        },
                                        {
                                           name: '그라데이션',
                                           price: 23000,
                                           duration: 2.5, 
                                           username: 'user303', 
                                           start: false,
                                           end: true
                                        }
                                   ],
                                   numberOfBooks: 3 //bookedServices.length,
                              }
                         ]
                        }
                    ],


                    latitude: 37.5691469,
                    longitude: 126.978647,
                    description: '네일샵에 오신것을 환영합니다 101'
                };

                deferred.resolve(response);
                return deferred.promise;
            } /// MOCK END ////
        } /// queryById END ///

    };

    return ScheduleModel;

}])
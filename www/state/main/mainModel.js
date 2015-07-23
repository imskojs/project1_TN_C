myApp
    .factory('MainModel', [

        function() {
            var MainModel = {
                sideMenuLists: [{
                    state: 'main.home',
                    text: '홈으로 가기'
                }, {
                    state: 'main.show.savedList',
                    text: '담아온 것 모아보기'
                }, {
                    state: 'main.balance.list',
                    text: '적립금 확인'
                }, {
                    state: 'main.cancel',
                    text: '예약 변경 및 취소'
                }, {
                    state: 'main.announcements.eventList',
                    text: '이벤트 / 공지사항'
                }]
            };

            return MainModel;
        }
    ])

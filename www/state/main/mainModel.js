myApp
    .factory('MainModel', [

        function() {
            var MainModel = {
                sideMenuLists: [{
                    state: 'main.home',
                    text: '홈으로 가기'
                }, {
                    state: 'main.show.savedList',
                    text: '마이갤러리'
                }, {
                    state: 'main.balance.list',
                    text: '적립금 확인'
                }, {
                    state: 'main.cancel',
                    text: '예약 취소'
                }, {
                    state: 'main.announcements.eventList',
                    text: '이벤트 / 공지사항'
                }],
                currentItem: {
                    state: 'main.home',
                    text: '홈으로 가기'
                },
                setting: {
                    location: 'on',
                    push: 'on'
                }
            };

            return MainModel;
        }
    ])

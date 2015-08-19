(function() {
    'use strict';

    angular.module('app')
        .factory('MainModel', MainModel);

    function MainModel() {
        var model = {
            user: {
                //KaKao
                id: "test55cc92edc96284828b826258",
                username: "test49720641",
                nickname: "test",
                profile_image: "http://mud-kage.kakao.co.kr/14/dn/btqcfpt4vNR/Fmmz6xsVRH05wv1UYNniRK/o.jpg",
                thumbnail_image: "http://mud-kage.kakao.co.kr/14/dn/btqcfp1VCch/LjjO9lFj9uwxpOB59NHEnK/o.jpg",
                //Facebook
                // id: "55cclkasdjfklasjdfkl"
                // username: "49720641",
                // nickname: "KoS",
                // profile_image: "http://mud-kage.kakao.co.kr/14/dn/btqcfpt4vNR/Fmmz6xsVRH05wv1UYNniRK/o.jpg"

            },
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
                pushNotification: true
            }
        };

        return model;
    }

})();

(function() {
    'use strict';
    myApp
        .controller('AnnouncementsController', AnnouncementsController);

    AnnouncementsController.$inject = ['$state'];

    function AnnouncementsController($state) {

        var Announcements = this;

        Announcements.goToEventListHandler = function() {
            $state.go('main.announcements.eventList')
        }
        Announcements.goToNoticeListHandler = function() {
            $state.go('main.announcements.noticeList')
        }
    }


})();

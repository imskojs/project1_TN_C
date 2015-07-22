myApp
    .controller('AnnouncementsController', [

        '$state',

        function($state) {

            var Announcements = this;

            Announcements.goToEventListHandler = function() {
                $state.go('main.announcements.eventList')
            }
            Announcements.goToNoticeListHandler = function() {
                $state.go('main.announcements.noticeList')
            }

        }
    ]);

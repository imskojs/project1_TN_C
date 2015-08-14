(function() {
    'use strict';
    angular.module('app')
        .controller('AnnouncementsController', AnnouncementsController);

    AnnouncementsController.$inject = ['$state', 'AnnouncementsModel'];

    function AnnouncementsController($state, AnnouncementsModel) {

        var Announcements = this;
        Announcements.Model = AnnouncementsModel;

        Announcements.goToHandler = goToHandler;

        //------------------------
        //  IMPLEMENTATIONS
        //------------------------

        function goToHandler(state, params) {
            return $state.go(state, params);
        }

    }
})();

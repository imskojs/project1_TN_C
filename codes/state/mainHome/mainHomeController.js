(function() {
    'use strict';
    angular.module('app')
        .controller('MainHomeController', MainHomeController);
    MainHomeController.$inject = ['MainHomeModel', '$state'];

    function MainHomeController(MainHomeModel, $state) {

        var Home = this;

        Home.search = ''


        Home.goToHandler = function(state, params) {
            $state.go(state, params);
        }

        // APP SPECIFIC
        Home.searchHandler = function(search) {
            $state.go('main.daumMap', {
                from: 'homeInput'
            })
        }
    }


})();
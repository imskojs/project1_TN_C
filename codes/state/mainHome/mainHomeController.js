(function() {
    'use strict';
    angular.module('app')
        .controller('MainHomeController', MainHomeController);
    MainHomeController.$inject = ['MainHomeModel', '$state'];

    function MainHomeController(MainHomeModel, $state) {

        var Home = this;

        Home.search = '';


        Home.goToHandler = goToHandler;
        Home.searchHandler = searchHandler;

        //------------------------
        //  IMPLEMENTATIONS
        //------------------------
        function goToHandler(state, params) {
            $state.go(state, params);
        }

        function searchHandler(search) {
            console.log(search);
            $state.go('main.daumMap', {
                from: 'homeInput'
            });
        }

    }
})();

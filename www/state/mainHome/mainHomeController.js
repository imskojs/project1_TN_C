myApp
    .controller('MainHomeController', [
        'MainHomeModel', '$state',
        function(MainHomeModel, $state) {

            var Home = this;

            Home.search = ''


            Home.goToHandler = function(state) {
                $state.go(state);
            }

            // APP SPECIFIC
            Home.searchHandler = function(search) {
                $state.go('main.daumMap', {from: 'homeInput'})
            }


        }
    ])

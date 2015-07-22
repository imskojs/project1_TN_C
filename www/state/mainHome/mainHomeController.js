myApp
    .controller('MainHomeController', [
        'MainHomeModel', '$state',
        function(MainHomeModel, $state) {

            var Home = this;

            Home.search = ''

            Home.searchHandler = function(search) {

            }

            Home.goToHandler = function(state) {
                $state.go(state);
            }



        }
    ])

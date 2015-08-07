myApp
    .controller('MainHomeController', [
        'MainHomeModel', '$state',
        function(MainHomeModel, $state) {

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
    ])

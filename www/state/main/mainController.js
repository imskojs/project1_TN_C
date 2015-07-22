myApp
    .controller('MainController', [

        '$ionicSideMenuDelegate', 'MainModel', '$state', '$timeout',
        '$ionicNavBarDelegate',

        function($ionicSideMenuDelegate, MainModel, $state, $timeout,
            $ionicNavBarDelegate
        ) {

            var Main = this;

            Main.toggleSideMenu = function() {
                $ionicSideMenuDelegate.toggleLeft();
            }

            Main.sideMenuLists = MainModel.sideMenuLists;

            Main.menuSelectHandler = function(state) {
                $state.go(state)
                $ionicSideMenuDelegate.toggleLeft(false);
            }

            Main.settingMenuHandler = function() {
                Main.settingSubMenu = !Main.settingSubMenu;
            }

            // END
        }
    ]);

(function() {
    'use strict';

    myApp
        .controller('MainController', MainController);

    MainController.$inject = ['$ionicSideMenuDelegate', 'MainModel', '$state', '$timeout',
        '$ionicNavBarDelegate', '$ionicHistory'
    ];

    function MainController($ionicSideMenuDelegate, MainModel, $state, $timeout,
        $ionicNavBarDelegate, $ionicHistory
    ) {

        var Main = this;

        Main.Model = MainModel;

        Main.toggleSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        }


        Main.menuSelectHandler = function(item) {
            MainModel.currentItem = item;
            $state.go(item.state)
            $ionicSideMenuDelegate.toggleLeft(false);
        }

        Main.getCurrentState = function() {
            return $ionicHistory.currentStateName()
        }

        Main.toggleAccordion = function() {
            Main.settingSubMenu = !Main.settingSubMenu;
        }

        Main.toggleSettingHandler = function(setting) {
            if (MainModel.setting[setting] === 'on') {
                MainModel.setting[setting] = 'off'
            } else {
                MainModel.setting[setting] = 'on'
            }

            //req server to turn off setting.
        }

        Main.goToDaumMapHandler = function() {
            $state.go('main.daumMap');
        }

    } // END

})();

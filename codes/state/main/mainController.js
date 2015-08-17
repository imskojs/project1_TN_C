(function () {
    'use strict';

    angular.module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$ionicSideMenuDelegate', 'MainModel', '$state', '$timeout',
        '$ionicNavBarDelegate', '$ionicHistory', 'localStorage', '$scope', 'appName'
    ];

    function MainController($ionicSideMenuDelegate, MainModel, $state, $timeout,
                            $ionicNavBarDelegate, $ionicHistory, localStorage, $scope, appName) {

        var Main = this;
        Main.Model = MainModel;

        Main.toggleSideMenu = toggleSideMenu;
        Main.menuSelectHandler = menuSelectHandler;
        Main.getCurrentState = getCurrentState;
        Main.toggleAccordion = toggleAccordion;
        Main.toggleSettingHandler = toggleSettingHandler;
        Main.goToDaumMapHandler = goToDaumMapHandler;
        Main.displayUserName = displayUserName;

        $scope.$on('$ionicView.beforeEnter', doBeforeEnter);

        //------------------------
        //  IMPLEMENTATIONS
        //------------------------
        function toggleSideMenu() {
            $ionicSideMenuDelegate.toggleLeft();
        }

        function menuSelectHandler(item) {
            MainModel.currentItem = item;
            $state.go(item.state);
            $ionicSideMenuDelegate.toggleLeft(false);
        }

        function getCurrentState() {
            return $ionicHistory.currentStateName();

        }

        function toggleAccordion() {
            Main.settingSubMenu = !Main.settingSubMenu;
        }

        function toggleSettingHandler(setting) {
            if (MainModel.setting[setting] === 'on') {
                MainModel.setting[setting] = 'off';
            } else {
                MainModel.setting[setting] = 'on';
            }
            //req server to turn off setting.
        }

        function goToDaumMapHandler() {
            $state.go('main.daumMap');
        }

        function doBeforeEnter() {
            var userWrapper = angular.fromJson(localStorage.getItem(appName + '_' + 'auth_token'));
            MainModel.user = userWrapper.user;
            console.log(MainModel.user);
        }

        function displayUserName() {
            var displayName = 'User' + MainModel.user.username;

            if (MainModel.user.nickname)
                displayName = MainModel.user.nickname;

            return displayName;
        }


    } // END

})();

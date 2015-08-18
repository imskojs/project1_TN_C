(function() {
    'use strict';

    angular.module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$ionicSideMenuDelegate', 'MainModel', '$state', '$timeout',
        '$ionicNavBarDelegate', '$ionicHistory', 'localStorage', '$scope', 'appName', 'Devices',
        'PushService', '$rootScope'
    ];

    function MainController($ionicSideMenuDelegate, MainModel, $state, $timeout,
        $ionicNavBarDelegate, $ionicHistory, localStorage, $scope, appName, Devices,
        PushService, $rootScope) {

        var Main = this;
        Main.Model = MainModel;

        Main.toggleSideMenu = toggleSideMenu;
        Main.menuSelectHandler = menuSelectHandler;
        Main.getCurrentState = getCurrentState;
        Main.toggleAccordion = toggleAccordion;
        Main.togglePushHandler = togglePushHandler;
        Main.goToDaumMapHandler = goToDaumMapHandler;
        Main.displayUserName = displayUserName;

        $rootScope.nickname = MainModel.user.nickname;
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

        function togglePushHandler() {
            if (MainModel.setting.pushNotification === true) {
                MainModel.setting.pushNotification = false;
            } else {
                MainModel.setting.pushNotification = true;
            }
            //req server to turn off setting.
            // Getting device Id does not work.
            PushService.updateDeviceToken(MainModel.setting.pushNotification);


            // Devices.update({
            //     deviceId: PushService.getDeviceId()
            // }, {
            //     active: MainModel.setting.pushNotification
            // }).$promise
            //     .then(function success(data) {
            //         console.log(data);
            //     }, function err(error) {
            //         console.log(error);
            //     });
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

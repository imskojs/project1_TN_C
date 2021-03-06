(function () {
    'use strict';
    angular.module('app')
        .factory('Message', Message);

    Message.$inject = ['$ionicLoading', '$ionicPopup'];

    function Message($ionicLoading, $ionicPopup) {
        var service = {

            loading: {
                default: loadingDefault,
                hide: loadingHide
            },
            message: {
                success: messageSuccess,
                error: messageError
            },
            popUp: {
                alert: {
                    default: popUpAlertDefault
                },
                confirm: popUpConfirm
            }
        };

        return service;

        function loadingDefault(message) {
            $ionicLoading.show(message);
        }

        function messageSuccess(message) {
            $ionicLoading.show({
                template: '<h4 class="message-success">' + message + '</h4>',
                duration: 2000
            });
        }

        function messageError(message) {
            $ionicLoading.show({
                template: '<h4 class="message-error">' + message + '</h4>',
                duration: 2000
            });
        }

        function loadingHide() {
            $ionicLoading.hide();
        }

        function popUpAlertDefault(title, message) {

            $ionicLoading.hide();

            return $ionicPopup.alert({
                title: title || '인터넷이 끊겼습니다.',
                template: message || '인터넷을 켜주세요.'
            });
        }

        function popUpConfirm(title, message) {

            $ionicLoading.hide();

            return $ionicPopup.confirm({
                title: title || '인터넷이 끊겼습니다.',
                template: message || '인터넷을 켜주세요.'
            });
        }


    }


})();

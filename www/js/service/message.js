myApp
    .factory('Message', [

        '$ionicLoading', '$ionicPopup',

        function($ionicLoading, $ionicPopup) {
            var Message = {

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
                    }
                }
            };

            return Message;

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
                $ionicPopup.alert({
                    title: title || '인터넷이 끊겼습니다.',
                    template: message || '인터넷을 켜주세요.'
                });
            }


        }
    ]);
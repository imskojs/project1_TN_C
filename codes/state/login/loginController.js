(function () {
    'use strict';
    angular.module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'LoginModel', 'AuthService', 'Message', '$state', '$window'];

    function LoginController($scope, LoginModel, AuthService, Message, $state, $window) {

        $scope.$on('$ionicView.beforeEnter', function () {
            Message.loading.hide();
        });

        $scope.$on('$ionicView.afterEnter', function () {
            Message.loading.hide();
        });

        var Login = this;
        Login.Model = LoginModel;

        Login.loginWithFaceBook = loginWithFacebook;
        Login.loginWithKaKaoTalk = loginWithKaKaoTalk;
        //------------------------
        //  IMPLEMENTATIONS
        //------------------------
        function loginWithFacebook() {

            return AuthService.loginWithFacebook()
                .then(function success(data) {
                    console.log(data);
                    Message.loading.hide();
                    $state.go('main.home');
                }, function err(error) {
                    console.log(error);
                });
        }

        function loginWithKaKaoTalk() {

            return AuthService.loginWithKakao()
                .then(function (data) {
                    console.log(data);
                    Message.loading.hide();
                    $state.go('main.home');
                }, function err(error) {
                    console.log(error);
                });
        }
    }
})();

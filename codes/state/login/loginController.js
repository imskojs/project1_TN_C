(function() {
    'use strict';
    angular.module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginModel', 'AuthService', 'Message', '$state'];

    function LoginController(LoginModel, AuthService, Message, $state) {

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
                .then(function(data) {
                    console.log(data);
                    Message.loading.hide();
                    $state.go('main.home');
                }, function err(error) {
                    console.log(error);
                });
        }
    }
})();

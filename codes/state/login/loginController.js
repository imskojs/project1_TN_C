(function() {
    'use strict';
    angular.module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginModel', 'AuthService'];

    function LoginController(LoginModel, AuthService) {

        var Login = this;
        Login.Model = LoginModel;
        Login.loginWithFaceBook = function() {
            AuthService.loginWithFacebook();
        };
        Login.loginWithKaKaoTalk = function() {
            AuthService.loginWithKakao();
        };
        //------------------------
        //  IMPLEMENTATIONS
        //------------------------
    }
})();

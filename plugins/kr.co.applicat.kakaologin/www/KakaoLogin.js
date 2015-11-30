/*global cordova, module*/

var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');

module.exports = {
    login: function (name, successCallback, errorCallback) {
        exec(successCallback, errorCallback, "KakaoLogin", "login", [name]);
    }
};

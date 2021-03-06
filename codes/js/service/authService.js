(function () {
    'use strict';

    angular.module('app')
        .factory('AuthInterceptor', AuthInterceptor);

    AuthInterceptor.$inject = ['$q', '$location', 'LocalService', 'appName'];

    function AuthInterceptor($q, $location, LocalService, appName) {

        return {
            request: function (config) {

                var token = LocalService.get(appName + '_auth_token');

                if (token) {
                    token = angular.fromJson(LocalService.get(appName + '_auth_token')).token;
                }

                if (token) {
                    config.headers['Content-Type'] = 'application/json';
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            responseError: function (response) {
                if (response.status === 401 || response.status === 403 || response.status === 405 || response.status === 498) {

                    if ($location.path() !== "/login") {

                        LocalService.unset(appName + '_auth_token');
                        $location.path("/login");

                        if (response.data == null || response.data == undefined) {
                            response.data = {
                                message: "권한이 없는 페이지이거나 로그인하지 않았습니다. 로그인해주세요."
                            };
                        }
                    } else {
                        response.data.hideMessage = true;
                    }
                }
                return $q.reject(response);
            }
        }
    }


    angular.module('app')
        .service("AuthService", AuthService);

    AuthService.$inject = ['$rootScope', '$http', '$q', '$location', '$state', 'governorUrl',
        'LocalService', 'appName', 'kakaoKey', '$cordovaOauth', '$window', '$timeout'];

    function AuthService($rootScope, $http, $q, $location, $state, governorUrl,
                         LocalService, appName, kakaoKey, $cordovaOauth, $window, $timeout) {

        var user = null;

        function setUser(userInfo) {
            user = userInfo;
        }

        this.getUser = function () {
            return user;
        }


        this.getToken = function () {
            var token = LocalService.get(appName + '_auth_token');

            if (token) {
                token = angular.fromJson(LocalService.get(appName + '_auth_token')).token;
                return token;
            } else {
                $state.go('login');
            }
        }

        this.init = function () {
            var token = JSON.parse(LocalService.get(appName + '_auth_token'));
            if (token != null && token.user != null)
                setUser(token.user);
        }

        this.register = function (user) {

            var deferred = $q.defer();

            $http({
                url: governorUrl + '/user/register',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: user
            })
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        this.login = function (email, password) {

            var deferred = $q.defer();

            $http({
                url: governorUrl + '/auth/local',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    'identifier': email,
                    'password': password
                }
            })
                .success(function (data, status, headers, config) {

                    console.log(data);
                    LocalService.set(appName + '_auth_token', JSON.stringify(data));
                    setUser(data.user);

                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    console.log(data);
                    deferred.reject(data);
                });

            return deferred.promise;

        }


        this.logout = function () {
            LocalService.unset(appName + '_auth_token');
            setUser(null);
            $location.path("/login");
        }

        this.changePassword = function (oldPassword, newPassword) {

            var deferred = $q.defer();

            $http({
                url: governorUrl + '/user/changePassword',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    'oldPassword': oldPassword,
                    'newPassword': newPassword
                }
            })
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);
                });

            return deferred.promise;
        }

        this.checkNickname = function (nickname) {

            var deferred = $q.defer();

            $http({
                url: governorUrl + '/user/checknickname',
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    nickname: nickname
                }
            })
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        this.checkEmail = function (email) {

            var deferred = $q.defer();

            $http({
                url: governorUrl + '/user/checkEmail',
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    email: email
                }
            })
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        this.getMyProfile = function () {
            var deferred = $q.defer();

            $http({
                url: governorUrl + '/user/profile',
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        this.updateMyProfile = function (nickname) {
            var deferred = $q.defer();

            $http({
                url: governorUrl + '/user/update',
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    nickname: nickname
                }
            })
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        this.updateMyProfileWithImage = function (user, file, success, fail) {

            var options = new FileUploadOptions();

            var updateUser = angular.copy(user);

            options.params = updateUser;
            options.httpMethod = 'PUT';
            options.headers = {
                Connection: "close",
                Authorization: 'Bearer ' + this.getToken()
            }
            options.chunkedMode = false;

            var ft = new FileTransfer();

            ft.upload(file, encodeURI(governorUrl + '/user/updateWithImage'), success, fail, options, true);
        }


        this.loginWithKakao = function () {


            var deferred = $q.defer();

            if ($window.cordova && $window.cordova.plugins.KakaoLogin) {
                $window.cordova.plugins.KakaoLogin.login('login', function (data) {

                    var result = {};
                    result.provider = 'kakao';
                    result.access_token = data;

                    registerLogin(result);

                }, function (error) {
                    console.log("error: " + error);
                    console.log(kakaoKey);

                    $cordovaOauth.kakao(kakaoKey).then(function (result) {
                        result.provider = 'kakao';

                        registerLogin(result);

                    }, function (error) {
                        deferred.reject(error);
                    });

                })
            }


            function registerLogin(result) {

                console.log('kakao server result');
                console.log(result);
                $http({
                    url: governorUrl + '/auth/register',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: result
                })
                    .success(function (data, status, headers, config) {

                        LocalService.set(appName + '_auth_token', JSON.stringify(data));
                        console.log('kakao response from server');
                        console.log(JSON.stringify(data, null, 2));
                        console.log(JSON.stringify(data.user, null, 2));
                        setUser(data.user);

                        deferred.resolve({
                            message: 'done'
                        });
                    })
                    .error(function (data, status, headers, config) {
                        console.log(data);
                        deferred.reject("서버에 연결이 끊어 졋습니다.");
                    });
            }


            return deferred.promise;
        };

        this.loginWithFacebook = function () {



            var deferred = $q.defer();

            facebookConnectPlugin.login(['public_profile', 'email'],
                function (response) {

                    console.log('AuthService.login - facebook server result');
                    console.log('Access token is: ' + response);

                    var result = {
                        provider: 'facebook',
                        access_token: response.authResponse.accessToken
                    };

                    connectFacebookWithServer(result);

                }, function () {
                    console.log('failed to load facebook');
                    deferred.reject({message: 'failed to login to facebook'});
                });

            function connectFacebookWithServer(result) {
                $http({
                    url: governorUrl + '/auth/register',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: result
                })
                    .success(function (data, status, headers, config) {

                        LocalService.set(appName + '_auth_token', JSON.stringify(data));
                        setUser(data.user);
                        console.log('facebook response from our server');
                        console.log(JSON.stringify(data, null, 2));
                        console.log(JSON.stringify(data.user, null, 2));

                        deferred.resolve({
                            message: 'done'
                        });
                    })
                    .error(function (data, status, headers, config) {
                        console.log(data, status, headers, config);
                        deferred.reject(data);
                    });

            }

            return deferred.promise;
        }
    }
})();

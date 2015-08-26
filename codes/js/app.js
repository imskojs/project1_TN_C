// Ionic Starter App
(function() {
    'use strict';

    angular.module('app', [
        'applicat.push.service',
        'ionic',
        'ngCordova',
        'ngResource',
        'ngTemplates',
        'permission',

        "ui.bootstrap.tpls",
        "ui.bootstrap.datepicker"
    ])

    .run([

        '$ionicPlatform', '$rootScope', '$stateParams', '$state', 'AuthService', 'Permission', '$window', 'PushService',

        function($ionicPlatform, $rootScope, $stateParams, $state, AuthService, Permission, $window, PushService) {

            AuthService.init();

            console.log(Permission);
            Permission
                .defineRole('user', function() {
                    var user = AuthService.getUser();
                    console.log(user);
                    if (user) {
                        return true;
                    }
                    return false;
                });


            $ionicPlatform.ready(function() {
                if ($window.cordova && $window.cordova.plugins.Keyboard) {
                    $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    PushService.registerDevice();
                }
                if ($window.StatusBar) {
                    $window.StatusBar.styleDefault();
                }
            });

            // AuthService.login('admin', 'admin1234')
            //     .then(function() {
            //         $state.go('main.home');
            //     });

            $state.go('main.home');
        }
    ])

    .config([

        '$stateProvider', '$httpProvider',

        function($stateProvider, $httpProvider) {

            // Security handler
            $httpProvider.interceptors.push('AuthInterceptor');

            // Allow session
            // $httpProvider.defaults.withCredentials = true;

            $stateProvider

            .state('login', {
                url: '/login',
                templateUrl: 'state/login/login.html',
                controller: 'LoginController as Login'
            })

            .state('main', {
                abstract: true,
                url: '/main',
                templateUrl: 'state/main/main.html',
                controller: 'MainController as Main'
            })

            .state('main.home', {
                url: '/home',
                views: {
                    main: {
                        templateUrl: 'state/mainHome/mainHome.html',
                        controller: 'MainHomeController as Home'
                    }
                },
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: {
                            otherwise: {
                                state: 'login'
                            }
                        }
                    }
                }
            })

            // .state('main.list', {
            //     url: '/list',
            //     views: {
            //         main: {
            //             templateUrl: 'state/list/list.html',
            //             controller: 'ListController as List'
            //         }
            //     },
            //     data: {
            //         permissions: {
            //             only: ['user'],
            //             redirectTo: {
            //                 otherwise: {
            //                     state: 'login'
            //                 }
            //             }
            //         }
            //     }
            // })

            .state('main.daumMap', {
                url: '/daumMap/:from',
                views: {
                    main: {
                        templateUrl: 'state/daumMap/daumMap.html',
                        controller: 'DaumMapController as Map'
                    }
                },
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: {
                            otherwise: {
                                state: 'login'
                            }
                        }
                    }
                }
            })

            .state('main.detail', {
                url: '/detail/:id',
                views: {
                    main: {
                        templateUrl: 'state/detail/detail.html',
                        controller: 'DetailController as Detail'
                    }
                },
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: {
                            otherwise: {
                                state: 'login'
                            }
                        }
                    }
                }
            })

            .state('main.schedule', {
                url: '/schdule/:id/:selectedDate',
                views: {
                    main: {
                        templateUrl: 'state/schedule/schedule.html',
                        controller: 'ScheduleController as Schedule'
                    }
                },
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: {
                            otherwise: {
                                state: 'login'
                            }
                        }
                    }
                }
            })

            .state('main.balance', {
                url: '/balance',
                abstract: true,
                views: {
                    main: {
                        templateUrl: 'state/balance/balance.html',
                        controller: 'BalanceController as Balance'
                    }
                }
            })
                .state('main.balance.list', {
                    url: '/list',
                    views: {
                        balance: {
                            templateUrl: 'state/balance/list/balanceList.html',
                            controller: 'BalanceListController as BalanceList'
                        }
                    },
                    data: {
                        permissions: {
                            only: ['user'],
                            redirectTo: {
                                otherwise: {
                                    state: 'login'
                                }
                            }
                        }
                    }

                })
                .state('main.balance.detail', {
                    url: '/detail/:placeName/:points',
                    views: {
                        balance: {
                            templateUrl: 'state/balance/detail/balanceDetail.html',
                            controller: 'BalanceDetailController as BalanceDetail'
                        }
                    },
                    data: {
                        permissions: {
                            only: ['user'],
                            redirectTo: {
                                otherwise: {
                                    state: 'login'
                                }
                            }
                        }
                    }

                })

            .state('main.cancel', {
                url: '/cancel',
                views: {
                    main: {
                        templateUrl: 'state/cancel/cancel.html',
                        controller: 'CancelController as Cancel'
                    }
                },
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: {
                            otherwise: {
                                state: 'login'
                            }
                        }
                    }
                }

            })

            .state('main.favorite', {
                url: '/favorite',
                views: {
                    main: {
                        templateUrl: 'state/favorite/favorite.html',
                        controller: 'FavoriteController as Favorite'
                    }
                },
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: {
                            otherwise: {
                                state: 'login'
                            }
                        }
                    }
                }

            })

            .state('main.show', {
                url: '/show',
                abstract: true,
                views: {
                    main: {
                        templateUrl: 'state/show/show.html',
                        controller: 'ShowController as Show'
                    }
                }
            })
                .state('main.show.list', {
                    url: '/list',
                    views: {
                        show: {
                            templateUrl: 'state/show/list/showList.html',
                            controller: 'ShowListController as ShowList'
                        }
                    },
                    data: {
                        permissions: {
                            only: ['user'],
                            redirectTo: {
                                otherwise: {
                                    state: 'login'
                                }
                            }
                        }
                    }

                })
                .state('main.show.savedList', {
                    url: '/savedList',
                    views: {
                        show: {
                            templateUrl: 'state/show/savedShow/savedShowList.html',
                            controller: 'SavedShowListController as SavedShowList'
                        }
                    },
                    data: {
                        permissions: {
                            only: ['user'],
                            redirectTo: {
                                otherwise: {
                                    state: 'login'
                                }
                            }
                        }
                    }
                })
                .state('main.show.detail', {
                    url: '/detail/:id',
                    views: {
                        show: {
                            templateUrl: 'state/show/detail/showDetail.html',
                            controller: 'ShowDetailController as ShowDetail'
                        }
                    },
                    data: {
                        permissions: {
                            only: ['user'],
                            redirectTo: {
                                otherwise: {
                                    state: 'login'
                                }
                            }
                        }
                    }
                })

            .state('main.announcements', {
                abstract: true,
                url: '/announcements',
                views: {
                    main: {
                        templateUrl: 'state/announcements/announcements.html',
                        controller: 'AnnouncementsController as Announcements'
                    }
                }
            })
                .state('main.announcements.eventList', {
                    url: '/eventList',
                    views: {
                        announcements: {
                            templateUrl: 'state/announcements/event/eventList.html',
                            controller: 'EventListController as EventList'
                        }
                    },
                    data: {
                        permissions: {
                            only: ['user'],
                            redirectTo: {
                                otherwise: {
                                    state: 'login'
                                }
                            }
                        }
                    }
                })
                .state('main.announcements.eventDetail', {
                    url: '/eventDetail/:id',
                    views: {
                        announcements: {
                            templateUrl: 'state/announcements/event/eventDetail.html',
                            controller: 'EventDetailController as EventDetail'
                        }
                    },
                    data: {
                        permissions: {
                            only: ['user'],
                            redirectTo: {
                                otherwise: {
                                    state: 'login'
                                }
                            }
                        }
                    }
                })
                .state('main.announcements.noticeList', {
                    url: '/noticeList',
                    views: {
                        announcements: {
                            templateUrl: 'state/announcements/notice/noticeList.html',
                            controller: 'NoticeListController as NoticeList'
                        }
                    },
                    data: {
                        permissions: {
                            only: ['user'],
                            redirectTo: {
                                otherwise: {
                                    state: 'login'
                                }
                            }
                        }
                    }
                })
                .state('main.announcements.noticeDetail', {
                    url: '/noticeDetail/:id',
                    views: {
                        announcements: {
                            templateUrl: 'state/announcements/notice/noticeDetail.html',
                            controller: 'NoticeDetailController as NoticeDetail'
                        }
                    },
                    data: {
                        permissions: {
                            only: ['user'],
                            redirectTo: {
                                otherwise: {
                                    state: 'login'
                                }
                            }
                        }
                    }
                });
        } //END
    ]);

})();

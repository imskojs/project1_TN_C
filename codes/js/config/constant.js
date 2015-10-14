/**
 * Created by Andy on 6/6/2015
 * As part of myfitmate
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Andy Yoon Yong Shin - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Andy Yoon Yong Shin <andy.shin@applicat.co.kr>, 6/6/2015
 *
 */

/**
 * Created by Andy on 5/26/2015
 * As part of beijingtongclient
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Andy Yoon Yong Shin - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Andy Yoon Yong Shin <andy.shin@applicat.co.kr>, 5/26/2015
 *
 */


/*
 *
 * Constant app config
 *
 */


(function () {
    'use strict';

    angular.module('app')
        //.constant("governorUrl", "http://localhost:1337")
        //.constant("governorUrl", "http://192.168.0.4:1337")
        .constant("governorUrl", "http://todaynail.applicat.co.kr")
        .constant("appName", "todayNail")
        .constant("kakaoKey", "42022d8578d6fb558d70ae75766ee900")
        .constant("facebookKey", '983668071678162')
        .constant("googlePushSenderID", "282095615414");
    // .constant("appId", 2)
})();

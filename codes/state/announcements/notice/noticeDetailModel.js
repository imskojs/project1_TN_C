(function() {
    'use strict';
    angular.module('app')
        .factory('NoticeDetailModel', NoticeDetailModel);

    function NoticeDetailModel() {

        var model = {
            post: {
                id: '',
                comments: [],
                photos: [{
                    url: ''
                }],
                content: '',
                title: '',
                category: 'NOTICE-POST',
                createdBy: {
                    nickname: ''
                }
            }
        };

        return model;
    }


})();

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
                category: 'SHOW-POST',
                createdBy: {
                    nickname: ''
                }
            }
        };

        return model;
    }


})();
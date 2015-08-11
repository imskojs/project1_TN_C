(function() {
    'use strict';

    angular.module('app')
        .factory('NoticeListModel', NoticeListModel);

    function NoticeListModel() {

        var model = {
            postsWrapper: {
                posts: [{
                    title: '',
                    content: '',
                    category: '',
                    comments: [],
                    photos: [{
                        url: ''
                    }]
                }],
                more: true
            }
        };

        return model;

    }

})();
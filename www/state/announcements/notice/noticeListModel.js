(function() {
    'use strict';

    myApp
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

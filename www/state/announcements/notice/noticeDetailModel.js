(function() {
    'use strict';
    myApp
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

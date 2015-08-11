(function() {
    'use strict';
    myApp
        .factory('EventDetailModel', EventDetailModel);



    function EventDetailModel() {
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

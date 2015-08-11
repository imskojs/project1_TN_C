(function() {
    'use strict';
    myApp
        .factory('ShowDetailModel', ShowDetailModel);

    function ShowDetailModel() {

        var model = {
            current: {
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

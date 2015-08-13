(function() {
    'use strict';
    angular.module('app')
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
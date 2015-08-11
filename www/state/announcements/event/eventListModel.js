(function() {
    'use strict';

    myApp
        .factory('EventListModel', EventListModel)

    function EventListModel() {
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
        }

        return model;
    }

})();

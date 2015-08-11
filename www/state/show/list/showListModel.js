(function() {
    'use strict';

    myApp
        .factory('ShowListModel', ShowListModel);

    function ShowListModel() {

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
            },


        };

        return model;

    }

})();

myApp
    .factory('EventListModel', [



        function() {
            var EventListModel = {
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

            return EventListModel;
        }
    ]);

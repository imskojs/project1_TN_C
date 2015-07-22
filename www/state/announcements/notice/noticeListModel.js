myApp
    .factory('NoticeListModel', [



        function() {

            var NoticeListModel = {
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

            return NoticeListModel;

        }
    ]);

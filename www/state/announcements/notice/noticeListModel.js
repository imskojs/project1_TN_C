myApp
    .factory('NoticeListModel', [



        function() {

            var NoticeListModel = {
                posts: [{
                        id: 0,
                        titlePhoto: {
                            url: 'http://placehold.it/500x500',
                            resource_type: 'titlePhoto'
                        },
                        title: 'title number 1',
                        createdBy: 'user101',
                        likeCount: 11,
                        commentCount: 11,
                        category: 'show' || 'event' || 'notice',
                        summary: '80 characters long',
                        createdAt: new Date()
                    }, {
                        id: 1,
                        titlePhoto: {
                            url: 'http://placehold.it/500x500',
                            resource_type: 'titlePhoto'
                        },
                        title: 'title number 2',
                        createdBy: 'user102',
                        likeCount: 22,
                        commentCount: 22,
                        category: 'show' || 'event' || 'notice',
                        summary: '80 characters long',
                        createdAt: new Date()
                    }, {
                        id: 2,
                        titlePhoto: {
                            url: 'http://placehold.it/500x500',
                            resource_type: 'titlePhoto'
                        },
                        title: 'title number 2',
                        createdBy: 'user102',
                        likeCount: 22,
                        commentCount: 22,
                        category: 'show' || 'event' || 'notice',
                        summary: '80 characters long',
                        createdAt: new Date()
                    }, {
                        id: 3,
                        titlePhoto: {
                            url: 'http://placehold.it/500x500',
                            resource_type: 'titlePhoto'
                        },
                        title: 'title number 2',
                        createdBy: 'user102',
                        likeCount: 22,
                        commentCount: 22,
                        category: 'show' || 'event' || 'notice',
                        summary: '80 characters long',
                        createdAt: new Date()
                    },

                ]

            };

            return NoticeListModel;

        }
    ]);

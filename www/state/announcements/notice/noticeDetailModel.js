myApp
    .factory('NoticeDetailModel', [



        function() {

            var NoticeDetailModel = {
                post: {
                    title: 'title1',
                    titlePhoto: {
                        url: 'http://placehold.it/500x500',
                        resource_type: 'titlePhoto'
                    },
                    content: '오늘네일이 최고입니다. 구라야노리가동',
                    createdBy: 'user101',
                    likeCount: 11,
                    commentCount: 22,
                    comments: [{
                        createdBy: 'user202',
                        content: '이것은 멋진 콘텐츠 입니다.'
                    }],
                    photos: [{
                        url: 'http://placehold.it/500x500',
                        resource_type: 'blogContent'
                    }]
                }
            };

            return NoticeDetailModel;


        }
    ]);

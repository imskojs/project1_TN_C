myApp
    .factory('NoticeDetailModel', [



        function() {

            var NoticeDetailModel = {
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

            return NoticeDetailModel;


        }
    ]);

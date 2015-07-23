myApp
    .factory('ShowDetailModel', [

        function() {

            var ShowDetailModel = {
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

            return ShowDetailModel;

        }
    ]);

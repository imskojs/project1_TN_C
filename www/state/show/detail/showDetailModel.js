myApp
    .factory('ShowDetailModel', [

        function() {

            var ShowDetailModel = {
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

            return ShowDetailModel;

        }
    ]);

myApp
    .factory('EventDetailModel', [



        function() {

            var EventDetailModel = {

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

            return EventDetailModel;

        }
    ]);

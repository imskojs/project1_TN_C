myApp
    .factory('Comments', [

        '$resource', 'governorUrl',

        function($resource, governorUrl) {

            var commentUrl = governorUrl + '/post/comment';

            var params = {};

            var actions = {
                addCommentToPost: {
                    method: 'POST'
                }
            };

            var Comments = $resource(commentUrl, params, actions)

            return Comments;
        }
    ]);

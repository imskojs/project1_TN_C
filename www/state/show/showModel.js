myApp
    .factory('ShowModel', [
        '$http', 'governorUrl',
        function($http, governorUrl) {

            var ShowModel = {
                //------------------------
                //  post to server, then update again with image.
                //------------------------
                postHandler: function(post) {
                    $http({
                        url: governorUrl + '/post',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: post
                    }).then(function success(response) {
                        console.log(response);
                    }, function err(error) {
                        console.log(error);
                    })
                }

            };

            return ShowModel;

        }
    ]);

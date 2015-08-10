myApp

.factory('Posts', [

    '$resource', 'governorUrl', '$cordovaFileTransfer',

    function($resource, governorUrl, $cordovaFileTransfer) {

        var postUrl = governorUrl + '/post' + '/:list' +
            '/:image' + '/:mine' + '/:like';

        var params = {
            list: '@list',
            image: '@image',
            mine: '@mine',
            like: '@like'
        };

        var actions = {
            getPosts: {
                method: 'GET',
                params: {
                    list: 'list'
                }
            },
            getMyPosts: {
                method: 'GET',
                params: {
                    list: 'list',
                    mine: 'mine'
                }
            },
            findById: {
                method: 'GET'
            },
            createPost: {
                method: 'POST'
            },
            updatePost: {
                method: 'PUT'
            },
            likePost: {
                method: 'PUT',
                params: {
                    like: 'like'
                }
            },
            removePost: {
                method: 'DELETE'
            }
        };

        var Posts = $resource(postUrl, params, actions);

        //------------------------
        //  CUSTOM NON-HTTP METHODS
        //------------------------
        Posts.createPostWithImage = function(parameters, post) {
            angular.extend(post, parameters);
            var filePath = post.file ? post.file : '[]';
            delete post.file;
            var options = {
                params: post,
                chunkedMode: false
            };
            return {
                '$promise': $cordovaFileTransfer.upload(governorUrl + '/post', filePath, options)
            };
        };

        Posts.updatePostWithImage = function(parameters, post) {
            angular.extend(post, parameters);
            var filePath = post.file;
            delete post.file;
            var options = {
                params: post,
                chunkedMode: false,
                httpMethod: 'PUT'
            };
            return {
                '$promise': $cordovaFileTransfer.upload(governorUrl + '/post/image', filePath, options)
            };

        }

        return Posts;
    }
]);

// Post.get({
//     list: 'list',
//     category: 'SHOW-POST'
// }).$promise
//     .then(function success() {}, function err() {})

// Posts.createPostWithImage({}, postWithFile).$promise
//     .then(function success() {}, function error() {}, function progress(progress) {})

// require id in postWithFile sails' req.param('id') not only look at url params but
//also looks at the body of req, it is a sails spcific feature.
// Posts.createPostWithImage({}, postWithFile).$promise
//     .then(function success() {}, function error() {}, function progress(progress) {})

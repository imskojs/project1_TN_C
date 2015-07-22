myApp
    .controller('ShowDetailController', [

        'ShowDetailModel', 'Posts', 'Comments', '$stateParams', '$scope',
        'Message',

        function(ShowDetailModel, Posts, Comments, $stateParams, $scope,
            Message
        ) {

            var ShowDetail = this;

            ShowDetail.Model = ShowDetailModel;

            $scope.$on('$ionicView.beforeEnter', function() {

                //------------------------
                //  Style Star
                //------------------------
                var postsString = localStorage.getItem('NAIL_SAVED_POSTS');
                var postsArray = angular.fromJson(postsString) || [];
                postsArray.forEach(function(post, i, self) {
                    if (post.id === $stateParams.id) {
                        ShowDetail.styleStar = true;
                    }
                });
                Message.loading.default();
                Posts.get({
                    id: $stateParams.id
                }).$promise
                    .then(function success(data) {
                        console.log(JSON.stringify(data, null, 2));
                        ShowDetailModel.post = data;
                        Message.loading.hide();

                    }, function error(err) {
                        Message.popUp.alert.default('해당포스트가 없습니다', '지워진 포스트이거나 인터넷이 꺼져있습니다.');
                    });
            });

            ShowDetail.toggleSavePost = function() {
                // get NAIL_SAVED_POSTS from localStorage
                var postsString = localStorage.getItem('NAIL_SAVED_POSTS');
                // make it object using angular.fromJson
                var postsArray = angular.fromJson(postsString);
                // if null create array
                if (!Array.isArray(postsArray)) {
                    postsArray = [];
                }
                // check whether post already exist
                for (var i = 0; i < postsArray.length; i++) {
                    var post = postsArray[i];
                    console.log(post.id);
                    console.log($stateParams.id);
                    // if exists delete saved post
                    if (post.id === $stateParams.id) {
                        postsArray.splice(i, 1);
                        postsString = angular.toJson(postsArray);
                        localStorage.setItem('NAIL_SAVED_POSTS', postsString);
                        // style star
                        ShowDetail.styleStar = false;
                        Message.popUp.alert.default('담아두기 알림', '담아두기에서 삭제되었습니다.');
                        return false;
                    }
                }
                // if not save current posts necessary attributes(savedList)
                var currentPost = ShowDetailModel.post;
                var postToSave = {
                    id: currentPost.id,
                    title: currentPost.title,
                    createdBy: currentPost.createdBy,
                    photos: [{
                        url: currentPost.photos[0] && currentPost.photos[0].url
                    }],
                    likeCount: currentPost.likeCount,
                    commentCount: currentPost.comments.length
                };
                postsArray.push(postToSave);
                // convert to json, save to NAIL_SAVED_POSTS
                postsString = angular.toJson(postsArray);
                localStorage.setItem('NAIL_SAVED_POSTS', postsString);
                // style right button star icon to indicate saved sate
                ShowDetail.styleStar = true;
                Message.popUp.alert.default('담아두기 알림', '포스트를 담아두었습니다.');
            };

            ShowDetail.addComment = function(comment) {
                commentBody = {
                    content: comment,
                    post: $stateParams.id
                };
                Comments.addCommentToPost({}, commentBody).$promise
                    .then(function success(data) {
                        Message.popUp.alert.default('댓글달기 알림', '댓글이 성공적으로 달렸습니다.');
                        ShowDetailModel.post.comments.unshift(data);
                        console.log(data);

                    }, function error(err) {
                        Message.popUp.alert.default('댓글달기 알림', '인터넷이 꺼져있습니다.');
                    });
            };

        } //END
    ]);

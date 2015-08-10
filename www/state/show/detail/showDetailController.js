myApp
    .controller('ShowDetailController', [

        'ShowDetailModel', 'Posts', 'Comments', '$stateParams', '$scope',
        'Message', 'Favorite',

        function(ShowDetailModel, Posts, Comments, $stateParams, $scope,
            Message, Favorite
        ) {

            var ShowDetail = this;

            ShowDetail.Model = ShowDetailModel;
            ShowDetail.toggleSavePost = Favorite.saveToFavorite.bind(null, 'NAIL_SAVED_POSTS', ShowDetail, ShowDetailModel, 'NAIL_LIKED_ONCE');
            ShowDetail.addComment = addComment;

            $scope.$on('$ionicView.beforeEnter', function() {
                loadCurrent();
                ShowDetail.styleFavorite = Favorite.isFavorite('NAIL_SAVED_POSTS');
            });


            //------------------------
            //  Implementations
            //------------------------
            // TODO: Not working.
            function loadCurrent() {
                Message.loading.default();
                return Posts.findById({
                        id: $stateParams.id,
                        populates: 'comments',
                        eager: true
                    }).$promise
                    .then(function success(postWrapper) {
                        console.log(postWrapper.post);
                        ShowDetailModel.current = postWrapper.post;
                        Message.loading.hide();

                    }, function error(err) {
                        Message.popUp.alert.default('해당포스트가 없습니다', '지워진 포스트이거나 인터넷이 꺼져있습니다.');
                    });
            }

            function addComment(comment) {
                commentBody = {
                    content: comment,
                    post: $stateParams.id
                };
                Comments.addCommentToPost({}, commentBody).$promise
                    .then(function success(data) {
                        Message.popUp.alert.default('댓글달기 알림', '댓글을 성공적으로 작성하셨습니다.');
                        ShowDetailModel.currentPost.comments.unshift(data);
                        console.log(data);

                    }, function error(err) {
                        Message.popUp.alert.default('댓글달기 알림', '인터넷이 꺼져있습니다.');
                    });
            }

        } //END
    ]);

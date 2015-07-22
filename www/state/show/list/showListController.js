myApp
    .controller('ShowListController', [

        'ShowListModel', 'Posts', '$state', 'governorUrl', '$scope',
        '$ionicLoading', '$ionicPopup', 'Message',

        function(ShowListModel, Posts, $state, governorUrl, $scope,
            $ionicLoading, $ionicPopup, Message
        ) {

            var ShowList = this;

            ShowList.Model = ShowListModel;


            $scope.$on('$ionicView.afterEnter', function() {
                Message.loading.default();
                Posts.getPosts({
                    category: 'SHOW-POST',
                    sort: 'id DESC',
                    limit: 10
                }).$promise
                    .then(function success(data) {
                        ShowListModel.postsWrapper = data;
                        Message.loading.hide();
                    }, function error(err) {
                        Message.popUp.alert.default();
                    });
            });

            ShowList.itemHandler = function(item) {
                $state.go('main.show.detail', {
                    id: item.id
                });
            };
            // Check for older stuff;
            ShowList.getOlderPosts = function() {
                var currentPosts = ShowListModel.postsWrapper.posts;
                Posts.getPosts({
                    category: 'SHOW-POST',
                    sort: 'id DESC',
                    limit: 10,
                    olderThan: currentPosts[currentPosts.length - 1].id
                }).$promise
                    .then(function success(data) {
                        data.posts.forEach(function(post, i, self) {
                            currentPosts.push(post);
                        })
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        ShowListModel.postsWrapper.more = data.more;
                    }, function error(err) {
                        Message.popUp.alert.default();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
            };
            // Check if there is more data if none infinite-scroll is disabled.;
            ShowList.checkForMore = function() {
                return ShowListModel.postsWrapper.more;
            };

            // Check for newer stuff;
            ShowList.getNewerPosts = function() {
                var currentPosts = ShowListModel.postsWrapper.posts;
                Posts.getPosts({
                    category: 'SHOW-POST',
                    limit: 10,
                    newerThan: currentPosts[0].id
                }).$promise
                    .then(function success(data) {
                        if (!data.posts.length) {
                            Message.popUp.alert.default(
                                '새로운포스트가 없습니다',
                                '나중에 다시 확인해주세요'
                            );
                        }
                        data.posts.forEach(function(post, i, self) {
                            currentPosts.unshift(post);
                        })
                        $scope.$broadcast('scroll.refreshComplete');
                    }, function error(err) {
                        Message.popUp.alert.default();
                        $scope.$broadcast('scroll.refreshComplete');
                    })
            }
        }
    ]);

(function() {
    'use strict';
    angular.module('app')
        .controller('ShowListController', ShowListController);

    ShowListController.$inject = ['ShowListModel', 'Posts', '$state', '$scope',
        'Message'
    ];

    function ShowListController(ShowListModel, Posts, $state, $scope,
        Message
    ) {

        var ShowList = this;
        ShowList.Model = ShowListModel;

        ShowList.goToDetailHandler = goToDetailHandler;
        ShowList.getNewerPosts = getNewerPosts;
        ShowList.getOlderPosts = getOlderPosts;
        ShowList.checkForMore = checkForMore;

        $scope.$on('$ionicView.beforeEnter', doBeforeEnter);

        //------------------------
        //  IMPLEMENTATIONS
        //------------------------
        function goToDetailHandler(post) {
            $state.go('main.show.detail', {
                id: post.id
            });
        }

        // Check for newer stuff;
        function getNewerPosts() {
            var currentPosts = ShowListModel.postsWrapper.posts;
            Posts.getPosts({
                category: 'SHOW-POST',
                limit: 10,
                newerThan: currentPosts[0] && currentPosts[0].id,
                populates: 'photos'
            }).$promise
                .then(function success(data) {
                    if (!data.posts.length) {
                        Message.popUp.alert.default(
                            '새로운포스트가 없습니다',
                            '나중에 다시 확인해주세요'
                        );
                    }
                    data.posts.forEach(function(post) {
                        currentPosts.unshift(post);
                    });
                    $scope.$broadcast('scroll.refreshComplete');
                }, function err(error) {
                    console.log(error);
                    Message.popUp.alert.default();
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }

        //  Check for older stuff
        function getOlderPosts() {
            var currentPosts = ShowListModel.postsWrapper.posts;
            Posts.getPosts({
                category: 'SHOW-POST',
                sort: 'id DESC',
                limit: 10,
                olderThan: currentPosts[currentPosts.length - 1] && currentPosts[currentPosts.length - 1].id,
                populates: 'photos'
            }).$promise
                .then(function success(data) {
                    data.posts.forEach(function(post) {
                        currentPosts.push(post);
                    });
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    ShowListModel.postsWrapper.more = data.more;
                }, function err(error) {
                    console.log(error);
                    Message.popUp.alert.default();
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });

        }

        // Check if there is more data if none infinite-scroll is disabled.;
        function checkForMore() {
            return ShowListModel.postsWrapper.more;
        }

        function doBeforeEnter() {
            if (ShowListModel.postsWrapper.posts.length < 10) {
                Message.loading.default();

                Posts.getPosts({
                    category: 'SHOW-POST',
                    sort: 'id DESC',
                    limit: 10,
                    populates: 'photos'
                }).$promise
                    .then(function success(data) {
                        console.log('this');
                        console.log(data);
                        ShowListModel.postsWrapper = data;
                        Message.loading.hide();
                    }, function err(error) {
                        console.log(error);
                        Message.popUp.alert.default();
                    });
            }
        }

    }


})();

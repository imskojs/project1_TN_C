(function() {
    'use strict';
    angular.module('app')
        .controller('NoticeListController', NoticeListController);

    NoticeListController.$inject = ['NoticeListModel', 'Posts', '$state', '$scope', 'Message'];

    function NoticeListController(NoticeListModel, Posts, $state, $scope, Message) {

        var NoticeList = this;

        NoticeList.Model = NoticeListModel;
        NoticeList.goToDetailHandler = goToDetailHandler;
        NoticeList.getNewerPosts = getNewerPosts;
        NoticeList.getOlderPosts = getOlderPosts;
        NoticeList.checkForMore = checkForMore;

        $scope.$on('$ionicView.beforeEnter', doBeforeEnter);

        //------------------------
        //  IMPLEMENTATIONS
        //------------------------
        function goToDetailHandler(post) {
            $state.go('main.announcements.noticeDetail', {
                id: post.id
            });
        }

        // Check for newer stuff;
        function getNewerPosts() {
            var currentPosts = NoticeListModel.postsWrapper.posts;
            Posts.getPosts({
                category: 'NOTICE-POST',
                limit: 10,
                newerThan: currentPosts[0].id,
                populates: 'photos'
            }).$promise
                .then(function success(data) {
                    if (!data.posts.length) {
                        Message.popUp.alert.default(
                            '공지사항 알림',
                            '새로운 공지사항이 없습니다.'
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
            var currentPosts = NoticeListModel.postsWrapper.posts;
            Posts.getPosts({
                category: 'NOTICE-POST',
                sort: 'id DESC',
                limit: 10,
                olderThan: currentPosts[currentPosts.length - 1].id,
                populates: 'photos'
            }).$promise
                .then(function success(data) {
                    data.posts.forEach(function(post) {
                        currentPosts.push(post);
                    });
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    NoticeListModel.postsWrapper.more = data.more;
                }, function err(error) {
                    console.log(error);
                    Message.popUp.alert.default();
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });

        }

        // Check if there is more data if none infinite-scroll is disabled.;
        function checkForMore() {
            return NoticeListModel.postsWrapper.more;

        }

        function doBeforeEnter() {
            if (NoticeListModel.postsWrapper.posts.length < 10) {
                Message.loading.default();

                Posts.getPosts({
                    category: 'NOTICE-POST',
                    sort: 'id DESC',
                    limit: 10,
                    populates: 'photos'
                }).$promise
                    .then(function success(data) {
                        NoticeListModel.postsWrapper = data;
                        console.log(data);
                        Message.loading.hide();
                    }, function err(error) {
                        console.log(error);
                        Message.popUp.alert.default();
                    });
            }
        }

    }


})();

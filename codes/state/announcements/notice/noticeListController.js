(function() {
    'use strict';
    angular.module('app')
        .controller('NoticeListController', NoticeListController);

    NoticeListController.$inject = ['NoticeListModel', 'Posts', '$state', '$scope', 'Message'];

    function NoticeListController(NoticeListModel, Posts, $state, $scope, Message) {

        var NoticeList = this;

        NoticeList.Model = NoticeListModel;

        $scope.$on('$ionicView.beforeEnter', function() {
            if (NoticeListModel.postsWrapper.posts.length < 10) {
                Message.loading.default();

                Posts.getPosts({
                    category: 'NOTICE-POST',
                    sort: 'id DESC',
                    limit: 10
                }).$promise
                    .then(function success(data) {
                        NoticeListModel.postsWrapper = data;
                        Message.loading.hide();
                    }, function error(err) {
                        Message.popUp.alert.default();
                    });
            }
        });

        NoticeList.goToDetailHandler = function(post) {
            $state.go('main.announcements.noticeDetail', {
                id: post.id
            });
        };
        //------------------------
        // Check for newer stuff;
        //------------------------
        NoticeList.getNewerPosts = function() {
            var currentPosts = NoticeListModel.postsWrapper.posts;
            Posts.getPosts({
                category: 'NOTICE-POST',
                limit: 10,
                newerThan: currentPosts[0].id
            }).$promise
                .then(function success(data) {
                    if (!data.posts.length) {
                        Message.popUp.alert.default(
                            '공지사항 알림',
                            '새로운 공지사항이 없습니다.'
                        );
                    }
                    data.posts.forEach(function(post, i, self) {
                        currentPosts.unshift(post);
                    });
                    $scope.$broadcast('scroll.refreshComplete');
                }, function error(err) {
                    Message.popUp.alert.default();
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
        //------------------------
        //  Check for older stuff
        //------------------------
        NoticeList.getOlderPosts = function() {
            var currentPosts = NoticeListModel.postsWrapper.posts;
            Posts.getPosts({
                category: 'NOTICE-POST',
                sort: 'id DESC',
                limit: 10,
                olderThan: currentPosts[currentPosts.length - 1].id
            }).$promise
                .then(function success(data) {
                    data.posts.forEach(function(post, i, self) {
                        currentPosts.push(post);
                    });
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    NoticeListModel.postsWrapper.more = data.more;
                }, function error(err) {
                    Message.popUp.alert.default();
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
        };
        // Check if there is more data if none infinite-scroll is disabled.;
        NoticeList.checkForMore = function() {
            return NoticeListModel.postsWrapper.more;
        };

    }


})();
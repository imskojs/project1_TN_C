(function() {
    'use strict';
    angular.module('app')
        .controller('EventListController', EventListController);

    EventListController.$inject = ['EventListModel', 'Posts', '$state', '$scope', 'Message'];

    function EventListController(EventListModel, Posts, $state, $scope, Message) {

        var EventList = this;
        EventList.Model = EventListModel;

        EventList.goToDetailHandler = goToDetailHandler;
        EventList.getNewerPosts = getNewerPosts;
        EventList.getOlderPosts = getOlderPosts;
        EventList.checkForMore = checkForMore;

        $scope.$on('$ionicView.beforeEnter', doBeforeEnter);

        //------------------------
        //  IMPLEMENTATIONS
        //------------------------

        function goToDetailHandler(post) {
            $state.go('main.announcements.eventDetail', {
                id: post.id
            });
        }

        // Check for newer stuff;
        function getNewerPosts() {
            var currentPosts = EventListModel.postsWrapper.posts;
            Posts.getPosts({
                category: 'EVENT-POST',
                limit: 10,
                newerThan: currentPosts[0].id,
                populates: 'photos'
            }).$promise
                .then(function success(data) {
                    if (!data.posts.length) {
                        Message.popUp.alert.default(
                            '이벤트 알림',
                            '새로운 이벤트가 없습니다.'
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
            var currentPosts = EventListModel.postsWrapper.posts;
            Posts.getPosts({
                category: 'EVENT-POST',
                sort: 'id DESC',
                limit: 10,
                olderThan: currentPosts[currentPosts.length - 1].id,
                popluates: 'photos'
            }).$promise
                .then(function success(data) {
                    data.posts.forEach(function(post) {
                        currentPosts.push(post);
                    });
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    EventListModel.postsWrapper.more = data.more;
                }, function err(error) {
                    console.log(error);
                    Message.popUp.alert.default();
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });

        }

        // Check if there is more data if none infinite-scroll is disabled.;
        function checkForMore() {
            return EventListModel.postsWrapper.more;
        }

        function doBeforeEnter() {
            if (EventListModel.postsWrapper.posts.length < 10) {
                Message.loading.default();

                Posts.getPosts({
                    category: 'EVENT-POST',
                    sort: 'id DESC',
                    limit: 10,
                    populates: 'photos'
                }).$promise
                    .then(function success(data) {
                        EventListModel.postsWrapper = data;
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

(function() {
    'use strict';


    angular.module('app')
        .controller('EventListController', EventListController);

    EventListController.$inject = ['EventListModel', 'Posts', '$state', '$scope', 'Message'];

    function EventListController(EventListModel, Posts, $state, $scope, Message) {

        var EventList = this;
        EventList.Model = EventListModel;

        $scope.$on('$ionicView.beforeEnter', function() {
            if (EventListModel.postsWrapper.posts.length < 10) {
                Message.loading.default();

                Posts.getPosts({
                    category: 'EVENT-POST',
                    sort: 'id DESC',
                    limit: 10
                }).$promise
                    .then(function success(data) {
                        EventListModel.postsWrapper = data;
                        console.log(data);
                        Message.loading.hide();
                    }, function error(err) {
                        Message.popUp.alert.default();
                    });
            }
        });

        EventList.goToDetailHandler = function(post) {
            $state.go('main.announcements.eventDetail', {
                id: post.id
            })
        };
        //------------------------
        // Check for newer stuff;
        //------------------------
        EventList.getNewerPosts = function() {
            var currentPosts = EventListModel.postsWrapper.posts;
            Posts.getPosts({
                category: 'EVENT-POST',
                limit: 10,
                newerThan: currentPosts[0].id
            }).$promise
                .then(function success(data) {
                    if (!data.posts.length) {
                        Message.popUp.alert.default(
                            '이벤트 알림',
                            '새로운 이벤트가 없습니다.'
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
        //------------------------
        //  Check for older stuff
        //------------------------
        EventList.getOlderPosts = function() {
            var currentPosts = EventListModel.postsWrapper.posts;
            Posts.getPosts({
                category: 'EVENT-POST',
                sort: 'id DESC',
                limit: 10,
                olderThan: currentPosts[currentPosts.length - 1].id
            }).$promise
                .then(function success(data) {
                    data.posts.forEach(function(post, i, self) {
                        currentPosts.push(post);
                    })
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    EventListModel.postsWrapper.more = data.more;
                }, function error(err) {
                    Message.popUp.alert.default();
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
        };
        // Check if there is more data if none infinite-scroll is disabled.;
        EventList.checkForMore = function() {
            return EventListModel.postsWrapper.more;
        };
    }

})();
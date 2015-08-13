(function() {
    'use strict';

    angular.module('app')
        .controller('EventDetailController', EventDetailController);

    EventDetailController.$inject = ['EventDetailModel', 'Posts', 'Message', '$stateParams', '$scope'];

    function EventDetailController(EventDetailModel, Posts, Message, $stateParams, $scope) {

        var EventDetail = this;
        EventDetail.Model = EventDetailModel;

        $scope.$on('$ionicView.beforeEnter', function() {
            getPosts();
        });

        //------------------------
        //  IMPLEMENTATIONS
        //------------------------
        function getPosts() {
            Message.loading.default();
            Posts.get({
                id: $stateParams.id,
                populates: 'photos'
            }).$promise
                .then(function success(postWrapper) {
                    console.log(postWrapper);
                    EventDetailModel.post = postWrapper.post;
                    Message.loading.hide();

                }, function error(err) {
                    Message.popUp.alert.default('이벤트 알림', '종료된 이벤트입니다.');
                });
        }
    } //END

})();

(function() {
    'use strict';
    angular.module('app')
        .controller('NoticeDetailController', NoticeDetailController);

    NoticeDetailController.$inject = ['NoticeDetailModel', 'Posts', '$stateParams', '$scope', 'Message'];


    function NoticeDetailController(NoticeDetailModel, Posts, $stateParams, $scope, Message) {

        var NoticeDetail = this;
        NoticeDetail.Model = NoticeDetailModel;

        $scope.$on('$ionicView.beforeEnter', doBeforeEnter);

        //------------------------
        //  IMPLEMENTATIONS
        //------------------------

        function doBeforeEnter() {
            getPosts();
        }

        function getPosts() {
            Message.loading.default();
            Posts.get({
                id: $stateParams.id,
                populates: 'photos'
            }).$promise
                .then(function success(postWrapper) {
                    console.log(postWrapper);
                    NoticeDetailModel.post = postWrapper.post;
                    Message.loading.hide();

                }, function err(error) {
                    console.log(error);
                    Message.popUp.alert.default('공지사항 알림', '없는 공지사항 입니다');
                });
        }
    }
})();

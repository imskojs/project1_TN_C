(function() {
    'use strict';
    angular.module('app')
        .controller('NoticeDetailController', NoticeDetailController);

    NoticeDetailController.$inject = ['NoticeDetailModel', 'Posts', '$stateParams', '$scope', 'Message']


    function NoticeDetailController(NoticeDetailModel, Posts, $stateParams, $scope, Message) {

        var NoticeDetail = this;

        NoticeDetail.Model = NoticeDetailModel;

        $scope.$on('$ionicView.beforeEnter', function() {

            //------------------------
            //  Load post with id
            //------------------------
            Message.loading.default();
            Posts.findById({
                id: $stateParams.id,
                populates: 'photos'
            }).$promise
                .then(function success(data) {
                    console.log(JSON.stringify(data, null, 2));
                    NoticeDetailModel.post = data;
                    Message.loading.hide();

                }, function error(err) {
                    Message.popUp.alert.default('해당포스트가 없습니다', '지워진 포스트이거나 인터넷이 꺼져있습니다.');
                });
        });
    }
})();

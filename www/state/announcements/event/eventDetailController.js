myApp
    .controller('EventDetailController', [

        'EventDetailModel', 'Posts', 'Message', '$stateParams', '$scope',

        function(EventDetailModel, Posts, Message, $stateParams, $scope) {

            var EventDetail = this;

            EventDetail.Model = EventDetailModel;

            $scope.$on('$ionicView.beforeEnter', function() {
                Message.loading.default();
                Posts.get({
                    id: $stateParams.id
                }).$promise
                    .then(function success(data) {
                        console.log(JSON.stringify(data, null, 2));
                        EventDetailModel.post = data;
                        Message.loading.hide();

                    }, function error(err) {
                        Message.popUp.alert.default('이벤트 알림', '종료된 이벤트입니다.');
                    });
            });




        } //END
    ]);

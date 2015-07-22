myApp
    .controller('ShowDetailController', [

        'ShowDetailModel', 'Posts', '$stateParams', '$scope', '$ionicLoading',
        '$ionicPopup', 'Message',

        function(ShowDetailModel, Posts, $stateParams, $scope, $ionicLoading,
            $ionicPopup, Message
        ) {

            var ShowDetail = this;

            $scope.$on('$ionicView.afterEnter', function() {

                Message.loading.default();
                Posts.get({
                    id: $stateParams.id
                }).$promise
                    .then(function success(data) {
                        console.log(JSON.stringify(data, null, 2));
                        ShowDetail.post =
                            ShowDetailModel.post = data;
                        Message.loading.hide();

                    }, function error(err) {
                        Message.popUp.alert.default();
                    });
            })

        }
    ]);

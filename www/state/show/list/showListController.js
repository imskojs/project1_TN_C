myApp
    .controller('ShowListController', [

        'ShowListModel', 'Posts', '$state', 'governorUrl', '$scope',
        '$ionicLoading', '$ionicPopup', 'Message',

        function(ShowListModel, Posts, $state, governorUrl, $scope,
            $ionicLoading, $ionicPopup, Message
        ) {

            var ShowList = this;

            ShowList.Model = ShowListModel


            $scope.$on('$ionicView.afterEnter', function() {
                Message.loading.default();
                Posts.getPosts({
                    category: 'SHOW-POST',
                    sort: 'id DESC',
                    limit: 10
                }).$promise
                    .then(function success(data) {
                        ShowList.postsWrapper =
                            ShowListModel.postsWrapper = data;
                        Message.loading.hide();
                    }, function error(err) {
                        Message.popUp.alert.default();
                    });
            });

            ShowList.itemHandler = function(item) {
                $state.go('main.show.detail', {
                    id: item.id
                });
            };
            // Check for older stuff;
            ShowList.getData = function() {
                // http.get old stuff
                console.log('testing');

                function final(response) {
                    if (response.posts.length === 10) {
                        ShowListModel.moreData = true;
                    } else {
                        ShowListModel.moreData = false;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            };
            // Check if there is more data;
            ShowList.checkForMore = function() {
                return ShowListModel.moreData;
            };
        }
    ]);

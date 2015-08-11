(function() {
    'use strict';

    angular.module('app')
        .controller('SavedShowListController', SavedShowListController);

    SavedShowListController.$inject = ['SavedShowListModel', '$state', '$scope'];

    function SavedShowListController(SavedShowListModel, $state, $scope) {

        var SavedShowList = this;

        SavedShowList.Model = SavedShowListModel;
        $scope.$on('$ionicView.beforeEnter', function() {
            SavedShowListModel.posts =
                angular.fromJson(localStorage.getItem('NAIL_SAVED_POSTS'));
        })




        SavedShowList.goToDetailHandler = function(post) {
            $state.go('main.show.detail', {
                id: post.id
            });
            //MVP2: resave. likeCounts, and commentCounts.
        };

        var savedList = [{
            id: '',
            titile: '',
            createdBy: {
                nickname: ''
            },
            photos: [],
            // Check if updated
            likeCount: '',
            commentCount: ''
        }];
    }

})();

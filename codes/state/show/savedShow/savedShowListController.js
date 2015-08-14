(function() {
    'use strict';

    angular.module('app')
        .controller('SavedShowListController', SavedShowListController);

    SavedShowListController.$inject = ['SavedShowListModel', '$state', '$scope', 'localStorage'];

    function SavedShowListController(SavedShowListModel, $state, $scope, localStorage) {

        var SavedShowList = this;
        SavedShowList.Model = SavedShowListModel;

        SavedShowList.goToDetailHandler = goToDetailHandler;

        $scope.$on('$ionicView.beforeEnter', doBeforeEnter);

        function doBeforeEnter() {
            SavedShowListModel.posts = angular.fromJson(localStorage.getItem('NAIL_SAVED_POSTS'));
            console.log('this');
            console.log(SavedShowListModel.posts);
        }


        function goToDetailHandler(post) {
            $state.go('main.show.detail', {
                id: post.id
            });
            //MVP2: resave. likeCounts, and commentCounts.
        }

    }

})();

(function() {
    'use strict';
    angular.module('app')
        .controller('ListController', ListController);

    ListController.$inject = ['ListModel', '$state', '$scope', '$timeout'];

    function ListController(ListModel, $state, $scope, $timeout) {
        var List = this;

        // Link model to view;
        List.lists = ListModel.lists;

        // Go to details of the clicked item;
        List.itemHandler = function(item) {
            angular.copy(item, ListModel.currentItem);
            $state.go('main.detail', {
                id: item.id
            });
            console.log(item);
        };

        // Check for newer stuff
        List.doRefresh = function() {
            //http.get new stuff
            function final() {
                $scope.$broadcast('scroll.refreshComplete');
            }
        }

        // Check for older stuff;
        List.getData = function() {
            // http.get old stuff
            console.log('testing');

            function final(response) {
                if (response.posts.length === 10) {
                    ListModel.moreData = true;
                } else {
                    ListModel.moreData = false;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        };

        // Check if there is more data;
        List.checkForMore = function() {
            return ListModel.moreData;
        };
    }


})();
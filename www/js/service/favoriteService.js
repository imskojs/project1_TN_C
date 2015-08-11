// Dependencies;
// vm.styleFavorite
// model.current    // eg Detail.currentPost, Detail.currentPlace... rename to current
(function() {
    'use strict';

    myApp
        .factory('Favorite', Favorite);

    Favorite.$inject = ['$stateParams', 'Message', 'Posts'];

    function Favorite($stateParams, Message, Posts) {

        var service = {
            isFavorite: isFavorite,
            saveToFavorite: saveToFavorite
        };
        return service;

        //------------------------
        //  Implementations
        //------------------------
        function isFavorite(localStorageItem) {
            var favoritesString = localStorage.getItem(localStorageItem);
            var favoritesArray = angular.fromJson(favoritesString);
            for (var i = 0; i < favoritesArray.length; i++) {
                var favorite = favoritesArray[i];
                if (favorite.id === $stateParams.id) {
                    return true;
                }
            }
        }

        function saveToFavorite(localStorageItem, vm, model, sendLikeStorageName) {
            var favoritesString = localStorage.getItem(localStorageItem);
            var favoritesArray = angular.fromJson(favoritesString);
            // If no item create empty bucket.
            if (!Array.isArray(favoritesArray)) {
                favoritesArray = []
            }
            for (var i = 0; i < favoritesArray.length; i++) {
                var favorite = favoritesArray[i];
                // If current favorite exists;
                if (favorite.id === $stateParams.id) {
                    favoritesArray.splice(i, 1);
                    favoritesString = angular.toJson(favoritesArray);
                    localStorage.setItem(localStorageItem, favoritesString);
                    vm.styleFavorite = false;
                    Message.popUp.alert.default('즐겨찾기 알림', '즐겨찾기에서 삭제되었습니다.');
                    return false;
                }
            }
            // If current favorite does not exist then save;
            var favoriteToSave = {
                id: model.current.id,
            }

            addToAttributes(model, favoriteToSave);

            console.log(favoriteToSave);
            favoritesArray.push(favoriteToSave);
            favoritesString = angular.toJson(favoritesArray);
            localStorage.setItem(localStorageItem, favoritesString);
            if (sendLikeStorageName) {
                sendLike(sendLikeStorageName, favoriteToSave.id);
            }
            vm.styleFavorite = true;
            Message.popUp.alert.default('즐겨찾기 알림', '즐겨찾기에 추가되었습니다.')
        }

        function addToAttributes(model, favoriteToSave) {
            if (model.current.name) {
                favoriteToSave.name = model.current.name;
            }
            if (model.current.title) {
                favoriteToSave.title = model.current.title;
            }
            if (model.current.photos.length > 0) {
                favoriteToSave.photos = [{
                    url: model.current.photos[0].url
                }]
            }
            if (model.current.location) {
                favoriteToSave.location = {
                    coordinates: model.current.location.coordinates
                }
            }
            if (model.current.address) {
                favoriteToSave.address = model.current.address;
            }
            if (model.current.createdBy) {
                favoriteToSave.createdBy = {};
                favoriteToSave.createdBy.username = model.current.createdBy.username;
            }
            if (model.current.likes) {
                favoriteToSave.likes = model.current.likes;
            }
            if (model.current.comments) {
                favoriteToSave.comments = [];
                for (var i = 0; i < model.current.comments.length; i++) {
                    favoriteToSave.comments.push(1);
                }
            }
        }

        function sendLike(likedOnceStorageItem, id) {
            // add to liked once list
            var likedOnceString = localStorage.getItem(likedOnceStorageItem);
            var likedOnceArray = angular.fromJson(likedOnceString);
            if (!Array.isArray(likedOnceArray)) {
                likedOnceArray = []
            }
            for (var i = 0; i < likedOnceArray.length; i++) {
                var currentId = likedOnceArray[i];
                if (currentId === id) {
                    return false;
                }
            }
            likedOnceArray.push(id);
            likedOnceString = angular.toJson(likedOnceArray);
            localStorage.setItem(likedOnceStorageItem, likedOnceString);

            Posts.likePost({
                id: id
            }).$promise
                .then(function success(data) {
                    console.log(data);
                }, function err(error) {
                    console.log(error);
                });
        }
    } // Service END
})();

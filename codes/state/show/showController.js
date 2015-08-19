(function() {
    'use strict';

    angular.module('app')
        .controller('ShowController', ShowController);

    ShowController.$inject = ['ShowModel', 'Posts', '$state', '$ionicModal', '$scope', 'ShowListModel',
        '$cordovaCamera', 'Message', '$timeout', '$window', '$cordovaFile'
    ];

    function ShowController(ShowModel, Posts, $state, $ionicModal, $scope, ShowListModel,
        $cordovaCamera, Message, $timeout, $window, $cordovaFile
    ) {

        var Show = this;

        $ionicModal.fromTemplateUrl('state/show/showModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            Show.modal = modal;
        });

        Show.modalHideHandler = function() {
            Show.writeImageSrc = null;
            Show.writeTitle = null;
            Show.writeContent = null;
            Show.modal.hide();
        };

        Show.modalShowHandler = function() {
            Show.modal.show();
        };

        Show.goToSavedPostListHandler = function() {
            $state.go('main.show.savedList');
        };

        //------------------------
        //  Write post logic
        //------------------------
        Show.showWriteImage = function() {
            return Show.writeImageSrc != null;
        };

        Show.getPictureHandler = function(sourceType) {

            // photoLibrary: 0,
            // camera: 1
            // try {
            //     $cordovaCamera.cleanup();
            // } catch (err) {
            //     console.log(err);
            // }

            if (sourceType === undefined) {
                sourceType = 1;
            }

            console.log(sourceType);
            var options = {
                allowEdit: true,
                quality: 50,
                // destinationType: Camera.DestinationType.DATA_URL,
                destinationType: Camera.DestinationType.FILE_URI,
                encodingType: Camera.EncodingType.JPEG, // PNG do not work
                correctOrientation: true,
                targetWidth: 500,
                mediaType: Camera.MediaType.PICTURE,
                // saveToPhotoAlbum: true,
                cameraDirection: Camera.Direction.BACK, // FRONT do not work
                sourceType: sourceType
            };

            $cordovaCamera.getPicture(options)
                .then(function success(imageUrl) {
                    Show.writeImageFile = imageUrl;

                    var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
                    var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);

                    $cordovaFile.readAsDataURL(namePath, name)
                        .then(function(dataUri) {
                            console.log(dataUri);
                            Show.writeImageSrc = dataUri;
                        }, function(error) {
                            console.log(error);
                        });

                }, function error(err) {
                    console.log(err);
                });

        };


        Show.postHandler = function() {
            Message.loading.default();

            var postWithFile = {
                category: 'SHOW-POST',
                title: Show.writeTitle,
                content: Show.writeContent,
                file: Show.writeImageFile
            };

            Posts.createPostWithImage({}, postWithFile).$promise
                .then(function success() {
                    Show.writeTitle = '';
                    Show.writeContent = '';
                    Show.writeImageSrc = null;
                    Show.writeImageFile = '';
                    getNewerPosts();
                    Message.loading.hide();
                    Message.message.success('포스트가 만들어졌습니다.');
                    Show.modal.hide();
                }, function err(error) {
                    console.log(error);
                    Message.loading.hide();
                    Message.message.error('다시 시도해주세요.');
                }, function progress(prog) {
                    console.dir(prog);
                });
        };


        function getNewerPosts() {
            var currentPosts = ShowListModel.postsWrapper.posts;
            Posts.getPosts({
                category: 'SHOW-POST',
                limit: 10,
                newerThan: currentPosts[0] && currentPosts[0].id,
                populates: 'photos,createdBy'
            }).$promise
                .then(function success(postWrapper) {
                    console.log('this');
                    console.log(postWrapper);
                    postWrapper.posts.forEach(function(post) {
                        currentPosts.unshift(post);
                    });
                }, function err(error) {
                    console.log(error);
                    Message.popUp.alert.default();
                });
        }

    }
})();

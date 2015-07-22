myApp
    .controller('ShowController', [

        'ShowModel', 'Posts', '$state', '$ionicModal', '$scope', 'ShowListModel',
        '$cordovaCamera', 'Message', '$timeout',

        function(ShowModel, Posts, $state, $ionicModal, $scope, ShowListModel,
            $cordovaCamera, Message, $timeout
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

                if (sourceType === undefined) {
                    sourceType = 1;
                }

                console.log(sourceType);
                var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG, // PNG do not work
                    correctOrientation: true,
                    targetWidth: 500,
                    mediaType: Camera.MediaType.PICTURE,
                    saveToPhotoAlbum: true,
                    cameraDirection: Camera.Direction.BACK, // FRONT do not work
                    sourceType: sourceType
                };

                $cordovaCamera.getPicture(options)
                    .then(function success(imageData) {
                        Show.writeImageSrc = imageData;
                        console.log(Show.writeImageSrc);
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
                    file: Show.writeImageSrc
                };

                Posts.createPostWithImage({}, postWithFile).$promise
                    .then(function success() {
                        Show.writeTitle = '';
                        Show.writeContent = '';
                        Show.writeImageSrc = '';
                        Message.loading.hide();
                        Message.message.success('포스트가 만들어졌습니다.')
                        Show.modal.hide();
                        $timeout(function() {
                            $state.go('main.show.list', {}, {
                                reload: true
                            })
                        }, 1500)
                    }, function error() {
                        Message.loading.hide();
                        Message.message.error('다시 시도해주세요.')
                    }, function progress(progress) {
                        console.dir(progress);
                    });
            };



            // END

        }
    ]);

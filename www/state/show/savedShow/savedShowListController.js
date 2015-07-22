myApp
    .controller('SavedShowListController', [

        '$state', '$scope',

        function($state, $scope) {

            var SavedShowList = this;

            $scope.$on('$ionicView.enter', function() {
                SavedShowList.posts =
                    angular.fromJson(localStorage.getItem('NAIL_SAVED_POSTS'));
            })



            SavedShowList.itemHandler = function(item) {
                $state.go('main.show.detail', {
                    id: item.id
                });
            };







            //==========================================================================
            // Test
            //==========================================================================
            var posts = [{
                    id: 0,
                    titlePhoto: {
                        url: 'http://http://placehold.it/500x500',
                        resource_type: 'titlePhoto'
                    },
                    title: 'title number 1',
                    createdBy: 'user101',
                    likeCount: 11,
                    commentCount: 11,
                    category: 'show' || 'event' || 'announcement',
                    summary: '80 characters long',
                    createdAt: new Date()
                }, {
                    id: 1,
                    titlePhoto: {
                        url: 'http://http://placehold.it/500x500',
                        resource_type: 'titlePhoto'
                    },
                    title: 'title number 2',
                    createdBy: 'user102',
                    likeCount: 22,
                    commentCount: 22,
                    category: 'show' || 'event' || 'announcement',
                    summary: '80 characters long',
                    createdAt: new Date()
                }, {
                    id: 2,
                    titlePhoto: {
                        url: 'http://http://placehold.it/500x500',
                        resource_type: 'titlePhoto'
                    },
                    title: 'title number 2',
                    createdBy: 'user102',
                    likeCount: 22,
                    commentCount: 22,
                    category: 'show' || 'event' || 'announcement',
                    summary: '80 characters long',
                    createdAt: new Date()
                }, {
                    id: 3,
                    titlePhoto: {
                        url: 'http://http://placehold.it/500x500',
                        resource_type: 'titlePhoto'
                    },
                    title: 'title number 2',
                    createdBy: 'user102',
                    likeCount: 22,
                    commentCount: 22,
                    category: 'show' || 'event' || 'announcement',
                    summary: '80 characters long',
                    createdAt: new Date()
                },

            ]

            localStorage.setItem('NAIL_SAVED_POSTS',
                angular.toJson(posts)
            )

        }
    ]);

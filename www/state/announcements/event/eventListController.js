myApp
    .controller('EventListController', [
        'EventListModel', '$state',


        function(EventListModel, $state) {

            var EventList = this;

            EventList.posts = EventListModel.posts;

            EventList.postHandler = function(post) {
                console.log('asdf')
                $state.go('main.announcements.eventDetail', {
                    id: post.id
                })

            }

        }
    ]);

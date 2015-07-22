myApp
    .controller('NoticeListController', [

        'NoticeListModel', '$state',

        function(NoticeListModel, $state) {

            var NoticeList = this;

            NoticeList.posts = NoticeListModel.posts;

            NoticeList.postHandler = function(post) {
                $state.go('main.announcements.noticeDetail', {
                    id: post.id
                })
            }

        }
    ]);

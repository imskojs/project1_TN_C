myApp
    .controller('NoticeDetailController', [

        'NoticeDetailModel',


        function(NoticeDetailModel) {

            var NoticeDetail = this;

            NoticeDetail.post = NoticeDetailModel.post;

        }
    ]);

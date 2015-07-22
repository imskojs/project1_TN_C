myApp
    .controller('EventDetailController', [

        'EventDetailModel',

        function(EventDetailModel) {

            var EventDetail = this;

            EventDetail.post = EventDetailModel.post;


        }
    ]);

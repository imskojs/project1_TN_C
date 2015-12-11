(function() {
    'use strict';

    angular.module('app')
        .factory('ShowListModel', ShowListModel);

    function ShowListModel() {

        var model = {
            postsWrapper: {
                posts: [],
                more: true
            },


        };

        return model;

    }

})();

(function() {
    'use strict';

    angular.module('app')
        .factory('Users', Users);


    Users.$inject = ['$resource', 'governorUrl', '$cordovaFileTransfer'];

    function Users($resource, governorUrl, $cordovaFileTransfer) {

        var userUrl = governorUrl + '/user';

        var params = {};

        var actions = {};

        var service = $resource(userUrl, params, actions);

        return service;
    }

})();

myApp
.factory('Users', [


    '$resource', 'governorUrl', '$cordovaFileTransfer',

    function($resource, governorUrl, $cordovaFileTransfer) {

        var userUrl = governorUrl + '/user';

        var params = {
        };

        var actions = {
        };

        var Users = $resource(userUrl, params, actions);

        return Users;
}]);

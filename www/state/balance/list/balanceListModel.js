(function() {
    'use strict';
    angular.module('app')
        .factory('BalanceListModel', BalanceListModel);



    function BalanceListModel() {

        var model = {
            places: [{
                id: '222aaa',
                longitude: 12.121212,
                latitude: 155.13131,
                title: '우리 네일',
                titlePhoto: 'http://placehold.it/500x500',
                address: 'address 2'
            }, {
                id: 'asdfa1111',
                longitude: 12.121212,
                latitude: 155.13131,
                title: '우리 네일2',
                titlePhoto: 'http://placehold.it/500x500',
                address: 'address 2'
            }]
        };


        return model;
    }


})();
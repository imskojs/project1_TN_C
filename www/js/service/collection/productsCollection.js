myApp

.factory('Products', [

    '$resource', 'governorUrl', '$cordovaFileTransfer',

    function($resource, governorUrl, $cordovaFileTransfer) {

        var productUrl = governorUrl + '/product' + '/:list' +
            '/:image' + '/:mine' + '/:checkProductCode';

        var params = {
            list: '@list',
            image: '@image',
            mine: '@mine',
            checkProductCode: '@checkProductCode'
        };

        var actions = {
            getProducts: {
                method: 'GET',
                params: {
                    list: 'list'
                }
            },
            getMyProducts: {
                method: 'GET',
                params: {
                    list: 'list',
                    mine: 'mine'
                }
            },
            checkProductCode: {
                method: 'GET',
                params: {
                    checkProductCode: 'checkProductCode'
                }
            },
            findById: {
                method: 'GET'
            },
            createProduct: {
                method: 'POST'
            },
            updateProduct: {
                method: 'PUT'
            },
            removeProduct: {
                method: 'DELETE'
            }
        };

        var Products = $resource(productUrl, params, actions);

        //------------------------
        //  CUSTOM NON-HTTP METHODS
        //------------------------
        Products.createProductWithImage = function(parameters, product) {
            angular.extend(product, parameters);
            var filePath = product.file;
            delete product.file;
            var options = {
                params: product,
                chunkedMode: false
            };
            return {
                '$promise': $cordovaFileTransfer.upload(governorUrl + '/product/image', filePath, options)
            };
        };

        Products.updateProductWithImage = function(parameters, product) {
            angular.extend(product, parameters);
            var filePath = product.file;
            delete product.file;
            var options = {
                params: product,
                chunkedMode: false,
                httpMethod: 'PUT'
            };
            return {
                '$promise': $cordovaFileTransfer.upload(governorUrl + '/product/image', filePath, options)
            };

        }

        return Products;
    }
]);

// Product.get({
//     list: 'list',
//     category: 'SHOW-POST'
// }).$promise
//     .then(function success() {}, function err() {})

// Products.createProductWithImage({}, productWithFile).$promise
//     .then(function success() {}, function error() {}, function progress(progress) {})

// require id in productWithFile sails' req.param('id') not only look at url params but
//also looks at the body of req, it is a sails spcific feature.
// Products.createProductWithImage({}, productWithFile).$promise
//     .then(function success() {}, function error() {}, function progress(progress) {})

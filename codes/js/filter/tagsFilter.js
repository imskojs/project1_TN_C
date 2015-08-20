// INPUT
// var array = [1, 2, 1, 4];
// var num = 1;

// USE
// IN CONTROLLER;

// var filterByTag = $filter('filterByTag');
// var out = filterByTag(array, num);

// OUTPUT
// out == [1, 1]
(function() {
    'use strict';
    angular.module('app')
        .filter('filterByTag', filterByTag);

    // filterByTag.$inject = [];
    function filterByTag() {

        return filter;

        function filter(collection, tagName) {
            var resultArray = [];
            if (collection) {

                for (var i = 0; i < collection.length; i++) {
                    var element = collection[i];
                    for (var j = 0; j < element.tags.length; j++) {
                        var tag = element.tags[j];
                        if (tag === tagName) {
                            resultArray.push(element);
                        }
                    }
                }
            }
            return resultArray;
        }
    }


})();

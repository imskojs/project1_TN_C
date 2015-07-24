myApp
.factory('Dom', [
'$timeout', '$window',
function($timeout, $window) {
    var Dom = {
        // <input id="daum-map-search-input" type="text">
        // Dom.focusById('daum-map-search-input');
        focusById: function(id) {
            $timeout(function() {
                var domElement = $window.document.getElementById(id);
                if(domElement) {
                    domElement.focus();
                }
            });
        }
    };

    return Dom;
}]);

// Makes width of the view available as JS or directive such as collection repeat
// This makes collection repeat to have dynamic width or height which depends on
//the view width or view height;

// usage:
// Required: IndexModel.vw = INT;
// In index.html, body[vw]
// 1) ion-list>ion-item[collection-repeat="item in items" item-height="vw * 0.20"]
// 2) ANY[vw]
// 3) function controller(IndexModel){
//     console.log(IndexModel.vw);
//    }
myApp
    .directive('vw', [
        '$rootScope', '$window',
        function($rootScope, $window) {
            return {
                link: function(scope, element, attrs) {

                    $rootScope.vw = element.prop('offsetWidth');

                    $window.addEventListener('resize', function() {
                        $rootScope.$apply(function() {
                            $rootScope.vw = element.prop('offsetWidth');
                        });
                    });
                }
            }
        }
    ]);

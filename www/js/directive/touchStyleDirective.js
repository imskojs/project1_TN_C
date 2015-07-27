//==========================================================================
//              Style for user selection.
//==========================================================================
myApp
    .directive('touch', ['$timeout',
        function($timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.on('click', function(e) {
                        element.addClass('touch');
                        $timeout(function() {
                            element.removeClass('touch');
                        }, 50);

                    })
                }
            }
        }
    ])

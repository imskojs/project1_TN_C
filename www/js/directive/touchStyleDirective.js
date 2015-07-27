//==========================================================================
//              Style for user selection.
//==========================================================================
myApp

// .directive('touch', function() {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attrs) {
//             element.on('touchstart', function(e) {
//                 element.css({
//                     opacity: 0.5,
//                 })
//                     .addClass('touchBackground');

//             })
//             element.on('touchend', function(e) {
//                 element.css({
//                     opacity: 1
//                 })
//                     .removeClass('touchBackground');
//             })
//         }
//     }
// })
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

.directive('focus', [

    '$ionicHistory', '$timeout',

    function($ionicHistory, $timeout) {
        return {
            restrict: 'A',
            // scope: {
            //     ifFrom: '@ifFrom'
            // },
            link: function(scope, element, attrs) {
                $timeout(function() {
                    console.log('hi');
                    element[0].focus();
                }, 1000);
                // if(!scope.ifFrom){
                // } else {
                //     var someState = $ionicHistory.backView() && $ionicHistory.backView().stateName;
                //     if(scope.ifFrom === someState){
                //         element[0].focus();
                //     }
                // }
            }
        }
    }
])

// Deprecated: styling selected state should be styled by using ng-class
//and and changing the underlying model of the view
.directive('choose', function() {
    return {
        restrict: 'AC',
        link: function(scope, element, attrs) {
            scope.$on('unselect', function() {
                element.removeClass('selected')
            })
            element.on('touchend', function() {
                if (element.hasClass('selected') && attrs.toggle) {
                    element.parent().children().removeClass('selected')
                } else {
                    element.parent().children().removeClass('selected')
                    element.addClass('selected');
                }
            })
        }
    }
})

// Deprecated: styling selected state should be styled by using ng-class
//and and changing the underlying model of the view
.directive('toggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.on('touchend', function() {
                if (element.hasClass('selected')) {
                    element.removeClass('selected');
                } else {
                    element.addClass('selected');
                }
            })
        }
    }
})

// Deprecated: styling selected state should be styled by using ng-class
//and and changing the underlying model of the view
.directive('toggleOnEmit', function() {
    return {
        restrict: 'AC',
        link: function(scope, element, attrs) {
            if (attrs.toggleOnEmit) {
                scope.$on(attrs.toggleOnEmit, function() {
                    if (element.hasClass('selected')) {
                        element.removeClass('selected')
                    } else {
                        element.addClass('selected')
                    }
                });
            }
        }
    }
})

// Deprecated: styling selected state should be styled by using ng-class
//and and changing the underlying model of the view
.directive('default', function() {
    return {
        restrict: 'AC',
        link: function(scope, element, attrs) {
            if (attrs.default === '') {
                scope.$on('default', function() {
                    element.parent().children().removeClass('selected');
                    element.addClass('selected');
                })
            }
        }
    }
})

//// FAILED MATERIAL DESIGN ATTEMPTED.
// .directive('touched', function () {
//  return {
//      restrict: 'A',
//      link: function(scope, element, attrs) {

//          var parent, ink, d, x, y;

//          element.on('touchstart', function (event){
//              element.css({
//                  overflow: 'hidden',
//                  opacity:'0.5',
//              })
//              .addClass('relative');

//              if(element.find('ink').length === 0){
//                  element.prepend('<ink></ink>');
//              }
//              var ink = element.find('ink');
//              ink.removeClass('animate');
//              if(!ink.prop('offsetHeight') && !ink.prop('offsetWidth')){
//                  d =Math.max(element.prop('offsetWidth'),
//                      element.prop('offsetHeight')
//                  );
//                  ink.css({height: d + "px", width: d + "px"});
//              }
//              x = event.layerX - ink.prop('offsetWidth')/2;
//              y = event.layerY - ink.prop('offsetHeight')/2;
//              ink.css({top: y + 'px', left: x + 'px'}).addClass('animate');
//          });

//          element.on('touchend', function (event){
//              element.css({
//                  opacity: 1
//              })
//          })
//      }
//  };
// })

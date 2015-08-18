(function() {
    'use strict';

    angular.module('app')
        .controller('DaumMapController', DaumMapController);

    DaumMapController.$inject = ['DaumMapModel', '$ionicModal', '$scope', '$state',
        '$stateParams', 'Dom'
    ];

    function DaumMapController(DaumMapModel, $ionicModal, $scope, $state,
        $stateParams, Dom) {

        var Map = this;
        Map.Model = DaumMapModel;

        Map.searchType = "address";



        Map.findMeThenSearchNearBy = DaumMapModel.findMeThenSearchNearBy;

        Map.searchLocationNearBy = function(value) {

            if (Map.searchType === "address")
                return DaumMapModel.searchLocationNearBy(value);
            else
                return DaumMapModel.searchPlaceByName(value);
        };


        Map.goToDetailHandler = function() {
            DaumMapModel.modal.hide();
            $state.go('main.detail', {
                id: DaumMapModel.selectedPlace.id
            });
        };
        Map.goToHandler = function(state, params) {
            $state.go(state, params);
        };


        // Make currently selected place from DaumMapDirective available at ModalView
        Map.selectedPlace = DaumMapModel.selectedPlace;

        $scope.$on('$ionicView.enter', function() {
            // Set Modal
            $ionicModal.fromTemplateUrl('state/daumMap/placeModal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            })
                .then(function(modal) {
                    DaumMapModel.modal = modal;
                });
            DaumMapModel.domMap.relayout();
        });

        //------------------------
        //  APP SPECIFIC FUNCTION
        //------------------------
        $scope.$on('$ionicView.enter', function() {
            if ($stateParams.from === 'quick') {
                Map.title = '바로서비스';
            } else {
                Map.title = '전체보기';
            }
            focusInput($stateParams, Dom);
        });

        function focusInput($stateParams, Dom) {
            if ($stateParams.from === 'homeInput') {
                Dom.focusById('daum-map-search-input');
            }
        }
    }
})();

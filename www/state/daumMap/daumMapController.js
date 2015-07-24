myApp
.controller('DaumMapController', [

'DaumMapModel', '$ionicModal', '$scope', '$state', '$ionicLoading',
'$stateParams', 'Dom',

function (DaumMapModel, $ionicModal, $scope, $state, $ionicLoading,
    $stateParams, Dom
){

    var Map = this;

    Map.Model = DaumMapModel;

    Map.findMeThenSearchNearBy = function (){
        return DaumMapModel.findMeThenSearchNearBy();
    };

    Map.searchLocationNearBy = function (value){
        return DaumMapModel.searchLocationNearBy(value);
    };

    Map.goToDetailHandler = function (){
        DaumMapModel.modal.hide();
        $state.go('main.detail', {id: DaumMapModel.selectedPlace.id});
    };

    // Make currently selected place from DaumMapDirective available at ModalView
    Map.selectedPlace = DaumMapModel.selectedPlace;

    $scope.$on('$ionicView.enter', function (){
        // Set Modal
        $ionicModal.fromTemplateUrl( 'state/daumMap/placeModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        })
        .then(function (modal){
            DaumMapModel.modal = modal;
        })
    });

    //------------------------
    //  APP SPECIFIC FUNCTION
    //------------------------
    $scope.$on('$ionicView.enter', function (){
        focusInput($stateParams, Dom);
    })

    function focusInput($stateParams, Dom){
        if($stateParams.from === 'homeInput'){
            Dom.focusById('daum-map-search-input');
        }
    }


}])

myApp
.controller('DaumMapController', [

'DaumMapModel', '$ionicModal', '$scope', '$state', '$ionicLoading',
    
function (DaumMapModel, $ionicModal, $scope, $state, $ionicLoading){

    var Map = this;

    Map.findMeThenSearchNearBy = function (){
        return DaumMapModel.findMeThenSearchNearBy();
    };

    Map.searchLocationNearBy = function (value){
        return DaumMapModel.searchLocationNearBy(value);
    };

    Map.goToDetailHandler = function (){
        Map.modal.remove();
        $state.go('main.detail', {id: DaumMapModel.selectedPlace.id});
    };

    // Make currently selected place from DaumMapDirective available at ModalView
    Map.selectedPlace = DaumMapModel.selectedPlace;

    $scope.$on('$ionicView.afterEnter', function (){
        // Set Modal
        $ionicModal.fromTemplateUrl( 'state/daumMap/placeModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        })
        .then(function (modal){
            DaumMapModel.modal = modal;
            Map.modal = DaumMapModel.modal;
        })
    });


}])
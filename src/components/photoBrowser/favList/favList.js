function FavListController($scope) {
    var ctrl = this;

    ctrl.removeFav = (index) =>{
        ctrl.onRemove({index:index});
    };


}

myApp.component('favList', {
    templateUrl: 'photoBrowser/favList/favList.html',
    controller: FavListController,
    bindings: {
        favList:"<",
        onRemove:"&"
    }
});

function SearchListController($scope) {
    var ctrl = this;
    ctrl.searchResult={};

    ctrl.changePage = (page) => {
        ctrl.onPage({page:page});
    };

    ctrl.addFav = (image)=>{
        ctrl.onAdd({image:image});
    };
    ctrl.getImageThumbUrl = (photo) =>{
        console.log(photo);
    }

}

myApp.component('searchList', {
    templateUrl: 'photoBrowser/searchList/searchList.html',
    controller: SearchListController,
    bindings: {
        searchResult: '<',
        onAdd: '&',
        onPage:'&'

    }
});
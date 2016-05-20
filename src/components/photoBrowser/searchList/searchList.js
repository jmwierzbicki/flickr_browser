function SearchListController($scope, $window) {
    var ctrl = this;

    ctrl.getColumns = () =>{
        if($window.innerWidth>1200){
            return [0,1,2,3]
        }
        else if($window.innerWidth>1000){
            return [0,1,2,3]
        }
        else if($window.innerWidth>800){
            return [0,1,2]
        }
        else if($window.innerWidth>400){
            return [0,1]
        }
        else if($window.innerWidth>1){
            return [0]
        }
    };
    ctrl.apply = () => {
      console.log('test');
    };
    ctrl.getSearchDivided = (column, length) =>{
        if(!ctrl.searchResult.photo){
            return [];
        }
        let result = [];
        ctrl.searchResult.photo.forEach( (item,i)=>{
           if(i%length==column) {
               result.push(item);
           }
        });
        return result;
    };
    ctrl.searchResult={};

    ctrl.changePage = (page) => {
        window.scrollTo(0,0);
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
        searchResultCached: '<',
        onAdd: '&',
        onPage:'&'

    }
});

myApp.directive('watchResize', ['$window', function ($window) {

    var link =(scope, element, attrs) => {

        scope.width = $window.innerWidth;

        angular.element($window).bind('resize', function(){

            scope.width = $window.innerWidth;

            // manuall $digest required as resize event
            // is outside of angular
            scope.$digest();
        });
    };

    return {
        link: link,
        restrict: 'A'
    };


}]);
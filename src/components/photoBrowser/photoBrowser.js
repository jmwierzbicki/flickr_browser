function PhotoBrowserController($scope, $http, $q) {
    var ctrl = this;
    ctrl.search = "";
    ctrl.searchResults = {};
    ctrl.favList = [];
    var savedData = JSON.parse(localStorage.getItem('favList'));
   if (savedData instanceof Array){
       ctrl.favList = savedData;
   }


    var request = {
        'api_key': "d680468aa8d1d075113d8dbb102c5e6e",
        'method': "flickr.photos.search",
        'text': "",
        'page': 1,
        'format': "json",
        'nojsoncallback':1

    };

    var getStringForHash = (page,text)=> {

        let result ="";
        request.page = page;
        request.text = text;
        Object.keys(request)
            .sort()
            .forEach(function(v, i) {
               // console.log(v, request[v]);
                result += v+request[v];
            });

        return result;
    };
    var getRequestUrl = (page,text)=> {

        let result ="https://api.flickr.com/services/rest/?";
        request.page = page;
        request.text = text;
        Object.keys(request)
            .sort()
            .forEach(function(v, i) {
                // console.log(v, request[v]);
                result += v+"="+request[v]+"&";
            });

        return result;

    };


    var getSignature = (page,text) =>{
        return $q((resolve, reject)=>{
            $http({
                method: 'GET',
                url: 'http://www.jmwierzbicki.hekko24.pl/getsignature/index.php?string='+getStringForHash(page, text)
            }).then(function successCallback(response) {
               // console.log(response);
                resolve(response.data);
            }, function errorCallback(response) {
                console.log(response);
            });
        })
    };

    ctrl.searchPhotos = (page, text) =>{
        getSignature(page,text).then( (signature)=>{

            $http({
                method: 'GET',
                url: getRequestUrl(page,text)+"api_sig="+signature
            }).then(function successCallback(response) {
                ctrl.searchResult = response.data.photos;
                //console.log(ctrl.searchResult);
            }, function errorCallback(response) {
                console.log(response);
            });

        })
    };
    ctrl.changePage = (page)=>{
        ctrl.searchPhotos(page, ctrl.search);
    };

    ctrl.addToFav = (image)=>{
        console.log(image);
        var found = false;
        for(var i = 0; i < ctrl.favList.length; i++) {
            if (ctrl.favList[i].id == image.id) {
                found = true;
                alert("Ten obrazek jest już w ulubionych!!");
                break;
            }
        }
        if (!found){
            ctrl.favList.push(image);
            localStorage.setItem('favList', JSON.stringify(ctrl.favList));
        }


    };
    ctrl.removeFromFav = (index)=>{
        ctrl.favList.splice(index, 1);
        localStorage.setItem('favList', JSON.stringify(ctrl.favList));
    }



}

myApp.component('photoBrowser', {
    templateUrl: 'photoBrowser/photoBrowser.html',
    controller: PhotoBrowserController,
    bindings: {

    }
});
